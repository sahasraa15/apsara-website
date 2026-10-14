"use client";

import { motion } from "framer-motion";
import { forwardRef, type ReactNode, type MouseEvent, type Ref } from "react";
import { cn } from "@/lib/utils";

type GoldButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  variant?: "gold" | "outline" | "magenta";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
};

const styles = {
  gold: "bg-[linear-gradient(110deg,#9d6e26,#e3c27c_45%,#b8893a_70%,#f3dda4)] bg-[length:200%_100%] bg-left text-midnight hover:bg-right shadow-[0_10px_40px_-12px_#e3c27c80]",
  outline:
    "bg-transparent text-pearl border border-gold/60 hover:border-gold-light hover:bg-gold/10",
  magenta:
    "bg-magenta text-pearl border border-gold/40 hover:bg-[#bd1756] shadow-[0_10px_40px_-12px_#a1104799]",
};

export const GoldButton = forwardRef<HTMLElement, GoldButtonProps>(function GoldButton(
  { children, href, onClick, variant = "gold", className, type = "button", disabled },
  ref
) {
  const classes = cn(
    "group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full px-8 py-4 font-caps text-[0.7rem] font-semibold uppercase tracking-[0.3em] transition-all duration-700 disabled:opacity-50",
    styles[variant],
    className
  );

  const inner = (
    <>
      <span className="relative z-10 inline-flex items-center gap-3">{children}</span>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-[120%] bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 group-hover:translate-x-[120%]"
      />
    </>
  );

  if (href) {
    return (
      <motion.a
        ref={ref as Ref<HTMLAnchorElement>}
        href={href}
        onClick={onClick}
        className={classes}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as Ref<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
    >
      {inner}
    </motion.button>
  );
});
