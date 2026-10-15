import type { Metadata } from "next";
import { GlowRoom } from "@/components/glow/GlowRoom";

export const metadata: Metadata = {
  title: "The Glow Room",
  description: "Little tools for your skin: a daily skin forecast, a bridal glow countdown and more.",
};

export default function GlowRoomPage() {
  return (
    <div className="lotus-wash -mt-16 pt-16 md:-mt-[72px] md:pt-[72px]">
      <section>
        <div className="mx-auto max-w-[1400px] px-5 pb-12 pt-10 md:px-10 md:pb-16 md:pt-16">
          <p className="eyebrow text-magenta">The Glow Room</p>
          <h1 className="mt-3 max-w-3xl font-display text-[clamp(3rem,7vw,5.5rem)] leading-none">
            Little tools, <span className="gold-foil">big glow.</span>
          </h1>
          <p className="mt-5 max-w-lg text-lg text-ink/70">
            A few fun extras to help you take care of your skin. Pick whatever you&apos;re in the mood for.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-[1400px] px-5 pb-24 md:px-10 md:pb-32">
        <GlowRoom />
      </section>
    </div>
  );
}
