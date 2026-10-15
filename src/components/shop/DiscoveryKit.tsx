"use client";

import { useState, type MouseEvent } from "react";
import { motion } from "framer-motion";
import { discoveryKit, formatPrice, products } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { Vessel } from "@/components/brand/Vessel";
import { Button } from "@/components/brand/Button";

export function DiscoveryKit() {
  const [open, setOpen] = useState(false);
  const [added, setAdded] = useState(false);
  const { add } = useCart();

  function addKit(e: MouseEvent<HTMLElement>) {
    add(discoveryKit.id, { from: e.currentTarget });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <motion.div
      id="discovery-kit"
      onViewportEnter={() => setOpen(true)}
      viewport={{ once: true, amount: 0.5 }}
      className="grid scroll-mt-28 items-center gap-8 overflow-hidden rounded-[2rem] bg-forest-deep p-6 text-white md:p-12 lg:grid-cols-2"
    >
      <div>
        <p className="eyebrow text-gold-light">New to Apsara?</p>
        <h2 className="mt-3 font-display text-[clamp(2.4rem,5vw,4rem)] leading-none">
          Try all four. <span className="gold-foil">Keep the {formatPrice(discoveryKit.price)}.</span>
        </h2>
        <p className="mt-4 max-w-md text-white/70">
          The Discovery Kit has travel minis of every product, about two weeks of each. Find your favorite and the full{" "}
          {formatPrice(discoveryKit.price)} comes off your first full-size order.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <Button variant="gold" onClick={addKit}>
            {added ? "Added to bag ✓" : `Add the kit · ${formatPrice(discoveryKit.price)}`}
          </Button>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="text-sm text-white/60 underline underline-offset-4 hover:text-white"
          >
            {open ? "Close the box" : "Peek inside"}
          </button>
        </div>
      </div>

      <div className="relative mx-auto h-72 w-full max-w-md">
        <motion.div
          className="absolute inset-x-6 bottom-0 h-28 rounded-2xl bg-[linear-gradient(180deg,#f3bfd0,#e0507e)] shadow-2xl"
          animate={{ y: open ? 10 : 0 }}
        />
        <div className="absolute inset-x-10 bottom-6 flex h-56 items-end justify-around">
          {products.map((p, i) => (
            <motion.div
              key={p.id}
              className="flex h-full items-end"
              initial={false}
              animate={{ y: open ? -40 - (i % 2) * 18 : 40, opacity: open ? 1 : 0, rotate: open ? (i - 1.5) * 6 : 0 }}
              transition={{ type: "spring", stiffness: 160, damping: 16, delay: open ? 0.3 + i * 0.08 : 0 }}
            >
              <div className="h-28">
                <Vessel product={p} />
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div
          className="absolute inset-x-4 bottom-[6.5rem] grid h-16 origin-bottom place-items-center rounded-2xl bg-[linear-gradient(180deg,#fae3ea,#f3bfd0)] shadow-xl"
          initial={false}
          animate={{ rotateX: open ? 110 : 0, opacity: open ? 0 : 1 }}
          transition={{ duration: 0.5 }}
          style={{ transformPerspective: 800 }}
        >
          <span className="font-display text-xl tracking-[0.3em] text-forest">APSARA</span>
        </motion.div>
      </div>
    </motion.div>
  );
}
