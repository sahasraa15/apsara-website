"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { ingredients, productById } from "@/lib/products";

/** Simplified outline of India as [longitude, latitude] points */
const outline: [number, number][] = [
  [74.5, 37], [77.8, 35.5], [79.5, 32.5], [81, 30.2], [84, 28.5], [88, 27.8], [88.8, 27.3], [89.8, 26.7],
  [92, 27.8], [95.5, 29], [97.3, 27.8], [95, 26], [94.5, 24], [93.3, 23], [92.5, 22], [91.8, 23.6],
  [91.2, 23.2], [90, 22], [88.8, 21.6], [87, 21.4], [86.5, 20], [85, 19.3], [84, 18.3], [82.3, 17],
  [80.3, 15.5], [80.2, 13.3], [79.8, 11.5], [79.3, 10.3], [78.2, 8.9], [77.5, 8.1], [76.5, 8.9], [76, 10.5],
  [75, 12.5], [74.4, 14.6], [73.4, 16.5], [72.8, 19], [72.8, 21], [72.3, 21.2], [70.5, 20.8], [69, 22.4],
  [68.4, 23.6], [70, 24.6], [71, 24.4], [70.4, 26], [69.5, 27], [71, 28], [72.8, 29.8], [74.5, 31], [74, 33],
];

const where: Record<string, [number, number]> = {
  saffron: [74.8, 34.0],
  neem: [73.0, 26.6],
  sandalwood: [75.6, 14.3],
  turmeric: [78.7, 11.6],
  lotus: [76.6, 9.3],
};

const px = ([lon, lat]: [number, number]) => [(lon - 67.5) * 10, (37.8 - lat) * 10] as const;
const path = `M${outline.map((p) => px(p).join(" ")).join(" L")} Z`;

export function GrowMap() {
  const [active, setActive] = useState("saffron");
  const ing = ingredients.find((i) => i.id === active)!;

  return (
    <div className="grid items-center gap-8 overflow-hidden rounded-[2rem] bg-[linear-gradient(160deg,#fff6f8,#fae3ea)] p-6 md:p-10 lg:grid-cols-[1fr_1fr]">
      <svg viewBox="0 0 310 310" className="mx-auto w-full max-w-md">
        <defs>
          <linearGradient id="land" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#d9efdf" />
            <stop offset="1" stopColor="#fbecc4" />
          </linearGradient>
        </defs>
        <path d={path} fill="url(#land)" stroke="#b8893a" strokeWidth={1.2} strokeLinejoin="round" />
        {ingredients.map((i) => {
          const [x, y] = px(where[i.id]);
          const on = i.id === active;
          return (
            <g key={i.id} transform={`translate(${x} ${y})`} className="cursor-pointer" onClick={() => setActive(i.id)} onMouseEnter={() => setActive(i.id)}>
              <motion.circle
                r={9}
                fill={i.color}
                opacity={0.35}
                animate={{ scale: [1, 2.2], opacity: [0.45, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, delay: Object.keys(where).indexOf(i.id) * 0.3 }}
              />
              <motion.circle r={on ? 8 : 6} fill={i.color} stroke="#fff" strokeWidth={2} animate={{ r: on ? 8 : 6 }} />
              <circle r={14} fill="transparent" />
              {on && (
                <text x={14} y={4} fontSize={11} fill="#0a1c10" className="font-medium" paintOrder="stroke" stroke="#fff6f8" strokeWidth={3}>
                  {i.name}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      <AnimatePresence mode="wait">
        <motion.div
          key={ing.id}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          className="rounded-3xl bg-white p-6 shadow-lg md:p-8"
        >
          <p className="flex items-center gap-1.5 text-sm text-ink/55">
            <MapPin className="size-4" style={{ color: ing.color }} /> {ing.origin}
          </p>
          <p className="mt-2 font-display text-5xl">{ing.name}</p>
          <p className="mt-1 text-sm font-medium" style={{ color: ing.color }}>
            {ing.role}
          </p>
          <p className="mt-4 leading-relaxed text-ink/70">{ing.story}</p>
          <p className="mt-5 text-sm text-ink/55">
            Goes into: <span className="text-ink">{ing.products.map((id) => productById[id].short).join(", ")}</span>
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {ingredients.map((i) => (
              <button
                key={i.id}
                type="button"
                onClick={() => setActive(i.id)}
                className="rounded-full px-3 py-1 text-xs transition"
                style={{ background: i.id === active ? i.color : `${i.color}22`, color: i.id === active ? "#fff" : "#0a1c10" }}
              >
                {i.name}
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
