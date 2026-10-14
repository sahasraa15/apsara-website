"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { doshaRituals, formatPrice, productById, type Dosha } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { Vessel, vesselHeight } from "@/components/brand/Vessel";
import { GoldButton } from "@/components/brand/GoldButton";
import { Reveal } from "@/components/brand/Reveal";

const questions: { prompt: string; options: { label: string; dosha: Dosha }[] }[] = [
  {
    prompt: "By evening, your skin feels…",
    options: [
      { label: "Tight, a little papery", dosha: "vata" },
      { label: "Warm, flushed, reactive", dosha: "pitta" },
      { label: "Shiny in the T-zone", dosha: "kapha" },
    ],
  },
  {
    prompt: "Your ideal Sunday is…",
    options: [
      { label: "Oil massage, soft music, a long nap", dosha: "vata" },
      { label: "A cool swim and a mango lassi", dosha: "pitta" },
      { label: "A brisk walk in the monsoon rain", dosha: "kapha" },
    ],
  },
  {
    prompt: "At a wedding, you're the one…",
    options: [
      { label: "Glowing quietly by the diyas", dosha: "vata" },
      { label: "Running the dance floor", dosha: "pitta" },
      { label: "With the boldest kohl in the room", dosha: "kapha" },
    ],
  },
];

const glyphs: Record<Dosha, string> = {
  vata: "M4 14 C10 8 18 8 22 12 C26 16 22 22 17 20 M4 20 C12 18 26 26 30 18",
  pitta: "M16 30 C8 26 8 18 12 12 C13 16 16 17 16 17 C15 11 18 6 22 3 C22 10 28 14 26 22 C25 27 21 30 16 30 Z",
  kapha: "M16 3 C16 3 6 14 6 20 C6 26 11 30 16 30 C21 30 26 26 26 20 C26 14 16 3 16 3 Z",
};

export function Consult() {
  const { add } = useCart();
  const [step, setStep] = useState(0);
  const [votes, setVotes] = useState<Dosha[]>([]);
  const [added, setAdded] = useState(false);
  const done = votes.length === questions.length;

  const tally = votes.reduce<Record<Dosha, number>>(
    (acc, v) => ({ ...acc, [v]: acc[v] + 1 }),
    { vata: 0, pitta: 0, kapha: 0 }
  );
  const winner = (Object.keys(tally) as Dosha[]).sort((a, b) => tally[b] - tally[a])[0];
  const ritual = doshaRituals[winner];
  const items = ritual.products.map((id) => productById[id]);
  const full = items.reduce((n, p) => n + p.price, 0);
  const bundle = Math.round(full * (1 - ritual.discount));

  const choose = (d: Dosha) => {
    setVotes((v) => [...v, d]);
    setStep((s) => s + 1);
  };

  const reset = () => {
    setVotes([]);
    setStep(0);
    setAdded(false);
  };

  return (
    <section id="consult" className="relative overflow-hidden bg-forest-deep py-24 md:py-36">
      <div className="jali pointer-events-none absolute inset-0 opacity-[0.05]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_80%_20%,#0c502999,transparent_70%)]" />

      <div className="relative mx-auto max-w-[1200px] px-5 md:px-10">
        <Reveal className="text-center">
          <p className="eyebrow text-gold-light/80">A consultation, not a quiz</p>
          <h2 className="mx-auto mt-5 max-w-3xl font-display text-[clamp(2.4rem,5.5vw,5rem)] leading-[0.95] text-pearl">
            Three questions.
            <br />
            <span className="gold-text italic">One ritual, made for you.</span>
          </h2>
        </Reveal>

        <div className="mt-10 flex justify-center gap-2">
          {questions.map((_, i) => (
            <motion.span
              key={i}
              className="h-1 w-14 rounded-full"
              animate={{ backgroundColor: i < votes.length ? "#e3c27c" : "rgba(241,232,214,0.15)" }}
            />
          ))}
        </div>

        <div className="relative mt-12 min-h-[440px]">
          <AnimatePresence mode="wait">
            {!done ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="text-center font-display text-3xl italic text-pearl md:text-4xl">
                  {questions[step].prompt}
                </p>
                <div className="mt-10 grid gap-4 md:grid-cols-3">
                  {questions[step].options.map((opt, i) => (
                    <motion.button
                      key={opt.label}
                      type="button"
                      onClick={() => choose(opt.dosha)}
                      data-cursor="Choose"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.08 * i }}
                      whileHover={{ y: -8 }}
                      className="group relative flex flex-col items-center overflow-hidden rounded-t-[999px] border border-gold/30 bg-midnight/60 px-6 pb-10 pt-16 text-center transition-colors hover:border-gold-light"
                    >
                      <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,#e3c27c22,transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      <svg viewBox="0 0 32 32" className="size-12 text-gold-light transition-transform duration-500 group-hover:scale-110">
                        <path d={glyphs[opt.dosha]} fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" />
                      </svg>
                      <span className="mt-6 font-display text-2xl leading-snug text-pearl">{opt.label}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="grid items-center gap-10 rounded-3xl border border-gold/30 bg-midnight/70 p-6 md:grid-cols-[1.1fr_1fr] md:p-12"
              >
                <div className="relative flex h-72 items-end justify-center gap-2 md:h-96">
                  <div className="absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-gold-light to-transparent" />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_80%,#a1104740,transparent_65%)]" />
                  {items.map((p, i) => (
                    <motion.div
                      key={p.id}
                      className="relative flex items-end"
                      style={{ height: vesselHeight[p.vessel] }}
                      initial={{ y: 80, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 + i * 0.15, type: "spring", stiffness: 90, damping: 14 }}
                    >
                      <Vessel product={p} className="drop-shadow-[0_20px_30px_rgba(0,0,0,0.6)]" />
                    </motion.div>
                  ))}
                </div>
                <div>
                  <p className="eyebrow text-gold-light/80">
                    You lean {winner} · {ritual.element}
                  </p>
                  <h3 className="mt-4 font-display text-4xl italic text-pearl md:text-5xl">{ritual.title}</h3>
                  <p className="mt-4 text-pearl/70">{ritual.copy}</p>
                  <ul className="mt-6 space-y-2 border-y border-gold/20 py-4">
                    {items.map((p, i) => (
                      <li key={p.id} className="flex justify-between text-sm">
                        <span className="text-pearl/85">
                          <span className="mr-2 font-display italic text-gold-light">{["AM", "PM", "Weekly"][i]}</span>
                          {p.name}
                        </span>
                        <span className="text-pearl/50">{formatPrice(p.price)}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex items-baseline gap-3">
                    <span className="font-display text-4xl text-pearl">{formatPrice(bundle)}</span>
                    <span className="text-pearl/40 line-through">{formatPrice(full)}</span>
                    <span className="rounded-full bg-magenta px-2.5 py-0.5 text-xs text-pearl">
                      Save {formatPrice(full - bundle)}
                    </span>
                  </div>
                  <div className="mt-6 flex flex-wrap items-center gap-4">
                    <GoldButton
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
                      {added ? "Ritual in your bag ✦" : "Add the whole ritual"}
                    </GoldButton>
                    <button
                      type="button"
                      onClick={reset}
                      className="eyebrow inline-flex items-center gap-2 text-pearl/60 hover:text-gold-light"
                    >
                      <RotateCcw className="size-3" /> Retake
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
