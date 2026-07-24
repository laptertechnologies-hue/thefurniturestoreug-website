import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "The Furniture Store UG",
  description: "Premium Furniture for Your Home. Order online today.",
  verification: {
    google: "StK3D4UAvg0kiya0QJ0EHVLGlvgIXbzNtY5pj0i5b0A",
  },
  openGraph: {
    siteName: "The Furniture Store Ug",
    title: "The Furniture Store UG",
    description: "Premium Furniture for Your Home. Order online today.",
    url: "https://www.thefurniturestoreug.com",
  },
};

import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import { Providers } from "@/components/Providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <Providers>
          <Navbar />
          <main style={{ paddingTop: '70px', minHeight: 'calc(100vh - 70px)' }}>{children}</main>
          <Footer />
          <CookieBanner />
        </Providers>
      </body>
    </html>
  );
}
