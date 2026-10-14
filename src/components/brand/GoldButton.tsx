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
  gold: "bg-pearl text-midnight hover:bg-gold-light",
  outline: "bg-transparent text-pearl border border-pearl/35 hover:border-pearl hover:bg-pearl/5",
  magenta: "bg-magenta text-pearl hover:bg-[#bd1756]",
};

export const GoldButton = forwardRef<HTMLElement, GoldButtonProps>(function GoldButton(
  { children, href, onClick, variant = "gold", className, type = "button", disabled },
  ref
) {
  const classes = cn(
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-[0.95rem] font-medium transition-colors duration-300 disabled:opacity-50",
    styles[variant],
    className
  );

  const inner = <span className="relative z-10 inline-flex items-center gap-2">{children}</span>;

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
