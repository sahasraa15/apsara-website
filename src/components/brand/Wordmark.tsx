import { cn } from "@/lib/utils";

type WordmarkProps = {
  className?: string;
  showCo?: boolean;
  size?: "sm" | "md" | "lg" | "hero";
};

const sizes = {
  sm: "text-sm tracking-[0.32em]",
  md: "text-base tracking-[0.34em]",
  lg: "text-2xl tracking-[0.3em] md:text-3xl",
  hero: "text-5xl tracking-[0.18em] sm:text-6xl md:text-7xl lg:text-[5.5rem]",
};

/** Stylized A without crossbar — matches moodboard wordmark */
function BarlessA({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 56"
      className={cn("inline-block h-[0.92em] w-[0.68em] align-[-0.08em]", className)}
      aria-hidden
    >
      <path
        d="M18.2 4 L2 54 H9.2 L20 20.5 L30.8 54 H38 L21.8 4 Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Wordmark({
  className,
  showCo = false,
  size = "md",
}: WordmarkProps) {
  return (
    <span
      className={cn(
        "font-display inline-flex flex-col leading-none",
        sizes[size],
        className
      )}
    >
      <span
        className="inline-flex items-baseline uppercase"
        style={{ letterSpacing: "0.22em" }}
        aria-label="Apsara"
      >
        <BarlessA />
        <span>PSAR</span>
        <BarlessA />
      </span>
      {showCo && (
        <span className="mt-2 text-[0.32em] tracking-[0.48em] opacity-80 uppercase">
          &amp; Co.
        </span>
      )}
    </span>
  );
}
