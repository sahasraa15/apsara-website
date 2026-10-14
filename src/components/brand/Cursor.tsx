"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [hovering, setHovering] = useState(false);
  const [down, setDown] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- depends on a browser-only media query
    setEnabled(fine);
    if (!fine) return;

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        "[data-cursor], a, button, input, label, select"
      );
      setHovering(Boolean(target));
      setLabel(target?.dataset.cursor ?? null);
    };
    const press = () => setDown(true);
    const release = () => setDown(false);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", press);
    window.addEventListener("pointerup", release);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", press);
      window.removeEventListener("pointerup", release);
    };
  }, [x, y]);

  if (!enabled) return null;

  const size = label ? 84 : hovering ? 46 : 22;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[95] flex items-center justify-center rounded-full border border-gold-light/80 shadow-[0_0_24px_#e3c27c40]"
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
      animate={{
        width: size,
        height: size,
        scale: down ? 0.85 : 1,
        backgroundColor: label ? "rgba(227,194,124,0.95)" : "rgba(227,194,124,0)",
      }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      {label && (
        <span className="font-caps text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-midnight">
          {label}
        </span>
      )}
    </motion.div>
  );
}
