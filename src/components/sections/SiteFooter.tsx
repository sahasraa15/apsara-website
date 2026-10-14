import { LotusMark } from "@/components/brand/LotusMark";
import { Wordmark } from "@/components/brand/Wordmark";

const columns = [
  {
    title: "Explore",
    links: [
      { href: "#vanity", label: "The Vanity" },
      { href: "#shade", label: "Shade Studio" },
      { href: "#consult", label: "Find your ritual" },
      { href: "#garden", label: "The Garden" },
    ],
  },
  {
    title: "House",
    links: [
      { href: "#story", label: "Our story" },
      { href: "#circle", label: "Founding Circle" },
      { href: "#top", label: "Press" },
      { href: "#top", label: "Stockists" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-gold/20 bg-night text-pearl">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-16 md:grid-cols-12 md:px-10">
        <div className="md:col-span-5">
          <div className="flex items-center gap-4 text-gold">
            <LotusMark className="h-14 w-12" />
            <Wordmark size="md" showCo className="text-gold-light" />
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-pearl/55">
            Ayurvedic skincare &amp; colour from an Indian-American house. Heirloom recipes, modern vessels.
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.title} className="md:col-span-2">
            <p className="eyebrow text-gold-light/80">{col.title}</p>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-pearl/60 transition-colors hover:text-gold-light">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="md:col-span-3">
          <p className="eyebrow text-gold-light/80">Visit</p>
          <p className="mt-4 text-sm leading-relaxed text-pearl/60">
            Brooklyn · Hyderabad
            <br />
            hello@apsaraandco.com
          </p>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none select-none text-center font-caps text-[19vw] leading-[0.8] tracking-[0.08em] text-gold/[0.07]"
      >
        APSARA
      </div>

      <div className="border-t border-gold/15 px-5 py-5 text-center text-[0.65rem] uppercase tracking-[0.2em] text-pearl/35 md:px-10">
        © {new Date().getFullYear()} Apsara &amp; Co. · Prototype experience
      </div>
    </footer>
  );
}
