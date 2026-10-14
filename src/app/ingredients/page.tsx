import type { Metadata } from "next";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { ingredients, productById } from "@/lib/products";
import { IngredientWheel } from "@/components/ingredients/IngredientWheel";

export const metadata: Metadata = {
  title: "Ingredients",
  description: "The Ayurvedic botanicals behind every Apsara & Co. formula, and where they come from.",
};

const neverList = [
  "Parabens",
  "Sulfates",
  "Phthalates",
  "Mineral oil",
  "Synthetic fragrance",
  "Synthetic dyes",
  "Animal-derived ingredients",
  "Formaldehyde releasers",
];

export default function IngredientsPage() {
  return (
    <>
      <section className="lotus-bg -mt-16 pt-16 md:-mt-[72px] md:pt-[72px]">
        <div className="mx-auto max-w-[1400px] px-5 pb-16 pt-10 md:px-10 md:pt-16">
          <p className="eyebrow text-magenta">Ingredients</p>
          <h1 className="mt-3 max-w-3xl font-display text-[clamp(3rem,7vw,5.5rem)] leading-none">
            Ayurvedic botanicals, held to modern standards.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-ink/65">
            Each product is built around one hero ingredient that Ayurveda has relied on for centuries. We trace every
            one back to the farm, then test the finished formula with dermatologists.
          </p>
          <div className="mt-14">
            <IngredientWheel />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
        <h2 className="font-display text-4xl md:text-5xl">The full list</h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ingredients.map((ing) => (
            <article id={ing.id} key={ing.id} className="scroll-mt-28 rounded-3xl bg-white p-6 ring-1 ring-ink/5">
              <div className="flex items-center gap-4">
                <span
                  className="size-14 shrink-0 rounded-full"
                  style={{ background: `radial-gradient(circle at 35% 30%, #ffffff, ${ing.color} 80%)` }}
                />
                <div>
                  <h3 className="font-display text-3xl leading-none">{ing.name}</h3>
                  <p className="mt-1 text-sm text-magenta">{ing.role}</p>
                </div>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-ink/70">{ing.story}</p>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-ink/10 pt-4 text-xs">
                <span className="flex items-center gap-1.5 text-ink/55">
                  <MapPin className="size-3.5" /> {ing.origin}
                </span>
                <span className="flex flex-wrap gap-2">
                  {ing.products.map((id) => (
                    <Link
                      key={id}
                      href={`/shop/${id}`}
                      className="rounded-full bg-petal px-3 py-1 font-medium text-ink hover:bg-lotus"
                    >
                      {productById[id].short}
                    </Link>
                  ))}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-forest text-white">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-20 md:px-10 md:py-24 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-4xl md:text-5xl">What we never use</h2>
            <p className="mt-4 max-w-md text-white/75">
              Traditional doesn&apos;t mean unregulated. Every formula meets EU cosmetic standards, which ban over 1,300
              ingredients.
            </p>
          </div>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
            {neverList.map((item) => (
              <li key={item} className="flex items-center gap-3 border-b border-white/10 pb-3 text-sm">
                <span className="text-lotus">✕</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
