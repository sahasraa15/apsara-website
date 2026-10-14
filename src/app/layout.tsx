import type { Metadata, Viewport } from "next";
import { Cinzel, Cormorant_Garamond, Outfit } from "next/font/google";
import { CartProvider } from "@/lib/cart";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const caps = Cinzel({
  variable: "--font-caps",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const body = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Apsara & Co. — Ayurvedic Skincare & Colour",
  description:
    "Heirloom Ayurvedic skincare and makeup from an Indian-American house. Small batch, hand-numbered, first edition.",
  openGraph: {
    title: "Apsara & Co.",
    description: "Your nani's secrets, bottled in gold.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a1c10",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${caps.variable} ${body.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-body">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
