"use client";

import Link from "next/link";
import { useRef, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CalendarHeart, CloudSun, Gift, Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { tiers } from "@/components/rewards/Rewards";
import { SkinForecastDemo } from "./SkinForecast";
import { BridalCountdownDemo } from "./BridalCountdown";

const tools = [
  {
    id: "forecast",
    icon: CloudSun,
    ask: "What does my skin need today?",
    title: "Today's skin forecast",
    copy: "Your weather plus Ayurveda's seasons, turned into tonight's routine.",
    bg: "linear-gradient(150deg,#fbe7c8,#fae3ea)",
    accent: "#e8a33d",
  },
  {
    id: "bridal",
    icon: CalendarHeart,
    ask: "Getting married? (Or know someone who is?)",
    title: "Bridal glow countdown",
    copy: "A week-by-week plan to the big day, haldi week included.",
    bg: "linear-gradient(150deg,#fae3ea,#f3bfd0)",
    accent: "#a11047",
  },
] as const;

const links = [
  { href: "/quiz", icon: Sparkles, title: "Find my skin type", copy: "2-minute quiz" },
  { href: "/shop#discovery-kit", icon: Gift, title: "Try everything", copy: "The Discovery Kit" },
];

const subscribe = (cb: () => void) => {
  window.addEventListener("hashchange", cb);
  return () => window.removeEventListener("hashchange", cb);
};

function setHash(id: string) {
  history.replaceState(null, "", id ? `#${id}` : location.pathname);
  window.dispatchEvent(new HashChangeEvent("hashchange"));
}

export function GlowRoom() {
  const hash = useSyncExternalStore(subscribe, () => location.hash.slice(1), () => "");
  const active = tools.find((t) => t.id === hash);
  const stage = useRef<HTMLDivElement>(null);

  function pick(id: string) {
    setHash(id === hash ? "" : id);
    if (id !== hash) setTimeout(() => stage.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 120);
  }

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2">
        {tools.map((t) => {
          const on = active?.id === t.id;
          return (
            <motion.button
              key={t.id}
              type="button"
              onClick={() => pick(t.id)}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "group relative overflow-hidden rounded-[2rem] p-6 text-left transition-shadow md:p-8",
                on
                  ? "shadow-[0_20px_60px_-20px_rgba(77,8,33,0.45)] ring-2 ring-ink"
                  : "shadow-[0_14px_40px_-24px_rgba(77,8,33,0.35)] ring-1 ring-white/70"
              )}
              style={{ background: t.bg }}
            >
              <span
                className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full opacity-40 blur-2xl transition-opacity group-hover:opacity-70"
                style={{ background: t.accent }}
              />
              <span className="relative flex items-start justify-between gap-4">
                <span className="grid size-12 place-items-center rounded-2xl bg-white/80" style={{ color: t.accent }}>
                  <t.icon className="size-6" />
                </span>
                <span
                  className={cn(
                    "grid size-10 place-items-center rounded-full transition-colors",
                    on ? "bg-ink text-white" : "bg-white/70 text-ink group-hover:bg-white"
                  )}
                >
                  <ArrowRight className={cn("size-4 transition-transform", on && "rotate-90")} />
                </span>
              </span>
              <span className="relative mt-10 block text-sm text-ink/60">{t.ask}</span>
              <span className="relative mt-1 block font-display text-3xl md:text-4xl">{t.title}</span>
              <span className="relative mt-2 block max-w-sm text-sm text-ink/65">{t.copy}</span>
            </motion.button>
          );
        })}
      </div>

      <div ref={stage} className="scroll-mt-28">
        <AnimatePresence mode="wait">
          {active && (
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.35 }}
              className="mt-12 mb-12"
            >
              <div className="mb-5 flex items-center justify-between">
                <p className="font-display text-3xl md:text-4xl">{active.title}</p>
                <button
                  type="button"
                  onClick={() => setHash("")}
                  className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-ink/60 hover:bg-white hover:text-ink"
                >
                  <X className="size-4" /> Close
                </button>
              </div>
              {active.id === "forecast" ? <SkinForecastDemo /> : <BridalCountdownDemo />}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Link
        href="/rewards"
        className="group relative mt-4 block overflow-hidden rounded-[2rem] bg-forest-deep p-6 text-white md:p-10"
      >
        <span className="pointer-events-none absolute -left-20 -top-24 size-72 rounded-full bg-gold/25 blur-3xl" />
        <span className="pointer-events-none absolute -bottom-24 right-10 size-72 rounded-full bg-magenta/30 blur-3xl" />
        <motion.span
          className="pointer-events-none absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          initial={{ left: "-40%" }}
          animate={{ left: "140%" }}
          transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
        />
        {[
          { left: "8%", top: "70%", d: 0 },
          { left: "46%", top: "14%", d: 1.2 },
          { left: "62%", top: "80%", d: 2.1 },
          { left: "92%", top: "22%", d: 0.6 },
        ].map((s) => (
          <motion.span
            key={s.left}
            className="pointer-events-none absolute text-gold-light"
            style={{ left: s.left, top: s.top }}
            animate={{ opacity: [0, 1, 0], scale: [0.6, 1, 0.6], rotate: [0, 45, 90] }}
            transition={{ duration: 3, repeat: Infinity, delay: s.d }}
          >
            <Sparkles className="size-4" />
          </motion.span>
        ))}

        <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <p className="eyebrow text-gold-light">Gold Leaf rewards · free to join</p>
            <p className="mt-3 font-display text-[clamp(2.4rem,5vw,4rem)] leading-none">
              Every glow earns <span className="gold-foil">gold.</span>
            </p>
            <p className="mt-4 max-w-md text-white/70">
              1 point for every $1, plus points for the quiz, reviews and referrals. Join today and get 50 points just
              for saying hi.
            </p>
            <span className="gold-fill mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-ink shadow-lg transition group-hover:shadow-gold/40">
              Join and get 50 points
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>

          <div className="grid grid-cols-3 items-end gap-3">
            {tiers.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.12 * i, type: "spring", stiffness: 200, damping: 20 }}
                className={cn(
                  "flex flex-col justify-between rounded-3xl p-4 md:p-5",
                  i === 2 ? "gold-fill text-ink shadow-xl" : "bg-white/10 ring-1 ring-white/15"
                )}
                style={{ minHeight: `${150 + i * 30}px` }}
              >
                <span className={cn("text-xs", i === 2 ? "text-ink/70" : "text-white/60")}>
                  {t.at ? `${t.at}+ pts` : "Start here"}
                </span>
                <span>
                  <span className="block font-display text-2xl leading-tight md:text-3xl">{t.name}</span>
                  <span className={cn("mt-1 block text-xs", i === 2 ? "text-ink/75" : "text-white/70")}>
                    {t.perks[0]}
                  </span>
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </Link>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="group flex items-center gap-3 rounded-2xl bg-white p-4 ring-1 ring-ink/5 transition hover:ring-gold/50"
          >
            <span className="grid size-10 place-items-center rounded-full bg-petal text-magenta">
              <l.icon className="size-4" />
            </span>
            <span className="flex-1">
              <span className="block text-sm font-medium">{l.title}</span>
              <span className="block text-xs text-ink/55">{l.copy}</span>
            </span>
            <ArrowRight className="size-4 text-ink/40 transition-transform group-hover:translate-x-1" />
          </Link>
        ))}
      </div>
    </div>
  );
}
