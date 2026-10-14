"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { doshaInfo, doshaRituals, formatPrice, productById, type Dosha } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { Vessel, vesselHeight } from "@/components/brand/Vessel";
import { Button } from "@/components/brand/Button";
import { DoshaGlyph } from "@/components/shop/DoshaGlyph";

const questions: { prompt: string; options: { label: string; dosha: Dosha }[] }[] = [
  {
    prompt: "By evening, your skin feels…",
    options: [
      { label: "Tight and a little dry", dosha: "vata" },
      { label: "Warm, flushed or irritated", dosha: "pitta" },
      { label: "Shiny, especially in the T-zone", dosha: "kapha" },
    ],
  },
  {
    prompt: "Your biggest skin frustration is…",
    options: [
      { label: "Flaky patches and fine lines", dosha: "vata" },
      { label: "Redness and sensitivity", dosha: "pitta" },
      { label: "Clogged pores and breakouts", dosha: "kapha" },
    ],
  },
  {
    prompt: "Your ideal Sunday is…",
    options: [
      { label: "A long bath and a nap", dosha: "vata" },
      { label: "A cool swim and an iced matcha", dosha: "pitta" },
      { label: "A brisk morning hike", dosha: "kapha" },
    ],
  },
];

export function Quiz() {
  const { add } = useCart();
  const [votes, setVotes] = useState<Dosha[]>([]);
  const [added, setAdded] = useState(false);
  const step = votes.length;
  const done = step === questions.length;

  const tally = votes.reduce<Record<Dosha, number>>(
    (acc, v) => ({ ...acc, [v]: acc[v] + 1 }),
    { vata: 0, pitta: 0, kapha: 0 }
  );
  const winner = (Object.keys(tally) as Dosha[]).sort((a, b) => tally[b] - tally[a])[0];
  const ritual = doshaRituals[winner];
  const items = ritual.products.map((id) => productById[id]);
  const full = items.reduce((n, p) => n + p.price, 0);
  const bundle = Math.round(full * (1 - ritual.discount));

  const reset = () => {
    setVotes([]);
    setAdded(false);
  };

  return (
    <div className="mx-auto max-w-[1100px]">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {questions.map((_, i) => (
            <motion.span
              key={i}
              className="h-1.5 w-12 rounded-full md:w-16"
              animate={{ backgroundColor: i < step ? "#0c5029" : "rgba(10,28,16,0.12)" }}
            />
          ))}
        </div>
        {step > 0 && !done && (
          <button
            type="button"
            onClick={() => setVotes((v) => v.slice(0, -1))}
            className="inline-flex items-center gap-1.5 text-sm text-ink/60 hover:text-ink"
          >
            <ArrowLeft className="size-4" /> Back
          </button>
        )}
      </div>

      <div className="relative mt-10 min-h-[420px]">
        <AnimatePresence mode="wait">
          {!done ? (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-sm text-ink/55">
                Question {step + 1} of {questions.length}
              </p>
              <p className="mt-2 font-display text-[clamp(2.2rem,5vw,3.6rem)] leading-tight">{questions[step].prompt}</p>
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {questions[step].options.map((opt, i) => (
                  <motion.button
                    key={opt.label}
                    type="button"
                    onClick={() => setVotes((v) => [...v, opt.dosha])}
                    data-cursor="Choose"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 * i }}
                    whileHover={{ y: -6 }}
                    className="group flex flex-col items-start rounded-3xl bg-white p-6 text-left shadow-[0_10px_40px_rgba(77,8,33,0.06)] ring-1 ring-ink/5 transition-shadow hover:shadow-[0_20px_50px_rgba(77,8,33,0.12)] hover:ring-magenta/40"
                  >
                    <span className="flex size-12 items-center justify-center rounded-full bg-petal text-magenta transition-colors group-hover:bg-magenta group-hover:text-white">
                      <DoshaGlyph dosha={opt.dosha} className="size-6" />
                    </span>
                    <span className="mt-8 text-lg font-medium leading-snug">{opt.label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="grid items-center gap-10 overflow-hidden rounded-[2rem] bg-white p-6 shadow-[0_20px_60px_rgba(77,8,33,0.08)] md:grid-cols-[1fr_1.1fr] md:p-12"
            >
              <div className="relative flex h-72 items-end justify-center gap-3 rounded-3xl bg-[radial-gradient(circle_at_50%_40%,#ffffff,#fbd7e3)] px-6 pb-8 md:h-96">
                {items.map((p, i) => (
                  <motion.div
                    key={p.id}
                    className="relative flex items-end"
                    style={{ height: `calc(${vesselHeight[p.vessel]} * 0.8)` }}
                    initial={{ y: 60, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.15 + i * 0.12, type: "spring", stiffness: 90, damping: 14 }}
                  >
                    <Link href={`/shop/${p.id}`} className="flex h-full items-end" aria-label={p.name}>
                      <Vessel product={p} className="drop-shadow-[0_20px_20px_rgba(77,8,33,0.2)]" />
                    </Link>
                  </motion.div>
                ))}
              </div>
              <div>
                <p className="inline-flex items-center gap-2 rounded-full bg-petal px-3 py-1 text-xs font-medium text-magenta">
                  <DoshaGlyph dosha={winner} className="size-4" />
                  Your skin type: {doshaInfo[winner].name} · {doshaInfo[winner].plain}
                </p>
                <h2 className="mt-4 font-display text-4xl md:text-5xl">{ritual.title}</h2>
                <p className="mt-3 text-ink/70">{ritual.copy}</p>
                <ul className="mt-6 divide-y divide-ink/10 border-y border-ink/10">
                  {items.map((p, i) => (
                    <li key={p.id} className="flex items-center justify-between py-3 text-sm">
                      <span>
                        <span className="mr-3 inline-block w-14 text-xs font-medium uppercase tracking-wider text-ink/45">
                          {["AM", "PM", "Weekly"][i]}
                        </span>
                        <Link href={`/shop/${p.id}`} className="hover:underline">
                          {p.name}
                        </Link>
                      </span>
                      <span className="text-ink/55">{formatPrice(p.price)}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex items-baseline gap-3">
                  <span className="font-display text-4xl">{formatPrice(bundle)}</span>
                  <span className="text-ink/40 line-through">{formatPrice(full)}</span>
                  <span className="rounded-full bg-magenta px-2.5 py-0.5 text-xs text-white">
                    Save {formatPrice(full - bundle)}
                  </span>
                </div>
                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <Button
                    size="lg"
                    onClick={(e) => {
                      const from = e.currentTarget as HTMLElement;
                      items.forEach((p, i) =>
                        setTimeout(
                          () =>
                            add(p.id, {
                              bundle: ritual.title.replace("The ", ""),
                              price: Math.round(p.price * (1 - ritual.discount) * 100) / 100,
                              from,
                            }),
                          i * 180
                        )
                      );
                      setAdded(true);
                    }}
                  >
                    {added ? "Added ✓" : "Add the full routine"}
                  </Button>
                  <button
                    type="button"
                    onClick={reset}
                    className="inline-flex items-center gap-2 text-sm text-ink/60 hover:text-ink"
                  >
                    <RotateCcw className="size-3.5" /> Retake
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
