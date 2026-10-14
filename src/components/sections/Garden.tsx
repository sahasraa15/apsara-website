"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, MapPin } from "lucide-react";
import { ingredients, productById, formatPrice } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { Vessel } from "@/components/brand/Vessel";
import { Reveal } from "@/components/brand/Reveal";
import { cn } from "@/lib/utils";

export function Garden() {
  const [active, setActive] = useState(0);
  const { add } = useCart();
  const ing = ingredients[active];
  const n = ingredients.length;

  return (
    <section id="garden" className="relative overflow-hidden bg-midnight py-24 md:py-36">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_25%_50%,#0c502966,transparent_70%)]" />

      <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-pearl/70">What&apos;s inside</p>
          <h2 className="mt-5 font-display text-[clamp(2.4rem,5.5vw,5rem)] leading-[0.95] text-pearl">
            Real ingredients.
            <br />
            <span className="gold-text italic">Traceable to the farm.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal className="relative mx-auto aspect-square w-full max-w-[560px]">
            <div className="absolute inset-[6%] rounded-full border border-pearl/10" />
            <div className="absolute inset-[20%] rounded-full border border-dashed border-pearl/15" />

            <div className="absolute inset-[26%] flex items-center justify-center overflow-hidden rounded-full">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={ing.id}
                  className="absolute inset-0 flex flex-col items-center justify-center text-center"
                  style={{ background: `radial-gradient(circle at 40% 35%, ${ing.color}, ${ing.color}55 45%, #0a1c10 80%)` }}
                  initial={{ opacity: 0, scale: 0.8, rotate: -20 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="px-4 font-display text-[clamp(1.8rem,4.5vw,3rem)] leading-none text-pearl [text-shadow:0_4px_30px_rgba(0,0,0,0.5)]">
                    {ing.name}
                  </span>
                  <span className="mt-3 text-sm text-pearl/85">{ing.role}</span>
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
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${left}%`, top: `${top}%` }}
                >
                  <motion.span
                    className={cn(
                      "flex size-14 items-center justify-center rounded-full border text-center md:size-20",
                      active === i ? "border-pearl" : "border-pearl/20"
                    )}
                    style={{ background: `radial-gradient(circle at 35% 30%, ${x.color}, #0a1c10 85%)` }}
                    animate={{ scale: active === i ? 1.15 : 1, boxShadow: active === i ? `0 0 40px ${x.color}88` : "0 0 0px transparent" }}
                    whileHover={{ scale: 1.2 }}
                  >
                    <span className="px-1 text-[0.55rem] font-medium leading-tight text-pearl [text-shadow:0_1px_6px_rgba(0,0,0,0.9)] md:text-[0.55rem]">
                      {x.name}
                    </span>
                  </motion.span>
                </button>
              );
            })}
          </Reveal>

          <div className="min-h-[420px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={ing.id}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                <p className="eyebrow" style={{ color: ing.color }}>
                  {ing.role}
                </p>
                <h3 className="mt-3 font-display text-5xl text-pearl md:text-6xl">{ing.name}</h3>
                <p className="mt-3 flex items-center gap-2 text-sm text-pearl/55">
                  <MapPin className="size-3.5" strokeWidth={1.5} /> {ing.origin}
                </p>
                <p className="mt-6 max-w-md text-lg leading-relaxed text-pearl/75">{ing.story}</p>

                <p className="eyebrow mt-10 text-pearl/50">Find it in</p>
                <div className="mt-4 flex flex-wrap gap-4">
                  {ing.products.map((id) => {
                    const p = productById[id];
                    return (
                      <div
                        key={id}
                        className="flex items-center gap-4 rounded-2xl border border-pearl/15 py-3 pl-3 pr-4"
                        style={{ background: `linear-gradient(120deg, ${p.room}, transparent)` }}
                      >
                        <div className="h-20 w-14">
                          <Vessel product={p} />
                        </div>
                        <div>
                          <p className="font-display text-xl text-pearl">{p.name}</p>
                          <p className="text-sm text-pearl/70">{formatPrice(p.price)}</p>
                        </div>
                        <button
                          type="button"
                          aria-label={`Add ${p.name} to bag`}
                          data-cursor="Add"
                          onClick={(e) => add(p.id, { from: e.currentTarget })}
                          className="ml-2 rounded-full bg-pearl p-2.5 text-midnight transition hover:bg-gold-light"
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
      </div>
    </section>
  );
}
