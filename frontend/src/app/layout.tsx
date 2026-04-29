import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Financial Research",
  description: "Multi-agent financial research workspace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  );
}
