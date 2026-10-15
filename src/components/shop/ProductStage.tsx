"use client";

import { useRef, useState, type PointerEvent } from "react";
import { AnimatePresence, animate, motion, useMotionValue, useMotionValueEvent, useTransform } from "framer-motion";
import { Droplet, RotateCw } from "lucide-react";
import { ingredientsFor, type Product } from "@/lib/products";
import { feel } from "@/lib/productDetails";
import { Vessel, vesselHeight } from "@/components/brand/Vessel";

function feelWords(id: string) {
  const f = feel[id];
  const texture = f.texture < 30 ? "Water-light" : f.texture < 60 ? "Silky" : f.texture < 80 ? "Rich" : "Thick & creamy";
  const finish = f.finish < 35 ? "dewy finish" : f.finish < 65 ? "natural finish" : "matte finish";
  return `${texture}, ${finish}`;
}

function Drop({ product, onDone }: { product: Product; onDone: () => void }) {
  const f = feel[product.id];
  const width = 18 + (f.texture / 100) * 10;
  const shine = 1 - f.finish / 100;
  return (
    <div className="pointer-events-none absolute inset-0 z-20">
      <motion.span
        className="absolute left-[16%] block h-6 w-4 -translate-x-1/2 rounded-[50%_50%_50%_50%/60%_60%_40%_40%]"
        style={{ background: `radial-gradient(circle at 35% 30%, #ffffffcc, ${product.fill} 60%)` }}
        initial={{ top: "8%", opacity: 0, scaleY: 0.6 }}
        animate={{ top: ["8%", "8%", "82%"], opacity: [0, 1, 1], scaleY: [0.6, 1, 1.3] }}
        transition={{ duration: 0.9, times: [0, 0.25, 1], ease: "easeIn" }}
      />
      <motion.span
        className="absolute bottom-[12%] left-[16%] block -translate-x-1/2 rounded-[50%]"
        style={{
          width: `${width}%`,
          height: `${width * 0.38}%`,
          background: `radial-gradient(ellipse at 40% 35%, rgba(255,255,255,${0.25 + shine * 0.6}), ${product.fill} 45%, ${product.fill}00 72%)`,
          filter: `blur(${f.texture > 70 ? 0 : 1}px)`,
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.08, 1, 1], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 3.4, delay: 0.85, times: [0, 0.12, 0.2, 1] }}
        onAnimationComplete={onDone}
      />
      <motion.span
        className="absolute bottom-[4%] left-[16%] block -translate-x-1/2 whitespace-nowrap rounded-full bg-white/90 px-3 py-1 text-xs text-ink shadow-sm"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: [0, 1, 1, 0], y: [6, 0, 0, 0] }}
        transition={{ duration: 3.2, delay: 1, times: [0, 0.1, 0.85, 1] }}
      >
        {feelWords(product.id)}
      </motion.span>
    </div>
  );
}

export function ProductStage({ product }: { product: Product }) {
  const rot = useMotionValue(0);
  const [back, setBack] = useState(false);
  const [drops, setDrops] = useState<number[]>([]);
  const [hint, setHint] = useState(true);
  const drag = useRef<{ x: number; start: number; lastX: number; lastT: number; v: number } | null>(null);
  const keyIngredients = ingredientsFor(product.id);

  useMotionValueEvent(rot, "change", (v) => {
    const facingBack = Math.cos((v * Math.PI) / 180) < 0;
    if (facingBack !== back) setBack(facingBack);
  });

  const sheenX = useTransform(rot, (v) => 50 + 45 * Math.sin((v * Math.PI) / 180));
  const sheen = useTransform(
    sheenX,
    (x) => `linear-gradient(100deg, transparent ${x - 14}%, rgba(255,255,255,0.4) ${x}%, transparent ${x + 14}%)`
  );

  const settle = (velocity = 0) => {
    const target = Math.round((rot.get() + velocity * 0.12) / 180) * 180;
    animate(rot, target, { type: "spring", stiffness: 90, damping: 14, velocity });
  };

  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("button")) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    rot.stop();
    drag.current = { x: e.clientX, start: rot.get(), lastX: e.clientX, lastT: e.timeStamp, v: 0 };
    setHint(false);
  };

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d) return;
    const dt = Math.max(1, e.timeStamp - d.lastT);
    d.v = ((e.clientX - d.lastX) * 0.6 * 1000) / dt;
    d.lastX = e.clientX;
    d.lastT = e.timeStamp;
    rot.set(d.start + (e.clientX - d.x) * 0.6);
  };

  const onUp = () => {
    if (!drag.current) return;
    settle(drag.current.v);
    drag.current = null;
  };

  const turn = () => {
    setHint(false);
    animate(rot, Math.round(rot.get() / 180) * 180 + 180, { type: "spring", stiffness: 70, damping: 13 });
  };

  return (
    <div
      className="relative aspect-square cursor-grab touch-pan-y select-none overflow-hidden rounded-[2rem] active:cursor-grabbing"
      style={{ background: `radial-gradient(circle at 50% 40%, #ffffff 0%, ${product.tint} 75%)` }}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
    >
      <div className="absolute inset-[14%]" style={{ perspective: 1100 }}>
        <motion.div className="relative h-full w-full" style={{ rotateY: rot, transformStyle: "preserve-3d" }}>
          {(["front", "back"] as const).map((side) => (
            <div
              key={side}
              className="absolute inset-0 flex items-end justify-center [backface-visibility:hidden]"
              style={side === "back" ? { transform: "rotateY(180deg)" } : undefined}
            >
              <div className="relative flex w-full items-end justify-center" style={{ height: vesselHeight[product.vessel] }}>
                <Vessel product={product} side={side} className="drop-shadow-[0_40px_40px_rgba(77,8,33,0.2)]" />
                <motion.div
                  className="pointer-events-none absolute inset-0 mix-blend-overlay"
                  style={{ background: sheen }}
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {back && (
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 24 }}
            transition={{ delay: 0.15 }}
            className="absolute right-4 top-4 z-10 w-[min(15rem,46%)] rounded-2xl bg-white/90 p-4 text-left shadow-lg backdrop-blur md:right-6 md:top-6"
          >
            <p className="eyebrow text-magenta">How to use</p>
            <p className="mt-1.5 text-sm leading-snug text-ink/80">{product.ritual}</p>
            <div className="mt-3 flex flex-wrap gap-1">
              {keyIngredients.map((ing) => (
                <span key={ing.id} className="rounded-full px-2 py-0.5 text-[0.68rem] text-ink" style={{ background: `${ing.color}33` }}>
                  {ing.name}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {drops.map((id) => (
        <Drop key={id} product={product} onDone={() => setDrops((d) => d.filter((x) => x !== id))} />
      ))}

      <AnimatePresence>
        {hint && (
          <motion.p
            exit={{ opacity: 0 }}
            className="pointer-events-none absolute left-1/2 top-5 -translate-x-1/2 whitespace-nowrap rounded-full bg-white/80 px-3 py-1 text-xs text-ink/60 backdrop-blur"
          >
            <motion.span
              className="inline-block"
              animate={{ x: [-6, 6, -6] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              ←
            </motion.span>{" "}
            Drag to turn it around{" "}
            <motion.span
              className="inline-block"
              animate={{ x: [6, -6, 6] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              →
            </motion.span>
          </motion.p>
        )}
      </AnimatePresence>

      <div className="absolute bottom-4 right-4 z-30 flex gap-2 md:bottom-6 md:right-6">
        <button
          type="button"
          onClick={() => setDrops((d) => (d.length > 2 ? d : [...d, Date.now()]))}
          className="flex items-center gap-1.5 rounded-full bg-white/90 px-3.5 py-2 text-xs font-medium text-ink shadow-sm backdrop-blur transition hover:bg-white"
        >
          <Droplet className="size-3.5" style={{ color: product.glass }} /> Try a drop
        </button>
        <button
          type="button"
          onClick={turn}
          className="flex items-center gap-1.5 rounded-full bg-ink px-3.5 py-2 text-xs font-medium text-white shadow-sm transition hover:bg-forest"
        >
          <RotateCw className="size-3.5" /> {back ? "Front" : "Back"}
        </button>
      </div>
    </div>
  );
}
