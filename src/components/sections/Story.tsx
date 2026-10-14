"use client";

import Image from "next/image";
import { Reveal } from "@/components/brand/Reveal";
import { LotusMark } from "@/components/brand/LotusMark";

export function Story() {
  return (
    <section id="story" className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute right-0 top-20 hidden h-72 w-72 opacity-20 lg:block">
        <LotusMark className="h-full w-full text-gold" />
      </div>

      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <Reveal className="relative lg:col-span-5">
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=1000&q=80"
                alt="Woman in soft natural light"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-gold/30" />
            </div>
            <div className="absolute -bottom-6 -right-4 hidden w-40 overflow-hidden border border-gold/40 md:block lg:-right-8">
              <div className="relative aspect-square">
                <Image
                  src="https://images.unsplash.com/photo-1515377905703-c4788e51af44?auto=format&fit=crop&w=500&q=80"
                  alt="Gold jewelry detail"
                  fill
                  className="object-cover"
                  sizes="160px"
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12} className="lg:col-span-6 lg:col-start-7">
            <p className="text-[0.65rem] uppercase tracking-[0.35em] text-magenta">
              Our story
            </p>
            <h2 className="mt-4 font-display text-4xl text-midnight md:text-5xl">
              Between two homes, one glow
            </h2>
            <div className="gold-rule my-8 max-w-xs" />
            <div className="space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg">
              <p>
                Apsara & Co. was born in the space between Indian kitchen
                cabinets and American bathroom counters—where turmeric met SPF,
                and kajal met a subway commute.
              </p>
              <p>
                We build Ayurvedic skincare and makeup that feels expensive and
                lived-in: deep greens, gold linework, lotus as symbol—not as
                costume. Maximal texture. Minimal noise.
              </p>
              <p>
                Launching soon. Formulated with clinical partners. Rooted in
                ritual you can actually keep.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
