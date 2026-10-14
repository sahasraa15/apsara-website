"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "@/components/brand/Reveal";

const frames = [
  {
    src: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80",
    alt: "Silk textile detail",
    className: "col-span-2 row-span-2 md:col-span-3 md:row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
    alt: "Palace corridor light",
    className: "col-span-2 md:col-span-2 md:row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=800&q=80",
    alt: "Lotus bloom",
    className: "col-span-2 md:col-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1515377905703-c4788e51af44?auto=format&fit=crop&w=800&q=80",
    alt: "Heritage jewelry",
    className: "col-span-2 md:col-span-2 md:translate-y-8",
  },
  {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&q=80",
    alt: "Misty mountain forest",
    className: "col-span-2 row-span-1 md:col-span-3",
  },
];

export function Lookbook() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const shift = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      ref={ref}
      className="overflow-hidden bg-forest py-24 text-sand md:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-[0.65rem] uppercase tracking-[0.35em] text-gold">
                Atmosphere
              </p>
              <h2 className="mt-4 font-display text-4xl md:text-5xl">
                Texture over trend
              </h2>
            </div>
            <p className="max-w-sm text-sm text-sand/70">
              Architecture, silk, lotus, mist—the visual language that shapes
              every formula and frame.
            </p>
          </div>
        </Reveal>

        <motion.div
          style={{ y: shift }}
          className="mt-14 grid grid-cols-4 gap-3 md:grid-cols-7 md:gap-4"
        >
          {frames.map((frame, i) => (
            <Reveal
              key={frame.alt}
              delay={0.06 * i}
              className={frame.className}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5 }}
                className="relative aspect-[4/5] overflow-hidden md:aspect-auto md:h-full md:min-h-[220px]"
              >
                <Image
                  src={frame.src}
                  alt={frame.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 30vw"
                />
                <div className="absolute inset-0 bg-midnight/10 transition-colors duration-500 hover:bg-transparent" />
              </motion.div>
            </Reveal>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
