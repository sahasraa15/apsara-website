"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, animate, motion, useInView } from "framer-motion";
import { Check, Gift, Sparkles, Tag } from "lucide-react";
import { Reveal } from "@/components/brand/Reveal";
import { Button } from "@/components/brand/Button";

const CLAIMED = 847;
const SPOTS = 1200;

const perks = [
  { icon: Tag, title: "Launch pricing for life", copy: "Lock in today's prices on every reorder." },
  { icon: Sparkles, title: "First dibs on drops", copy: "Shop new launches 48 hours early." },
  { icon: Gift, title: "A free mini serum", copy: "Travel-size Lotus Radiance Serum in your first order." },
];

export function EarlyAccess() {
  const counterRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(counterRef, { once: true });
  const [claimed, setClaimed] = useState(CLAIMED - 120);
  const [email, setEmail] = useState("");
  const [member, setMember] = useState<number | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(CLAIMED - 120, CLAIMED, {
      duration: 2,
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
    <section id="early-access" className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-magenta px-6 py-14 text-white ring-1 ring-gold/40 md:px-16 md:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow text-gold-light">Early access</p>
            <h2 className="mt-3 font-display text-[clamp(2.4rem,5vw,4.4rem)] leading-[1]">
              The first {SPOTS.toLocaleString()} get the best perks.
            </h2>
            <div className="mt-8 max-w-md">
              <div className="flex items-baseline justify-between text-sm text-white/80">
                <span>
                  <span ref={counterRef} className="gold-foil font-display text-3xl tabular-nums">
                    {claimed}
                  </span>{" "}
                  spots claimed
                </span>
                <span>{SPOTS - claimed} left</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/20">
                <motion.div
                  className="gold-fill h-full rounded-full"
                  animate={{ width: `${(claimed / SPOTS) * 100}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="space-y-4">
              {perks.map(({ icon: Icon, title, copy }) => (
                <li key={title} className="flex items-start gap-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/15 text-gold-light">
                    <Icon className="size-5" strokeWidth={1.6} />
                  </span>
                  <div>
                    <p className="font-medium">{title}</p>
                    <p className="text-sm text-white/70">{copy}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <AnimatePresence mode="wait">
                {member ? (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-4 rounded-2xl bg-white p-5 text-ink"
                  >
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-forest text-white">
                      <Check className="size-5" />
                    </span>
                    <div>
                      <p className="font-medium">You&apos;re #{member} on the list.</p>
                      <p className="text-sm text-ink/60">Check your inbox for your early access link.</p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={onSubmit}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex flex-col gap-3 sm:flex-row sm:rounded-full sm:bg-white sm:p-1.5"
                  >
                    <label htmlFor="early-email" className="sr-only">
                      Email
                    </label>
                    <input
                      id="early-email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError(false);
                      }}
                      placeholder="your@email.com"
                      className="flex-1 rounded-full bg-white px-5 py-3.5 text-ink outline-none placeholder:text-ink/40"
                    />
                    <Button type="submit" variant="gold">Get early access</Button>
                  </motion.form>
                )}
              </AnimatePresence>
              {error && <p className="mt-3 text-sm text-white">That email doesn&apos;t look quite right.</p>}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
