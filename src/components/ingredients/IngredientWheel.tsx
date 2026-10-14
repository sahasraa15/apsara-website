"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin, Plus } from "lucide-react";
import { ingredients, productById, formatPrice } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { Vessel } from "@/components/brand/Vessel";
import { cn } from "@/lib/utils";

export function IngredientWheel() {
  const [active, setActive] = useState(0);
  const { add } = useCart();
  const ing = ingredients[active];
  const n = ingredients.length;

  return (
    <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
      <div className="relative mx-auto aspect-square w-full max-w-[540px]">
        <div className="absolute inset-[6%] rounded-full border border-ink/10" />
        <div className="absolute inset-[20%] rounded-full border border-dashed border-ink/10" />

        <div className="absolute inset-[26%] overflow-hidden rounded-full shadow-[0_30px_60px_rgba(77,8,33,0.15)]">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={ing.id}
              className="absolute inset-0 flex flex-col items-center justify-center text-center"
              style={{ background: `radial-gradient(circle at 40% 30%, #ffffff, ${ing.color} 90%)` }}
              initial={{ opacity: 0, scale: 0.85, rotate: -15 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 1.08 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="px-4 font-display text-[clamp(1.8rem,4.5vw,3rem)] leading-none text-ink">{ing.name}</span>
              <span className="mt-2 text-sm text-ink/70">{ing.role}</span>
            </motion.div>
          </AnimatePresence>
        </div>

        {ingredients.map((x, i) => {
          const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
          const left = 50 + Math.cos(angle) * 43;
          const top = 50 + Math.sin(angle) * 43;
          return (
            <button
              key={x.id}
              type="button"
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              aria-pressed={active === i}
              aria-label={x.name}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${left}%`, top: `${top}%` }}
            >
              <motion.span
                className={cn(
                  "flex size-14 items-center justify-center rounded-full ring-2 ring-offset-2 ring-offset-blush md:size-[72px]",
                  active === i ? "ring-ink" : "ring-transparent"
                )}
                style={{ background: `radial-gradient(circle at 35% 30%, #ffffff, ${x.color} 80%)` }}
                animate={{ scale: active === i ? 1.12 : 1 }}
                whileHover={{ scale: 1.18 }}
              >
                <span className="px-1 text-[0.55rem] font-medium leading-tight text-ink md:text-[0.62rem]">{x.name}</span>
              </motion.span>
            </button>
          );
        })}
      </div>

      <div className="min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={ing.id}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.35 }}
          >
            <p className="eyebrow text-magenta">{ing.role}</p>
            <h2 className="mt-3 font-display text-5xl md:text-6xl">{ing.name}</h2>
            <p className="mt-3 flex items-center gap-2 text-sm text-ink/55">
              <MapPin className="size-3.5" /> Sourced from {ing.origin}
            </p>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ink/75">{ing.story}</p>

            <p className="mt-10 text-sm font-medium text-ink/55">Find it in</p>
            <div className="mt-3 flex flex-wrap gap-3">
              {ing.products.map((id) => {
                const p = productById[id];
                return (
                  <div key={id} className="flex items-center gap-4 rounded-2xl bg-white py-3 pl-3 pr-4 ring-1 ring-ink/5">
                    <Link href={`/shop/${p.id}`} className="h-20 w-14 rounded-xl p-1" style={{ background: p.tint }}>
                      <Vessel product={p} />
                    </Link>
                    <div>
                      <Link href={`/shop/${p.id}`} className="font-medium hover:underline">
                        {p.name}
                      </Link>
                      <p className="text-sm text-ink/60">{formatPrice(p.price)}</p>
                    </div>
                    <button
                      type="button"
                      aria-label={`Add ${p.name} to bag`}
                      data-cursor="Add"
                      onClick={(e) => add(p.id, { from: e.currentTarget })}
                      className="ml-2 rounded-full bg-ink p-2.5 text-white transition hover:bg-forest"
                    >
                      <Plus className="size-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
