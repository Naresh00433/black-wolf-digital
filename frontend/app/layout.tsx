import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Black Wolf Digital",
  description:
    "Digital marketing and affiliate marketing agency focused on measurable business growth.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-white">{children}</body>
    </html>
  );
}
