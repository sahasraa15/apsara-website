"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import { Reveal } from "@/components/brand/Reveal";

const stats = [
  { value: 3000, suffix: "+", label: "years of Ayurvedic tradition", format: true },
  { value: 16, suffix: "", label: "botanicals in our Kumkumadi oil" },
  { value: 0, suffix: "", label: "parabens, sulfates or synthetic fragrance" },
  { value: 100, suffix: "%", label: "vegan & cruelty-free" },
];

function Counter({ value, suffix, format }: { value: number; suffix: string; format?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref} className="gold-foil tabular-nums">
      {format ? n.toLocaleString() : n}
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-12 md:px-10 md:py-16">
      <div className="rounded-[2.5rem] bg-forest-deep px-6 py-14 text-white md:px-14 md:py-20">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-gold-light">By the numbers</p>
          <h2 className="mt-3 font-display text-[clamp(2.4rem,5vw,4.2rem)] leading-none">
            Ancient wisdom, <span className="gold-foil italic">measured.</span>
          </h2>
        </Reveal>
        <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={0.08 * i}>
              <div className="gold-hairline mb-6 opacity-60" />
              <p className="font-display text-[clamp(3.4rem,7vw,6rem)] leading-none">
                <Counter value={s.value} suffix={s.suffix} format={s.format} />
              </p>
              <p className="mt-3 max-w-[14rem] text-sm text-white/65">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
