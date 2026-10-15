"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { formatPrice, productById } from "@/lib/products";
import { Vessel, vesselHeight } from "@/components/brand/Vessel";
import { cn } from "@/lib/utils";

const steps = [
  { id: "neem-cleanser", verb: "Cleanse", when: "Morning & night", copy: "Start clean. Neem clears the day away without that tight, squeaky feeling." },
  { id: "lotus-serum", verb: "Treat", when: "Morning & night", copy: "Three drops of pink lotus on damp skin to calm redness and hydrate." },
  { id: "kumkumadi-oil", verb: "Glow", when: "Night", copy: "Seal it all in with saffron oil. Four drops, pressed in before bed." },
  { id: "haldi-mask", verb: "Reset", when: "Once a week", copy: "Ten minutes of turmeric on a Sunday for a brighter week ahead." },
];

/** Each step holds still for most of its slot, then slides to the next */
const HOLD = 0.6;
const stops = steps.flatMap((_, i) => [i / steps.length, (i + HOLD) / steps.length]);
const positions = steps.flatMap((_, i) => [i, i]);

function Panel({ step, i, pos }: { step: (typeof steps)[number]; i: number; pos: MotionValue<number> }) {
  const p = productById[step.id];
  const range = [i - 1, i, i + 1];
  const rotate = useTransform(pos, range, [14, 0, -14]);
  const scale = useTransform(pos, range, [0.8, 1, 0.8]);
  const y = useTransform(pos, range, [40, 0, 40]);

  return (
    <div className="grid h-full w-screen shrink-0 grid-rows-[1fr_auto] items-center gap-6 px-5 pb-20 pt-28 md:grid-cols-2 md:grid-rows-1 md:px-[8vw] md:pb-16 md:pt-24">
      <motion.div className="relative mx-auto flex h-full max-h-[52svh] w-full items-end justify-center md:order-2 md:max-h-[64svh]" style={{ rotate, scale, y }}>
        <div className="absolute inset-x-[12%] bottom-[2%] top-[12%] rounded-full bg-white/60 blur-2xl" />
        <Link href={`/shop/${p.id}`} data-cursor="View" className="relative flex h-full w-[60%] items-end justify-center">
          <div className="flex w-full items-end justify-center" style={{ height: vesselHeight[p.vessel] }}>
            <Vessel product={p} className="drop-shadow-[0_34px_30px_rgba(77,8,33,0.22)]" />
          </div>
        </Link>
      </motion.div>

      <div className="md:order-1">
        <p className="flex items-baseline gap-3">
          <span className="gold-foil font-display text-5xl md:text-7xl">0{i + 1}</span>
          <span className="text-sm text-ink/55">{step.when}</span>
        </p>
        <h3 className="mt-2 font-display text-[clamp(3.4rem,9vw,8rem)] leading-[0.9] text-ink">{step.verb}</h3>
        <p className="mt-4 max-w-md text-base text-ink/70 md:text-lg">{step.copy}</p>
        <Link
          href={`/shop/${p.id}`}
          className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-forest"
        >
          {p.name} · {formatPrice(p.price)}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}

export function Ritual() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [active, setActive] = useState(0);

  const pos = useTransform(scrollYProgress, stops, positions);
  const x = useTransform(pos, (v) => `${-v * 100}vw`);
  const bg = useTransform(
    pos,
    steps.map((_, i) => i),
    steps.map((s) => productById[s.id].tint)
  );

  useMotionValueEvent(pos, "change", (v) => setActive(Math.round(v)));

  return (
    <section ref={ref} className="relative" style={{ height: `${steps.length * 100}vh` }}>
      <motion.div className="sticky top-0 h-[100svh] overflow-hidden" style={{ backgroundColor: bg }}>
        <div className="absolute inset-x-0 top-20 z-10 px-5 md:top-24 md:px-[8vw]">
          <p className="eyebrow text-gold-deep">Your routine, in order</p>
        </div>

        <motion.div className="flex h-full" style={{ x }}>
          {steps.map((s, i) => (
            <Panel key={s.id} step={s} i={i} pos={pos} />
          ))}
        </motion.div>

        <div className="absolute inset-x-0 bottom-8 z-10 flex justify-center gap-2">
          {steps.map((s, i) => (
            <span
              key={s.id}
              className={cn(
                "h-1 rounded-full transition-all duration-500",
                i === active ? "w-12 bg-forest" : i < active ? "w-5 bg-gold" : "w-5 bg-ink/15"
              )}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
