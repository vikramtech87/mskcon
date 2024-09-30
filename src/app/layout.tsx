import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./_components/header";
import "./globals.css";
import Footer from "./_components/footer";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TriangleAlert } from "lucide-react";
import Container from "@/components/container";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BSTCON",
  description:
    "Website for Bone and soft tissue onco-pathology conference 2024",
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
          <div>
            <Container>
              <div className="flex items-center gap-4 text-sm p-4 justify-center">
                <TriangleAlert className="h-4 w-4 text-destructive flex-shrink-0" />
                <div className="font-medium text-destructive">
                  The preconference workshop timings have been changed from
                  01:00 PM to 06:00 PM to 11:00 AM to 05:00 PM
                </div>
              </div>
            </Container>
          </div>
          <Header />
          <div>{children}</div>
          <Toaster />
        </div>
        <Footer />
      </body>
    </html>
  );
}
