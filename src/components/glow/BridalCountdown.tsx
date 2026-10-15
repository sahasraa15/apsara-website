"use client";

import { useState, type MouseEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarHeart } from "lucide-react";
import { formatPrice, productById } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/brand/Button";

const plan = [
  { week: 8, title: "Start the base", copy: "Neem cleanser and Lotus serum, morning and night. Give your skin time to settle." },
  { week: 6, title: "Add the glow", copy: "Kumkumadi oil three nights a week. Let it build slowly." },
  { week: 4, title: "Mask weekly", copy: "Turmeric mask every Sunday. Nothing new from here on, no surprises." },
  { week: 1, title: "Haldi week", copy: "One last mask four days out, then only gentle cleansing and the serum." },
  { week: 0, title: "The night before", copy: "Kumkumadi oil, a glass of water, and sleep. You're ready." },
];

const bundle = ["neem-cleanser", "lotus-serum", "kumkumadi-oil", "haldi-mask"];
const DISCOUNT = 0.2;

export function BridalCountdownDemo() {
  const [days, setDays] = useState<number | null>(null);
  const { add, setOpen } = useCart();
  const weeks = days === null ? null : Math.max(0, Math.floor(days / 7));
  const full = bundle.reduce((n, id) => n + productById[id].price, 0);
  const price = Math.round(full * (1 - DISCOUNT));

  function pick(dateStr: string) {
    if (!dateStr) return setDays(null);
    const ms = new Date(`${dateStr}T12:00:00`).getTime() - Date.now();
    setDays(Math.max(0, Math.ceil(ms / 86_400_000)));
  }

  function addAll(e: MouseEvent<HTMLElement>) {
    bundle.forEach((id, i) =>
      add(id, {
        bundle: "Haldi Glow Edit",
        price: Math.round(productById[id].price * (1 - DISCOUNT) * 100) / 100,
        from: i === 0 ? e.currentTarget : null,
      })
    );
    setTimeout(() => setOpen(true), 900);
  }

  return (
    <div className="overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,#fbecc4,#fae3ea_60%)] p-6 md:p-10">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <CalendarHeart className="size-8 text-magenta" />
          <h3 className="mt-4 font-display text-4xl leading-none md:text-5xl">When&apos;s the big day?</h3>
          <p className="mt-3 max-w-sm text-ink/70">
            Pop in your date (or your sister&apos;s) and we&apos;ll build a week-by-week glow plan around it.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <input
              type="date"
              onChange={(e) => pick(e.target.value)}
              className="rounded-full bg-white px-4 py-2.5 text-sm ring-1 ring-ink/10 outline-none focus:ring-gold"
            />
            {[42, 90].map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDays(d)}
                className="rounded-full bg-white/70 px-3.5 py-2 text-sm hover:bg-white"
              >
                {d === 42 ? "6 weeks away" : "3 months away"}
              </button>
            ))}
          </div>

          <AnimatePresence>
            {days !== null && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-8 rounded-3xl bg-forest-deep p-6 text-white"
              >
                <p className="font-display text-6xl">
                  <span className="gold-foil">{days}</span>
                  <span className="ml-2 text-2xl text-white/70">days to glow</span>
                </p>
                <p className="mt-4 eyebrow text-gold-light">The Haldi Glow Edit</p>
                <p className="mt-1 text-sm text-white/70">All four essentials, 20% off for brides and their people.</p>
                <div className="mt-4 flex flex-wrap items-center gap-4">
                  <Button variant="gold" onClick={addAll}>
                    Add the edit · {formatPrice(price)}
                  </Button>
                  <span className="text-sm text-white/50 line-through">{formatPrice(full)}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <ol className="relative space-y-3 before:absolute before:bottom-4 before:left-[19px] before:top-4 before:w-px before:bg-gold/50">
          {plan.map((p) => {
            const now = weeks !== null && plan.find((x) => weeks >= x.week) === p;
            const past = weeks !== null && weeks < p.week;
            return (
              <motion.li
                key={p.week}
                layout
                className={`relative flex gap-4 rounded-3xl p-4 transition-colors ${now ? "bg-white shadow-lg" : ""} ${
                  past ? "opacity-40" : ""
                }`}
              >
                <span
                  className={`relative z-10 grid size-10 shrink-0 place-items-center rounded-full text-xs font-medium ${
                    now ? "gold-fill text-ink" : "bg-white text-ink/70 ring-1 ring-gold/40"
                  }`}
                >
                  {p.week === 0 ? "♥" : `${p.week}w`}
                </span>
                <div>
                  <p className="font-display text-xl">
                    {p.title}
                    {now && <span className="ml-2 align-middle text-xs font-medium text-magenta">You are here</span>}
                  </p>
                  <p className="text-sm text-ink/65">{p.copy}</p>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
