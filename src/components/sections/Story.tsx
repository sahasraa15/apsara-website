"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Reveal } from "@/components/brand/Reveal";
import { LotusMark } from "@/components/brand/LotusMark";
import { cn } from "@/lib/utils";

const tiles = [
  { src: "/images/mood/apsara.jpg", alt: "Apsara painting with jasmine garland", className: "left-[3%] top-[6%] w-[15vw] max-w-[230px]", speed: -120, arch: true },
  { src: "/images/mood/flowers.jpg", alt: "Orchids and white blossoms", className: "left-[19%] top-[48%] w-[11vw] max-w-[170px]", speed: 80, arch: true },
  { src: "/images/mood/lotus.jpg", alt: "Fresh pink lotus flowers", className: "right-[20%] top-[4%] w-[11vw] max-w-[170px]", speed: -60, arch: false },
  { src: "/images/mood/lotuspond.jpg", alt: "Woman among lotuses at night", className: "right-[3%] top-[30%] w-[15vw] max-w-[230px]", speed: 140, arch: true },
  { src: "/images/mood/forest.jpg", alt: "Misty green forest", className: "left-[6%] bottom-[2%] w-[10vw] max-w-[150px]", speed: -40, arch: true },
  { src: "/images/mood/silk.jpg", alt: "Emerald silk", className: "right-[16%] bottom-[0%] w-[12vw] max-w-[190px]", speed: -150, arch: false },
];

function Tile({
  tile,
  progress,
}: {
  tile: (typeof tiles)[number];
  progress: MotionValue<number>;
}) {
  const y = useTransform(progress, [0, 1], [tile.speed, -tile.speed]);
  return (
    <motion.div className={cn("absolute hidden md:block", tile.className)} style={{ y }}>
      <motion.div
        whileHover={{ scale: 1.05, rotate: -1 }}
        transition={{ type: "spring", stiffness: 200, damping: 18 }}
        className={cn(
          "relative overflow-hidden",
          tile.arch ? "rounded-t-full" : "rounded-2xl"
        )}
      >
        <div className={cn("relative aspect-[3/4] overflow-hidden", tile.arch ? "rounded-t-full" : "rounded-2xl")}>
          <Image src={tile.src} alt={tile.alt} fill sizes="230px" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-night/40 to-transparent" />
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Story() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  return (
    <section id="story" ref={ref} className="relative overflow-hidden bg-night py-28 md:min-h-[120vh] md:py-0">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_40%_50%_at_50%_50%,#0c502955,transparent_70%)]" />
      {tiles.map((t) => (
        <Tile key={t.src} tile={t} progress={scrollYProgress} />
      ))}

      <div className="mx-auto mb-12 grid max-w-sm grid-cols-3 gap-3 px-5 md:hidden">
        {tiles.slice(0, 3).map((t) => (
          <div key={t.src} className="relative aspect-[3/4] overflow-hidden rounded-t-full">
            <Image src={t.src} alt={t.alt} fill sizes="120px" className="object-cover" />
          </div>
        ))}
      </div>

      <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center px-6 text-center md:min-h-[120vh] md:justify-center">
        <Reveal>
          <LotusMark className="mx-auto h-16 w-14 text-gold" />
          <p className="eyebrow mt-8 text-pearl/70">Our story · Brooklyn × Hyderabad</p>
          <h2 className="mt-5 font-display text-[clamp(2.6rem,6vw,5.5rem)] leading-[0.92] text-pearl">
            Old recipes,
            <br />
            <span className="gold-text italic">new standards.</span>
          </h2>
          <div className="mx-auto my-8 h-px w-24 bg-pearl/25" />
          <p className="text-lg leading-relaxed text-pearl/75">
            We grew up with turmeric face masks and homemade oils from our grandmothers&apos; kitchens—then moved to a
            city of drugstore aisles full of ingredients we couldn&apos;t pronounce.
          </p>
          <p className="mt-5 text-lg leading-relaxed text-pearl/75">
            Apsara &amp; Co. takes the botanicals that have worked for centuries and holds them to modern standards:
            clean, vegan, dermatologist tested, and beautiful enough to leave out on the counter.
          </p>
          <p className="mt-8 text-sm text-pearl/60">— The founders</p>
        </Reveal>
      </div>
    </section>
  );
}
