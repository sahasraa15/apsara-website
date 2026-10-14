import { doshaInfo, type Dosha } from "@/lib/products";
import { Button } from "@/components/brand/Button";
import { Reveal } from "@/components/brand/Reveal";
import { DoshaGlyph } from "@/components/shop/DoshaGlyph";

const order: Dosha[] = ["vata", "pitta", "kapha"];

export function QuizTeaser() {
  return (
    <section className="bg-forest text-white">
      <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-5 py-20 md:px-10 md:py-28 lg:grid-cols-2">
        <Reveal>
          <p className="eyebrow text-lotus">Not sure where to start?</p>
          <h2 className="mt-4 font-display text-[clamp(2.4rem,5vw,4.4rem)] leading-[1]">
            Take the 60-second skin quiz.
          </h2>
          <p className="mt-5 max-w-md text-lg text-white/75">
            Ayurveda groups skin into three types. Answer three quick questions, find yours, and get a routine built
            for it—15% off as a set.
          </p>
          <Button href="/quiz" variant="light" size="lg" className="mt-8">
            Start the quiz
          </Button>
        </Reveal>
        <div className="grid gap-3 sm:grid-cols-3">
          {order.map((d, i) => (
            <Reveal key={d} delay={0.08 * i}>
              <div className="h-full rounded-3xl bg-white/[0.07] p-6 ring-1 ring-white/10 transition-colors hover:bg-white/[0.12]">
                <DoshaGlyph dosha={d} className="size-10 text-lotus" />
                <p className="mt-6 font-display text-3xl">{doshaInfo[d].name}</p>
                <p className="mt-1 text-sm text-white/70">{doshaInfo[d].plain} skin</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
