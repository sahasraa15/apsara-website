"use client";

import { motion } from "framer-motion";

const words = ["Pink Lotus", "Kashmiri Saffron", "Neem", "Haldi", "Sandalwood", "Beetroot", "Ghee", "Tulsi"];

export function Marquee() {
  const row = (
    <div className="flex shrink-0 items-center">
      {words.map((w) => (
        <span key={w} className="flex items-center">
          <span className="px-6 font-display text-4xl italic text-pearl md:px-10 md:text-6xl">{w}</span>
          <svg viewBox="0 0 20 20" className="size-4 text-gold-light md:size-5" aria-hidden>
            <path d="M10 0 L12 8 L20 10 L12 12 L10 20 L8 12 L0 10 L8 8 Z" fill="currentColor" />
          </svg>
        </span>
      ))}
    </div>
  );

  return (
    <div className="relative overflow-hidden border-y border-gold/30 bg-magenta py-5 md:py-7">
      <div className="brocade pointer-events-none absolute inset-0 opacity-[0.08]" />
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
