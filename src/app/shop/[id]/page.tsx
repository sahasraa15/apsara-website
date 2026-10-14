import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { productById, products } from "@/lib/products";
import { ProductDetail } from "@/components/shop/ProductDetail";
import { ProductCard } from "@/components/shop/ProductCard";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata(props: PageProps<"/shop/[id]">): Promise<Metadata> {
  const { id } = await props.params;
  const product = productById[id];
  if (!product) return {};
  return { title: product.name, description: product.blurb };
}

export default async function ProductPage(props: PageProps<"/shop/[id]">) {
  const { id } = await props.params;
  const product = productById[id];
  if (!product) notFound();

  const related = products
    .filter((p) => p.id !== product.id)
    .sort((a, b) => Number(b.line === product.line) - Number(a.line === product.line))
    .slice(0, 3);

  return (
    <>
      <ProductDetail product={product} />
      <section className="mx-auto max-w-[1400px] px-5 pb-20 md:px-10 md:pb-28">
        <h2 className="font-display text-4xl md:text-5xl">Pairs well with</h2>
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6 lg:grid-cols-3">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </>
  );
}
