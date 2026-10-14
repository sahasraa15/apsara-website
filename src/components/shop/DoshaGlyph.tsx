import type { Dosha } from "@/lib/products";

const glyphs: Record<Dosha, string> = {
  vata: "M4 14 C10 8 18 8 22 12 C26 16 22 22 17 20 M4 20 C12 18 26 26 30 18",
  pitta: "M16 30 C8 26 8 18 12 12 C13 16 16 17 16 17 C15 11 18 6 22 3 C22 10 28 14 26 22 C25 27 21 30 16 30 Z",
  kapha: "M16 3 C16 3 6 14 6 20 C6 26 11 30 16 30 C21 30 26 26 26 20 C26 14 16 3 16 3 Z",
};

export function DoshaGlyph({ dosha, className }: { dosha: Dosha; className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <path d={glyphs[dosha]} fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" />
    </svg>
  );
}
