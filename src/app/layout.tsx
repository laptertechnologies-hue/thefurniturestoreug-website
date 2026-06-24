import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "The Furniture Store UG",
  description: "Premium Furniture for Your Home. Order online today.",
};

import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <Navbar />
        <main style={{ paddingTop: '70px', minHeight: 'calc(100vh - 70px)' }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
