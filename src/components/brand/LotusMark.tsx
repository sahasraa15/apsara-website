import { cn } from "@/lib/utils";

type LotusMarkProps = {
  className?: string;
  gold?: boolean;
};

export function LotusMark({ className, gold = true }: LotusMarkProps) {
  const stroke = gold ? "currentColor" : "currentColor";

  return (
    <svg
      viewBox="0 0 80 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-gold", className)}
      aria-hidden
    >
      {/* Scalloped arch frame */}
      <path
        d="M8 92 V38 C8 18 22 6 40 6 C58 6 72 18 72 38 V92"
        stroke={stroke}
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M14 92 V40 C14 24 25 12 40 12 C55 12 66 24 66 40 V92"
        stroke={stroke}
        strokeWidth="0.8"
        opacity="0.55"
      />
      {/* Lotus petals */}
      <path
        d="M40 72 C36 58 28 50 22 48 C28 46 34 42 40 34 C46 42 52 46 58 48 C52 50 44 58 40 72 Z"
        stroke={stroke}
        strokeWidth="1.2"
        fill="none"
      />
      <path
        d="M40 68 C38 58 34 52 30 50 C34 49 37 46 40 40 C43 46 46 49 50 50 C46 52 42 58 40 68 Z"
        stroke={stroke}
        strokeWidth="0.9"
        opacity="0.7"
        fill="none"
      />
      <path
        d="M26 54 C22 52 18 54 16 58 C20 56 24 58 28 62"
        stroke={stroke}
        strokeWidth="0.9"
        opacity="0.65"
      />
      <path
        d="M54 54 C58 52 62 54 64 58 C60 56 56 58 52 62"
        stroke={stroke}
        strokeWidth="0.9"
        opacity="0.65"
      />
      {/* Center jewel */}
      <circle cx="40" cy="48" r="1.6" fill={stroke} />
      <circle cx="40" cy="30" r="0.9" fill={stroke} opacity="0.5" />
    </svg>
  );
}
