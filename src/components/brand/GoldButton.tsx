"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ReactNode, MouseEvent } from "react";

type GoldButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: (e: MouseEvent) => void;
  variant?: "solid" | "outline" | "magenta";
  className?: string;
  type?: "button" | "submit";
};

export function GoldButton({
  children,
  href,
  onClick,
  variant = "solid",
  className,
  type = "button",
}: GoldButtonProps) {
  const styles = {
    solid:
      "bg-forest text-silk border border-gold/40 hover:bg-midnight hover:border-gold",
    outline:
      "bg-transparent text-silk border border-gold/70 hover:bg-gold/15 hover:border-gold",
    magenta:
      "bg-magenta text-silk border border-gold/30 hover:bg-magenta/90 hover:border-gold",
  };

  const classes = cn(
    "group relative inline-flex items-center justify-center overflow-hidden px-7 py-3.5 text-[0.7rem] uppercase tracking-[0.28em] transition-colors duration-500",
    styles[variant],
    className
  );

  const inner = (
    <>
      <span className="relative z-10">{children}</span>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-gold/25 to-transparent transition-transform duration-700 group-hover:translate-x-[120%]"
      />
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={classes}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      {inner}
    </motion.button>
  );
}
