"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ShoppingBag } from "lucide-react";
import { LotusMark } from "./LotusMark";
import { Wordmark } from "./Wordmark";
import { cn } from "@/lib/utils";

const links = [
  { href: "#collection", label: "Collection" },
  { href: "#ritual", label: "Ritual" },
  { href: "#ingredients", label: "Botanicals" },
  { href: "#story", label: "Story" },
  { href: "#waitlist", label: "Waitlist" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [cartPulse, setCartPulse] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-midnight/90 backdrop-blur-md border-b border-gold/20"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-20 md:px-8">
          <nav className="hidden items-center gap-8 md:flex">
            {links.slice(0, 3).map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[0.65rem] uppercase tracking-[0.28em] text-sand/80 transition-colors hover:text-gold"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href="#top"
            className="absolute left-1/2 flex -translate-x-1/2 items-center gap-2.5 text-gold"
          >
            <LotusMark className="h-9 w-7 md:h-11 md:w-8" />
            <Wordmark size="sm" className="hidden text-gold sm:inline-flex" />
          </a>

          <div className="ml-auto flex items-center gap-4 md:gap-8">
            <nav className="hidden items-center gap-8 md:flex">
              {links.slice(3).map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-[0.65rem] uppercase tracking-[0.28em] text-sand/80 transition-colors hover:text-gold"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <button
              type="button"
              aria-label="Bag preview"
              className="relative text-sand/90 transition-colors hover:text-gold"
              onClick={() => {
                setCartPulse(true);
                setTimeout(() => setCartPulse(false), 600);
                document.querySelector("#collection")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
            >
              <ShoppingBag className="size-4" strokeWidth={1.25} />
              <motion.span
                animate={cartPulse ? { scale: [1, 1.4, 1] } : {}}
                className="absolute -right-1.5 -top-1.5 size-1.5 rounded-full bg-magenta"
              />
            </button>
            <button
              type="button"
              className="text-sand md:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? (
                <X className="size-5" strokeWidth={1.25} />
              ) : (
                <Menu className="size-5" strokeWidth={1.25} />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-midnight/95 backdrop-blur-sm md:hidden"
          >
            <div className="flex h-full flex-col items-center justify-center gap-8 pt-16">
              <LotusMark className="h-16 w-12 text-gold" />
              {links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i }}
                  onClick={() => setOpen(false)}
                  className="font-display text-2xl tracking-[0.2em] text-sand uppercase"
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
