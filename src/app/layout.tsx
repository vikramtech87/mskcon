import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import PageHeader from "@/components/page-header";
import { Toaster } from "@/components/ui/toaster";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/services/firebase/client";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MSKCon",
  description: "Website for Musculo-skeletal conference 2024",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PageHeader />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
