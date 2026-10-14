"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/lib/cart";
import { FREE_GIFT_THRESHOLD, formatPrice, productById } from "@/lib/products";
import { Vessel } from "./Vessel";
import { Button } from "./Button";

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
            className="fixed inset-0 z-[80] bg-ink/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
          <motion.aside
            key="drawer"
            role="dialog"
            aria-label="Your bag"
            className="fixed inset-y-0 right-0 z-[85] flex w-full max-w-md flex-col bg-white text-ink shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 32 }}
          >
            <header className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
              <p className="font-display text-2xl">
                Your bag <span className="text-ink/45">({count})</span>
              </p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close bag"
                className="rounded-full p-2 transition hover:bg-petal"
              >
                <X className="size-5" />
              </button>
            </header>

            {reserved ? (
              <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
                <span className="flex size-16 items-center justify-center rounded-full bg-forest text-white">
                  <Check className="size-7" />
                </span>
                <p className="mt-6 font-display text-3xl">You&apos;re all set.</p>
                <p className="mt-3 max-w-xs text-sm text-ink/65">
                  Your order is reserved. We&apos;ll email you the moment we launch—before anyone else.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setReserved(false);
                    setOpen(false);
                  }}
                  className="mt-8 text-sm font-medium underline underline-offset-4"
                >
                  Keep shopping
                </button>
              </div>
            ) : lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
                <span className="flex size-16 items-center justify-center rounded-full bg-petal text-magenta">
                  <ShoppingBag className="size-7" strokeWidth={1.5} />
                </span>
                <p className="mt-6 font-display text-3xl">Your bag is empty.</p>
                <p className="mt-2 text-sm text-ink/60">Let&apos;s fix that.</p>
                <Button className="mt-8" href="/shop" onClick={() => setOpen(false)}>
                  Shop all products
                </Button>
              </div>
            ) : (
              <>
                <div className="bg-petal/60 px-6 py-4">
                  <p className="text-sm">
                    {remaining > 0 ? (
                      <>
                        You&apos;re <span className="font-semibold">{formatPrice(remaining)}</span> away from a free
                        travel-size liner
                      </>
                    ) : (
                      <>You unlocked a free travel-size liner 🎉</>
                    )}
                  </p>
                  <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-white">
                    <motion.div
                      className="h-full rounded-full bg-magenta"
                      animate={{ width: `${progress * 100}%` }}
                      transition={{ type: "spring", stiffness: 120, damping: 20 }}
                    />
                  </div>
                </div>

                <ul className="flex-1 space-y-1 overflow-y-auto px-4 py-4">
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
                          className="flex items-center gap-4 rounded-xl p-2"
                        >
                          <Link
                            href={`/shop/${p.id}`}
                            onClick={() => setOpen(false)}
                            className="flex h-20 w-16 shrink-0 items-center justify-center rounded-lg p-1.5"
                            style={{ background: p.tint }}
                          >
                            <Vessel product={p} />
                          </Link>
                          <div className="min-w-0 flex-1">
                            <p className="font-medium leading-tight">{p.name}</p>
                            <p className="mt-0.5 text-xs text-ink/55">
                              {line.shade ? `Shade: ${line.shade}` : p.size}
                              {line.bundle && <span className="text-magenta"> · {line.bundle}</span>}
                            </p>
                            <div className="mt-2 inline-flex items-center rounded-full border border-ink/15">
                              <button
                                type="button"
                                aria-label="Decrease"
                                onClick={() => setQty(line.key, line.qty - 1)}
                                className="p-1.5 hover:text-magenta"
                              >
                                <Minus className="size-3" />
                              </button>
                              <span className="w-5 text-center text-sm">{line.qty}</span>
                              <button
                                type="button"
                                aria-label="Increase"
                                onClick={() => setQty(line.key, line.qty + 1)}
                                className="p-1.5 hover:text-magenta"
                              >
                                <Plus className="size-3" />
                              </button>
                            </div>
                          </div>
                          <p className="font-medium">{formatPrice(line.price * line.qty)}</p>
                        </motion.li>
                      );
                    })}
                  </AnimatePresence>
                </ul>

                <footer className="border-t border-ink/10 px-6 py-5">
                  <div className="flex items-baseline justify-between">
                    <span className="text-ink/60">Subtotal</span>
                    <span className="font-display text-3xl">{formatPrice(subtotal)}</span>
                  </div>
                  <p className="mt-1 text-xs text-ink/50">
                    Ships this spring. You won&apos;t be charged until launch.
                  </p>
                  <Button
                    size="lg"
                    className="mt-5 w-full"
                    onClick={() => {
                      setReserved(true);
                      clear();
                    }}
                  >
                    Reserve my order
                  </Button>
                </footer>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
