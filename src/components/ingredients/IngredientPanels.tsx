"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { ingredients, productById } from "@/lib/products";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

export function IngredientPanels() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const sync = () => {
      const i = ingredients.findIndex((ing) => `#${ing.id}` === window.location.hash);
      if (i < 0) return;
      setActive(i);
      document.getElementById("botanicals")?.scrollIntoView({ behavior: "smooth", block: "center" });
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  return (
    <div id="botanicals" className="flex flex-col gap-2 md:gap-3 lg:h-[560px] lg:flex-row">
      {ingredients.map((ing, i) => {
        const on = i === active;
        return (
          <motion.article
            id={ing.id}
            key={ing.id}
            layout
            transition={{ layout: { duration: 0.6, ease } }}
            onMouseEnter={() => setActive(i)}
            className={cn(
              "relative scroll-mt-32 overflow-hidden rounded-[1.75rem] text-white",
              on ? "lg:flex-[5]" : "h-[72px] lg:h-auto lg:flex-[1]"
            )}
            style={{
              background: `radial-gradient(120% 90% at 20% 0%, rgba(255,255,255,0.35), transparent 55%), linear-gradient(160deg, ${ing.color}, color-mix(in srgb, ${ing.color} 55%, #0a1c10))`,
            }}
          >
            {!on && (
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-expanded={false}
                aria-label={`Show ${ing.name}`}
                className="absolute inset-0 flex items-center justify-between px-6 text-left lg:flex-col lg:items-center lg:justify-end lg:px-0 lg:pb-8"
              >
                <span className="font-display text-2xl lg:hidden">{ing.name}</span>
                <span className="text-sm text-white/75 lg:hidden">{ing.role}</span>
                <span className="hidden font-display text-3xl [writing-mode:vertical-rl] lg:block lg:rotate-180">
                  {ing.name}
                </span>
                <span className="mt-4 hidden text-xs font-medium text-white/70 lg:block">0{i + 1}</span>
              </button>
            )}

            <AnimatePresence>
              {on && (
                <motion.div
                  key="open"
                  className="flex flex-col justify-between gap-8 p-5 md:p-8 lg:absolute lg:inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 0.25, duration: 0.4 } }}
                  exit={{ opacity: 0, transition: { duration: 0.15 } }}
                >
                  <div className="flex items-start justify-between">
                    <span className="font-display text-6xl leading-none text-white/90 md:text-8xl">0{i + 1}</span>
                    <motion.span
                      className="size-24 rounded-full shadow-[0_30px_60px_-20px_rgba(0,0,0,0.45)] md:size-36"
                      style={{ background: `radial-gradient(circle at 32% 28%, #ffffff, ${ing.color} 62%)` }}
                      animate={{ y: [0, -10, 0], rotate: [0, 8, 0] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </div>

                  <motion.div
                    className="max-w-xl rounded-3xl bg-white/90 p-5 text-ink backdrop-blur md:p-7"
                    initial={{ y: 24 }}
                    animate={{ y: 0, transition: { delay: 0.3, duration: 0.5, ease } }}
                  >
                    <p className="eyebrow text-gold-deep">{ing.role}</p>
                    <h3 className="mt-2 font-display text-4xl leading-none md:text-5xl">{ing.name}</h3>
                    <p className="mt-3 text-ink/70 md:text-lg">{ing.story}</p>
                    <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                      <span className="flex items-center gap-1.5 text-sm text-ink/55">
                        <MapPin className="size-4" /> {ing.origin}
                      </span>
                      <span className="flex flex-wrap gap-2">
                        {ing.products.map((id) => (
                          <Link
                            key={id}
                            href={`/shop/${id}`}
                            className="group inline-flex items-center gap-1.5 rounded-full bg-forest px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-forest-deep"
                          >
                            {productById[id].short}
                            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                          </Link>
                        ))}
                      </span>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.article>
        );
      })}
    </div>
  );
}
