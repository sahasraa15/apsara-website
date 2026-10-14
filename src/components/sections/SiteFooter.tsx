import { LotusMark } from "@/components/brand/LotusMark";
import { Wordmark } from "@/components/brand/Wordmark";

const columns = [
  {
    title: "Shop",
    links: [
      { href: "#vanity", label: "All products" },
      { href: "#shade", label: "Try a shade" },
      { href: "#consult", label: "Skin quiz" },
      { href: "#garden", label: "Ingredients" },
    ],
  },
  {
    title: "About",
    links: [
      { href: "#story", label: "Our story" },
      { href: "#circle", label: "Early access" },
      { href: "#top", label: "Press" },
      { href: "#top", label: "Stockists" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-pearl/10 bg-night text-pearl">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-16 md:grid-cols-12 md:px-10">
        <div className="md:col-span-5">
          <div className="flex items-center gap-4 text-gold">
            <LotusMark className="h-14 w-12" />
            <Wordmark size="md" showCo className="text-gold-light" />
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-pearl/55">
            Clean Ayurvedic skincare &amp; color. Botanicals that have worked for centuries, made to modern standards.
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.title} className="md:col-span-2">
            <p className="eyebrow text-pearl/50">{col.title}</p>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-pearl/60 transition-colors hover:text-pearl">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="md:col-span-3">
          <p className="eyebrow text-pearl/50">Contact</p>
          <p className="mt-4 text-sm leading-relaxed text-pearl/60">
            Brooklyn · Hyderabad
            <br />
            hello@apsaraandco.com
          </p>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none select-none text-center font-display text-[24vw] leading-[0.8] text-pearl/[0.05]"
      >
        Apsara
      </div>

      <div className="border-t border-pearl/10 px-5 py-5 text-center text-xs text-pearl/35 md:px-10">
        © {new Date().getFullYear()} Apsara &amp; Co. · Prototype experience
      </div>
    </footer>
  );
}
