"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LotusMark } from "./LotusMark";
import { Wordmark } from "./Wordmark";

const ease = [0.76, 0, 0.24, 1] as const;

export function IntroLoader() {
  const [phase, setPhase] = useState<"draw" | "open" | "done">("draw");

  useEffect(() => {
    history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    const a = setTimeout(() => setPhase("open"), 1700);
    const b = setTimeout(() => setPhase("done"), 2900);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className="fixed inset-0 z-[100] cursor-pointer"
      onClick={() => setPhase("done")}
      aria-hidden
    >
      {(["left", "right"] as const).map((side) => (
        <motion.div
          key={side}
          className={`absolute inset-y-0 w-1/2 overflow-hidden bg-midnight ${
            side === "left" ? "left-0 border-r" : "right-0 border-l"
          } border-gold/30`}
          animate={phase === "open" ? { x: side === "left" ? "-100%" : "100%" } : { x: 0 }}
          transition={{ duration: 1.1, ease }}
        >
          <div className="jali absolute inset-0 opacity-[0.07]" />
        </motion.div>
      ))}

      <AnimatePresence>
        {phase === "draw" && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center"
            exit={{ opacity: 0, scale: 1.15, filter: "blur(6px)" }}
            transition={{ duration: 0.5 }}
          >
            <LotusMark draw className="h-32 w-28 text-gold" />
            <motion.div
              initial={{ opacity: 0, letterSpacing: "0.6em" }}
              animate={{ opacity: 1, letterSpacing: "0.22em" }}
              transition={{ delay: 0.6, duration: 1 }}
              className="mt-6 text-gold-light"
            >
              <Wordmark size="lg" showCo className="items-center" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
