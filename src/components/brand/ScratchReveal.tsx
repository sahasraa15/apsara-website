"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Copy, Sparkles } from "lucide-react";

/** Gold foil card the visitor scratches off to reveal a discount code */
export function ScratchReveal({ code, label }: { code: string; label: string }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const c = canvas.current;
    if (!c) return;
    const dpr = window.devicePixelRatio || 1;
    const { width, height } = c.getBoundingClientRect();
    c.width = width * dpr;
    c.height = height * dpr;
    const ctx = c.getContext("2d")!;
    ctx.scale(dpr, dpr);
    const g = ctx.createLinearGradient(0, 0, width, height);
    [
      [0, "#8a6224"],
      [0.25, "#c79a45"],
      [0.45, "#f6e3a8"],
      [0.6, "#b8893a"],
      [0.8, "#e8c879"],
      [1, "#8a6224"],
    ].forEach(([o, col]) => g.addColorStop(o as number, col as string));
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, width, height);
    for (let i = 0; i < 260; i++) {
      ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.25})`;
      ctx.fillRect(Math.random() * width, Math.random() * height, 1.5, 1.5);
    }
    ctx.fillStyle = "rgba(77,8,33,0.55)";
    ctx.font = "500 13px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("S C R A T C H   M E", width / 2, height / 2 + 5);
  }, []);

  function scratch(e: PointerEvent<HTMLCanvasElement>) {
    if (!drawing.current || revealed) return;
    const c = canvas.current!;
    const r = c.getBoundingClientRect();
    const ctx = c.getContext("2d")!;
    ctx.globalCompositeOperation = "destination-out";
    ctx.fillStyle = "#000";
    ctx.beginPath();
    ctx.arc(e.clientX - r.left, e.clientY - r.top, 22, 0, Math.PI * 2);
    ctx.fill();
  }

  function checkCleared() {
    drawing.current = false;
    const c = canvas.current;
    if (!c) return;
    const data = c.getContext("2d")!.getImageData(0, 0, c.width, c.height).data;
    let clear = 0;
    for (let i = 3; i < data.length; i += 64) if (data[i] < 40) clear++;
    if (clear / (data.length / 64) > 0.45) setRevealed(true);
  }

  return (
    <div className="relative aspect-[1.7] w-full max-w-sm overflow-hidden rounded-3xl bg-[#fffaf0] text-ink shadow-2xl">
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <p className="eyebrow text-magenta">{label}</p>
          <p className="mt-2 font-display text-5xl tracking-wider">{code}</p>
          <button
            type="button"
            onClick={() => {
              navigator.clipboard?.writeText(code);
              setCopied(true);
            }}
            className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-forest px-4 py-1.5 text-xs text-white"
          >
            <Copy className="size-3" /> {copied ? "Copied!" : "Copy code"}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {!revealed && (
          <motion.canvas
            ref={canvas}
            aria-label="Scratch to reveal your code"
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 h-full w-full cursor-grab touch-none"
            onPointerDown={(e) => {
              drawing.current = true;
              e.currentTarget.setPointerCapture(e.pointerId);
              scratch(e);
            }}
            onPointerMove={scratch}
            onPointerUp={checkCleared}
            onPointerCancel={checkCleared}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {revealed &&
          Array.from({ length: 14 }, (_, i) => (
            <motion.span
              key={i}
              className="pointer-events-none absolute left-1/2 top-1/2 text-gold"
              initial={{ x: 0, y: 0, opacity: 1, scale: 0.4 }}
              animate={{
                x: Math.cos((i / 14) * Math.PI * 2) * 150,
                y: Math.sin((i / 14) * Math.PI * 2) * 90,
                opacity: 0,
                scale: 1,
              }}
              transition={{ duration: 1.1, ease: "easeOut" }}
            >
              <Sparkles className="size-4" />
            </motion.span>
          ))}
      </AnimatePresence>
    </div>
  );
}
