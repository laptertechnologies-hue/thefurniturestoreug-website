import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "The Furniture Store UG",
  description: "Premium Furniture for Your Home. Order online today.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        {/* We will add Navbar here */}
        <main>{children}</main>
        {/* We will add Footer here */}
      </body>
    </html>
  );
}
