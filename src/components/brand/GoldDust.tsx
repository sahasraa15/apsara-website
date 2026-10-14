"use client";

import { useEffect, useRef } from "react";

type Mote = { x: number; y: number; r: number; vy: number; sway: number; phase: number; a: number };

export function GoldDust({ className, density = 0.00009 }: { className?: string; density?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let motes: Mote[] = [];
    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const spawn = (anywhere: boolean): Mote => ({
      x: Math.random() * w,
      y: anywhere ? Math.random() * h : h + 10,
      r: Math.random() * 1.6 + 0.3,
      vy: Math.random() * 0.35 + 0.08,
      sway: Math.random() * 0.6 + 0.2,
      phase: Math.random() * Math.PI * 2,
      a: Math.random() * 0.6 + 0.2,
    });

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(w * h * density);
      motes = Array.from({ length: n }, () => spawn(true));
    };

    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);

    const tick = (t: number) => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      ctx.clearRect(0, 0, w, h);
      for (const m of motes) {
        m.y -= m.vy;
        const x = m.x + Math.sin(t / 1600 + m.phase) * 12 * m.sway;
        if (m.y < -10) Object.assign(m, spawn(false));
        const flicker = 0.6 + Math.sin(t / 500 + m.phase) * 0.4;
        ctx.beginPath();
        ctx.fillStyle = `rgba(243, 221, 164, ${m.a * flicker})`;
        ctx.shadowColor = "rgba(227, 194, 124, 0.9)";
        ctx.shadowBlur = m.r * 6;
        ctx.arc(x, m.y, m.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    resize();
    raf = requestAnimationFrame(tick);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [density]);

  return <canvas ref={ref} aria-hidden className={className} />;
}
