"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { rituals } from "@/lib/products";
import { Reveal } from "@/components/brand/Reveal";

export function Ritual() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      id="ritual"
      ref={ref}
      className="relative overflow-hidden bg-midnight py-24 text-sand md:py-32"
    >
      <motion.div style={{ y }} className="absolute inset-0 opacity-40">
        <Image
          src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=2000&q=80"
          alt="Misty forest canopy"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-midnight/75" />
      <div className="jali-overlay absolute inset-0 opacity-40" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <p className="text-[0.65rem] uppercase tracking-[0.35em] text-gold">
            Daily ceremony
          </p>
          <h2 className="mt-4 max-w-2xl font-display text-4xl md:text-5xl lg:text-6xl">
            A three-step ritual, unhurried
          </h2>
          <p className="mt-4 max-w-lg text-sand/75">
            Ayurveda as structure—not spectacle. Each step is short enough for a
            weekday, rich enough for a Sunday.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-10 md:grid-cols-3 md:gap-6">
          {rituals.map((r, i) => (
            <Reveal key={r.step} delay={0.12 * i}>
              <motion.div
                whileHover={{ y: -6 }}
                className="border border-gold/25 bg-forest/30 p-8 backdrop-blur-sm transition-colors hover:border-gold/55"
              >
                <span className="font-display text-4xl text-gold/80">
                  {r.step}
                </span>
                <div className="gold-rule my-5 w-16" />
                <h3 className="font-display text-2xl text-sand">{r.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-sand/70">
                  {r.copy}
                </p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
