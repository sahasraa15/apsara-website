"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ingredients, type Product } from "@/lib/products";
import { Vessel } from "@/components/brand/Vessel";

/** Start offsets from the centre, as % of the stage */
const starts = [
  { x: -34, y: -30 },
  { x: 34, y: -22 },
  { x: -30, y: 30 },
  { x: 32, y: 34 },
];

function Orb({
  label,
  color,
  i,
  progress,
}: {
  label: string;
  color: string;
  i: number;
  progress: MotionValue<number>;
}) {
  const from = starts[i % starts.length];
  const begin = 0.15 + i * 0.12;
  const end = begin + 0.3;
  const left = useTransform(progress, [0, begin, end], [`${50 + from.x * 1.3}%`, `${50 + from.x}%`, "50%"]);
  const top = useTransform(progress, [0, begin, end], [`${50 + from.y * 1.3}%`, `${50 + from.y}%`, "62%"]);
  const scale = useTransform(progress, [begin, end], [1, 0.15]);
  const opacity = useTransform(progress, [0, 0.1, end - 0.04, end], [0, 1, 1, 0]);
  const labelOpacity = useTransform(progress, [begin, begin + 0.12], [1, 0]);

  return (
    <motion.div
      className="absolute z-10 flex size-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center md:size-32"
      style={{ left, top, scale, opacity }}
    >
      <span
        className="absolute inset-0 rounded-full shadow-[0_20px_40px_-12px_rgba(77,8,33,0.35)]"
        style={{ background: `radial-gradient(circle at 32% 28%, #ffffff, ${color} 70%)` }}
      />
      <motion.span className="relative text-center text-sm font-medium text-ink" style={{ opacity: labelOpacity }}>
        {label}
      </motion.span>
    </motion.div>
  );
}

export function WhatsInside({ product }: { product: Product }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const glow = useTransform(scrollYProgress, [0.5, 0.85], [0, 1]);
  const bottleScale = useTransform(scrollYProgress, [0.5, 0.8, 0.9], [1, 1.08, 1]);
  const headline = useTransform(scrollYProgress, [0.75, 0.9], [0, 1]);

  const orbs = product.notes.map((note) => {
    const match = ingredients.find((ing) => note.toLowerCase().includes(ing.name.toLowerCase().replace("pink ", "")));
    return { label: note, color: match?.color ?? product.fill };
  });

  return (
    <section ref={ref} className="relative h-[260vh]">
      <div
        className="sticky top-0 flex h-[100svh] flex-col items-center justify-center overflow-hidden"
        style={{ background: `radial-gradient(circle at 50% 55%, #ffffff 0%, ${product.tint} 70%)` }}
      >
        <div className="absolute inset-x-0 top-20 px-5 text-center md:top-24">
          <p className="eyebrow text-gold-deep">What&apos;s inside</p>
          <h2 className="mt-3 font-display text-[clamp(2.4rem,5vw,4.2rem)] leading-none">
            {orbs.length} key ingredients. Nothing to hide.
          </h2>
        </div>

        <div className="relative mt-16 h-[46svh] w-full max-w-[900px]">
          <motion.div
            className="absolute left-1/2 top-1/2 size-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(246,227,168,0.95),transparent_65%)] blur-xl"
            style={{ opacity: glow, scale: glow }}
          />
          {orbs.map((o, i) => (
            <Orb key={o.label} label={o.label} color={o.color} i={i} progress={scrollYProgress} />
          ))}
          <motion.div className="absolute inset-0 flex items-end justify-center" style={{ scale: bottleScale }}>
            <Vessel product={product} className="drop-shadow-[0_34px_30px_rgba(77,8,33,0.22)]" />
          </motion.div>
        </div>

        <motion.p
          className="absolute inset-x-0 bottom-12 px-5 text-center font-display text-3xl md:text-4xl"
          style={{ opacity: headline }}
        >
          <span className="gold-foil italic">{product.tagline}.</span>
        </motion.p>
      </div>
    </section>
  );
}
