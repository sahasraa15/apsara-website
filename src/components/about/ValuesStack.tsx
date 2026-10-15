"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

type Value = { title: string; copy: string };

const tones = [
  "bg-white text-ink",
  "bg-petal text-ink",
  "bg-forest-deep text-white",
];

function Card({ v, i, total, progress }: { v: Value; i: number; total: number; progress: MotionValue<number> }) {
  const start = i / total;
  const scale = useTransform(progress, [start, 1], [1, 1 - (total - i) * 0.04]);
  const dark = i === total - 1;

  return (
    <div className="sticky flex h-[70svh] items-center justify-center" style={{ top: `calc(96px + ${i * 28}px)` }}>
      <motion.div
        className={cn(
          "flex h-full w-full origin-top flex-col justify-between rounded-[2.5rem] p-8 shadow-[0_-20px_60px_-30px_rgba(10,28,16,0.35)] ring-1 ring-ink/5 md:p-14",
          tones[i % tones.length]
        )}
        style={{ scale }}
      >
        <span className="gold-foil font-display text-[clamp(5rem,14vw,11rem)] leading-none">0{i + 1}</span>
        <div>
          <h3 className="font-display text-[clamp(2.4rem,6vw,5rem)] leading-none">{v.title}</h3>
          <p className={cn("mt-4 max-w-xl text-lg", dark ? "text-white/75" : "text-ink/65")}>{v.copy}</p>
        </div>
      </motion.div>
    </div>
  );
}

export function ValuesStack({ values }: { values: Value[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <div ref={ref} className="relative">
      {values.map((v, i) => (
        <Card key={v.title} v={v} i={i} total={values.length} progress={scrollYProgress} />
      ))}
    </div>
  );
}
