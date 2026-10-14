"use client";

import Link from "next/link";
import { useState, type PointerEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Check, Plus } from "lucide-react";
import { formatPrice, type Product } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { Vessel, vesselHeight } from "@/components/brand/Vessel";
import { Stars } from "./Stars";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 150, damping: 15 });
  const sry = useSpring(ry, { stiffness: 150, damping: 15 });

  const onMove = (e: PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 20);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 14);
  };

  return (
    <article className="group relative flex flex-col">
      <div className="relative">
        <Link
          href={`/shop/${product.id}`}
          data-cursor="View"
          onPointerMove={onMove}
          onPointerLeave={() => {
            rx.set(0);
            ry.set(0);
          }}
          className="relative block aspect-[4/5] overflow-hidden rounded-3xl"
          style={{
            background: `radial-gradient(circle at 50% 40%, #ffffff 0%, ${product.tint} 70%)`,
            perspective: 800,
          }}
        >
          {product.bestseller && (
            <span className="absolute left-4 top-4 z-10 rounded-full bg-white px-3 py-1 text-xs font-medium text-ink shadow-sm">
              Bestseller
            </span>
          )}
          <motion.div
            className="absolute inset-[14%_18%_12%] flex items-end justify-center transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-[1.04]"
            style={{ rotateX: srx, rotateY: sry }}
          >
            <div className="flex w-full items-end justify-center" style={{ height: vesselHeight[product.vessel] }}>
              <Vessel product={product} className="drop-shadow-[0_24px_24px_rgba(77,8,33,0.18)]" />
            </div>
          </motion.div>
        </Link>

        <motion.button
          type="button"
          aria-label={`Add ${product.name} to bag`}
          data-cursor="Add"
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            add(product.id, { from: e.currentTarget });
            setAdded(true);
            setTimeout(() => setAdded(false), 1500);
          }}
          className="absolute bottom-3 right-3 z-10 flex h-11 items-center gap-1.5 rounded-full bg-ink px-4 text-sm font-medium text-white shadow-lg transition-all hover:bg-forest md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:focus-visible:opacity-100"
        >
          {added ? <Check className="size-4" /> : <Plus className="size-4" />}
          {added ? "Added" : "Add"}
        </motion.button>
      </div>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs text-ink/55">{product.category}</p>
          <Link href={`/shop/${product.id}`} className="mt-0.5 block font-medium leading-snug hover:underline">
            {product.name}
          </Link>
          <p className="mt-0.5 text-sm text-ink/60">{product.tagline}</p>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-ink/60">
            <Stars rating={product.rating} />
            {product.rating} ({product.reviews.toLocaleString()})
          </div>
        </div>
        <p className="font-medium">{formatPrice(product.price)}</p>
      </div>
    </article>
  );
}
