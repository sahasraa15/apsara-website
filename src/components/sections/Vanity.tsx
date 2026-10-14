"use client";

import { useId, useRef, useState, type PointerEvent } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Star } from "lucide-react";
import { products, formatPrice, type Product } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { Vessel, vesselHeight } from "@/components/brand/Vessel";
import { GoldButton } from "@/components/brand/GoldButton";
import { cn } from "@/lib/utils";

const PANELS = products.length + 1;

function SpinningSeal({ color }: { color: string }) {
  const id = `seal-${useId().replace(/:/g, "")}`;
  return (
    <motion.svg
      viewBox="0 0 200 200"
      className="absolute inset-0 h-full w-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      aria-hidden
    >
      <defs>
        <path id={id} d="M100 100 m-86 0 a86 86 0 1 1 172 0 a86 86 0 1 1 -172 0" />
      </defs>
      <text fill={color} fontSize="7.2" style={{ fontFamily: "var(--font-caps), serif", letterSpacing: "0.42em" }}>
        <textPath href={`#${id}`}>
          APSARA &amp; CO · SMALL BATCH · HAND-NUMBERED · FIRST EDITION ·
        </textPath>
      </text>
    </motion.svg>
  );
}

function Petals({ color }: { color: string }) {
  const petals = [
    { x: "8%", y: "18%", s: 1, d: 0 },
    { x: "82%", y: "12%", s: 0.7, d: 1.2 },
    { x: "88%", y: "62%", s: 1.2, d: 0.6 },
    { x: "4%", y: "70%", s: 0.8, d: 1.8 },
    { x: "60%", y: "86%", s: 0.6, d: 2.4 },
  ];
  return (
    <>
      {petals.map((p, i) => (
        <motion.svg
          key={i}
          viewBox="0 0 20 30"
          className="absolute w-5"
          style={{ left: p.x, top: p.y, scale: p.s }}
          animate={{ y: [0, -18, 0], rotate: [0, 20, -10, 0] }}
          transition={{ duration: 6 + i, delay: p.d, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden
        >
          <path d="M10 1 C17 9 17 21 10 29 C3 21 3 9 10 1 Z" fill={color} opacity={0.7} />
          <path d="M10 4 V26" stroke="#fff" strokeOpacity={0.25} strokeWidth={0.6} />
        </motion.svg>
      ))}
    </>
  );
}

function Room({ product, index }: { product: Product; index: number }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 120, damping: 14 });
  const sry = useSpring(ry, { stiffness: 120, damping: 14 });
  const glare = useTransform(
    sry,
    [-18, 18],
    [
      "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.35), transparent 40%)",
      "radial-gradient(circle at 80% 30%, rgba(255,255,255,0.35), transparent 40%)",
    ]
  );

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 36);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 24);
  };

  const soldPct = Math.round((1 - product.left / 1200) * 100);

  return (
    <div className="relative grid h-full w-screen shrink-0 grid-rows-[42%_1fr] items-center gap-2 px-6 pb-24 pt-20 md:grid-cols-2 md:grid-rows-1 md:gap-10 md:px-[6vw] md:pb-16">
      <div
        className="relative order-1 flex h-full items-center justify-center md:order-2"
        onPointerMove={onMove}
        onPointerLeave={() => {
          rx.set(0);
          ry.set(0);
        }}
        data-cursor="Tilt"
        style={{ perspective: 900 }}
      >
        <div className="relative aspect-square h-[92%] max-h-[620px]">
          <div
            className="absolute inset-[8%] rounded-full blur-3xl"
            style={{ background: `radial-gradient(circle, ${product.fill}55, transparent 70%)` }}
          />
          <SpinningSeal color="#e3c27c99" />
          <div className="absolute inset-[13%] rounded-full border border-gold/25" />
          <Petals color={product.fill} />
          <motion.div
            className="absolute inset-[16%] flex items-end justify-center"
            style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }}
            animate={{ y: [0, -10, 0] }}
            transition={{ y: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
          >
            <div className="flex w-full items-end justify-center" style={{ height: vesselHeight[product.vessel] }}>
              <Vessel product={product} className="drop-shadow-[0_40px_50px_rgba(0,0,0,0.55)]" />
            </div>
            <motion.div
              className="pointer-events-none absolute inset-0 mix-blend-overlay"
              style={{ background: glare }}
            />
          </motion.div>
        </div>
      </div>

      <div className="relative order-2 self-start md:order-1 md:self-center">
        <p className="eyebrow flex items-center gap-3 text-gold-light/80">
          <span className="font-display text-base italic tracking-normal text-gold-light">
            №{String(index + 1).padStart(2, "0")}
          </span>
          <span className="h-px w-8 bg-gold/50" />
          {product.category} · {product.dosha}
        </p>
        <h3 className="mt-3 font-display text-[clamp(2.2rem,5.6vw,5.8rem)] leading-[0.92] tracking-[-0.015em] text-pearl md:mt-5">
          {product.name.split(" ").slice(0, -1).join(" ")}{" "}
          <span className="gold-text italic">{product.name.split(" ").slice(-1)}</span>
        </h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-pearl/75 md:mt-5 md:text-base">
          {product.blurb}
        </p>
        <p className="mt-4 hidden max-w-md font-display text-lg italic text-gold-light/90 md:block">
          “{product.ritual}”
        </p>
        <div className="mt-5 hidden flex-wrap gap-2 md:flex">
          {product.notes.map((n) => (
            <span
              key={n}
              className="rounded-full border border-gold/30 bg-night/30 px-3 py-1 text-xs text-pearl/80"
            >
              {n}
            </span>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-2 text-sm text-pearl/70 md:mt-6">
          <span className="flex text-gold-light">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-3.5 fill-current" strokeWidth={0} />
            ))}
          </span>
          {product.rating} · {product.reviews.toLocaleString()} early testers
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-4 md:mt-7 md:gap-6">
          <p className="font-display text-4xl text-pearl md:text-5xl">
            {formatPrice(product.price)}
            <span className="ml-2 align-middle font-body text-xs tracking-wider text-pearl/50">
              {product.size}
            </span>
          </p>
          <GoldButton
            onClick={(e) => {
              add(product.id, { from: e.currentTarget as HTMLElement });
              setAdded(true);
              setTimeout(() => setAdded(false), 1800);
            }}
          >
            {added ? "In your bag ✦" : "Add to bag"}
          </GoldButton>
        </div>
        <div className="mt-5 max-w-xs">
          <div className="flex justify-between text-[0.7rem] text-pearl/60">
            <span>
              Only <span className="text-gold-light">{product.left}</span> of 1,200 left
            </span>
            <span>{soldPct}% claimed</span>
          </div>
          <div className="mt-1.5 h-[3px] overflow-hidden rounded-full bg-pearl/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-gold to-magenta"
              initial={{ width: 0 }}
              whileInView={{ width: `${soldPct}%` }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProgressRail({ progress, active }: { progress: MotionValue<number>; active: number }) {
  const width = useTransform(progress, [0, 1], ["0%", "100%"]);
  const jump = (i: number) => {
    document.getElementById(`room-${products[i].id}`)?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="absolute inset-x-6 bottom-6 z-10 md:inset-x-[6vw] md:bottom-8">
      <div className="relative h-px bg-pearl/15">
        <motion.div className="absolute inset-y-0 left-0 bg-gold-light" style={{ width }} />
      </div>
      <div className="mt-3 flex justify-between">
        {products.map((p, i) => (
          <button
            key={p.id}
            type="button"
            onClick={() => jump(i)}
            className={cn(
              "font-caps text-[0.55rem] uppercase tracking-[0.2em] transition-colors md:text-[0.62rem]",
              active === i + 1 ? "text-gold-light" : "text-pearl/40 hover:text-pearl/80"
            )}
          >
            <span className="md:hidden">{String(i + 1).padStart(2, "0")}</span>
            <span className="hidden md:inline">{p.short}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function Vanity() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", `-${(PANELS - 1) * 100}vw`]);
  const stops = Array.from({ length: PANELS }, (_, i) => i / (PANELS - 1));
  const bg = useTransform(scrollYProgress, stops, ["#050e08", ...products.map((p) => p.room)]);
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.round(v * (PANELS - 1)));
  });

  return (
    <section
      id="vanity"
      ref={ref}
      className="relative"
      style={{ height: `${PANELS * 100}svh` }}
    >
      {products.map((p, i) => (
        <div
          key={p.id}
          id={`room-${p.id}`}
          className="pointer-events-none absolute left-0 h-px w-px"
          style={{ top: `${(i + 1) * 100}svh` }}
        />
      ))}

      <motion.div className="sticky top-0 h-[100svh] overflow-hidden" style={{ backgroundColor: bg }}>
        <div className="jali pointer-events-none absolute inset-0 opacity-[0.05]" />
        <div className="grain pointer-events-none absolute inset-0" />

        <motion.div className="relative flex h-full" style={{ x }}>
          <div className="relative flex h-full w-screen shrink-0 flex-col items-center justify-center px-6 text-center">
            <p className="eyebrow text-gold-light/80">The Vanity</p>
            <h2 className="mt-6 max-w-5xl font-display text-[clamp(2.8rem,8vw,8rem)] leading-[0.9] text-pearl">
              Six vessels.
              <br />
              <span className="gold-text italic">One quiet ceremony.</span>
            </h2>
            <p className="mt-8 max-w-md text-pearl/65">
              Hand-numbered, small batch, 1,200 of each. Keep scrolling and step into each room.
            </p>
            <motion.div
              className="mt-12 flex items-center gap-3 text-gold-light"
              animate={{ x: [0, 14, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="eyebrow">Scroll</span>
              <span className="h-px w-16 bg-gold-light" />
              <span>→</span>
            </motion.div>
          </div>
          {products.map((p, i) => (
            <Room key={p.id} product={p} index={i} />
          ))}
        </motion.div>

        <ProgressRail progress={scrollYProgress} active={active} />
      </motion.div>
    </section>
  );
}
