"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, RotateCcw, Sparkles } from "lucide-react";
import { formatPrice, type Dosha } from "@/lib/products";
import { concernLabel, doshaProfile, questions, scoreQuiz } from "@/lib/quiz";
import { useCart } from "@/lib/cart";
import { Vessel, vesselHeight } from "@/components/brand/Vessel";
import { Button } from "@/components/brand/Button";
import { DoshaGlyph } from "@/components/shop/DoshaGlyph";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;
const doshaOrder: Dosha[] = ["vata", "pitta", "kapha"];

function Analyzing({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1800);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      key="analyzing"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex min-h-[420px] flex-col items-center justify-center text-center"
    >
      <div className="relative size-28">
        <motion.span
          className="absolute inset-0 rounded-full border-2 border-gold/25 border-t-gold"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
        />
        <span className="absolute inset-0 flex items-center justify-center text-gold">
          <Sparkles className="size-8" strokeWidth={1.4} />
        </span>
      </div>
      <p className="mt-8 font-display text-3xl">Reading your skin…</p>
      <p className="mt-2 text-sm text-ink/55">Matching your answers to Ayurvedic skin types</p>
    </motion.div>
  );
}

export function Quiz() {
  const { add } = useCart();
  const [answers, setAnswers] = useState<Record<string, number[]>>({});
  const [step, setStep] = useState(0);
  const [phase, setPhase] = useState<"questions" | "analyzing" | "result">("questions");
  const [added, setAdded] = useState(false);

  const advancing = useRef(false);
  const q = questions[Math.min(step, questions.length - 1)];
  const picked = answers[q?.id] ?? [];
  const finish = useCallback(() => setPhase("result"), []);
  const result = useMemo(() => (phase === "result" ? scoreQuiz(answers) : null), [phase, answers]);

  const next = () => {
    if (step < questions.length - 1) setStep((s) => s + 1);
    else setPhase("analyzing");
  };

  const choose = (i: number) => {
    if (q.max === 1) {
      if (advancing.current) return;
      advancing.current = true;
      setAnswers((a) => ({ ...a, [q.id]: [i] }));
      setTimeout(() => {
        advancing.current = false;
        next();
      }, 260);
      return;
    }
    setAnswers((a) => {
      const cur = a[q.id] ?? [];
      if (cur.includes(i)) return { ...a, [q.id]: cur.filter((x) => x !== i) };
      if (cur.length >= q.max) return { ...a, [q.id]: [...cur.slice(1), i] };
      return { ...a, [q.id]: [...cur, i] };
    });
  };

  const reset = () => {
    advancing.current = false;
    setAnswers({});
    setStep(0);
    setPhase("questions");
    setAdded(false);
  };

  const progress = phase === "questions" ? step / questions.length : 1;

  return (
    <div className="mx-auto max-w-[1100px]">
      <div className="flex items-center justify-between gap-6">
        <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-ink/10">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-forest"
            animate={{ width: `${progress * 100}%` }}
            transition={{ duration: 0.5, ease }}
          />
        </div>
        {phase === "questions" && step > 0 && (
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            className="inline-flex shrink-0 items-center gap-1.5 text-sm text-ink/60 hover:text-ink"
          >
            <ArrowLeft className="size-4" /> Back
          </button>
        )}
      </div>

      <div className="relative mt-10 min-h-[420px]">
        <AnimatePresence mode="wait">
          {phase === "questions" && (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35, ease }}
            >
              <p className="text-sm text-ink/55">
                <span className="font-medium text-gold-deep">{q.section}</span> · Question {step + 1} of{" "}
                {questions.length}
              </p>
              <p className="mt-2 font-display text-[clamp(2.2rem,5vw,3.6rem)] leading-tight">{q.prompt}</p>
              {q.help && <p className="mt-2 text-ink/60">{q.help}</p>}

              <div
                className={cn(
                  "mt-8 grid gap-3 md:gap-4",
                  q.options.length > 3 ? "grid-cols-2 md:grid-cols-4" : "md:grid-cols-3"
                )}
              >
                {q.options.map((opt, i) => {
                  const on = picked.includes(i);
                  const glyph = doshaOrder.find((d) => (opt.weights?.[d] ?? 0) >= 2);
                  return (
                    <motion.button
                      key={opt.label}
                      type="button"
                      onClick={() => choose(i)}
                      aria-pressed={on}
                      data-cursor="Choose"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.04 * i }}
                      whileHover={{ y: -4 }}
                      className={cn(
                        "group relative flex flex-col items-start rounded-3xl p-5 text-left ring-1 transition-[background-color,box-shadow] md:p-6",
                        on
                          ? "bg-forest text-white ring-forest shadow-[0_20px_50px_-20px_rgba(12,80,41,0.6)]"
                          : "bg-white ring-ink/5 shadow-[0_10px_40px_rgba(77,8,33,0.06)] hover:ring-gold/50"
                      )}
                    >
                      {q.max === 1 && glyph ? (
                        <span
                          className={cn(
                            "flex size-11 items-center justify-center rounded-full transition-colors",
                            on ? "bg-white/15 text-gold-light" : "bg-petal text-magenta group-hover:text-gold-deep"
                          )}
                        >
                          <DoshaGlyph dosha={glyph} className="size-6" />
                        </span>
                      ) : (
                        <span
                          className={cn(
                            "flex size-6 items-center justify-center rounded-full ring-1 transition-colors",
                            on ? "bg-gold-light text-ink ring-gold-light" : "ring-ink/20"
                          )}
                        >
                          {on && <Check className="size-3.5" />}
                        </span>
                      )}
                      <span className={cn("font-medium leading-snug", q.max === 1 ? "mt-7 text-lg" : "mt-5")}>
                        {opt.label}
                      </span>
                      {opt.hint && (
                        <span className={cn("mt-1 text-sm", on ? "text-white/70" : "text-ink/55")}>{opt.hint}</span>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {q.max > 1 && (
                <div className="mt-8 flex items-center gap-4">
                  <Button onClick={next} disabled={picked.length === 0}>
                    Continue <ArrowRight className="size-4" />
                  </Button>
                  <span className="text-sm text-ink/55">
                    {picked.length}/{q.max} selected
                  </span>
                </div>
              )}
            </motion.div>
          )}

          {phase === "analyzing" && <Analyzing onDone={finish} />}

          {phase === "result" && result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              className="space-y-6"
            >
              <div className="grid gap-8 overflow-hidden rounded-[2rem] bg-white p-6 shadow-[0_20px_60px_rgba(77,8,33,0.08)] md:grid-cols-[1.1fr_1fr] md:p-12">
                <div>
                  <p className="eyebrow text-gold-deep">Your skin type</p>
                  <h2 className="mt-3 font-display text-[clamp(3rem,7vw,5.5rem)] leading-none">
                    {doshaProfile[result.primary].title}
                    {result.secondary && (
                      <span className="gold-foil italic"> & {doshaProfile[result.secondary].title}</span>
                    )}
                  </h2>
                  <p className="mt-4 max-w-md text-lg text-ink/70">{doshaProfile[result.primary].copy}</p>
                  {result.secondary && (
                    <p className="mt-3 max-w-md text-sm text-ink/55">
                      With a strong {doshaProfile[result.secondary].title.toLowerCase()} streak, so we&apos;ve balanced your
                      routine for both.
                    </p>
                  )}
                  {result.concerns.length > 0 && (
                    <div className="mt-6 flex flex-wrap items-center gap-2">
                      <span className="text-sm text-ink/55">Targeting:</span>
                      {result.concerns.map((c) => (
                        <span key={c} className="rounded-full bg-petal px-3 py-1 text-sm font-medium text-magenta">
                          {concernLabel[c]}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-5 self-center">
                  {doshaOrder.map((d, i) => (
                    <div key={d}>
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2 font-medium">
                          <DoshaGlyph dosha={d} className="size-5" />
                          {doshaProfile[d].title}
                        </span>
                        <span className="tabular-nums text-ink/60">{result.percents[d]}%</span>
                      </div>
                      <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-ink/[0.07]">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: doshaProfile[d].color }}
                          initial={{ width: 0 }}
                          animate={{ width: `${result.percents[d]}%` }}
                          transition={{ delay: 0.3 + i * 0.12, duration: 1, ease }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] bg-white p-6 shadow-[0_20px_60px_rgba(77,8,33,0.08)] md:p-12">
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <p className="eyebrow text-gold-deep">Your ritual · {result.routine.length} steps</p>
                    <h3 className="mt-3 font-display text-4xl md:text-5xl">{doshaProfile[result.primary].ritual}</h3>
                    <p className="mt-2 max-w-md text-ink/65">{doshaProfile[result.primary].ritualCopy}</p>
                  </div>
                  <div className="flex items-baseline gap-3">
                    <span className="font-display text-4xl">{formatPrice(result.bundle)}</span>
                    <span className="text-ink/40 line-through">{formatPrice(result.full)}</span>
                    <span className="rounded-full bg-forest px-2.5 py-0.5 text-xs text-white">
                      Save {formatPrice(result.full - result.bundle)}
                    </span>
                  </div>
                </div>

                <ol className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {result.routine.map((r, i) => (
                    <motion.li
                      key={r.product.id}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + i * 0.1, duration: 0.6, ease }}
                      className="flex flex-col rounded-3xl p-5"
                      style={{ background: `linear-gradient(180deg, ${r.product.tint}, #ffffff 80%)` }}
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="gold-foil font-display text-3xl">0{i + 1}</span>
                        <span className="rounded-full bg-white/80 px-2.5 py-1 font-medium text-ink/70">{r.when}</span>
                      </div>
                      <Link href={`/shop/${r.product.id}`} className="mt-2 flex h-36 items-end justify-center">
                        <div className="flex h-full items-end" style={{ height: vesselHeight[r.product.vessel] }}>
                          <Vessel product={r.product} className="drop-shadow-[0_16px_16px_rgba(77,8,33,0.18)]" />
                        </div>
                      </Link>
                      <Link href={`/shop/${r.product.id}`} className="mt-4 font-medium hover:underline">
                        {r.product.name}
                      </Link>
                      <p className="mt-1 text-sm text-ink/65">{r.why}</p>
                    </motion.li>
                  ))}
                </ol>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Button
                    size="lg"
                    onClick={(e) => {
                      const from = e.currentTarget as HTMLElement;
                      result.routine.forEach((r, i) =>
                        setTimeout(
                          () =>
                            add(r.product.id, {
                              bundle: doshaProfile[result.primary].ritual.replace("The ", ""),
                              price: Math.round(r.product.price * (1 - result.discount) * 100) / 100,
                              from,
                            }),
                          i * 180
                        )
                      );
                      setAdded(true);
                    }}
                  >
                    {added ? "Added ✓" : `Add ${doshaProfile[result.primary].ritual.replace("The ", "the ")}`}
                  </Button>
                  <button
                    type="button"
                    onClick={reset}
                    className="inline-flex items-center gap-2 text-sm text-ink/60 hover:text-ink"
                  >
                    <RotateCcw className="size-3.5" /> Retake the quiz
                  </button>
                </div>
              </div>

              <div className="rounded-[2rem] bg-forest-deep p-6 text-white md:p-12">
                <p className="eyebrow text-gold-light">Tips for your skin</p>
                <ul className="mt-6 grid gap-6 md:grid-cols-3">
                  {result.tips.map((t, i) => (
                    <motion.li
                      key={t}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                    >
                      <span className="gold-foil font-display text-4xl">0{i + 1}</span>
                      <p className="mt-2 text-white/80">{t}</p>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
