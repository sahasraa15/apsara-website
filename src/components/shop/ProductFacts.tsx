"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Leaf } from "lucide-react";
import { formatPrice, type Product } from "@/lib/products";
import { feel, fullIngredients, lasts } from "@/lib/productDetails";
import { cn } from "@/lib/utils";

const tabs = ["How it feels", "Ingredients", "How long it lasts"] as const;
type Tab = (typeof tabs)[number];

function Scale({ label, left, right, value, note }: { label: string; left: string; right: string; value: number; note?: string }) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <p className="text-sm font-medium">{label}</p>
        {note && <p className="text-sm text-gold-deep">{note}</p>}
      </div>
      <div className="relative mt-3 h-1.5 rounded-full bg-ink/10">
        <motion.span
          className="gold-fill absolute top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-[0_4px_14px_rgba(184,137,58,0.6)] ring-4 ring-white"
          initial={{ left: "0%" }}
          animate={{ left: `${value}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
        />
      </div>
      <div className="mt-2 flex justify-between text-xs text-ink/50">
        <span>{left}</span>
        <span>{right}</span>
      </div>
    </div>
  );
}

function Feel({ product }: { product: Product }) {
  const f = feel[product.id];
  return (
    <div className="space-y-6">
      <Scale label="Texture" left="Water-light" right="Rich" value={f.texture} />
      <Scale label="Finish" left="Dewy" right="Matte" value={f.finish} />
      <Scale label="Scent" left="Barely there" right="Noticeable" value={f.scent} note={f.scentNote} />
      <p className="text-sm text-ink/60">
        Sinks in: <span className="font-medium text-ink">{f.absorbs}</span>
      </p>
    </div>
  );
}

function Ingredients({ product }: { product: Product }) {
  const [heroOnly, setHeroOnly] = useState(false);
  const list = fullIngredients[product.id].filter((i) => !heroOnly || i.hero);
  return (
    <div>
      <label className="flex cursor-pointer items-center gap-2 text-sm text-ink/70">
        <input
          type="checkbox"
          checked={heroOnly}
          onChange={(e) => setHeroOnly(e.target.checked)}
          className="accent-[#0c5029]"
        />
        Only the Ayurvedic heroes
      </label>
      <ol className="mt-3 divide-y divide-ink/5">
        <AnimatePresence initial={false}>
          {list.map((ing) => (
            <motion.li
              key={ing.inci}
              layout
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="py-3">
                <p className="flex flex-wrap items-center gap-2 text-sm font-medium">
                  {ing.inci}
                  {ing.hero && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-gold/15 px-2 py-0.5 text-[0.68rem] text-gold-deep">
                      <Leaf className="size-3" /> Ayurvedic
                    </span>
                  )}
                </p>
                <p className="mt-0.5 text-sm text-ink/60">{ing.plain}</p>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ol>
      <p className="mt-2 text-xs text-ink/45">Listed from most to least, the way the label has to be.</p>
    </div>
  );
}

function Lasts({ product }: { product: Product }) {
  const l = lasts[product.id];
  const perDay = Math.round((product.price / (l.weeks * 7)) * 100) / 100;
  return (
    <div>
      <p className="font-display text-6xl">
        ~{l.weeks}
        <span className="ml-2 text-2xl text-ink/60">weeks</span>
      </p>
      <p className="mt-2 text-sm text-ink/60">
        Using {l.dose}. That&apos;s about <span className="font-medium text-ink">{formatPrice(perDay)} a day</span>.
      </p>
      <div className="mt-6 flex gap-1">
        {Array.from({ length: 12 }, (_, i) => (
          <motion.span
            key={i}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: i * 0.03 }}
            className={cn("h-8 flex-1 origin-bottom rounded-full", i < l.weeks ? "bg-forest" : "bg-ink/10")}
          />
        ))}
      </div>
      <p className="mt-2 text-xs text-ink/45">Each bar is one week</p>
    </div>
  );
}

export function ProductFacts({ product }: { product: Product }) {
  const [tab, setTab] = useState<Tab>("How it feels");
  return (
    <div className="rounded-[2rem] bg-white p-5 ring-1 ring-ink/5 md:p-7">
      <div className="flex gap-1 rounded-full bg-petal p-1">
        {tabs.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={cn(
              "relative flex-1 rounded-full px-2 py-2 text-xs transition-colors sm:text-sm",
              tab === t ? "text-white" : "text-ink/65 hover:text-ink"
            )}
          >
            {tab === t && <motion.span layoutId="facts-tab" className="absolute inset-0 rounded-full bg-forest" />}
            <span className="relative">{t}</span>
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="mt-6"
        >
          {tab === "How it feels" && <Feel product={product} />}
          {tab === "Ingredients" && <Ingredients product={product} />}
          {tab === "How long it lasts" && <Lasts product={product} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
