import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/shop/ProductCard";
import { Reveal } from "@/components/brand/Reveal";

export function Bestsellers() {
  const picks = products.filter((p) => p.bestseller);
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
      <Reveal className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow text-magenta">Bestsellers</p>
          <h2 className="mt-3 font-display text-[clamp(2.4rem,5vw,4rem)] leading-none">The ones everyone reorders</h2>
        </div>
        <Link href="/shop" className="group inline-flex items-center gap-2 text-sm font-medium">
          Shop all products
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </Reveal>
      <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6 lg:grid-cols-4">
        {picks.map((p, i) => (
          <Reveal key={p.id} delay={0.06 * i}>
            <ProductCard product={p} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
