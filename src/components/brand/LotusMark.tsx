"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type LotusMarkProps = {
  className?: string;
  /** Draw the linework in on mount */
  draw?: boolean;
  delay?: number;
  jewel?: boolean;
};

const lines = [
  // Onion-dome arch, open at the base like the moodboard logo
  "M30 104 C12 96 5 76 8 58 C11 40 28 30 40 24 C46 21 50 16 50 10 C50 16 54 21 60 24 C72 30 89 40 92 58 C95 76 88 96 70 104",
  // Centre petal
  "M50 88 C40 78 40 60 50 46 C60 60 60 78 50 88 Z",
  // Inner side petals
  "M48 88 C36 86 28 76 27 62 C37 64 45 72 49 84",
  "M52 88 C64 86 72 76 73 62 C63 64 55 72 51 84",
  // Outer petals
  "M44 90 C30 92 20 86 15 76 C25 74 35 78 42 86",
  "M56 90 C70 92 80 86 85 76 C75 74 65 78 58 86",
  // Water line
  "M28 96 H72",
  "M36 100 H64",
];

export function LotusMark({ className, draw = false, delay = 0, jewel = true }: LotusMarkProps) {
  return (
    <svg
      viewBox="0 0 100 112"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-gold", className)}
      aria-hidden
    >
      {lines.map((d, i) =>
        draw ? (
          <motion.path
            key={d}
            d={d}
            stroke="currentColor"
            strokeWidth={i === 0 ? 1.6 : 1.2}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.4, delay: delay + i * 0.12, ease: [0.65, 0, 0.35, 1] }}
          />
        ) : (
          <path
            key={d}
            d={d}
            stroke="currentColor"
            strokeWidth={i === 0 ? 1.6 : 1.2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )
      )}
      {/* Finial */}
      <path d="M50 1 L52 4.5 L50 8 L48 4.5 Z" fill="currentColor" />
      {jewel && (
        <motion.path
          d="M50 58 C46 64 46 70 50 74 C54 70 54 64 50 58 Z"
          fill="#c41d5c"
          initial={draw ? { scale: 0, opacity: 0 } : false}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: delay + 1.1, duration: 0.6 }}
          style={{ transformOrigin: "50px 66px" }}
        />
      )}
    </svg>
  );
}
