"use client";

import { useRef, type PointerEvent } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { products } from "@/lib/products";
import { Vessel } from "@/components/brand/Vessel";
import { GoldButton } from "@/components/brand/GoldButton";

const ARCH = "M0 1 V0.357 A0.5 0.357 0 0 1 1 0.357 V1 Z";

const shelf = [
  { id: "kajal-liner", h: "70%" },
  { id: "lotus-serum", h: "80%" },
  { id: "kumkumadi-oil", h: "100%" },
  { id: "beetroot-tint", h: "42%" },
  { id: "haldi-mask", h: "36%" },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const archScale = useTransform(scrollYProgress, [0, 1], [1, 4.2]);
  const archY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.3], [0, -90]);
  const fade = useTransform(scrollYProgress, [0.7, 1], [0, 1]);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.4);
  const smx = useSpring(mx, { stiffness: 60, damping: 18 });
  const smy = useSpring(my, { stiffness: 60, damping: 18 });
  const lampX = useTransform(smx, (v) => `${v * 100}%`);
  const lampY = useTransform(smy, (v) => `${v * 100}%`);
  const glow = useMotionTemplate`radial-gradient(600px circle at ${lampX} ${lampY}, rgba(227,194,124,0.13), transparent 60%)`;
  const tiltX = useTransform(smy, [0, 1], [6, -6]);
  const tiltY = useTransform(smx, [0, 1], [-8, 8]);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };

  return (
    <section id="top" ref={ref} className="relative h-[230vh] bg-night">
      <div
        className="sticky top-0 h-[100svh] overflow-hidden"
        onPointerMove={onMove}
        style={{ perspective: 1200 }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_45%,#0c5029_0%,#0a1c10_55%,#050e08_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[radial-gradient(ellipse_60%_80%_at_50%_100%,#a1104733,transparent_70%)]" />
        <motion.div className="absolute inset-0" style={{ background: glow }} />
        <div className="grain pointer-events-none absolute inset-0" />

        <svg width="0" height="0" className="absolute">
          <clipPath id="hero-arch" clipPathUnits="objectBoundingBox">
            <path d={ARCH} />
          </clipPath>
        </svg>

        <motion.div
          className="absolute left-1/2 top-[36%] h-[min(40svh,440px)] w-auto -translate-x-1/2 -translate-y-1/2 lg:top-[53%] lg:h-[min(72svh,700px)]"
          style={{ scale: archScale, y: archY, aspectRatio: "400 / 560", rotateX: tiltX, rotateY: tiltY }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.1, ease }}
        >
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_85%,#a1104766,transparent_65%),linear-gradient(180deg,#0b3019,#0a1c10_70%)]"
            style={{ clipPath: "url(#hero-arch)" }}
          >
            <div className="absolute inset-x-[5%] bottom-[16%] flex h-[42%] items-end justify-center gap-[1.5%]">
              {shelf.map((s, i) => {
                const p = products.find((x) => x.id === s.id)!;
                return (
                  <motion.a
                    key={s.id}
                    href={`#room-${s.id}`}
                    aria-label={p.name}
                    data-cursor="View"
                    className="relative flex h-full items-end"
                    initial={{ y: 60, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 + i * 0.08, duration: 0.9, ease }}
                    whileHover={{ y: -14, scale: 1.06 }}
                    style={{ height: s.h }}
                  >
                    <Vessel product={p} className="drop-shadow-[0_18px_30px_rgba(0,0,0,0.6)]" />
                  </motion.a>
                );
              })}
            </div>
            <div className="absolute inset-x-[6%] bottom-[15%] h-px bg-pearl/30" />
            <div className="absolute inset-x-0 bottom-0 h-[15%] bg-gradient-to-b from-forest-deep/80 to-night" />
          </div>
          <svg
            viewBox="0 0 1 1"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
          >
            <path d={ARCH} fill="none" stroke="#f1e8d6" strokeOpacity={0.3} strokeWidth={1} vectorEffect="non-scaling-stroke" />
          </svg>
        </motion.div>

        <motion.div
          className="pointer-events-none absolute inset-x-0 top-[9%] px-5 text-center lg:top-[11%]"
          style={{ opacity: textOpacity }}
        >
          <motion.p
            className="eyebrow text-[0.6rem]! text-pearl/75 sm:text-[0.72rem]!"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 1 }}
          >
            Clean Ayurvedic skincare &amp; color
          </motion.p>
        </motion.div>

        <motion.div
          className="pointer-events-none absolute inset-x-0 bottom-[25%] z-10 px-5 lg:inset-y-0 lg:flex lg:items-center lg:px-[4vw]"
          style={{ opacity: textOpacity, y: textY }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 1.1, ease }}
            className="flex w-full flex-col items-center text-center font-display text-[clamp(2.6rem,11vw,4.5rem)] leading-[0.9] tracking-[-0.02em] text-pearl [text-shadow:0_10px_60px_#050e08] lg:grid lg:grid-cols-[1fr_min(52svh,500px)_1fr] lg:items-center lg:text-[clamp(4rem,6.4vw,7.5rem)]"
          >
            <span className="lg:pr-4 lg:text-right">
              Grandma
              <br className="hidden lg:block" /> was right.
            </span>
            <span aria-hidden className="hidden lg:block" />
            <span className="gold-text italic lg:pl-4 lg:text-left">
              Science
              <br className="hidden lg:block" /> caught up.
            </span>
          </motion.h1>
        </motion.div>

        <motion.div className="absolute inset-x-0 bottom-[5%] z-10 px-5" style={{ opacity: textOpacity }}>
          <motion.div
            className="flex flex-wrap items-center justify-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1, ease }}
          >
            <GoldButton href="#vanity">Shop the collection</GoldButton>
            <GoldButton href="#consult" variant="outline">
              Take the skin quiz
            </GoldButton>
          </motion.div>
        </motion.div>

        <motion.div className="pointer-events-none absolute inset-0 bg-night" style={{ opacity: fade }} />
      </div>
    </section>
  );
}
