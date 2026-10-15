"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { productById, reviews, type Dosha, doshaInfo } from "@/lib/products";
import { Reveal } from "@/components/brand/Reveal";
import { Stars } from "@/components/shop/Stars";
import { cn } from "@/lib/utils";

export function Reviews() {
  const [skin, setSkin] = useState<Dosha | "all">("all");
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const list = reviews.filter((r) => skin === "all" || r.skin === skin);
  const go = (d: number) => {
    setDir(d);
    setI((x) => (x + d + list.length) % list.length);
  };
  const r = list[i % list.length];
  const p = productById[r.product];

  return (
    <section>
      <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-20 md:px-10 md:py-28 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <Reveal>
          <p className="eyebrow text-gold-deep">Reviews</p>
          <h2 className="mt-3 font-display text-[clamp(2.4rem,5vw,4rem)] leading-none">Don&apos;t take our word for it</h2>
          <p className="mt-4 text-ink/60">See what people with skin like yours are saying.</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {(["all", "vata", "pitta", "kapha"] as const).map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => {
                  setSkin(d);
                  setI(0);
                }}
                className={cn(
                  "rounded-full px-4 py-2 text-sm transition",
                  skin === d ? "bg-forest text-white" : "bg-white ring-1 ring-ink/10 hover:ring-ink/30"
                )}
              >
                {d === "all" ? "Everyone" : doshaInfo[d].name}
              </button>
            ))}
          </div>
          <div className="mt-8 flex items-center gap-3">
            <button
              type="button"
              aria-label="Previous review"
              onClick={() => go(-1)}
              className="grid size-11 place-items-center rounded-full bg-white ring-1 ring-ink/10 hover:ring-ink/30"
            >
              <ArrowLeft className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Next review"
              onClick={() => go(1)}
              className="grid size-11 place-items-center rounded-full bg-ink text-white"
            >
              <ArrowRight className="size-4" />
            </button>
            <span className="text-sm tabular-nums text-ink/50">
              {(i % list.length) + 1} / {list.length}
            </span>
          </div>
        </Reveal>

        <div className="relative h-[340px]">
          {[2, 1].map((n) => (
            <div
              key={n}
              className="absolute inset-0 rounded-[2rem] bg-white shadow-md ring-1 ring-ink/10"
              style={{ transform: `translateY(${n * 14}px) scale(${1 - n * 0.05})`, opacity: 1 - n * 0.3 }}
            />
          ))}
          <AnimatePresence initial={false} custom={dir}>
            <motion.figure
              key={`${skin}-${i}`}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.9}
              onDragEnd={(_, info) => {
                if (Math.abs(info.offset.x) > 100) go(info.offset.x < 0 ? 1 : -1);
              }}
              initial={{ x: dir * 300, opacity: 0, rotate: dir * 6 }}
              animate={{ x: 0, opacity: 1, rotate: 0 }}
              exit={{ x: dir * -300, opacity: 0, rotate: dir * -8 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              whileDrag={{ scale: 1.02 }}
              className="absolute inset-0 flex cursor-grab touch-pan-y flex-col justify-between rounded-[2rem] bg-white p-7 shadow-xl ring-1 ring-ink/5 active:cursor-grabbing md:p-9"
            >
              <div>
                <div className="flex items-center justify-between">
                  <Stars rating={5} />
                  <span className="rounded-full bg-petal px-3 py-1 text-xs text-magenta">{doshaInfo[r.skin].name} skin</span>
                </div>
                <blockquote className="mt-5 font-display text-2xl leading-snug md:text-3xl">
                  <span className="gold-foil">“</span>
                  {r.quote}
                  <span className="gold-foil">”</span>
                </blockquote>
              </div>
              <figcaption className="flex items-center justify-between gap-3 text-sm">
                <span>
                  <span className="font-medium">{r.name}</span> <span className="text-ink/50">· {r.place}</span>
                </span>
                <Link
                  href={`/shop/${p.id}`}
                  className="flex shrink-0 items-center gap-2 rounded-full py-1 pl-1.5 pr-3 hover:brightness-95"
                  style={{ background: p.tint }}
                >
                  <span className="size-4 rounded-full" style={{ background: p.fill }} />
                  {p.short}
                </Link>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
