"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { forwardRef, type ReactNode, type MouseEvent, type Ref } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  variant?: "primary" | "outline" | "light" | "magenta" | "gold";
  size?: "md" | "lg";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
};

const variants = {
  primary: "bg-forest text-white hover:bg-forest-deep",
  outline: "border border-ink/25 text-ink hover:border-ink hover:bg-white/60",
  light: "bg-white text-ink hover:bg-petal",
  magenta: "bg-magenta text-white hover:bg-[#880c3b]",
  gold: "gold-fill bg-[length:200%_100%] bg-left text-ink shadow-[0_8px_30px_-8px_rgba(184,137,58,0.7)] transition-[background-position] duration-700 hover:bg-right",
};

const sizes = {
  md: "px-6 py-3 text-[0.92rem]",
  lg: "px-8 py-4 text-base",
};

const MotionLink = motion.create(Link);

export const Button = forwardRef<HTMLElement, ButtonProps>(function Button(
  { children, href, onClick, variant = "primary", size = "md", className, type = "button", disabled },
  ref
) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-200 disabled:opacity-50",
    variants[variant],
    sizes[size],
    className
  );

  if (href) {
    return (
      <MotionLink
        ref={ref as Ref<HTMLAnchorElement>}
        href={href}
        onClick={onClick}
        className={classes}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
      >
        {children}
      </MotionLink>
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
      {children}
    </motion.button>
  );
});
