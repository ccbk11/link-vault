import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Geist yerine Inter kullanıyoruz
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LinkVault",
  description: "DevOps & AI Link Arşivi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={inter.className}>{children}</body>
    </html>
  );
}