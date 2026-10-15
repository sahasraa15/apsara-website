import type { Metadata } from "next";
import { doshaInfo, type Dosha } from "@/lib/products";
import { StoryCollage } from "@/components/about/StoryCollage";
import { DoshaGlyph } from "@/components/shop/DoshaGlyph";
import { Button } from "@/components/brand/Button";
import { ValuesStack } from "@/components/about/ValuesStack";

export const metadata: Metadata = {
  title: "About",
  description: "Why we started Apsara & Co., and what Ayurveda actually is.",
};

const order: Dosha[] = ["vata", "pitta", "kapha"];

const values = [
  { title: "Proven, not trendy", copy: "We only use botanicals with centuries of use behind them and modern research to back them up." },
  { title: "Fewer, better products", copy: "Four essentials that each do one job really well. No 12-step routines." },
  { title: "Fairly sourced", copy: "We buy directly from growers and pay above market price for every harvest." },
];

const faqs = [
  { q: "When do orders ship?", a: "We launch this spring. Reserve now and you won't be charged until your order ships." },
  { q: "What's your return policy?", a: "30-day happy-skin guarantee. If it doesn't work for you, we'll refund it—even if it's opened." },
  { q: "Do you ship internationally?", a: "We ship across the US at launch, with Canada and the UK following soon after." },
];

export default function AboutPage() {
  return (
    <>
      <section className="lotus-wash -mt-16 overflow-x-clip pt-16 md:-mt-[72px] md:pt-[72px]">
        <div className="mx-auto grid max-w-[1400px] items-center gap-14 px-5 pb-20 pt-10 md:px-10 md:pt-16 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-magenta">Our story</p>
            <h1 className="mt-3 font-display text-[clamp(3rem,7vw,5.5rem)] leading-none">
              Old recipes, new standards.
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink/70">
              We grew up with turmeric face masks and homemade oils from our grandmothers&apos; kitchens—then moved to a
              city of drugstore aisles full of ingredients we couldn&apos;t pronounce.
            </p>
            <p className="mt-4 max-w-lg text-lg leading-relaxed text-ink/70">
              Apsara &amp; Co. takes the Ayurvedic botanicals that have worked for centuries and holds them to modern
              standards: clean, vegan, dermatologist tested, and beautiful enough to leave out on the counter.
            </p>
            <p className="mt-6 text-sm text-ink/55">— The founders, Brooklyn</p>
          </div>
          <StoryCollage />
        </div>
      </section>

      <section id="ayurveda" className="scroll-mt-24 mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <p className="eyebrow text-magenta">What is Ayurveda?</p>
            <h2 className="mt-3 font-display text-[clamp(2.4rem,5vw,4rem)] leading-none">
              The world&apos;s oldest skincare system, simplified.
            </h2>
          </div>
          <div className="text-lg leading-relaxed text-ink/70">
            <p>
              Ayurveda is a 3,000-year-old wellness tradition from India. Its big idea for skin is simple: everyone has
              a natural type, and your routine should work with it instead of against it.
            </p>
            <p className="mt-4">It describes three skin types:</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {order.map((d) => (
                <div key={d} className="rounded-3xl bg-white p-5 ring-1 ring-ink/5">
                  <DoshaGlyph dosha={d} className="size-8 text-magenta" />
                  <p className="mt-4 font-display text-2xl text-ink">{doshaInfo[d].name}</p>
                  <p className="text-sm">{doshaInfo[d].plain}</p>
                </div>
              ))}
            </div>
            <Button href="/quiz" className="mt-8">
              Find yours in 2 minutes
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 pb-24 md:px-10">
        <p className="eyebrow text-gold-deep">What we stand for</p>
        <ValuesStack values={values} />
      </section>

      <section id="contact" className="scroll-mt-24 mx-auto grid max-w-[1400px] gap-12 px-5 py-20 md:px-10 md:py-28 lg:grid-cols-2">
        <div>
          <p className="eyebrow text-magenta">Help</p>
          <h2 className="mt-3 font-display text-[clamp(2.4rem,5vw,4rem)] leading-none">Questions? We&apos;re here.</h2>
          <p className="mt-5 text-lg text-ink/70">
            Email us at{" "}
            <a href="mailto:hello@apsaraandco.com" className="font-medium text-ink underline underline-offset-4">
              hello@apsaraandco.com
            </a>{" "}
            and a real person will get back to you within a day.
          </p>
        </div>
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
      </section>
    </>
  );
}
