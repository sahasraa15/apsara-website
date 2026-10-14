"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { products } from "@/lib/products";
import { Reveal } from "@/components/brand/Reveal";
import { cn } from "@/lib/utils";

const filters = ["All", "Face", "Ritual", "Cleanse", "Mask", "Makeup"] as const;

export function Collection() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [added, setAdded] = useState<string | null>(null);

  const visible =
    filter === "All"
      ? products
      : products.filter((p) => p.category === filter);

  return (
    <section id="collection" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <p className="text-[0.65rem] uppercase tracking-[0.35em] text-magenta">
            First edition
          </p>
          <h2 className="mt-4 font-display text-4xl text-midnight md:text-5xl lg:text-6xl">
            The collection
          </h2>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Six formulas that move between skin and color—crafted for dosha-aware
            routines without the costume drama.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={cn(
                "border px-4 py-2 text-[0.65rem] uppercase tracking-[0.22em] transition-all duration-300",
                filter === f
                  ? "border-forest bg-forest text-silk"
                  : "border-gold/35 text-forest hover:border-gold hover:bg-gold/10"
              )}
            >
              {f}
            </button>
          ))}
        </Reveal>

        <motion.div
          layout
          className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((product, i) => (
              <motion.article
                layout
                key={product.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.45, delay: i * 0.04 }}
                className="group"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-midnight">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 brocade-sheen opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="text-[0.6rem] uppercase tracking-[0.28em] text-gold">
                      {product.dosha}
                    </p>
                    <h3 className="mt-1 font-display text-2xl text-sand">
                      {product.name}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-sand/75">
                      {product.blurb}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="font-display text-lg text-gold">
                        {product.price}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setAdded(product.id);
                          setTimeout(() => setAdded(null), 1600);
                        }}
                        className="border border-gold/50 px-3 py-1.5 text-[0.6rem] uppercase tracking-[0.2em] text-sand transition-colors hover:bg-gold hover:text-midnight"
                      >
                        {added === product.id ? "Added" : "Add"}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
