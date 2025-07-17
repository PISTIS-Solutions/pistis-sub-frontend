import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PayStack Payment Verification",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* <NavigationBar /> */}
      {children}
    </div>
  );
}
