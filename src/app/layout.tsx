import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Outfit } from "next/font/google";
import { CartProvider } from "@/lib/cart";
import "./globals.css";

const display = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const body = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Apsara & Co. — Ayurvedic Skincare & Color",
  description:
    "Clean, small-batch skincare and makeup built on Ayurvedic botanicals. Your grandma was right. Science caught up.",
  openGraph: {
    title: "Apsara & Co.",
    description: "Your grandma was right. Science caught up.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a1c10",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-body">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
