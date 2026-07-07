import type { Metadata } from "next";
import { Inter } from "next/font/google";
import WhatsappButton from "@/components/common/WhatsappButton";
import WolfAssistant from "@/components/ai/WolfAssistant";
import "./globals.css";
import CursorTrail from "@/components/effects/CursorTrail";

export const metadata: Metadata = {
  metadataBase: new URL("https://blackwolfdigital.in"),

  title: {
    default: "Black Wolf Digital - Digital Marketing & Web Development",
    template: "%s | Black Wolf Digital",
  },

  robots: {
    index: true,
    follow: true,
    nocache: true,
  },

  description:
    "Black Wolf Digital helps businesses grow through affiliate marketing, SEO, website development, social media marketing, paid advertising, and lead generation.",

  keywords: [
    "Digital Marketing",
    "Affiliate Marketing",
    "SEO",
    "Lead Generation",
    "Website Development",
    "Next.js Development",
    "Social Media Marketing",
  ],

  openGraph: {
    title: "Black Wolf Digital",
    description:
      "Performance-driven digital marketing and web development solutions.",
    url: "https://blackwolfdigital.in",
    siteName: "Black Wolf Digital",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Black Wolf Digital",
    description:
      "Performance-driven digital marketing and web development solutions.",
  },

};

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-black text-white`}>
        {children}
        <WhatsappButton />
        <WolfAssistant />
        <CursorTrail />
      </body>
    </html>
  );
}
