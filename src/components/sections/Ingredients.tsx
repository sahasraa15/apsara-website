"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ingredients } from "@/lib/products";
import { Reveal } from "@/components/brand/Reveal";
import { cn } from "@/lib/utils";

export function Ingredients() {
  const [active, setActive] = useState(0);
  const current = ingredients[active];

  return (
    <section id="ingredients" className="py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:grid-cols-2 md:gap-16 md:px-8">
        <Reveal>
          <p className="text-[0.65rem] uppercase tracking-[0.35em] text-magenta">
            Botanicals
          </p>
          <h2 className="mt-4 font-display text-4xl text-midnight md:text-5xl">
            Ingredients with lineage
          </h2>
          <p className="mt-4 text-muted-foreground">
            We borrow from Ayurvedic tradition and edit for today—fewer
            formulas, higher clarity, no ornamental excess.
          </p>

          <ul className="mt-10 space-y-2">
            {ingredients.map((ing, i) => (
              <li key={ing.name}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  className={cn(
                    "flex w-full items-baseline justify-between border-b px-1 py-4 text-left transition-colors",
                    active === i
                      ? "border-magenta text-midnight"
                      : "border-gold/25 text-muted-foreground hover:border-gold/60 hover:text-midnight"
                  )}
                >
                  <span className="font-display text-xl md:text-2xl">
                    {ing.name}
                  </span>
                  <span className="text-[0.65rem] uppercase tracking-[0.22em] text-gold">
                    {ing.role}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <AnimatePresence mode="wait">
            <motion.p
              key={current.name}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mt-6 text-sm leading-relaxed text-forest"
            >
              {current.detail}
            </motion.p>
          </AnimatePresence>
        </Reveal>

        <Reveal delay={0.15} className="relative">
          <div className="relative mx-auto aspect-[4/5] max-w-md">
            <div className="absolute -inset-3 border border-gold/30" />
            <div className="arch-frame-tall relative h-full w-full overflow-hidden bg-forest">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.name}
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.55 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={
                      active === 0
                        ? "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1000&q=80"
                        : current.image
                    }
                    alt={current.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-midnight/50 to-transparent" />
            </div>
            <p className="mt-4 text-center font-display text-lg tracking-[0.2em] text-gold uppercase">
              {current.name}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
