import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const body = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Apsara & Co. — Ayurvedic Skincare & Makeup",
  description:
    "Indian-American Ayurvedic skincare and makeup. Modern luxe heritage—maximal texture, contemporary restraint.",
  openGraph: {
    title: "Apsara & Co.",
    description:
      "Ayurvedic skincare & color for modern rituals—lush heritage, clean finish.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body">{children}</body>
    </html>
  );
}
