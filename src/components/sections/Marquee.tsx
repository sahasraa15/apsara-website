"use client";

import { motion } from "framer-motion";

const words = ["Clean", "Vegan", "Cruelty-free", "Dermatologist tested", "Small batch", "Real botanicals"];

export function Marquee() {
  const row = (
    <div className="flex shrink-0 items-center">
      {words.map((w) => (
        <span key={w} className="flex items-center">
          <span className="px-6 font-display text-4xl text-pearl md:px-10 md:text-6xl">{w}</span>
          <span className="size-2 rounded-full bg-pearl/70 md:size-2.5" aria-hidden />
        </span>
      ))}
    </div>
  );

  return (
    <div className="relative overflow-hidden bg-magenta py-5 md:py-7">
      <motion.div
        className="relative flex w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 40, ease: "linear", repeat: Infinity }}
      >
        {row}
        <div aria-hidden className="flex">
          {row}
        </div>
      </motion.div>
    </div>
  );
}
