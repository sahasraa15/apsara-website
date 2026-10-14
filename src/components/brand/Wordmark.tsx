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
  hero: "text-5xl tracking-[0.22em] sm:text-6xl md:text-7xl lg:text-8xl",
};

export function Wordmark({
  className,
  showCo = false,
  size = "md",
}: WordmarkProps) {
  return (
    <span
      className={cn(
        "font-display wordmark-apsara inline-flex flex-col items-center leading-none",
        sizes[size],
        className
      )}
    >
      <span aria-label="Apsara">
        <span className="barless">A</span>PSAR
        <span className="barless">A</span>
      </span>
      {showCo && (
        <span className="mt-2 text-[0.35em] tracking-[0.45em] opacity-80">
          &amp; CO.
        </span>
      )}
    </span>
  );
}
