import { doshaInfo, type Dosha } from "@/lib/products";
import { Button } from "@/components/brand/Button";
import { Reveal } from "@/components/brand/Reveal";
import { DoshaGlyph } from "@/components/shop/DoshaGlyph";

const order: Dosha[] = ["vata", "pitta", "kapha"];

export function QuizTeaser() {
  return (
    <section className="bg-[linear-gradient(180deg,#fff6f8_0%,#fbeedd_100%)] text-ink">
      <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-5 py-20 md:px-10 md:py-28 lg:grid-cols-2">
        <Reveal>
          <p className="eyebrow text-gold-deep">Not sure where to start?</p>
          <h2 className="mt-4 font-display text-[clamp(2.4rem,5vw,4.4rem)] leading-[1]">
            Take the 2-minute skin quiz.
          </h2>
          <p className="mt-5 max-w-md text-lg text-ink/70">
            Ayurveda groups skin into three types. Answer eight quick questions, find your mix, and get a routine built
            for it—15% off as a set.
          </p>
          <Button href="/quiz" variant="gold" size="lg" className="mt-8">
            Start the quiz
          </Button>
        </Reveal>
        <div className="grid gap-3 sm:grid-cols-3">
          {order.map((d, i) => (
            <Reveal key={d} delay={0.08 * i}>
              <div className="h-full rounded-3xl bg-white p-6 ring-1 ring-gold/25 transition-shadow hover:shadow-[0_18px_40px_-20px_rgba(138,98,36,0.45)]">
                <DoshaGlyph dosha={d} className="size-10 text-gold" />
                <p className="mt-6 font-display text-3xl">{doshaInfo[d].name}</p>
                <p className="mt-1 text-sm text-ink/60">{doshaInfo[d].plain}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
