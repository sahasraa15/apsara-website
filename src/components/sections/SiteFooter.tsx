import { LotusMark } from "@/components/brand/LotusMark";
import { Wordmark } from "@/components/brand/Wordmark";

const columns = [
  {
    title: "Explore",
    links: [
      { href: "#collection", label: "Collection" },
      { href: "#ritual", label: "Ritual" },
      { href: "#ingredients", label: "Botanicals" },
      { href: "#story", label: "Story" },
    ],
  },
  {
    title: "Care",
    links: [
      { href: "#waitlist", label: "Waitlist" },
      { href: "#top", label: "Dosha guide" },
      { href: "#top", label: "Shipping soon" },
      { href: "#top", label: "Press" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-gold/20 bg-midnight text-sand">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-12 md:px-8">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3 text-gold">
            <LotusMark className="h-12 w-9" />
            <Wordmark size="md" showCo />
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-sand/60">
            Indian-American Ayurvedic skincare & makeup. Heritage texture,
            contemporary restraint.
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.title} className="md:col-span-2">
            <p className="text-[0.65rem] uppercase tracking-[0.28em] text-gold">
              {col.title}
            </p>
            <ul className="mt-4 space-y-2">
              {col.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-sand/70 transition-colors hover:text-gold"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="md:col-span-3">
          <p className="text-[0.65rem] uppercase tracking-[0.28em] text-gold">
            Visit
          </p>
          <p className="mt-4 text-sm text-sand/70">
            Brooklyn · Hyderabad
            <br />
            hello@apsaraandco.com
          </p>
        </div>
      </div>
      <div className="border-t border-gold/15 px-5 py-5 text-center text-[0.65rem] tracking-[0.2em] text-sand/40 uppercase md:px-8">
        © {new Date().getFullYear()} Apsara & Co. · Prototype experience
      </div>
    </footer>
  );
}
