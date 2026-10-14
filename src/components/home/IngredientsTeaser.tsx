import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ingredients } from "@/lib/products";
import { Reveal } from "@/components/brand/Reveal";

export function IngredientsTeaser() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="eyebrow text-magenta">What&apos;s inside</p>
        <h2 className="mt-3 font-display text-[clamp(2.4rem,5vw,4rem)] leading-none">
          Ingredients you can actually pronounce
        </h2>
        <p className="mt-4 text-ink/65">
          Every formula starts with a hero botanical from the Ayurvedic tradition, sourced from the farm it grows on.
        </p>
      </Reveal>
      <div className="mt-12 flex flex-wrap justify-center gap-x-6 gap-y-8 md:gap-x-10">
        {ingredients.map((ing, i) => (
          <Reveal key={ing.id} delay={0.04 * i}>
            <Link href={`/ingredients#${ing.id}`} className="group flex w-24 flex-col items-center text-center md:w-28">
              <span
                className="size-20 rounded-full shadow-[0_12px_30px_rgba(77,8,33,0.12)] transition-transform duration-300 group-hover:-translate-y-1.5 group-hover:scale-105 md:size-24"
                style={{ background: `radial-gradient(circle at 35% 30%, #ffffff, ${ing.color} 75%)` }}
              />
              <span className="mt-3 text-sm font-medium">{ing.name}</span>
              <span className="text-xs text-ink/55">{ing.role}</span>
            </Link>
          </Reveal>
        ))}
      </div>
      <div className="mt-12 text-center">
        <Link href="/ingredients" className="group inline-flex items-center gap-2 text-sm font-medium">
          Explore all ingredients
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
