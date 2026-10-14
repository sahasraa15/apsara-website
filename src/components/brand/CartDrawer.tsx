"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, X } from "lucide-react";
import { useCart } from "@/lib/cart";
import { FREE_GIFT_THRESHOLD, formatPrice, productById } from "@/lib/products";
import { Vessel } from "./Vessel";
import { LotusMark } from "./LotusMark";
import { GoldButton } from "./GoldButton";

export function CartDrawer() {
  const { lines, open, setOpen, subtotal, setQty, clear, count } = useCart();
  const [reserved, setReserved] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, setOpen]);

  const remaining = Math.max(0, FREE_GIFT_THRESHOLD - subtotal);
  const progress = Math.min(1, subtotal / FREE_GIFT_THRESHOLD);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="scrim"
            className="fixed inset-0 z-[80] bg-night/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
          <motion.aside
            key="drawer"
            role="dialog"
            aria-label="Your bag"
            className="fixed inset-y-0 right-0 z-[85] flex w-full max-w-md flex-col border-l border-pearl/10 bg-midnight"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 32 }}
          >
            <header className="relative flex items-center justify-between border-b border-pearl/10 px-6 py-5">
              <div>
                <p className="eyebrow text-pearl/60">Your bag</p>
                <p className="mt-1 font-display text-2xl text-pearl">
                  {count} {count === 1 ? "item" : "items"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close bag"
                className="rounded-full border border-pearl/20 p-2 text-pearl transition hover:border-pearl"
              >
                <X className="size-4" strokeWidth={1.25} />
              </button>
            </header>

            {reserved ? (
              <div className="relative flex flex-1 flex-col items-center justify-center px-8 text-center">
                <LotusMark draw className="h-28 w-24 text-gold" />
                <p className="mt-8 font-display text-3xl text-pearl">You&apos;re all set.</p>
                <p className="mt-3 max-w-xs text-sm text-pearl/65">
                  Your order is reserved. We&apos;ll email you the moment we launch—before anyone else.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setReserved(false);
                    setOpen(false);
                  }}
                  className="mt-8 text-sm text-pearl/70 underline-offset-8 hover:underline"
                >
                  Keep shopping
                </button>
              </div>
            ) : lines.length === 0 ? (
              <div className="relative flex flex-1 flex-col items-center justify-center px-8 text-center">
                <LotusMark className="h-24 w-20 text-gold/50" jewel={false} />
                <p className="mt-6 font-display text-2xl text-pearl">Your bag is empty.</p>
                <p className="mt-2 text-sm text-pearl/60">Let&apos;s fix that.</p>
                <GoldButton
                  className="mt-8"
                  href="#vanity"
                  onClick={() => setOpen(false)}
                >
                  Shop the collection
                </GoldButton>
              </div>
            ) : (
              <>
                <div className="relative border-b border-pearl/10 px-6 py-4">
                  <p className="text-sm text-pearl/80">
                    {remaining > 0 ? (
                      <>
                        <span className="text-pearl">{formatPrice(remaining)}</span> away from a free
                        travel-size liner
                      </>
                    ) : (
                      <>You unlocked a free travel-size liner ✓</>
                    )}
                  </p>
                  <div className="mt-3 h-1 overflow-hidden rounded-full bg-pearl/10">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-magenta to-[#e0507e]"
                      animate={{ width: `${progress * 100}%` }}
                      transition={{ type: "spring", stiffness: 120, damping: 20 }}
                    />
                  </div>
                </div>

                <ul className="relative flex-1 space-y-1 overflow-y-auto px-4 py-4">
                  <AnimatePresence initial={false}>
                    {lines.map((line) => {
                      const p = productById[line.id];
                      if (!p) return null;
                      return (
                        <motion.li
                          key={line.key}
                          layout
                          initial={{ opacity: 0, x: 30 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 30, height: 0 }}
                          className="flex items-center gap-4 rounded-lg p-2 hover:bg-forest-deep/60"
                        >
                          <div
                            className="flex h-20 w-16 shrink-0 items-center justify-center rounded-md p-1"
                            style={{ background: p.room }}
                          >
                            <Vessel product={p} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-display text-lg leading-tight text-pearl">{p.name}</p>
                            <p className="mt-0.5 text-xs text-pearl/55">
                              {line.shade ? `Shade: ${line.shade}` : p.size}
                              {line.bundle && <span className="text-pearl/75"> · {line.bundle}</span>}
                            </p>
                            <div className="mt-2 flex items-center gap-3">
                              <button
                                type="button"
                                aria-label="Decrease"
                                onClick={() => setQty(line.key, line.qty - 1)}
                                className="rounded-full border border-pearl/20 p-1 text-pearl/80 hover:border-pearl"
                              >
                                <Minus className="size-3" />
                              </button>
                              <span className="w-4 text-center text-sm text-pearl">{line.qty}</span>
                              <button
                                type="button"
                                aria-label="Increase"
                                onClick={() => setQty(line.key, line.qty + 1)}
                                className="rounded-full border border-pearl/20 p-1 text-pearl/80 hover:border-pearl"
                              >
                                <Plus className="size-3" />
                              </button>
                            </div>
                          </div>
                          <p className="font-display text-lg text-pearl">
                            {formatPrice(line.price * line.qty)}
                          </p>
                        </motion.li>
                      );
                    })}
                  </AnimatePresence>
                </ul>

                <footer className="relative border-t border-pearl/10 px-6 py-5">
                  <div className="flex items-baseline justify-between">
                    <span className="eyebrow text-pearl/60">Subtotal</span>
                    <span className="font-display text-3xl text-pearl">{formatPrice(subtotal)}</span>
                  </div>
                  <p className="mt-1 text-xs text-pearl/45">
                    Ships this spring. You won&apos;t be charged until launch.
                  </p>
                  <GoldButton
                    className="mt-5 w-full"
                    onClick={() => {
                      setReserved(true);
                      clear();
                    }}
                  >
                    Reserve my order
                  </GoldButton>
                </footer>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
