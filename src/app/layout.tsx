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
              <div className="flex flex-col px-1 py-2 gap-2 text-sm">
                <div className="flex items-center gap-2 justify-center">
                  <TriangleAlert className="h-4 w-4 text-destructive flex-shrink-0" />
                  <div className="font-medium text-destructive">
                    Fresh registrations for Workshop available - for only the
                    Gross and Radiology segments. Kindly mail us{" "}
                    <a
                      href="mailto:bstp2024@gmail.com"
                      className="text-blue-500"
                    >
                      bstp2024@gmail.com
                    </a>{" "}
                    for more information
                  </div>
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
