"use client";

import Link from "next/link";
import { useState, type PointerEvent, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Check, ChevronDown, Minus, Plus, RotateCcw, Truck } from "lucide-react";
import { formatPrice, ingredientsFor, type Product } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { Vessel, vesselHeight } from "@/components/brand/Vessel";
import { Button } from "@/components/brand/Button";
import { Stars } from "./Stars";

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
  const keyIngredients = ingredientsFor(product.id);

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 120, damping: 14 });
  const sry = useSpring(ry, { stiffness: 120, damping: 14 });
  const glare = useTransform(
    sry,
    [-18, 18],
    [
      "radial-gradient(circle at 25% 30%, rgba(255,255,255,0.45), transparent 45%)",
      "radial-gradient(circle at 75% 30%, rgba(255,255,255,0.45), transparent 45%)",
    ]
  );

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 36);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 24);
  };

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
          <div
            className="relative aspect-square overflow-hidden rounded-[2rem]"
            style={{ background: `radial-gradient(circle at 50% 40%, #ffffff 0%, ${product.tint} 75%)`, perspective: 900 }}
            onPointerMove={onMove}
            onPointerLeave={() => {
              rx.set(0);
              ry.set(0);
            }}
            data-cursor="Tilt"
          >
            <motion.div
              className="absolute inset-[14%] flex items-end justify-center"
              style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }}
            >
              <div className="flex w-full items-end justify-center" style={{ height: vesselHeight[product.vessel] }}>
                <Vessel
                  product={product}
                  className="drop-shadow-[0_40px_40px_rgba(77,8,33,0.2)]"
                />
              </div>
              <motion.div className="pointer-events-none absolute inset-0 mix-blend-overlay" style={{ background: glare }} />
            </motion.div>
            <p className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white/80 px-3 py-1 text-xs text-ink/60 backdrop-blur">
              Move your cursor to tilt
            </p>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="flex aspect-[4/3] flex-col justify-between rounded-3xl bg-white p-5 ring-1 ring-ink/5">
              <p className="text-xs font-medium text-ink/55">Texture</p>
              <span
                className="mx-auto h-16 w-28 rounded-[50%] md:h-20 md:w-36"
                style={{
                  background: `radial-gradient(ellipse at 35% 35%, #ffffffcc, ${product.fill} 55%)`,
                  boxShadow: `0 10px 30px ${product.fill}55`,
                }}
              />
              <p className="text-sm">{product.size}</p>
            </div>
            <div className="flex aspect-[4/3] flex-col justify-between rounded-3xl bg-white p-5 ring-1 ring-ink/5">
              <p className="text-xs font-medium text-ink/55">Hero ingredients</p>
              <div className="flex -space-x-3">
                {keyIngredients.map((ing) => (
                  <span
                    key={ing.id}
                    className="size-12 rounded-full ring-4 ring-white md:size-14"
                    style={{ background: `radial-gradient(circle at 35% 30%, #ffffff, ${ing.color} 75%)` }}
                  />
                ))}
              </div>
              <p className="text-sm">{product.notes.join(" · ")}</p>
            </div>
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

          <div className="mt-8 flex gap-3">
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
                  from: e.currentTarget as HTMLElement,
                });
                setAdded(true);
                setTimeout(() => setAdded(false), 1800);
              }}
            >
              {added ? "Added to bag ✓" : `Add to bag · ${formatPrice(product.price * qty)}`}
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
