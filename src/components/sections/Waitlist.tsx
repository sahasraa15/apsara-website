"use client";

import { FormEvent, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/brand/Reveal";
import { GoldButton } from "@/components/brand/GoldButton";
import { LotusMark } from "@/components/brand/LotusMark";

export function Waitlist() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.includes("@") || email.length < 5) {
      setStatus("error");
      return;
    }
    setStatus("ok");
    setEmail("");
  }

  return (
    <section
      id="waitlist"
      className="relative overflow-hidden bg-midnight py-24 text-sand md:py-32"
    >
      <div className="jali-overlay absolute inset-0 opacity-30" />
      <div className="absolute -left-20 top-10 opacity-20">
        <LotusMark className="h-64 w-48 text-gold" />
      </div>

      <div className="relative z-10 mx-auto max-w-2xl px-5 text-center md:px-8">
        <Reveal>
          <p className="text-[0.65rem] uppercase tracking-[0.35em] text-gold">
            Coming soon
          </p>
          <h2 className="mt-4 font-display text-4xl md:text-5xl lg:text-6xl">
            Be first at the door
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sand/70">
            Early access, launch edits, and a welcome ritual kit for founding
            members.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <form
            onSubmit={onSubmit}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-stretch"
          >
            <label className="sr-only" htmlFor="waitlist-email">
              Email
            </label>
            <input
              id="waitlist-email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setStatus("idle");
              }}
              placeholder="you@email.com"
              className="flex-1 border border-gold/40 bg-forest/40 px-4 py-3.5 text-sm text-sand outline-none placeholder:text-sand/40 focus:border-gold"
            />
            <GoldButton type="submit" variant="magenta" className="sm:px-8">
              Join waitlist
            </GoldButton>
          </form>

          <AnimatePresence mode="wait">
            {status === "ok" && (
              <motion.p
                key="ok"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-4 text-sm text-gold"
              >
                You&apos;re on the list. We&apos;ll write when the doors open.
              </motion.p>
            )}
            {status === "error" && (
              <motion.p
                key="err"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-4 text-sm text-lotus"
              >
                Please enter a valid email.
              </motion.p>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}
