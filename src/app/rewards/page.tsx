import type { Metadata } from "next";
import { Gift, Sparkles, UserPlus } from "lucide-react";
import { JoinRewards, RewardsCalculator } from "@/components/rewards/Rewards";

export const metadata: Metadata = {
  title: "Gold Leaf rewards",
  description: "Earn points on every order and unlock free shipping, gifts and early access.",
};

const steps = [
  { icon: UserPlus, title: "Join free", copy: "Sign up with your email and get 50 welcome points." },
  { icon: Sparkles, title: "Earn points", copy: "1 point for every $1, plus bonus points for reviews, referrals and the quiz." },
  { icon: Gift, title: "Unlock perks", copy: "Move up from Petal to Lotus to Gold Leaf. Perks get better at every tier." },
];

const faqs = [
  { q: "Does it cost anything?", a: "No. Gold Leaf is free to join, and you can leave anytime." },
  { q: "Do my points expire?", a: "Points last 12 months from your last order. Your tier is based on what you spend in a calendar year." },
  { q: "How do I use my points?", a: "Every 100 points is $5 off. Apply them at checkout, a little or all at once." },
];

export default function RewardsPage() {
  return (
    <>
      <section className="mx-auto max-w-[1400px] px-5 pt-4 md:px-10">
        <div className="relative overflow-hidden rounded-[2rem] bg-forest-deep px-6 py-14 text-white md:px-14 md:py-20">
        <div className="pointer-events-none absolute -right-32 -top-32 size-[520px] rounded-full bg-gold/25 blur-3xl" />
        <div className="relative">
          <p className="eyebrow text-gold-light">Rewards</p>
          <h1 className="mt-3 max-w-3xl font-display text-[clamp(3rem,7vw,5.5rem)] leading-none">
            Welcome to <span className="gold-foil">Gold Leaf.</span>
          </h1>
          <p className="mt-5 max-w-lg text-lg text-white/70">
            In our culture, gold is how you show love. So every order earns you a little of it back.
          </p>
          <div className="mt-8">
            <JoinRewards />
          </div>
        </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 py-16 md:px-10 md:py-24">
        <div className="grid gap-4 md:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.title} className="rounded-3xl bg-white p-6 ring-1 ring-ink/5">
              <div className="flex items-center justify-between">
                <s.icon className="size-6 text-magenta" />
                <span className="gold-foil font-display text-3xl">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <p className="mt-6 font-display text-2xl">{s.title}</p>
              <p className="mt-1 text-sm text-ink/65">{s.copy}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-20 font-display text-4xl md:text-5xl">Where would you land?</h2>
        <p className="mt-2 max-w-xl text-ink/65">Drag the slider and tap the extras to see which tier you&apos;d reach.</p>
        <div className="mt-8">
          <RewardsCalculator />
        </div>

        <div className="mt-20 grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <h2 className="font-display text-4xl md:text-5xl">Good to know</h2>
          <div className="divide-y divide-ink/10 border-y border-ink/10">
            {faqs.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between text-lg font-medium [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="text-2xl leading-none transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="pt-3 text-ink/70">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
