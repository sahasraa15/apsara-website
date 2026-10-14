"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ShoppingBag } from "lucide-react";
import { LotusMark } from "./LotusMark";
import { Wordmark } from "./Wordmark";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

const links = [
  { href: "#vanity", label: "Shop" },
  { href: "#shade", label: "Try a shade" },
  { href: "#consult", label: "Skin quiz" },
  { href: "#garden", label: "Ingredients" },
  { href: "#circle", label: "Early access" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { count, bump, setOpen: setBagOpen } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled ? "border-b border-pearl/10 bg-night/75 backdrop-blur-xl" : "bg-transparent"
        )}
      >
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 md:h-20 md:px-10">
          <nav className="hidden items-center gap-7 lg:flex">
            {links.slice(0, 3).map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-pearl/75 transition-colors hover:text-pearl"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href="#top"
            className="flex items-center gap-2.5 text-gold lg:absolute lg:left-1/2 lg:-translate-x-1/2"
          >
            <LotusMark className="h-9 w-8 md:h-11 md:w-10" />
            <Wordmark size="sm" className="text-gold-light" />
          </a>

          <div className="flex items-center gap-5 md:gap-7">
            <nav className="hidden items-center gap-7 lg:flex">
              {links.slice(3).map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-pearl/75 transition-colors hover:text-pearl"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <motion.button
              id="bag-button"
              key={bump}
              type="button"
              aria-label={`Open bag, ${count} items`}
              onClick={() => setBagOpen(true)}
              animate={bump ? { scale: [1, 1.35, 0.9, 1], rotate: [0, -8, 6, 0] } : undefined}
              transition={{ duration: 0.55 }}
              className="relative flex items-center gap-2 rounded-full border border-pearl/30 px-3.5 py-2 text-pearl transition-colors hover:border-pearl"
            >
              <ShoppingBag className="size-4" strokeWidth={1.25} />
              <span className="text-xs font-medium tabular-nums">{count}</span>
              {count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-magenta shadow-[0_0_10px_#c41d5c]" />
              )}
            </motion.button>
            <button
              type="button"
              className="text-pearl lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-5" strokeWidth={1.25} /> : <Menu className="size-5" strokeWidth={1.25} />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
            className="fixed inset-0 z-40 bg-midnight lg:hidden"
          >
            <div className="relative flex h-full flex-col items-center justify-center gap-7 pt-16">
              <LotusMark draw className="h-20 w-16 text-gold" />
              {links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + 0.06 * i }}
                  onClick={() => setOpen(false)}
                  className="font-display text-4xl text-pearl"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
