"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/lib/cart";
import { productById, formatPrice } from "@/lib/products";
import { Button } from "@/components/brand/Button";
import { Reveal } from "@/components/brand/Reveal";
import { tintLevels, mixHex } from "@/lib/tint";
import { cn } from "@/lib/utils";

const skins = [
  { name: "Fair", hex: "#f2d4bf" },
  { name: "Light", hex: "#e2b48f" },
  { name: "Medium", hex: "#c98f62" },
  { name: "Tan", hex: "#a8693f" },
  { name: "Deep", hex: "#7b4a2b" },
  { name: "Rich", hex: "#4b2c1b" },
];

export function TryOn() {
  const product = productById["beetroot-tint"];
  const { add } = useCart();
  const [value, setValue] = useState(45);
  const [skin, setSkin] = useState(skins[2]);
  const [added, setAdded] = useState(false);

  const t = value / 100;
  const level = tintLevels[Math.min(tintLevels.length - 1, Math.floor(t * tintLevels.length))];
  const pigment = useMemo(() => mixHex("#e0507e", "#5e0624", t), [t]);
  const lip = useMemo(() => mixHex(skin.hex, pigment, 0.25 + t * 0.7), [skin, pigment, t]);
  const cheekAlpha = 0.18 + t * 0.55;

  return (
    <section className="lotus-bg">
      <div className="mx-auto grid max-w-[1400px] items-center gap-14 px-5 py-20 md:px-10 md:py-28 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <Reveal className="relative order-2 lg:order-1">
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            <motion.div
              className="relative aspect-[3/4] overflow-hidden rounded-[2rem] shadow-[0_20px_50px_rgba(77,8,33,0.12)]"
              animate={{ backgroundColor: skin.hex }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,255,255,0.3),transparent_60%)]" />
              <svg viewBox="0 0 200 120" className="absolute left-1/2 top-1/2 w-[78%] -translate-x-1/2 -translate-y-1/2">
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
              </svg>
              <p className="absolute inset-x-0 bottom-4 text-center text-xs font-medium text-black/45">On lips</p>
            </motion.div>
            <motion.div
              className="relative mt-10 aspect-[3/4] overflow-hidden rounded-[2rem] shadow-[0_20px_50px_rgba(77,8,33,0.12)]"
              animate={{ backgroundColor: skin.hex }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(255,255,255,0.25),transparent_60%)]" />
              <motion.div
                className="absolute left-[12%] top-[34%] h-[38%] w-[76%] rounded-full blur-2xl"
                animate={{ backgroundColor: pigment, opacity: cheekAlpha }}
                transition={{ duration: 0.25 }}
              />
              <p className="absolute inset-x-0 bottom-4 text-center text-xs font-medium text-black/45">On cheeks</p>
            </motion.div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {skins.map((s) => (
              <button
                key={s.name}
                type="button"
                aria-label={`Preview on ${s.name} skin`}
                aria-pressed={skin.name === s.name}
                data-cursor={s.name}
                onClick={() => setSkin(s)}
                className={cn(
                  "size-9 rounded-full ring-2 ring-offset-2 ring-offset-blush transition-transform hover:scale-110",
                  skin.name === s.name ? "scale-110 ring-ink" : "ring-transparent"
                )}
                style={{ background: s.hex }}
              />
            ))}
          </div>
          <p className="mt-3 text-center text-sm text-ink/55">Pick a skin tone to preview</p>
        </Reveal>

        <Reveal delay={0.1} className="order-1 lg:order-2">
          <p className="eyebrow text-magenta">Try it on</p>
          <h2 className="mt-3 font-display text-[clamp(2.4rem,5vw,4.4rem)] leading-[1]">
            One tint. Every mood.
          </h2>
          <p className="mt-5 max-w-md text-lg text-ink/70">
            Our{" "}
            <Link href={`/shop/${product.id}`} className="underline underline-offset-4 hover:text-magenta">
              {product.name}
            </Link>{" "}
            is colored by real beetroot and builds from sheer to bold. Drag to see it on you.
          </p>

          <div className="mt-8 rounded-3xl bg-white p-6 shadow-[0_20px_50px_rgba(77,8,33,0.08)] md:p-8">
            <div className="flex items-end justify-between gap-4">
              <div className="min-h-[5rem]">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={level.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="font-display text-4xl md:text-5xl"
                  >
                    {level.name}
                  </motion.p>
                </AnimatePresence>
                <p className="mt-1 text-sm text-ink/60">{level.note}</p>
              </div>
              <motion.span
                className="size-14 shrink-0 rounded-full ring-4 ring-petal"
                animate={{ backgroundColor: pigment }}
              />
            </div>

            <div className="relative mt-6">
              <div
                className="pointer-events-none absolute inset-x-0 top-1/2 h-2 -translate-y-1/2 rounded-full"
                style={{ background: "linear-gradient(90deg, #f6c6d4, #e0507e 35%, #a11047 70%, #5e0624)" }}
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
                {tintLevels.map((l, i) => (
                  <button
                    key={l.name}
                    type="button"
                    onClick={() => setValue(i * 33 + 8)}
                    className={cn(
                      "text-xs font-medium transition-colors",
                      level.name === l.name ? "text-ink" : "text-ink/40 hover:text-ink/70"
                    )}
                  >
                    {l.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
              <p className="font-display text-3xl">{formatPrice(product.price)}</p>
              <Button
                onClick={(e) => {
                  add(product.id, { from: e.currentTarget as HTMLElement, color: "#a11047" });
                  setAdded(true);
                  setTimeout(() => setAdded(false), 1800);
                }}
              >
                {added ? "Added ✓" : "Add to bag"}
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
