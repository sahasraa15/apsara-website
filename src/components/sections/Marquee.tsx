"use client";

import { motion } from "framer-motion";

const items = [
  "Lotus · Saffron · Neem · Turmeric",
  "Skincare & Color",
  "Brooklyn × Hyderabad",
  "Dosha-aware formulas",
  "Modern Luxe Heritage",
];

export function Marquee() {
  const line = [...items, ...items].join("   ✦   ");

  return (
    <div className="overflow-hidden border-y border-gold/25 bg-forest py-3 text-sand">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, ease: "linear", repeat: Infinity }}
      >
        <p className="px-4 text-[0.7rem] uppercase tracking-[0.35em] text-sand/85">
          {line}
        </p>
        <p
          className="px-4 text-[0.7rem] uppercase tracking-[0.35em] text-sand/85"
          aria-hidden
        >
          {line}
        </p>
      </motion.div>
    </div>
  );
}
