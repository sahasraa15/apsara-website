"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/lib/cart";
import { productById, formatPrice } from "@/lib/products";
import { GoldButton } from "@/components/brand/GoldButton";
import { Reveal } from "@/components/brand/Reveal";
import { cn } from "@/lib/utils";

const skins = [
  { name: "Porcelain", hex: "#f2d4bf" },
  { name: "Wheat", hex: "#e2b48f" },
  { name: "Golden", hex: "#c98f62" },
  { name: "Caramel", hex: "#a8693f" },
  { name: "Cocoa", hex: "#7b4a2b" },
  { name: "Ebony", hex: "#4b2c1b" },
];

const levels = [
  { name: "Whisper", note: "One tap. Looks like you just walked in from the cold.", taps: 1 },
  { name: "Blush", note: "Two taps. Flushed, rested, slightly in love.", taps: 2 },
  { name: "Mehendi Night", note: "Three taps. Dancing until 2am, still glowing.", taps: 3 },
  { name: "Banquet", note: "Four taps. Full ceremony. The room turns around.", taps: 4 },
];

const hex = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const mix = (a: string, b: string, t: number) => {
  const A = hex(a);
  const B = hex(b);
  return `#${A.map((v, i) => Math.round(v + (B[i] - v) * t).toString(16).padStart(2, "0")).join("")}`;
};

export function ShadeStudio() {
  const product = productById["beetroot-tint"];
  const { add } = useCart();
  const [value, setValue] = useState(55);
  const [skin, setSkin] = useState(skins[2]);
  const [added, setAdded] = useState(false);

  const t = value / 100;
  const level = levels[Math.min(levels.length - 1, Math.floor(t * levels.length))];
  const pigment = useMemo(() => mix("#e0507e", "#5e0624", t), [t]);
  const lip = useMemo(() => mix(skin.hex, pigment, 0.25 + t * 0.7), [skin, pigment, t]);
  const cheekAlpha = 0.18 + t * 0.55;

  return (
    <section id="shade" className="relative overflow-hidden bg-beetroot py-24 md:py-36">
      <div className="brocade pointer-events-none absolute inset-0 opacity-[0.07]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_30%_50%,#a1104777,transparent_70%)]" />
      <div className="grain pointer-events-none absolute inset-0" />

      <div className="relative mx-auto grid max-w-[1400px] items-center gap-14 px-5 md:px-10 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <Reveal className="relative">
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            <div className="relative aspect-[3/4] overflow-hidden rounded-t-full border border-gold/40 p-1.5">
              <motion.div
                className="relative h-full w-full overflow-hidden rounded-t-full"
                animate={{ backgroundColor: skin.hex }}
                transition={{ duration: 0.6 }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,255,255,0.25),transparent_60%)]" />
                <svg viewBox="0 0 200 120" className="absolute left-1/2 top-[56%] w-[78%] -translate-x-1/2 -translate-y-1/2">
                  <motion.path
                    d="M10 58 C34 30 62 18 84 30 C92 34 96 36 100 36 C104 36 108 34 116 30 C138 18 166 30 190 58 C166 62 150 64 100 64 C50 64 34 62 10 58 Z"
                    animate={{ fill: lip }}
                    transition={{ duration: 0.25 }}
                  />
                  <motion.path
                    d="M10 58 C40 66 60 68 100 68 C140 68 160 66 190 58 C170 92 140 108 100 108 C60 108 30 92 10 58 Z"
                    animate={{ fill: lip }}
                    transition={{ duration: 0.25 }}
                  />
                  <path d="M10 58 C40 64 70 66 100 66 C130 66 160 64 190 58" stroke="#000" strokeOpacity={0.25} strokeWidth={2} fill="none" />
                  <ellipse cx={100} cy={86} rx={34} ry={7} fill="#fff" opacity={0.18 + t * 0.12} />
                  <ellipse cx={72} cy={42} rx={12} ry={3} fill="#fff" opacity={0.14} />
                </svg>
                <p className="eyebrow absolute inset-x-0 bottom-5 text-center text-[0.55rem] text-black/45">On lips</p>
              </motion.div>
            </div>
            <div className="relative mt-12 aspect-[3/4] overflow-hidden rounded-t-full border border-gold/40 p-1.5">
              <motion.div
                className="relative h-full w-full overflow-hidden rounded-t-full"
                animate={{ backgroundColor: skin.hex }}
                transition={{ duration: 0.6 }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(255,255,255,0.22),transparent_60%)]" />
                <motion.div
                  className="absolute left-[12%] top-[34%] h-[38%] w-[76%] rounded-full blur-2xl"
                  animate={{ backgroundColor: pigment, opacity: cheekAlpha }}
                  transition={{ duration: 0.25 }}
                />
                <p className="eyebrow absolute inset-x-0 bottom-5 text-center text-[0.55rem] text-black/45">On cheeks</p>
              </motion.div>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-3">
            {skins.map((s) => (
              <button
                key={s.name}
                type="button"
                aria-label={`Preview on ${s.name} skin`}
                data-cursor={s.name}
                onClick={() => setSkin(s)}
                className={cn(
                  "size-8 rounded-full border-2 transition-transform hover:scale-110",
                  skin.name === s.name ? "scale-110 border-gold-light" : "border-transparent"
                )}
                style={{ background: s.hex }}
              />
            ))}
          </div>
          <p className="mt-3 text-center text-xs text-pearl/55">Tap a skin tone to see it on you.</p>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="eyebrow text-gold-light/80">Shade Studio · {product.name}</p>
          <h2 className="mt-5 font-display text-[clamp(2.4rem,5vw,4.6rem)] leading-[0.95] text-pearl">
            From a whisper
            <br />
            <span className="gold-text italic">to a banquet.</span>
          </h2>
          <p className="mt-5 max-w-md text-pearl/70">
            One beetroot stain, built your way. Drag to layer it—every tap a little more ceremony.
          </p>

          <div className="mt-10 rounded-2xl border border-gold/25 bg-night/30 p-6 backdrop-blur-sm md:p-8">
            <div className="flex items-end justify-between gap-4">
              <div className="min-h-[5.5rem]">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={level.name}
                    initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
                    transition={{ duration: 0.3 }}
                    className="font-display text-4xl italic text-pearl md:text-5xl"
                  >
                    {level.name}
                  </motion.p>
                </AnimatePresence>
                <p className="mt-2 text-sm text-pearl/60">{level.note}</p>
              </div>
              <motion.span
                className="size-14 shrink-0 rounded-full border-2 border-gold-light/70 shadow-[0_0_30px_rgba(0,0,0,0.4)]"
                animate={{ backgroundColor: pigment }}
              />
            </div>

            <div className="relative mt-8">
              <div
                className="pointer-events-none absolute inset-x-0 top-1/2 h-2 -translate-y-1/2 rounded-full"
                style={{ background: "linear-gradient(90deg, #f2c0cf, #e0507e 35%, #a11047 70%, #5e0624)" }}
              />
              <input
                type="range"
                min={0}
                max={100}
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                aria-label="Tint intensity"
                data-cursor="Drag"
                className="shade-range relative"
              />
              <div className="mt-1 flex justify-between">
                {levels.map((l, i) => (
                  <button
                    key={l.name}
                    type="button"
                    onClick={() => setValue(i * 33 + 8)}
                    className={cn(
                      "font-caps text-[0.55rem] uppercase tracking-[0.2em] transition-colors",
                      level.name === l.name ? "text-gold-light" : "text-pearl/40 hover:text-pearl/70"
                    )}
                  >
                    {l.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
              <p className="font-display text-3xl text-pearl">{formatPrice(product.price)}</p>
              <GoldButton
                variant="gold"
                onClick={(e) => {
                  add(product.id, { shade: level.name, from: e.currentTarget as HTMLElement, color: "#a11047" });
                  setAdded(true);
                  setTimeout(() => setAdded(false), 1800);
                }}
              >
                {added ? "In your bag ✦" : `Add “${level.name}”`}
              </GoldButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
