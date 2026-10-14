"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Wordmark } from "@/components/brand/Wordmark";
import { GoldButton } from "@/components/brand/GoldButton";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yImage = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.35]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-midnight"
    >
      <motion.div style={{ y: yImage }} className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=2400&q=80"
          alt="Misty palace courtyard with soft morning light"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/55 to-midnight/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-midnight/50 via-transparent to-forest/20" />
        <div className="jali-overlay absolute inset-0 opacity-30 mix-blend-soft-light" />
      </motion.div>

      <motion.div
        style={{ opacity, y: textY }}
        className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-16 pt-32 md:px-8 md:pb-24"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <Wordmark
            size="hero"
            showCo
            className="items-start text-left text-gold"
          />
          <p className="mt-8 max-w-md font-body text-base leading-relaxed text-sand/90 md:text-lg">
            Ayurvedic skincare & color for modern rituals—lush heritage, clean
            finish.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <GoldButton href="#collection" variant="solid">
              Explore collection
            </GoldButton>
            <GoldButton href="#waitlist" variant="outline">
              Join the waitlist
            </GoldButton>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6, duration: 1 }}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
      >
        <span className="text-[0.55rem] uppercase tracking-[0.35em] text-sand/50">
          Scroll
        </span>
        <motion.span
          className="h-8 w-px bg-gold/50"
          animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
