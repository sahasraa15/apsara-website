"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Lock, Sparkles } from "lucide-react";
import { formatPrice } from "@/lib/products";
import { cn } from "@/lib/utils";

export const tiers = [
  { name: "Petal", at: 0, perks: ["1 point for every $1", "A birthday mini every year", "Members-only sales"] },
  { name: "Lotus", at: 250, perks: ["Free shipping on everything", "Early access to new launches", "Free gift wrap"] },
  {
    name: "Gold Leaf",
    at: 600,
    perks: ["1.5 points for every $1", "A gold-wrapped Diwali gift", "Founder notes in every box", "First dibs on limited batches"],
  },
];

export const ways = [
  { label: "Take the skin quiz", pts: 25 },
  { label: "Leave a review", pts: 50 },
  { label: "Follow us on Instagram", pts: 15 },
  { label: "Refer a friend", pts: 100 },
];

export function RewardsCalculator() {
  const [spent, setSpent] = useState(180);
  const [extras, setExtras] = useState<string[]>(["Take the skin quiz"]);
  const points = spent + extras.reduce((n, l) => n + ways.find((w) => w.label === l)!.pts, 0);
  const current = [...tiers].reverse().find((t) => points >= t.at)!;
  const next = tiers.find((t) => t.at > points);
  const pct = Math.min(100, (points / tiers[2].at) * 100);

  return (
    <div className="rounded-[2rem] bg-white p-6 ring-1 ring-ink/5 md:p-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow text-gold-deep">You&apos;d be</p>
          <AnimatePresence mode="wait">
            <motion.p
              key={current.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-1 font-display text-5xl md:text-6xl"
            >
              <span className={current.name === "Gold Leaf" ? "gold-foil" : ""}>{current.name}</span>
            </motion.p>
          </AnimatePresence>
        </div>
        <p className="font-display text-3xl">
          {points} <span className="text-base text-ink/50">points</span>
        </p>
      </div>

      <div className="relative mt-8 h-3 rounded-full bg-petal">
        <motion.div
          className="gold-fill h-full rounded-full"
          animate={{ width: `${pct}%` }}
          transition={{ type: "spring", stiffness: 90, damping: 18 }}
        />
        {tiers.map((t) => (
          <span
            key={t.name}
            className={cn(
              "absolute top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full ring-4 ring-white",
              points >= t.at ? "bg-gold" : "bg-ink/15"
            )}
            style={{ left: `${(t.at / tiers[2].at) * 100}%` }}
          />
        ))}
      </div>
      <p className="mt-3 text-sm text-ink/60">
        {next ? (
          <>
            <span className="font-medium text-ink">{next.at - points} points</span> to {next.name}
          </>
        ) : (
          "You've reached the top. Welcome to Gold Leaf."
        )}
      </p>

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <div>
          <label className="text-sm font-medium">
            If you spent <span className="text-gold-deep">{formatPrice(spent)}</span> this year
          </label>
          <input
            type="range"
            min={0}
            max={700}
            step={10}
            value={spent}
            onChange={(e) => setSpent(Number(e.target.value))}
            className="mt-3 w-full accent-[#b8893a]"
          />
          <p className="mt-6 text-sm font-medium">…and you also</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {ways.map((w) => {
              const on = extras.includes(w.label);
              return (
                <button
                  key={w.label}
                  type="button"
                  onClick={() => setExtras((x) => (on ? x.filter((y) => y !== w.label) : [...x, w.label]))}
                  className={cn(
                    "rounded-full px-3.5 py-1.5 text-sm transition",
                    on ? "bg-forest text-white" : "bg-ink/5 hover:bg-ink/10"
                  )}
                >
                  {w.label} <span className={on ? "text-gold-light" : "text-gold-deep"}>+{w.pts}</span>
                </button>
              );
            })}
          </div>
        </div>
        <div className="grid gap-2">
          {tiers.map((t) => {
            const unlocked = points >= t.at;
            const gold = unlocked && t.name === "Gold Leaf";
            return (
              <div
                key={t.name}
                className={cn(
                  "rounded-2xl p-4 transition-colors duration-500",
                  unlocked ? (gold ? "bg-forest-deep text-white" : "bg-petal") : "bg-ink/[0.03] text-ink/40"
                )}
              >
                <p className="flex items-center justify-between font-medium">
                  <span>
                    {t.name} <span className={cn("text-xs font-normal", gold ? "text-white/50" : "opacity-60")}>· {t.at}+ pts</span>
                  </span>
                  {unlocked ? <Sparkles className="size-4 text-gold" /> : <Lock className="size-4" />}
                </p>
                <p className={cn("mt-1 text-sm", gold && "text-white/70")}>{t.perks.join(" · ")}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function JoinRewards() {
  const [done, setDone] = useState(false);
  const [email, setEmail] = useState("");

  function submit(e: FormEvent) {
    e.preventDefault();
    if (email.includes("@")) setDone(true);
  }

  return (
    <AnimatePresence mode="wait">
      {done ? (
        <motion.p
          key="done"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-3 text-white"
        >
          <Check className="size-4 text-gold-light" /> You&apos;re in. 50 welcome points are waiting for you at launch.
        </motion.p>
      ) : (
        <motion.form key="form" onSubmit={submit} className="flex max-w-md flex-col gap-2 sm:flex-row">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            aria-label="Email"
            className="flex-1 rounded-full bg-white px-5 py-3 text-sm text-ink outline-none focus:ring-2 focus:ring-gold"
          />
          <button type="submit" className="gold-fill rounded-full px-6 py-3 text-sm font-medium text-ink">
            Join free
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
