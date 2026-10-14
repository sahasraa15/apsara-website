import { useId, type ReactNode } from "react";
import type { Product } from "@/lib/products";
import { cn } from "@/lib/utils";

type VesselProps = {
  product: Pick<Product, "vessel" | "glass" | "fill" | "short">;
  className?: string;
  /** Override contents colour (used by the shade preview) */
  fillOverride?: string;
};

function Label({
  x,
  y,
  w,
  h,
  name,
  small = false,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  name: string;
  small?: boolean;
}) {
  const cx = x + w / 2;
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
        stroke="#0c5029"
        strokeOpacity={0.35}
        strokeWidth={0.6}
      />
      {!small && (
        <g transform={`translate(${cx} ${y + h * 0.3})`} stroke="#0c5029" fill="none">
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
  kajal: "78 14 98 300",
  pot: "30 100 140 214",
};

/** Relative heights so vessels keep believable proportions when shown together */
export const vesselHeight: Record<Product["vessel"], string> = {
  dropper: "80%",
  oil: "94%",
  tube: "100%",
  jar: "48%",
  kajal: "94%",
  pot: "56%",
};

export function Vessel({ product, className, fillOverride }: VesselProps) {
  const uid = useId().replace(/:/g, "");
  const ids = {
    glass: `glass-${uid}`,
    fill: `fill-${uid}`,
    cap: `cap-${uid}`,
    shine: `shine-${uid}`,
    shadow: `shadow-${uid}`,
  };
  const fill = fillOverride ?? product.fill;

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
        <stop offset="0" stopColor="#d8cdd1" />
        <stop offset="0.3" stopColor="#ffffff" />
        <stop offset="0.6" stopColor="#f1e9ec" />
        <stop offset="1" stopColor="#c9bcc1" />
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
          <path d="M80 110 H120 M80 122 H120" stroke="#8a7d82" strokeOpacity={0.5} />
          <rect x={52} y={132} width={96} height={168} rx={20} fill={`url(#${ids.glass})`} />
          <rect x={58} y={170} width={84} height={124} rx={15} fill={`url(#${ids.fill})`} />
          <rect x={96} y={134} width={8} height={120} fill={fill} opacity={0.45} />
          <Label x={62} y={196} w={76} h={74} name={product.short} />
          <rect x={60} y={142} width={10} height={146} rx={5} fill={`url(#${ids.shine})`} opacity={0.6} />
        </>
      );
      break;
    case "oil":
      body = (
        <>
          <rect x={80} y={22} width={40} height={78} rx={6} fill={`url(#${ids.cap})`} />
          <path d="M80 40 H120 M80 82 H120" stroke="#8a7d82" strokeOpacity={0.45} />
          <circle cx={100} cy={61} r={8} fill="none" stroke="#8a7d82" strokeOpacity={0.5} />
          <path d="M86 98 H114 V118 C140 128 150 146 150 168 V286 C150 296 142 302 132 302 H68 C58 302 50 296 50 286 V168 C50 146 60 128 86 118 Z" fill={`url(#${ids.glass})`} />
          <path d="M56 176 C56 160 66 146 86 138 H114 C134 146 144 160 144 176 V284 C144 292 138 296 130 296 H70 C62 296 56 292 56 284 Z" fill={`url(#${ids.fill})`} />
          <Label x={62} y={196} w={76} h={78} name={product.short} />
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
          <Label x={70} y={92} w={60} h={104} name={product.short} />
          <rect x={64} y={234} width={72} height={68} rx={6} fill={`url(#${ids.cap})`} />
          <path d="M64 252 H136 M64 284 H136" stroke="#8a7d82" strokeOpacity={0.45} />
          <rect x={68} y={56} width={8} height={170} rx={4} fill={`url(#${ids.shine})`} opacity={0.5} />
        </>
      );
      break;
    case "jar":
      body = (
        <>
          <rect x={30} y={166} width={140} height={42} rx={8} fill={`url(#${ids.cap})`} />
          <path d="M30 180 H170 M30 196 H170" stroke="#8a7d82" strokeOpacity={0.35} />
          <g transform="translate(100 187)" stroke="#8a7d82" strokeOpacity={0.6} fill="none">
            <path d="M0 -10 C-5 -3 -5 4 0 8 C5 4 5 -3 0 -10 Z" />
          </g>
          <path d="M36 206 H164 V284 C164 294 156 302 146 302 H54 C44 302 36 294 36 284 Z" fill={`url(#${ids.glass})`} />
          <path d="M42 222 H158 V282 C158 290 152 296 144 296 H56 C48 296 42 290 42 282 Z" fill={`url(#${ids.fill})`} />
          <Label x={64} y={222} w={72} h={62} name={product.short} small />
          <rect x={44} y={212} width={9} height={80} rx={4} fill={`url(#${ids.shine})`} opacity={0.55} />
        </>
      );
      break;
    case "kajal":
      body = (
        <>
          <path d="M92 52 L100 22 L108 52 Z" fill="#050505" />
          <path d="M98 30 L100 24" stroke="#fff" strokeOpacity={0.3} strokeWidth={1.5} />
          <rect x={88} y={50} width={24} height={30} rx={2} fill={`url(#${ids.cap})`} />
          <rect x={86} y={78} width={28} height={224} rx={4} fill={`url(#${ids.glass})`} />
          <rect x={86} y={110} width={28} height={2} fill={`url(#${ids.cap})`} />
          <rect x={86} y={270} width={28} height={2} fill={`url(#${ids.cap})`} />
          <text
            x={100}
            y={190}
            transform="rotate(-90 100 190)"
            textAnchor="middle"
            fill={`url(#${ids.cap})`}
            style={{ fontFamily: "var(--font-body), sans-serif", letterSpacing: "0.3em" }}
            fontSize={10}
          >
            APSARA · KOHL
          </text>
          <rect x={90} y={84} width={5} height={212} rx={2} fill={`url(#${ids.shine})`} opacity={0.35} />
          <g transform="translate(138 120) rotate(14)">
            <rect x={0} y={0} width={30} height={120} rx={4} fill={`url(#${ids.glass})`} />
            <rect x={0} y={96} width={30} height={24} rx={3} fill={`url(#${ids.cap})`} />
          </g>
        </>
      );
      break;
    case "pot":
      body = (
        <>
          <g transform="translate(100 150) rotate(-12)">
            <ellipse cx={0} cy={0} rx={62} ry={14} fill="#b9adb2" />
            <rect x={-62} y={-24} width={124} height={24} fill={`url(#${ids.cap})`} />
            <ellipse cx={0} cy={-24} rx={62} ry={14} fill={`url(#${ids.cap})`} />
            <g transform="translate(0 -24)" stroke="#8a7d82" strokeOpacity={0.6} fill="none">
              <path d="M0 -8 C-6 -2 -6 3 0 6 C6 3 6 -2 0 -8 Z" />
              <path d="M-4 5 C-14 4 -20 0 -22 -4 M4 5 C14 4 20 0 22 -4" />
            </g>
          </g>
          <path d="M38 236 V280 C38 292 66 302 100 302 C134 302 162 292 162 280 V236 Z" fill={`url(#${ids.glass})`} />
          <ellipse cx={100} cy={236} rx={62} ry={16} fill={product.glass} />
          <ellipse cx={100} cy={236} rx={54} ry={12} fill={fill} />
          <ellipse cx={86} cy={232} rx={18} ry={3} fill="#fff" opacity={0.3} />
          <text
            x={100}
            y={280}
            textAnchor="middle"
            fill={`url(#${ids.cap})`}
            style={{ fontFamily: "var(--font-body), sans-serif", letterSpacing: "0.3em" }}
            fontSize={10}
          >
            APSARA
          </text>
          <rect x={44} y={244} width={8} height={44} rx={4} fill={`url(#${ids.shine})`} opacity={0.5} />
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
