"use client";

import { SessionProvider } from "next-auth/react";
import { SessionTimeoutGuard } from "./SessionTimeoutGuard";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider refetchOnWindowFocus={true}>
      {children}
      <SessionTimeoutGuard />
    </SessionProvider>
  );
}
