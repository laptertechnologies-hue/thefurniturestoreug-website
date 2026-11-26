import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./prisma";
import bcrypt from "bcrypt";

// Session security constants
export const ADMIN_IDLE_TIMEOUT_MS = 15 * 60 * 1000; // 15 minutes for admins
export const USER_IDLE_TIMEOUT_MS = 30 * 60 * 1000;  // 30 minutes for customers
export const ABSOLUTE_SESSION_MAX_AGE_SEC = 8 * 60 * 60; // 8 hours max lifetime

// Simple in-memory login brute-force rate limiter (5 failed attempts / 15 mins per email)
const LOGIN_WINDOW_MS = 15 * 60 * 1000;
const MAX_LOGIN_ATTEMPTS = 5;
const failedLoginMap = new Map<string, { count: number; resetAt: number }>();

function checkLoginRateLimit(key: string) {
  const now = Date.now();
  const entry = failedLoginMap.get(key);
  if (entry && now < entry.resetAt && entry.count >= MAX_LOGIN_ATTEMPTS) {
    const minsLeft = Math.max(1, Math.ceil((entry.resetAt - now) / 60000));
    throw new Error(`Too many failed login attempts. Try again in ${minsLeft} minute(s).`);
  }
  if (entry && now >= entry.resetAt) {
    failedLoginMap.delete(key);
  }
}

function recordFailedLogin(key: string) {
  const now = Date.now();
  const entry = failedLoginMap.get(key);
  if (!entry || now >= entry.resetAt) {
    failedLoginMap.set(key, { count: 1, resetAt: now + LOGIN_WINDOW_MS });
  } else {
    entry.count += 1;
    failedLoginMap.set(key, entry);
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const normalizedEmail = credentials.email.trim().toLowerCase();
        checkLoginRateLimit(normalizedEmail);

        const user = await prisma.user.findFirst({
          where: { email: { equals: normalizedEmail, mode: "insensitive" } }
        });

        if (!user || !user.password) {
          recordFailedLogin(normalizedEmail);
          throw new Error("Invalid credentials");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isCorrectPassword) {
          recordFailedLogin(normalizedEmail);
          throw new Error("Invalid credentials");
        }

        failedLoginMap.delete(normalizedEmail);
        return user;
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: "jwt",
    maxAge: ABSOLUTE_SESSION_MAX_AGE_SEC,
    updateAge: 5 * 60, // Refresh JWT rolling window every 5 mins while active
  },
  jwt: {
    maxAge: ABSOLUTE_SESSION_MAX_AGE_SEC,
  },
  useSecureCookies: process.env.NODE_ENV === "production",
  callbacks: {
    async jwt({ token, user, trigger }) {
      const now = Date.now();

      // Initial sign-in
      if (user) {
        // @ts-ignore - custom property
        token.role = user.role;
        token.id = user.id;
        token.lastActivity = now;
        token.sessionExpired = false;
        return token;
      }

      // Enforce server-side idle timeout on subsequent token checks
      const idleLimit =
        token.role === "ADMIN" ? ADMIN_IDLE_TIMEOUT_MS : USER_IDLE_TIMEOUT_MS;
      const lastActivity =
        typeof token.lastActivity === "number" ? token.lastActivity : now;

      if (now - lastActivity > idleLimit) {
        token.sessionExpired = true;
        return token;
      }

      // Sync live role changes from DB
      if (token.id) {
        const dbUser = await prisma.user.findUnique({
          where: { id: String(token.id) },
          select: { role: true }
        });
        if (!dbUser) {
          token.sessionExpired = true;
          return token;
        }
        // @ts-ignore - sync live role changes immediately
        token.role = dbUser.role;
      }

      // Refresh lastActivity on explicit session update or active requests
      if (trigger === "update" || !token.sessionExpired) {
        token.lastActivity = now;
      }

      return token;
    },
    async session({ session, token }) {
      if (token.sessionExpired) {
        // @ts-ignore - signal client guard to force signOut
        session.error = "SessionExpired";
      }
      if (session.user) {
        // @ts-ignore
        session.user.role = token.role;
        // @ts-ignore
        session.user.id = token.id;
      }
      return session;
    }
  }
};
