"use client";

import { useRef, useState, type MouseEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun, X } from "lucide-react";
import { formatPrice, products, productById } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { Vessel } from "@/components/brand/Vessel";
import { Button } from "@/components/brand/Button";

const when: Record<string, ("am" | "pm" | "weekly")[]> = {
  "neem-cleanser": ["am", "pm"],
  "lotus-serum": ["am", "pm"],
  "kumkumadi-oil": ["pm"],
  "haldi-mask": ["weekly"],
};
const order = ["neem-cleanser", "lotus-serum", "kumkumadi-oil", "haldi-mask"];
const DISCOUNT = 0.15;

export function BuildShelf() {
  const [shelf, setShelf] = useState<string[]>([]);
  const [over, setOver] = useState(false);
  const zone = useRef<HTMLDivElement>(null);
  const { add, setOpen } = useCart();

  const inZone = (x: number, y: number) => {
    const r = zone.current?.getBoundingClientRect();
    return !!r && x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
  };
  const put = (id: string) => setShelf((s) => (s.includes(id) ? s : [...s, id].sort((a, b) => order.indexOf(a) - order.indexOf(b))));

  const full = shelf.reduce((n, id) => n + productById[id].price, 0);
  const deal = shelf.length >= 3;
  const total = deal ? Math.round(full * (1 - DISCOUNT)) : full;

  function addAll(e: MouseEvent<HTMLElement>) {
    shelf.forEach((id, i) =>
      add(id, {
        bundle: deal ? "My Shelf" : undefined,
        price: deal ? Math.round(productById[id].price * (1 - DISCOUNT) * 100) / 100 : undefined,
        from: i === 0 ? e.currentTarget : null,
      })
    );
    setTimeout(() => setOpen(true), 900);
  }

  const routine = (slot: "am" | "pm" | "weekly") => shelf.filter((id) => when[id].includes(slot));

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr] lg:items-start">
      <div className="rounded-[2rem] bg-white p-6 ring-1 ring-ink/5">
        <p className="text-sm text-ink/60">Drag a product onto the shelf (or tap it)</p>
        <div className="mt-4 grid grid-cols-4 gap-3">
          {products.map((p) => {
            const used = shelf.includes(p.id);
            return (
              <motion.button
                key={p.id}
                type="button"
                drag={!used}
                dragSnapToOrigin
                whileDrag={{ scale: 1.15, zIndex: 50, rotate: -6 }}
                onDrag={(_, info) => setOver(inZone(info.point.x - window.scrollX, info.point.y - window.scrollY))}
                onDragEnd={(_, info) => {
                  setOver(false);
                  if (inZone(info.point.x - window.scrollX, info.point.y - window.scrollY)) put(p.id);
                }}
                onClick={() => put(p.id)}
                className={`relative flex h-32 touch-none flex-col items-center justify-end rounded-2xl p-2 ${used ? "opacity-30" : "cursor-grab active:cursor-grabbing"}`}
                style={{ background: p.tint }}
              >
                <div className="pointer-events-none h-20">
                  <Vessel product={p} />
                </div>
                <span className="mt-1 text-[0.68rem] font-medium">{p.short}</span>
              </motion.button>
            );
          })}
        </div>
        <p className="mt-4 text-xs text-ink/50">Add 3 or more and the whole shelf is 15% off.</p>
      </div>

      <div
        ref={zone}
        className={`relative overflow-hidden rounded-[2rem] p-6 transition-colors md:p-8 ${
          over ? "bg-petal ring-2 ring-magenta" : "bg-[linear-gradient(180deg,#fff6f8,#fbe7c8)] ring-1 ring-ink/5"
        }`}
      >
        <p className="font-display text-3xl">My shelf</p>
        <div className="mt-4 flex h-36 items-end gap-3 border-b-[10px] border-[#c9a77c] px-2 shadow-[0_14px_20px_-14px_rgba(77,8,33,0.4)]">
          <AnimatePresence>
            {shelf.map((id) => (
              <motion.div
                key={id}
                layout
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ scale: 0.6, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                className="group relative flex h-32 items-end"
              >
                <Vessel product={productById[id]} />
                <button
                  type="button"
                  aria-label={`Remove ${productById[id].short}`}
                  onClick={() => setShelf((s) => s.filter((x) => x !== id))}
                  className="absolute -right-2 -top-2 grid size-6 place-items-center rounded-full bg-ink text-white transition lg:opacity-0 lg:group-hover:opacity-100"
                >
                  <X className="size-3" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
          {!shelf.length && <p className="mb-6 w-full text-center text-sm text-ink/40">Drop products here</p>}
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {[
            { slot: "am" as const, label: "Morning", icon: Sun },
            { slot: "pm" as const, label: "Night", icon: Moon },
            { slot: "weekly" as const, label: "Once a week", icon: Moon },
          ].map(({ slot, label, icon: Icon }) => (
            <div key={slot} className="rounded-2xl bg-white/70 p-4">
              <p className="flex items-center gap-1.5 text-xs font-medium text-ink/60">
                <Icon className="size-3.5 text-gold-deep" /> {label}
              </p>
              <ol className="mt-2 space-y-1 text-sm">
                {routine(slot).length ? (
                  routine(slot).map((id, i) => (
                    <li key={id}>
                      <span className="text-gold-deep">{i + 1}.</span> {productById[id].short}
                    </li>
                  ))
                ) : (
                  <li className="text-ink/35">—</li>
                )}
              </ol>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <p className="font-display text-3xl">
            {formatPrice(total)}
            {deal && <span className="ml-2 text-base text-ink/45 line-through">{formatPrice(full)}</span>}
            {deal && <span className="ml-2 align-middle text-xs font-medium text-magenta">15% off</span>}
          </p>
          <Button onClick={addAll} disabled={!shelf.length}>
            Add my shelf
          </Button>
        </div>
      </div>
    </div>
  );
}
