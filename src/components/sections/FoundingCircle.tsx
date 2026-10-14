"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, animate, motion, useInView } from "framer-motion";
import { Reveal } from "@/components/brand/Reveal";
import { GoldButton } from "@/components/brand/GoldButton";
import { LotusMark } from "@/components/brand/LotusMark";

const CLAIMED = 847;
const SEATS = 1200;

const perks = [
  { title: "Launch pricing, for life", copy: "Lock in today's prices on every reorder, forever." },
  { title: "First dibs on drops", copy: "Shop new launches 48 hours before everyone else." },
  { title: "A free mini liner", copy: "A travel-size Soft Kohl Liner in your first order." },
];

export function FoundingCircle() {
  const counterRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(counterRef, { once: true });
  const [claimed, setClaimed] = useState(CLAIMED - 120);
  const [email, setEmail] = useState("");
  const [member, setMember] = useState<number | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(CLAIMED - 120, CLAIMED, {
      duration: 2.2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setClaimed(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError(true);
      return;
    }
    setMember(claimed + 1);
    setClaimed((c) => c + 1);
    setEmail("");
  };

  return (
    <section id="circle" className="relative overflow-hidden bg-midnight py-28 md:py-40">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_100%,#a1104755,transparent_70%)]" />

      <div className="relative mx-auto max-w-4xl px-5 text-center md:px-10">
        <Reveal>
          <p className="eyebrow text-pearl/70">Early access list</p>
          <h2 className="mt-5 font-display text-[clamp(2.6rem,6.5vw,6rem)] leading-[0.92] text-pearl">
            The first {SEATS.toLocaleString()}
            <br />
            <span className="gold-text italic">get the best perks.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mx-auto mt-12 max-w-xl">
          <div className="flex items-baseline justify-between text-sm text-pearl/70">
            <span>
              <span ref={counterRef} className="font-display text-3xl text-pearl tabular-nums">
                {claimed}
              </span>{" "}
              spots claimed
            </span>
            <span>{SEATS - claimed} remaining</span>
          </div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-pearl/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-magenta to-[#e0507e]"
              animate={{ width: `${(claimed / SEATS) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </Reveal>

        <div className="mt-14 grid gap-4 text-left md:grid-cols-3">
          {perks.map((p, i) => (
            <Reveal key={p.title} delay={0.08 * i}>
              <div className="h-full rounded-3xl border border-pearl/10 bg-forest-deep/50 px-6 pb-7 pt-7 transition-colors hover:border-pearl/30">
                <span className="text-xs font-medium text-pearl/50">0{i + 1}</span>
                <p className="mt-3 font-display text-2xl text-pearl">{p.title}</p>
                <p className="mt-2 text-sm text-pearl/60">{p.copy}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="relative mx-auto mt-14 max-w-xl">
          <AnimatePresence mode="wait">
            {member ? (
              <motion.div
                key="card"
                initial={{ opacity: 0, rotateX: -60, y: 30 }}
                animate={{ opacity: 1, rotateX: 0, y: 0 }}
                transition={{ type: "spring", stiffness: 90, damping: 14 }}
                className="relative overflow-hidden rounded-2xl border border-pearl/20 bg-gradient-to-br from-forest via-forest-deep to-midnight p-8 shadow-[0_30px_80px_-20px_#00000088]"
                style={{ transformPerspective: 900 }}
              >
                <div className="relative flex items-center justify-between">
                  <LotusMark draw className="h-16 w-14 text-gold-light" />
                  <div className="text-right">
                    <p className="eyebrow text-pearl/60">You&apos;re in</p>
                    <p className="font-display text-5xl text-pearl">#{String(member).padStart(4, "0")}</p>
                  </div>
                </div>
                <p className="relative mt-6 text-left text-sm text-pearl/70">
                  Welcome to the list. Watch your inbox—your early access link is on its way.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={onSubmit}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col gap-3 rounded-full sm:flex-row sm:border sm:border-pearl/25 sm:bg-night/40 sm:p-1.5"
              >
                <label htmlFor="circle-email" className="sr-only">
                  Email
                </label>
                <input
                  id="circle-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError(false);
                  }}
                  placeholder="your@email.com"
                  className="flex-1 rounded-full border border-pearl/25 bg-night/40 px-6 py-4 text-pearl outline-none placeholder:text-pearl/35 focus:border-pearl sm:border-0 sm:bg-transparent"
                />
                <GoldButton type="submit">Get early access</GoldButton>
              </motion.form>
            )}
          </AnimatePresence>
          {error && <p className="mt-3 text-sm text-[#f07fa3]">That email doesn&apos;t look quite right.</p>}
        </div>
      </div>
    </section>
  );
}
