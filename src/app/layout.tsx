import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./_components/header";
import "./globals.css";
import Footer from "./_components/footer";
import { cn } from "@/lib/utils";

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
      <body
        className={cn(
          "min-h-screen flex-col flex justify-between",
          inter.className
        )}
      >
        <div>
          <Header />
          <div>{children}</div>
          <Toaster />
        </div>
        <Footer />
      </body>
    </html>
  );
}
