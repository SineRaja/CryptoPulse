
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CryptoProvider } from "./contexts/CryptoContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CryptoPulse",
  description: "Developer Raja Sine",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CryptoProvider>
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
    </CryptoProvider>
  );
}
