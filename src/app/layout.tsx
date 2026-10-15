import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Outfit } from "next/font/google";
import { CartProvider } from "@/lib/cart";
import { SiteNav } from "@/components/brand/SiteNav";
import { CartDrawer } from "@/components/brand/CartDrawer";
import { Cursor } from "@/components/brand/Cursor";
import { SiteFooter } from "@/components/brand/SiteFooter";
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
  title: {
    default: "Apsara & Co. — Modern Ayurvedic Skincare",
    template: "%s · Apsara & Co.",
  },
  description:
    "Modern Ayurvedic skincare. Time-tested botanicals, clean formulas, dermatologist tested.",
  openGraph: {
    title: "Apsara & Co.",
    description: "Modern Ayurveda for everyday skin.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0c5029",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-body">
        <CartProvider>
          <SiteNav />
          <CartDrawer />
          <Cursor />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </CartProvider>
      </body>
    </html>
  );
}
