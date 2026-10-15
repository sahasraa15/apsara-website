"use client";

import Link from "next/link";
import { type PointerEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";
import { productById } from "@/lib/products";
import { Vessel } from "@/components/brand/Vessel";
import { Button } from "@/components/brand/Button";
import { Stars } from "@/components/shop/Stars";

const ease = [0.22, 1, 0.36, 1] as const;

const group = [
  { id: "neem-cleanser", h: "70%", left: "6%", depth: 12 },
  { id: "lotus-serum", h: "72%", left: "25%", depth: 22 },
  { id: "kumkumadi-oil", h: "88%", left: "46%", depth: 34 },
  { id: "haldi-mask", h: "36%", left: "68%", depth: 18 },
];

const chips = [
  { label: "Saffron", note: "evens tone", className: "left-[2%] top-[16%]", delay: 0 },
  { label: "Neem", note: "clears pores", className: "right-[0%] top-[30%]", delay: 1.2 },
  { label: "Pink lotus", note: "calms redness", className: "left-[12%] bottom-[2%]", delay: 0.6 },
];

function Piece({
  id,
  h,
  left,
  depth,
  mx,
  my,
  index,
}: (typeof group)[number] & { mx: MotionValue<number>; my: MotionValue<number>; index: number }) {
  const p = productById[id];
  const x = useTransform(mx, [-0.5, 0.5], [-depth, depth]);
  const y = useTransform(my, [-0.5, 0.5], [-depth * 0.6, depth * 0.6]);
  return (
    <motion.div className="absolute bottom-[14%] w-[22%]" style={{ left, height: "64%", x, y }}>
      <motion.div
        className="flex h-full items-end justify-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 + index * 0.08, duration: 0.9, ease }}
      >
        <Link
          href={`/shop/${id}`}
          aria-label={p.name}
          data-cursor="View"
          className="flex w-full items-end justify-center transition-transform duration-300 hover:-translate-y-3"
          style={{ height: h }}
        >
          <Vessel product={p} className="drop-shadow-[0_26px_26px_rgba(77,8,33,0.2)]" />
        </Link>
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 70, damping: 18 });
  const smy = useSpring(my, { stiffness: 70, damping: 18 });
  const discX = useTransform(smx, [-0.5, 0.5], [12, -12]);
  const discY = useTransform(smy, [-0.5, 0.5], [12, -12]);

  const onMove = (e: PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section
      onPointerMove={onMove}
      className="lotus-bg relative -mt-16 overflow-hidden pt-16 md:-mt-[72px] md:pt-[72px]"
    >
      <div className="mx-auto grid max-w-[1400px] items-center gap-8 px-5 pb-16 pt-8 md:px-10 lg:min-h-[calc(100svh-104px)] lg:grid-cols-[1fr_1.05fr] lg:gap-6 lg:pb-10 lg:pt-0">
        <div className="relative z-10 max-w-xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3.5 py-1.5 text-xs font-medium text-ink shadow-sm"
          >
            <span className="size-1.5 rounded-full bg-forest" />
            Ayurvedic skincare
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.9, ease }}
            className="mt-6 font-display text-[clamp(3.2rem,8vw,6.6rem)] leading-[0.95] tracking-[-0.02em] text-ink"
          >
            Modern Ayurveda
            <br />
            <span className="italic text-magenta">for everyday skin.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16, duration: 0.9, ease }}
            className="mt-6 max-w-md text-lg leading-relaxed text-ink/70"
          >
            Plant-powered formulas built on botanicals that have worked for centuries—made clean, vegan and
            dermatologist tested.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24, duration: 0.9, ease }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Button href="/shop" size="lg">
              Shop all
            </Button>
            <Button href="/quiz" size="lg" variant="outline">
              Find my routine
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.9 }}
            className="mt-8 flex items-center gap-2 text-sm text-ink/65"
          >
            <Stars rating={5} />
            <span>
              <span className="font-medium text-ink">4.9</span> from 3,900+ early testers
            </span>
          </motion.div>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-[640px]">
          <motion.div className="absolute inset-[4%]" style={{ x: discX, y: discY }}>
            <motion.div
              className="h-full w-full rounded-full bg-[radial-gradient(circle_at_50%_35%,#ffffff_0%,#fde3eb_45%,#f5bdcf_100%)] shadow-[inset_0_-30px_60px_rgba(161,16,71,0.12)]"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.1, ease }}
            />
          </motion.div>
          <div className="absolute inset-x-[10%] bottom-[13%] h-[6%] rounded-[50%] bg-[radial-gradient(ellipse,rgba(77,8,33,0.16),transparent_70%)]" />
          {group.map((g, i) => (
            <Piece key={g.id} {...g} mx={smx} my={smy} index={i} />
          ))}
          {chips.map((c) => (
            <motion.div
              key={c.label}
              className={`absolute z-10 hidden rounded-2xl bg-white/90 px-4 py-2.5 shadow-[0_10px_30px_rgba(77,8,33,0.12)] backdrop-blur sm:block ${c.className}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
              transition={{
                opacity: { delay: 0.8 + c.delay * 0.3, duration: 0.6 },
                scale: { delay: 0.8 + c.delay * 0.3, duration: 0.6 },
                y: { delay: c.delay, duration: 5, repeat: Infinity, ease: "easeInOut" },
              }}
            >
              <p className="text-sm font-medium text-ink">{c.label}</p>
              <p className="text-xs text-ink/60">{c.note}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
