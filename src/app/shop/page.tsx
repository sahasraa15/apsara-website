import type { Metadata } from "next";
import Link from "next/link";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/shop/ProductCard";
import { Button } from "@/components/brand/Button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Shop all",
  description: "Shop modern Ayurvedic skincare and makeup from Apsara & Co.",
};

const filters = [
  { label: "All", value: undefined },
  { label: "Skincare", value: "Skincare" },
  { label: "Makeup", value: "Makeup" },
] as const;

export default async function ShopPage(props: PageProps<"/shop">) {
  const { line } = await props.searchParams;
  const active = line === "Skincare" || line === "Makeup" ? line : undefined;
  const shown = active ? products.filter((p) => p.line === active) : products;

  return (
    <>
      <section className="lotus-bg -mt-16 pt-16 md:-mt-[72px] md:pt-[72px]">
        <div className="mx-auto max-w-[1400px] px-5 pb-12 pt-10 md:px-10 md:pb-16 md:pt-16">
          <p className="eyebrow text-magenta">Shop</p>
          <h1 className="mt-3 font-display text-[clamp(3rem,7vw,5.5rem)] leading-none">
            {active ?? "All products"}
          </h1>
          <p className="mt-4 max-w-lg text-lg text-ink/65">
            Six hard-working essentials, each built around one Ayurvedic hero ingredient. Clean, vegan and made in
            small batches.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 py-10 md:px-10 md:py-14">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <nav aria-label="Filter products" className="flex gap-2">
            {filters.map((f) => (
              <Link
                key={f.label}
                href={f.value ? `/shop?line=${f.value}` : "/shop"}
                scroll={false}
                className={cn(
                  "rounded-full px-5 py-2 text-sm font-medium transition-colors",
                  active === f.value ? "bg-ink text-white" : "bg-white text-ink ring-1 ring-ink/10 hover:ring-ink/30"
                )}
              >
                {f.label}
              </Link>
            ))}
          </nav>
          <p className="text-sm text-ink/55">
            {shown.length} {shown.length === 1 ? "product" : "products"}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-12 md:gap-x-6 lg:grid-cols-3">
          {shown.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 pb-20 md:px-10 md:pb-28">
        <div className="flex flex-col items-start justify-between gap-6 rounded-[2rem] bg-forest p-8 text-white md:flex-row md:items-center md:p-12">
          <div>
            <h2 className="font-display text-4xl md:text-5xl">Not sure what you need?</h2>
            <p className="mt-2 text-white/75">Take the 60-second skin quiz and save 15% on your routine.</p>
          </div>
          <Button href="/quiz" variant="light" size="lg">
            Take the quiz
          </Button>
        </div>
      </section>
    </>
  );
}
