import { Montserrat } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import Favicon from "@/public/favicon.ico"
import "./globals.css";
import { Metadata } from "next";

const montserrat = Montserrat({ subsets: ["latin"], display: "auto" });

export const metadata: Metadata = {
  title: "Pistis Student",
  icons: [{ rel: "icon", url: Favicon.src }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} antialiased`}>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
