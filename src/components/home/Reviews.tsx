import Link from "next/link";
import { productById, reviews } from "@/lib/products";
import { Reveal } from "@/components/brand/Reveal";
import { Stars } from "@/components/shop/Stars";

export function Reviews() {
  return (
    <section className="bg-petal/60">
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
        <Reveal className="text-center">
          <p className="eyebrow text-magenta">Reviews</p>
          <h2 className="mt-3 font-display text-[clamp(2.4rem,5vw,4rem)] leading-none">Don&apos;t take our word for it</h2>
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-3 md:gap-6">
          {reviews.map((r, i) => {
            const p = productById[r.product];
            return (
              <Reveal key={r.name} delay={0.08 * i}>
                <figure className="flex h-full flex-col rounded-3xl bg-white p-7 shadow-[0_10px_40px_rgba(77,8,33,0.06)]">
                  <Stars rating={5} />
                  <blockquote className="mt-4 flex-1 font-display text-2xl leading-snug">“{r.quote}”</blockquote>
                  <figcaption className="mt-6 flex items-center justify-between gap-3 text-sm">
                    <span>
                      <span className="font-medium">{r.name}</span>
                      <span className="text-ink/50"> · {r.place}</span>
                    </span>
                    <Link href={`/shop/${p.id}`} className="shrink-0 text-xs text-magenta hover:underline">
                      {p.short}
                    </Link>
                  </figcaption>
                </figure>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
