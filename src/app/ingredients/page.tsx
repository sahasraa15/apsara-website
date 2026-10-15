import type { Metadata } from "next";
import { IngredientPanels } from "@/components/ingredients/IngredientPanels";
import { GrowMap } from "@/components/ingredients/GrowMap";

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
      <section className="lotus-wash -mt-16 pt-16 md:-mt-[72px] md:pt-[72px]">
        <div className="mx-auto max-w-[1400px] px-5 pb-16 pt-10 md:px-10 md:pt-16">
          <p className="eyebrow text-magenta">Ingredients</p>
          <h1 className="mt-3 max-w-3xl font-display text-[clamp(3rem,7vw,5.5rem)] leading-none">
            Ayurvedic botanicals, held to modern standards.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-ink/65">
            Each product is built around one hero ingredient that Ayurveda has relied on for centuries. We trace every
            one back to the farm, then test the finished formula with dermatologists.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 py-16 md:px-10 md:py-24">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-4xl md:text-6xl">Meet the botanicals.</h2>
          <p className="text-sm text-ink/55">
            <span className="hidden lg:inline">Hover</span>
            <span className="lg:hidden">Tap</span> an ingredient to explore it.
          </p>
        </div>
        <IngredientPanels />
      </section>

      <section className="mx-auto max-w-[1400px] px-5 pb-16 md:px-10 md:pb-24">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-4xl md:text-6xl">Where it grows.</h2>
            <p className="mt-3 max-w-xl text-ink/65">
              Every botanical comes from the region of India that grows it best.
            </p>
          </div>
          <p className="text-sm text-ink/55">Tap a pin to visit the farm.</p>
        </div>
        <GrowMap />
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
