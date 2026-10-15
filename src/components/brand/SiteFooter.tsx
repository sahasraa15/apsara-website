import Link from "next/link";
import { LotusMark } from "./LotusMark";
import { Wordmark } from "./Wordmark";

const columns = [
  {
    title: "Shop",
    links: [
      { href: "/shop", label: "All products" },
      { href: "/quiz", label: "Skin quiz" },
    ],
  },
  {
    title: "Learn",
    links: [
      { href: "/ingredients", label: "Ingredients" },
      { href: "/about", label: "Our story" },
      { href: "/about#ayurveda", label: "What is Ayurveda?" },
    ],
  },
  {
    title: "Help",
    links: [
      { href: "/about#contact", label: "Contact us" },
      { href: "/about#contact", label: "Shipping & returns" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-forest-deep text-white">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-16 md:grid-cols-12 md:px-10">
        <div className="md:col-span-4">
          <Link href="/" className="flex items-center gap-3 text-white">
            <LotusMark className="h-12 w-10 text-gold-light" />
            <Wordmark size="md" showCo className="text-gold-light" />
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/65">
            Modern Ayurvedic skincare. Clean, vegan, cruelty-free and dermatologist tested.
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.title} className="md:col-span-2">
            <p className="text-sm font-medium">{col.title}</p>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-white/65 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="md:col-span-2">
          <p className="text-sm font-medium">Say hi</p>
          <p className="mt-4 text-sm text-white/65">hello@apsaraandco.com</p>
        </div>
      </div>

      <div className="gold-hairline opacity-40" />
      <div className="px-5 py-5 text-center text-xs text-white/45 md:px-10">
        © {new Date().getFullYear()} Apsara &amp; Co. · Prototype
      </div>
    </footer>
  );
}
