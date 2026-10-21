"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

const words: { text: string; gold?: boolean }[] = [
  { text: "Centuries" },
  { text: "of" },
  { text: "Ayurveda.", gold: true },
  { text: "Tested" },
  { text: "by" },
  { text: "modern" },
  { text: "dermatology." },
  { text: "Made" },
  { text: "for" },
  { text: "your" },
  { text: "skin,", gold: true },
  { text: "whatever" },
  { text: "it" },
  { text: "looks" },
  { text: "like." },
];

function Word({ word, i, progress }: { word: (typeof words)[number]; i: number; progress: MotionValue<number> }) {
  const start = i / words.length;
  const opacity = useTransform(progress, [start, start + 1 / words.length], [0.12, 1]);
  return (
    <motion.span style={{ opacity }} className={word.gold ? "gold-foil italic" : undefined}>
      {word.text}{" "}
    </motion.span>
  );
}

export function Statement() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.55"] });
  return (
    <section ref={ref} className="bg-[linear-gradient(180deg,#fbe7c8_0%,#fff6f8_45%)]">
      <p className="mx-auto max-w-[1200px] px-5 py-28 font-display md:px-10 md:py-40 text-[clamp(2.4rem,6.4vw,6rem)] leading-[1.02] tracking-[-0.02em] text-ink">
        {words.map((w, i) => (
          <Word key={i} word={w} i={i} progress={scrollYProgress} />
        ))}
      </p>
    </section>
  );
}
