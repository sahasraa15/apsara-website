"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ShoppingBag } from "lucide-react";
import { LotusMark } from "./LotusMark";
import { Wordmark } from "./Wordmark";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/quiz", label: "Skin Quiz" },
  { href: "/ingredients", label: "Ingredients" },
  { href: "/about", label: "About" },
];

export function SiteNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { count, bump, setOpen: setBagOpen } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <div className="bg-forest px-4 py-2 text-center text-xs text-white">
        Free shipping over $50 · Free travel-size liner on orders over $95
      </div>
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          scrolled ? "border-b border-ink/10 bg-white/85 backdrop-blur-xl" : "bg-transparent"
        )}
      >
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 md:h-[72px] md:px-10">
          <Link href="/" className="flex items-center gap-2 text-forest" aria-label="Apsara home">
            <LotusMark className="h-8 w-7 text-forest md:h-9 md:w-8" />
            <Wordmark size="sm" className="text-forest" />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm transition-colors",
                  isActive(link.href) ? "bg-ink text-white" : "text-ink/75 hover:bg-white/70 hover:text-ink"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <motion.button
              id="bag-button"
              key={bump}
              type="button"
              aria-label={`Open bag, ${count} items`}
              onClick={() => setBagOpen(true)}
              animate={bump ? { scale: [1, 1.3, 0.92, 1] } : undefined}
              transition={{ duration: 0.5 }}
              className="relative flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-white transition-colors hover:bg-forest"
            >
              <ShoppingBag className="size-4" strokeWidth={1.6} />
              <span className="text-sm font-medium tabular-nums">{count}</span>
            </motion.button>
            <button
              type="button"
              className="rounded-full p-2 text-ink lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="lotus-bg fixed inset-0 z-40 lg:hidden"
          >
            <nav className="flex flex-col gap-1 px-5 pt-28">
              {[{ href: "/", label: "Home" }, ...links].map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-ink/10 py-4 font-display text-4xl text-ink"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
