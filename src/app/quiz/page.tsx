import type { Metadata } from "next";
import { doshaInfo, type Dosha } from "@/lib/products";
import { Quiz } from "@/components/quiz/Quiz";
import { DoshaGlyph } from "@/components/shop/DoshaGlyph";

export const metadata: Metadata = {
  title: "Skin quiz",
  description: "Find your Ayurvedic skin type in two minutes and get a routine built for it.",
};

const order: Dosha[] = ["vata", "pitta", "kapha"];

export default function QuizPage() {
  return (
    <>
      <section className="lotus-wash -mt-16 pt-16 md:-mt-[72px] md:pt-[72px]">
        <div className="mx-auto max-w-[1100px] px-5 pb-12 pt-10 md:px-10 md:pt-16">
          <p className="eyebrow text-magenta">Skin quiz · 2 minutes</p>
          <h1 className="mt-3 max-w-3xl font-display text-[clamp(3rem,7vw,5.5rem)] leading-none">
            Find your skin type, the Ayurvedic way.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-ink/65">
            Ayurveda sorts skin into three types—dry, sensitive and oily. Most people are a blend of two. Answer eight quick
            questions and we&apos;ll show your mix, build a routine for it, and take 15% off the set.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {order.map((d) => (
              <span key={d} className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm">
                <DoshaGlyph dosha={d} className="size-4 text-magenta" />
                <span className="font-medium">{doshaInfo[d].name}</span>
                <span className="text-ink/55">{doshaInfo[d].plain}</span>
              </span>
            ))}
          </div>
        </div>
      </section>
      <section className="px-5 py-12 md:px-10 md:py-16">
        <Quiz />
      </section>
    </>
  );
}
