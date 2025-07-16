import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pistis Student - Log in",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main>{children}</main>;
}
