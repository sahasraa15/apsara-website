"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { Check, ChevronDown, Minus, Plus, RefreshCw, RotateCcw, Truck } from "lucide-react";
import { formatPrice, ingredientsFor, type Product } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/brand/Button";
import { Stars } from "./Stars";
import { ProductFacts } from "./ProductFacts";
import { ProductStage } from "./ProductStage";
import { lasts } from "@/lib/productDetails";
import { cn } from "@/lib/utils";

const SUBSCRIBE_DISCOUNT = 0.1;

function Accordion({ title, children, defaultOpen = false }: { title: string; children: ReactNode; defaultOpen?: boolean }) {
  return (
    <details className="group border-b border-ink/10 py-4" open={defaultOpen}>
      <summary className="flex cursor-pointer list-none items-center justify-between font-medium [&::-webkit-details-marker]:hidden">
        {title}
        <ChevronDown className="size-4 transition-transform group-open:rotate-180" />
      </summary>
      <div className="pt-3 text-sm leading-relaxed text-ink/70">{children}</div>
    </details>
  );
}

export function ProductDetail({ product }: { product: Product }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [subscribe, setSubscribe] = useState(false);
  const every = lasts[product.id].weeks;
  const unit = subscribe ? Math.round(product.price * (1 - SUBSCRIBE_DISCOUNT) * 100) / 100 : product.price;
  const keyIngredients = ingredientsFor(product.id);

  return (
    <section className="mx-auto max-w-[1400px] px-5 pb-20 pt-6 md:px-10 md:pb-28 md:pt-10">
      <nav aria-label="Breadcrumb" className="text-sm text-ink/55">
        <Link href="/shop" className="hover:text-ink">
          Shop
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink">{product.short}</span>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <div>
          <ProductStage product={product} />

          <div className="mt-4">
            <ProductFacts product={product} />
          </div>
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <p className="text-sm text-ink/55">{product.category}</p>
          <h1 className="mt-1 font-display text-[clamp(2.6rem,5vw,4.2rem)] leading-[1]">{product.name}</h1>
          <div className="mt-3 flex items-center gap-2 text-sm text-ink/65">
            <Stars rating={product.rating} />
            <span className="font-medium text-ink">{product.rating}</span>
            <span>({product.reviews.toLocaleString()} reviews)</span>
          </div>
          <p className="mt-5 font-display text-4xl">{formatPrice(product.price)}</p>
          <p className="mt-5 text-lg leading-relaxed text-ink/75">{product.blurb}</p>

          <ul className="mt-6 space-y-2">
            {product.benefits.map((b) => (
              <li key={b} className="flex items-center gap-3 text-sm">
                <span className="flex size-5 items-center justify-center rounded-full bg-forest text-white">
                  <Check className="size-3" />
                </span>
                {b}
              </li>
            ))}
          </ul>

          <div className="mt-8 grid gap-2 sm:grid-cols-2">
            {[
              { on: false, title: "One-time", copy: formatPrice(product.price) },
              {
                on: true,
                title: "Subscribe & save 10%",
                copy: `${formatPrice(Math.round(product.price * (1 - SUBSCRIBE_DISCOUNT) * 100) / 100)} · every ${every} weeks`,
              },
            ].map((o) => (
              <button
                key={o.title}
                type="button"
                onClick={() => setSubscribe(o.on)}
                className={cn(
                  "flex items-start gap-3 rounded-2xl p-4 text-left ring-1 transition",
                  subscribe === o.on ? "bg-petal ring-magenta/40" : "ring-ink/10 hover:ring-ink/25"
                )}
              >
                <span
                  className={cn(
                    "mt-0.5 grid size-5 shrink-0 place-items-center rounded-full",
                    subscribe === o.on ? "bg-magenta text-white" : "ring-1 ring-ink/25"
                  )}
                >
                  {subscribe === o.on && <Check className="size-3" />}
                </span>
                <span>
                  <span className="flex items-center gap-1.5 text-sm font-medium">
                    {o.on && <RefreshCw className="size-3.5 text-forest" />}
                    {o.title}
                  </span>
                  <span className="mt-0.5 block text-xs text-ink/60">{o.copy}</span>
                </span>
              </button>
            ))}
          </div>
          {subscribe && (
            <p className="mt-2 text-xs text-ink/55">
              Timed to arrive right before you run out. Skip, pause or cancel anytime.
            </p>
          )}

          <div className="mt-4 flex gap-3">
            <div className="flex items-center rounded-full ring-1 ring-ink/15">
              <button type="button" aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-3.5">
                <Minus className="size-4" />
              </button>
              <span className="w-6 text-center tabular-nums">{qty}</span>
              <button type="button" aria-label="Increase quantity" onClick={() => setQty((q) => q + 1)} className="p-3.5">
                <Plus className="size-4" />
              </button>
            </div>
            <Button
              size="lg"
              className="flex-1"
              onClick={(e) => {
                add(product.id, {
                  qty,
                  price: unit,
                  bundle: subscribe ? `Every ${every} weeks · 10% off` : undefined,
                  from: e.currentTarget as HTMLElement,
                });
                setAdded(true);
                setTimeout(() => setAdded(false), 1800);
              }}
            >
              {added ? "Added to bag ✓" : `Add to bag · ${formatPrice(Math.round(unit * qty * 100) / 100)}`}
            </Button>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3 text-xs text-ink/65">
            <p className="flex items-center gap-2">
              <Truck className="size-4" strokeWidth={1.6} /> Free shipping over $50
            </p>
            <p className="flex items-center gap-2">
              <RotateCcw className="size-4" strokeWidth={1.6} /> 30-day happy-skin returns
            </p>
          </div>

          <div className="mt-8 border-t border-ink/10">
            <Accordion title="How to use" defaultOpen>
              {product.ritual}
            </Accordion>
            <Accordion title="Key ingredients">
              <ul className="space-y-2">
                {keyIngredients.map((ing) => (
                  <li key={ing.id}>
                    <Link href={`/ingredients#${ing.id}`} className="font-medium text-ink hover:underline">
                      {ing.name}
                    </Link>{" "}
                    — {ing.role.toLowerCase()}. {ing.story}
                  </li>
                ))}
              </ul>
            </Accordion>
            <Accordion title="Who it's for">
              {product.dosha}. Not sure about your skin type?{" "}
              <Link href="/quiz" className="font-medium text-ink underline underline-offset-2">
                Take the skin quiz
              </Link>
              .
            </Accordion>
            <Accordion title="What it's free of">
              Parabens, sulfates, phthalates, mineral oil, synthetic fragrance and synthetic dyes. Vegan, cruelty-free
              and dermatologist tested.
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
