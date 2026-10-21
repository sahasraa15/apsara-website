"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { formatPrice, productById } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { Vessel } from "@/components/brand/Vessel";
import { Button } from "@/components/brand/Button";
import { cn } from "@/lib/utils";

const steps = [
  {
    kicker: "01 · The formula",
    title: "16 botanicals.",
    copy: "Kumkumadi is a classic Ayurvedic beauty oil—sixteen plants, slow-infused for days.",
  },
  {
    kicker: "02 · The hero",
    title: "Real saffron.",
    copy: "150 flowers for a single gram. It evens out tone and adds a candle-lit glow.",
  },
  {
    kicker: "03 · The feel",
    title: "Sinks in. No grease.",
    copy: "A featherlight base that absorbs in about a minute. Nothing left on your pillow.",
  },
  {
    kicker: "04 · The result",
    title: "Wake up glowing.",
    copy: "Four drops before bed. Most testers saw a brighter, more even tone in two weeks.",
  },
];

const DOTS = 16;
const threads = [
  { x: -150, y: -120, r: 30 },
  { x: 160, y: -90, r: -40 },
  { x: -180, y: 40, r: 70 },
  { x: 170, y: 80, r: -20 },
  { x: -90, y: -170, r: 10 },
  { x: 110, y: -160, r: 55 },
  { x: -130, y: 130, r: -60 },
  { x: 140, y: 150, r: 25 },
];

function Dot({ i, progress }: { i: number; progress: MotionValue<number> }) {
  const start = (i / DOTS) * 0.2;
  const opacity = useTransform(progress, [start, start + 0.02], [0, 1]);
  const scale = useTransform(progress, [start, start + 0.02], [0, 1]);
  const angle = (i / DOTS) * Math.PI * 2 - Math.PI / 2;
  return (
    <motion.span
      className="gold-fill absolute size-3 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-[0_0_14px_rgba(227,194,124,0.9)] md:size-3.5"
      style={{ left: `${50 + Math.cos(angle) * 46}%`, top: `${50 + Math.sin(angle) * 46}%`, opacity, scale }}
    />
  );
}

function Thread({ t, progress }: { t: (typeof threads)[number]; progress: MotionValue<number> }) {
  const x = useTransform(progress, [0.25, 0.42], [t.x * 1.6, t.x * 0.55]);
  const y = useTransform(progress, [0.25, 0.42], [t.y * 1.6, t.y * 0.55]);
  const opacity = useTransform(progress, [0.25, 0.3, 0.5, 0.56], [0, 1, 1, 0]);
  return (
    <motion.svg
      viewBox="0 0 40 12"
      className="absolute left-1/2 top-1/2 w-10 md:w-12"
      style={{ x, y, opacity, rotate: t.r }}
      aria-hidden
    >
      <path d="M2 8 C12 2 26 2 38 6" stroke="#d9531e" strokeWidth={2.6} strokeLinecap="round" fill="none" />
      <path d="M30 4 L38 6 L33 10" stroke="#f08a3c" strokeWidth={1.6} strokeLinecap="round" fill="none" />
    </motion.svg>
  );
}

function Ripple({ delay, progress }: { delay: number; progress: MotionValue<number> }) {
  const scale = useTransform(progress, [0.6 + delay, 0.74 + delay], [0.2, 2.6]);
  const opacity = useTransform(progress, [0.6 + delay, 0.62 + delay, 0.74 + delay], [0, 0.9, 0]);
  return (
    <motion.span
      className="absolute left-1/2 top-1/2 h-6 w-24 -translate-x-1/2 -translate-y-1/2 rounded-[50%] border-2 border-gold"
      style={{ scale, opacity }}
    />
  );
}

export function Decoded() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [step, setStep] = useState(0);
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const product = productById["kumkumadi-oil"];

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setStep(Math.min(steps.length - 1, Math.max(0, Math.floor(v * steps.length))));
  });

  const ringRotate = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const ringOpacity = useTransform(scrollYProgress, [0.2, 0.3, 0.75, 0.9], [1, 0.35, 0.35, 1]);
  const bottleRotate = useTransform(scrollYProgress, [0, 1], [-8, 8]);
  const bottleScale = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.9, 1, 1, 1.08]);
  const dropTop = useTransform(scrollYProgress, [0.5, 0.6], ["30%", "86%"]);
  const dropOpacity = useTransform(scrollYProgress, [0.5, 0.52, 0.59, 0.61], [0, 1, 1, 0]);
  const finale = useTransform(scrollYProgress, [0.72, 0.88], [0, 1]);
  const bg = useTransform(scrollYProgress, [0, 0.5, 1], ["#fff6f8", "#fdeee4", "#fbe7c8"]);

  return (
    <section ref={ref} className="relative h-[420vh]">
      <motion.div className="sticky top-0 flex h-[100svh] items-center overflow-hidden" style={{ backgroundColor: bg }}>
        <motion.div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(246,227,168,0.9),transparent_55%)]"
          style={{ opacity: finale }}
        />

        <div className="relative mx-auto grid h-full w-full max-w-[1400px] grid-cols-1 grid-rows-[1fr_auto] items-center gap-4 px-5 pb-10 pt-24 md:px-10 lg:grid-cols-[1fr_1.2fr] lg:grid-rows-1 lg:pb-0 lg:pt-0">
          <div className="order-2 min-w-0 lg:order-1">
            <p className="eyebrow text-gold-deep">Kumkumadi Night Oil, decoded</p>
            <div className="relative mt-4 min-h-[190px] md:min-h-[240px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="text-sm text-ink/50">{steps[step].kicker}</p>
                  <h2 className="mt-2 font-display text-[clamp(2.8rem,6vw,5.5rem)] leading-[0.95]">
                    {step === 3 ? <span className="gold-foil italic">{steps[step].title}</span> : steps[step].title}
                  </h2>
                  <p className="mt-4 max-w-md text-base text-ink/70 md:text-lg">{steps[step].copy}</p>
                  {step === 3 && (
                    <div className="mt-6 flex flex-wrap items-center gap-4">
                      <span className="font-display text-3xl">{formatPrice(product.price)}</span>
                      <Button
                        variant="gold"
                        onClick={(e) => {
                          add(product.id, { from: e.currentTarget as HTMLElement });
                          setAdded(true);
                          setTimeout(() => setAdded(false), 1800);
                        }}
                      >
                        {added ? "Added ✓" : "Add to bag"}
                      </Button>
                      <Button href={`/shop/${product.id}`} variant="outline">
                        Learn more
                      </Button>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="mt-6 flex gap-2">
              {steps.map((s, i) => (
                <span
                  key={s.title}
                  className={cn(
                    "h-1 rounded-full transition-all duration-500",
                    i === step ? "gold-fill w-10" : i < step ? "w-4 bg-gold/60" : "w-4 bg-ink/15"
                  )}
                />
              ))}
            </div>
          </div>

          <div className="relative order-1 mx-auto aspect-square w-[min(100%,52svh)] lg:order-2 lg:w-[min(100%,78svh,680px)]">
            <motion.div className="absolute inset-0" style={{ rotate: ringRotate, opacity: ringOpacity }}>
              {Array.from({ length: DOTS }).map((_, i) => (
                <Dot key={i} i={i} progress={scrollYProgress} />
              ))}
            </motion.div>
            <div className="absolute inset-[8%] rounded-full border border-gold/30" />

            {threads.map((t, i) => (
              <Thread key={i} t={t} progress={scrollYProgress} />
            ))}

            <motion.div
              className="absolute inset-[18%] flex items-end justify-center"
              style={{ rotate: bottleRotate, scale: bottleScale }}
            >
              <Vessel product={product} className="drop-shadow-[0_40px_40px_rgba(138,98,36,0.35)]" />
            </motion.div>

            <motion.span
              className="gold-fill absolute left-[62%] z-10 h-5 w-3.5 -translate-x-1/2 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] shadow-[0_0_14px_rgba(227,194,124,0.9)]"
              style={{ top: dropTop, opacity: dropOpacity }}
            />
            <div className="absolute left-[62%] top-[88%] h-0 w-0">
              <Ripple delay={0} progress={scrollYProgress} />
              <Ripple delay={0.03} progress={scrollYProgress} />
              <Ripple delay={0.06} progress={scrollYProgress} />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
