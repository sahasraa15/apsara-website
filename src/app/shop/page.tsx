import type { Metadata } from "next";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/shop/ProductCard";
import { Button } from "@/components/brand/Button";

export const metadata: Metadata = {
  title: "Shop all",
  description: "Shop modern Ayurvedic skincare from Apsara & Co.",
};

export default function ShopPage() {
  return (
    <>
      <section className="lotus-bg -mt-16 pt-16 md:-mt-[72px] md:pt-[72px]">
        <div className="mx-auto max-w-[1400px] px-5 pb-12 pt-10 md:px-10 md:pb-16 md:pt-16">
          <p className="eyebrow text-magenta">Shop</p>
          <h1 className="mt-3 font-display text-[clamp(3rem,7vw,5.5rem)] leading-none">
            All products
          </h1>
          <p className="mt-4 max-w-lg text-lg text-ink/65">
            Four hard-working essentials, each built around one Ayurvedic hero ingredient. Clean, vegan and made in
            small batches.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 py-10 md:px-10 md:py-14">
        <p className="text-sm text-ink/55">{products.length} products</p>

        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-12 md:gap-x-6 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 pb-20 md:px-10 md:pb-28">
        <div className="flex flex-col items-start justify-between gap-6 rounded-[2rem] bg-forest p-8 text-white md:flex-row md:items-center md:p-12">
          <div>
            <h2 className="font-display text-4xl md:text-5xl">Not sure what you need?</h2>
            <p className="mt-2 text-white/75">Take the 2-minute skin quiz and save 15% on your routine.</p>
          </div>
          <Button href="/quiz" variant="light" size="lg">
            Take the quiz
          </Button>
        </div>
      </section>
    </>
  );
}
