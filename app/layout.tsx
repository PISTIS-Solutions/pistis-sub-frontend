import { Montserrat } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import Favicon from "@/src/favicon.ico";
import "./globals.css";
import { Metadata } from "next";
import Providers from "@/components/others/progressBar";

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
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
