"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/brand/Reveal";
import { GoldButton } from "@/components/brand/GoldButton";

const questions = [
  {
    prompt: "Your skin usually feels…",
    options: [
      { label: "Dry, tight, or easily wind-chapped", dosha: "vata" },
      { label: "Warm, reactive, or prone to redness", dosha: "pitta" },
      { label: "Oily in zones, clogged, or dull", dosha: "kapha" },
    ],
  },
  {
    prompt: "After a long day you crave…",
    options: [
      { label: "Warm oil and soft light", dosha: "vata" },
      { label: "Something cooling and calm", dosha: "pitta" },
      { label: "A clarifying, refreshing reset", dosha: "kapha" },
    ],
  },
  {
    prompt: "Your makeup mood is…",
    options: [
      { label: "Soft glow, barely there", dosha: "vata" },
      { label: "Clean flush, defined eyes", dosha: "pitta" },
      { label: "Rich color, intentional finish", dosha: "kapha" },
    ],
  },
];

const results: Record<
  string,
  { title: string; copy: string; pick: string; color: string }
> = {
  vata: {
    title: "Vata-leaning",
    copy: "Nourish and seal. Favor oils, cream textures, and rituals that slow the scroll.",
    pick: "Kumkumadi Night Oil + Lotus Radiance Serum",
    color: "text-gold",
  },
  pitta: {
    title: "Pitta-leaning",
    copy: "Cool the heat. Lightweight serums, lotus, and color that stays sheer.",
    pick: "Lotus Radiance Serum + Beetroot Lip & Cheek",
    color: "text-magenta",
  },
  kapha: {
    title: "Kapha-leaning",
    copy: "Wake the surface. Clarify gently, then add one deliberate color moment.",
    pick: "Neem Clarity Cleanse + Kohl Noir Kajal",
    color: "text-forest",
  },
};

export function DoshaQuiz() {
  const [step, setStep] = useState(0);
  const [votes, setVotes] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  const winner = useMemo(() => {
    const tally: Record<string, number> = { vata: 0, pitta: 0, kapha: 0 };
    votes.forEach((v) => {
      tally[v] = (tally[v] ?? 0) + 1;
    });
    return Object.entries(tally).sort((a, b) => b[1] - a[1])[0][0];
  }, [votes]);

  const result = results[winner];

  function choose(dosha: string) {
    const next = [...votes, dosha];
    setVotes(next);
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setDone(true);
    }
  }

  function reset() {
    setStep(0);
    setVotes([]);
    setDone(false);
  }

  return (
    <section className="border-y border-gold/20 bg-silk/60 py-24 md:py-28">
      <div className="mx-auto max-w-3xl px-5 text-center md:px-8">
        <Reveal>
          <p className="text-[0.65rem] uppercase tracking-[0.35em] text-magenta">
            Interactive ritual
          </p>
          <h2 className="mt-4 font-display text-4xl text-midnight md:text-5xl">
            Find your starting dosha
          </h2>
          <p className="mx-auto mt-4 max-w-md text-muted-foreground">
            Three quick questions. A soft suggestion—not a diagnosis.
          </p>
        </Reveal>

        <div className="relative mt-12 min-h-[280px] border border-gold/30 bg-sand/50 p-8 text-left md:p-10">
          <AnimatePresence mode="wait">
            {!done ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
              >
                <p className="text-[0.65rem] uppercase tracking-[0.28em] text-gold">
                  Question {step + 1} / {questions.length}
                </p>
                <h3 className="mt-3 font-display text-2xl text-midnight md:text-3xl">
                  {questions[step].prompt}
                </h3>
                <div className="mt-8 space-y-3">
                  {questions[step].options.map((opt) => (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() => choose(opt.dosha)}
                      className="block w-full border border-gold/25 bg-silk/80 px-4 py-4 text-left text-sm text-forest transition-all hover:border-gold hover:bg-gold/10"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <p className="text-[0.65rem] uppercase tracking-[0.28em] text-gold">
                  Your lean
                </p>
                <h3
                  className={`mt-3 font-display text-3xl md:text-4xl ${result.color}`}
                >
                  {result.title}
                </h3>
                <p className="mx-auto mt-4 max-w-md text-muted-foreground">
                  {result.copy}
                </p>
                <p className="mt-6 font-display text-lg text-midnight">
                  Start with: {result.pick}
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <GoldButton href="#collection" variant="solid">
                    Shop the picks
                  </GoldButton>
                  <button
                    type="button"
                    onClick={reset}
                    className="border border-forest/40 px-7 py-3.5 text-[0.7rem] uppercase tracking-[0.28em] text-forest transition-colors hover:bg-forest/10"
                  >
                    Retake
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
