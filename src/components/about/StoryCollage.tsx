"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

const tiles = [
  { src: "/images/mood/lotus.jpg", alt: "Fresh pink lotus flowers", className: "left-0 top-[8%] w-[46%]", speed: -60 },
  { src: "/images/mood/flowers.jpg", alt: "Orchids and white blossoms", className: "right-0 top-0 w-[44%]", speed: 50 },
  { src: "/images/mood/forest.jpg", alt: "Misty green forest", className: "right-[6%] bottom-0 w-[40%]", speed: -40 },
  { src: "/images/mood/silk.jpg", alt: "Emerald silk", className: "left-[8%] bottom-[4%] w-[36%]", speed: 70 },
];

function Tile({ tile, progress }: { tile: (typeof tiles)[number]; progress: MotionValue<number> }) {
  const y = useTransform(progress, [0, 1], [tile.speed, -tile.speed]);
  return (
    <motion.div className={`absolute ${tile.className}`} style={{ y }}>
      <div className="relative aspect-[3/4] overflow-hidden rounded-3xl shadow-[0_20px_50px_rgba(77,8,33,0.15)]">
        <Image src={tile.src} alt={tile.alt} fill sizes="(min-width: 1024px) 300px, 45vw" className="object-cover" />
      </div>
    </motion.div>
  );
}

export function StoryCollage() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  return (
    <div ref={ref} className="relative mx-auto aspect-[5/6] w-full max-w-[560px]">
      {tiles.map((t) => (
        <Tile key={t.src} tile={t} progress={scrollYProgress} />
      ))}
    </div>
  );
}
