import { useId, type ReactNode } from "react";
import type { Product } from "@/lib/products";
import { cn } from "@/lib/utils";

type VesselProps = {
  product: Pick<Product, "vessel" | "glass" | "fill" | "short">;
  className?: string;
  /** Draws the back label (ingredient text and barcode) instead of the front */
  side?: "front" | "back";
};

function Label({
  x,
  y,
  w,
  h,
  name,
  small = false,
  back = false,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  name: string;
  small?: boolean;
  back?: boolean;
}) {
  const cx = x + w / 2;
  if (back) {
    const pad = 7;
    const rows = small ? 3 : Math.floor((h - 34) / 5);
    return (
      <g>
        <rect x={x} y={y} width={w} height={h} rx={3} fill="#ffffff" opacity={0.95} />
        <text
          x={cx}
          y={y + 10}
          textAnchor="middle"
          fill="#0c5029"
          style={{ fontFamily: "var(--font-body), sans-serif", fontWeight: 500, letterSpacing: "0.2em" }}
          fontSize={small ? 5 : 6}
        >
          INGREDIENTS
        </text>
        {Array.from({ length: rows }, (_, i) => (
          <rect
            key={i}
            x={x + pad}
            y={y + 15 + i * 5}
            width={(w - pad * 2) * (i === rows - 1 ? 0.55 : 0.8 + ((i * 37) % 20) / 100)}
            height={1.6}
            rx={0.8}
            fill="#0a1c10"
            opacity={0.28}
          />
        ))}
        <g transform={`translate(${x + pad} ${y + h - 12})`}>
          {[0, 2, 3, 5, 8, 9, 11, 13, 14, 16, 19, 20, 22].map((bx, i) => (
            <rect key={i} x={bx} y={0} width={i % 3 ? 1 : 1.6} height={7} fill="#0a1c10" opacity={0.7} />
          ))}
        </g>
        <circle cx={x + w - pad - 4} cy={y + h - 8.5} r={4} fill="none" stroke="#b8893a" strokeWidth={0.8} />
      </g>
    );
  }
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={3} fill="#ffffff" opacity={0.95} />
      <rect
        x={x + 3}
        y={y + 3}
        width={w - 6}
        height={h - 6}
        rx={2}
        fill="none"
        stroke="#b8893a"
        strokeWidth={0.8}
      />
      {!small && (
        <g transform={`translate(${cx} ${y + h * 0.3})`} stroke="#b8893a" fill="none">
          <path d="M0 -9 C-4 -3 -4 3 0 7 C4 3 4 -3 0 -9 Z" strokeWidth={1} />
          <path d="M-2 6 C-8 4 -11 0 -12 -4 C-7 -3 -3 0 -1 4" strokeWidth={0.9} />
          <path d="M2 6 C8 4 11 0 12 -4 C7 -3 3 0 1 4" strokeWidth={0.9} />
          <circle cx={0} cy={-1} r={1.3} fill="#a11047" stroke="none" />
        </g>
      )}
      <text
        x={cx}
        y={small ? y + h * 0.48 : y + h * 0.62}
        textAnchor="middle"
        fill="#0c5029"
        style={{ fontFamily: "var(--font-body), sans-serif", fontWeight: 500, letterSpacing: "0.28em" }}
        fontSize={small ? 7 : 10}
      >
        APSARA
      </text>
      <text
        x={cx}
        y={small ? y + h * 0.75 : y + h * 0.8}
        textAnchor="middle"
        fill="#0a1c10"
        opacity={0.7}
        style={{ fontFamily: "var(--font-display), serif", fontStyle: "italic" }}
        fontSize={small ? 6 : 8.5}
      >
        {name}
      </text>
    </g>
  );
}

/** Tight frames around each drawing so vessels can sit shoulder to shoulder */
const viewBoxes: Record<Product["vessel"], string> = {
  dropper: "44 14 112 300",
  oil: "42 14 116 300",
  tube: "50 28 100 286",
  jar: "22 158 156 156",
};

/** Relative heights so vessels keep believable proportions when shown together */
export const vesselHeight: Record<Product["vessel"], string> = {
  dropper: "80%",
  oil: "94%",
  tube: "100%",
  jar: "48%",
};

export function Vessel({ product, className, side = "front" }: VesselProps) {
  const back = side === "back";
  const uid = useId().replace(/:/g, "");
  const ids = {
    glass: `glass-${uid}`,
    fill: `fill-${uid}`,
    cap: `cap-${uid}`,
    shine: `shine-${uid}`,
    shadow: `shadow-${uid}`,
  };
  const fill = product.fill;

  const defs = (
    <defs>
      <linearGradient id={ids.glass} x1="0" x2="1" y1="0" y2="0">
        <stop offset="0" stopColor={product.glass} stopOpacity={1} />
        <stop offset="0.35" stopColor={product.glass} stopOpacity={0.72} />
        <stop offset="0.7" stopColor={product.glass} stopOpacity={0.88} />
        <stop offset="1" stopColor="#2a0a16" stopOpacity={0.85} />
      </linearGradient>
      <linearGradient id={ids.fill} x1="0" x2="0" y1="0" y2="1">
        <stop offset="0" stopColor={fill} stopOpacity={0.95} />
        <stop offset="1" stopColor={fill} stopOpacity={0.55} />
      </linearGradient>
      <linearGradient id={ids.cap} x1="0" x2="1" y1="0" y2="0">
        <stop offset="0" stopColor="#8a6224" />
        <stop offset="0.28" stopColor="#f6e3a8" />
        <stop offset="0.5" stopColor="#c79a45" />
        <stop offset="0.78" stopColor="#e8c879" />
        <stop offset="1" stopColor="#7a5419" />
      </linearGradient>
      <linearGradient id={ids.shine} x1="0" x2="1">
        <stop offset="0" stopColor="#fff" stopOpacity={0} />
        <stop offset="0.5" stopColor="#fff" stopOpacity={0.55} />
        <stop offset="1" stopColor="#fff" stopOpacity={0} />
      </linearGradient>
      <radialGradient id={ids.shadow}>
        <stop offset="0" stopColor="#4d0821" stopOpacity={0.28} />
        <stop offset="1" stopColor="#000" stopOpacity={0} />
      </radialGradient>
    </defs>
  );

  const shadow = <ellipse cx={100} cy={304} rx={78} ry={10} fill={`url(#${ids.shadow})`} />;

  let body: ReactNode = null;

  switch (product.vessel) {
    case "dropper":
      body = (
        <>
          <path d="M84 40 C84 22 116 22 116 40 L118 104 L82 104 Z" fill="#14100a" />
          <path d="M92 34 C94 28 100 27 102 30" stroke="#fff" strokeOpacity={0.25} strokeWidth={3} fill="none" strokeLinecap="round" />
          <rect x={76} y={100} width={48} height={34} rx={4} fill={`url(#${ids.cap})`} />
          <path d="M80 110 H120 M80 122 H120" stroke="#5c3f12" strokeOpacity={0.5} />
          <rect x={52} y={132} width={96} height={168} rx={20} fill={`url(#${ids.glass})`} />
          <rect x={58} y={170} width={84} height={124} rx={15} fill={`url(#${ids.fill})`} />
          <rect x={96} y={134} width={8} height={120} fill={fill} opacity={0.45} />
          <Label x={62} y={196} w={76} h={74} name={product.short} back={back} />
          <rect x={60} y={142} width={10} height={146} rx={5} fill={`url(#${ids.shine})`} opacity={0.6} />
        </>
      );
      break;
    case "oil":
      body = (
        <>
          <rect x={80} y={22} width={40} height={78} rx={6} fill={`url(#${ids.cap})`} />
          <path d="M80 40 H120 M80 82 H120" stroke="#5c3f12" strokeOpacity={0.45} />
          <circle cx={100} cy={61} r={8} fill="none" stroke="#5c3f12" strokeOpacity={0.5} />
          <path d="M86 98 H114 V118 C140 128 150 146 150 168 V286 C150 296 142 302 132 302 H68 C58 302 50 296 50 286 V168 C50 146 60 128 86 118 Z" fill={`url(#${ids.glass})`} />
          <path d="M56 176 C56 160 66 146 86 138 H114 C134 146 144 160 144 176 V284 C144 292 138 296 130 296 H70 C62 296 56 292 56 284 Z" fill={`url(#${ids.fill})`} />
          <Label x={62} y={196} w={76} h={78} name={product.short} back={back} />
          <rect x={58} y={150} width={10} height={140} rx={5} fill={`url(#${ids.shine})`} opacity={0.55} />
        </>
      );
      break;
    case "tube":
      body = (
        <>
          <path d="M58 36 H142 L136 236 H64 Z" fill={`url(#${ids.glass})`} />
          <path d="M58 36 H142 V48 H58 Z" fill="#0b3019" opacity={0.6} />
          <path d="M60 40 H140" stroke={`url(#${ids.cap})`} strokeWidth={1.5} strokeDasharray="2 3" />
          <Label x={70} y={92} w={60} h={104} name={product.short} back={back} />
          <rect x={64} y={234} width={72} height={68} rx={6} fill={`url(#${ids.cap})`} />
          <path d="M64 252 H136 M64 284 H136" stroke="#5c3f12" strokeOpacity={0.45} />
          <rect x={68} y={56} width={8} height={170} rx={4} fill={`url(#${ids.shine})`} opacity={0.5} />
        </>
      );
      break;
    case "jar":
      body = (
        <>
          <rect x={30} y={166} width={140} height={42} rx={8} fill={`url(#${ids.cap})`} />
          <path d="M30 180 H170 M30 196 H170" stroke="#5c3f12" strokeOpacity={0.35} />
          <g transform="translate(100 187)" stroke="#5c3f12" strokeOpacity={0.6} fill="none">
            <path d="M0 -10 C-5 -3 -5 4 0 8 C5 4 5 -3 0 -10 Z" />
          </g>
          <path d="M36 206 H164 V284 C164 294 156 302 146 302 H54 C44 302 36 294 36 284 Z" fill={`url(#${ids.glass})`} />
          <path d="M42 222 H158 V282 C158 290 152 296 144 296 H56 C48 296 42 290 42 282 Z" fill={`url(#${ids.fill})`} />
          <Label x={64} y={222} w={72} h={62} name={product.short} small back={back} />
          <rect x={44} y={212} width={9} height={80} rx={4} fill={`url(#${ids.shine})`} opacity={0.55} />
        </>
      );
      break;
  }

  return (
    <svg
      viewBox={viewBoxes[product.vessel]}
      className={cn("h-full w-auto max-w-full overflow-visible", className)}
      role="img"
      aria-label={product.short}
    >
      {defs}
      {shadow}
      {body}
    </svg>
  );
}
