import { productById, type Dosha, type Product } from "./products";

export type Concern = "dullness" | "redness" | "dryness" | "breakouts" | "tone" | "lines" | "oiliness";
type Climate = "dry" | "humid" | "seasonal";
type Sensitivity = "low" | "mid" | "high";
type RoutineSize = 2 | 3 | 4;

type Weights = Partial<Record<Dosha, number>>;

type Option = {
  label: string;
  hint?: string;
  weights?: Weights;
  concern?: Concern;
  climate?: Climate;
  sensitivity?: Sensitivity;
  size?: RoutineSize;
};

export type Question = {
  id: string;
  section: "Your skin" | "Your goals" | "Your life";
  prompt: string;
  help?: string;
  /** How many options can be picked; 1 means pick-and-advance */
  max: number;
  options: Option[];
};

export const questions: Question[] = [
  {
    id: "feel",
    section: "Your skin",
    prompt: "A few hours after washing your face, it feels…",
    max: 1,
    options: [
      { label: "Tight, maybe a little flaky", weights: { vata: 2 } },
      { label: "Comfortable, but warm or a bit pink", weights: { pitta: 2 } },
      { label: "Smooth at first, then shiny", weights: { kapha: 2 } },
    ],
  },
  {
    id: "pores",
    section: "Your skin",
    prompt: "Look closely in the mirror. Your pores are…",
    max: 1,
    options: [
      { label: "Barely visible", weights: { vata: 2 } },
      { label: "Visible mostly around the nose", weights: { pitta: 2 } },
      { label: "Visible across the nose, chin and forehead", weights: { kapha: 2 } },
    ],
  },
  {
    id: "sun",
    section: "Your skin",
    prompt: "After time in the sun, your skin usually…",
    max: 1,
    options: [
      { label: "Feels dry and tight", weights: { vata: 2 } },
      { label: "Gets red, hot or irritated quickly", weights: { pitta: 2 } },
      { label: "Handles it pretty well", weights: { kapha: 2 } },
    ],
  },
  {
    id: "breakouts",
    section: "Your skin",
    prompt: "Breakouts, for you, are…",
    max: 1,
    options: [
      { label: "Rare—maybe the odd one", weights: { vata: 2 } },
      { label: "Red and tender, often with stress or heat", weights: { pitta: 2 } },
      { label: "Mostly blackheads and clogged pores", weights: { kapha: 2 } },
    ],
  },
  {
    id: "sensitivity",
    section: "Your skin",
    prompt: "When you try a new product, your skin…",
    max: 1,
    options: [
      { label: "Rarely reacts", weights: { kapha: 1 }, sensitivity: "low" },
      { label: "Sometimes stings or dries out", weights: { vata: 1 }, sensitivity: "mid" },
      { label: "Often reacts with redness", weights: { pitta: 2 }, sensitivity: "high" },
    ],
  },
  {
    id: "concerns",
    section: "Your goals",
    prompt: "What would you most like to change?",
    help: "Pick up to two.",
    max: 2,
    options: [
      { label: "Dullness", hint: "Skin looks tired", concern: "dullness", weights: { kapha: 1 } },
      { label: "Redness", hint: "Flushing or irritation", concern: "redness", weights: { pitta: 1 } },
      { label: "Dryness", hint: "Tightness or flakes", concern: "dryness", weights: { vata: 1 } },
      { label: "Breakouts", hint: "Spots or congestion", concern: "breakouts", weights: { kapha: 1 } },
      { label: "Uneven tone", hint: "Dark spots or patches", concern: "tone", weights: { pitta: 1 } },
      { label: "Fine lines", hint: "Early lines or crepiness", concern: "lines", weights: { vata: 1 } },
      { label: "Oiliness", hint: "Shine by midday", concern: "oiliness", weights: { kapha: 1 } },
    ],
  },
  {
    id: "climate",
    section: "Your life",
    prompt: "Where you live, the weather is mostly…",
    max: 1,
    options: [
      { label: "Dry or cold", weights: { vata: 1 }, climate: "dry" },
      { label: "Hot and humid", weights: { pitta: 1 }, climate: "humid" },
      { label: "All over the place, season to season", climate: "seasonal" },
    ],
  },
  {
    id: "time",
    section: "Your life",
    prompt: "How much time do you want to give your skin?",
    max: 1,
    options: [
      { label: "Two minutes, tops", hint: "2 products", size: 2 },
      { label: "A few easy steps", hint: "3 products", size: 3 },
      { label: "I love a full ritual", hint: "All 4 products", size: 4 },
    ],
  },
];

export const doshaProfile: Record<Dosha, { title: string; copy: string; color: string; ritual: string; ritualCopy: string }> = {
  vata: {
    title: "Dry",
    copy: "Your skin is fine-textured and runs dry. It loves richness, warmth and moisture, and gets unhappy in cold, windy weather.",
    color: "#b8893a",
    ritual: "The Moonlight Ritual",
    ritualCopy: "Built around overnight moisture, so you wake up soft instead of tight.",
  },
  pitta: {
    title: "Sensitive",
    copy: "Your skin runs warm and reacts fast—to heat, sun and new products. It wants calming, cooling care before anything else.",
    color: "#a11047",
    ritual: "The Cool Lotus Ritual",
    ritualCopy: "Calm first, glow second. Every step is gentle enough for reactive days.",
  },
  kapha: {
    title: "Oily",
    copy: "Your skin is resilient and makes plenty of oil. It ages slowly but clogs easily, so it does best with clearing and brightening.",
    color: "#0c5029",
    ritual: "The Fresh Start Ritual",
    ritualCopy: "Clear, light and bright—keeps shine and congestion in check all week.",
  },
};

export const concernLabel: Record<Concern, string> = {
  dullness: "Dullness",
  redness: "Redness",
  dryness: "Dryness",
  breakouts: "Breakouts",
  tone: "Uneven tone",
  lines: "Fine lines",
  oiliness: "Oiliness",
};

/** How strongly each product suits each skin type and concern */
const fit: Record<string, { dosha: Weights; concern: Partial<Record<Concern, number>>; sensitive: number }> = {
  "lotus-serum": { dosha: { pitta: 3, vata: 1 }, concern: { redness: 3, dryness: 1 }, sensitive: 2 },
  "kumkumadi-oil": { dosha: { vata: 3, pitta: 1, kapha: -2 }, concern: { tone: 3, lines: 3, dryness: 2, dullness: 1, oiliness: -2 }, sensitive: 0 },
  "haldi-mask": { dosha: { kapha: 3 }, concern: { dullness: 3, breakouts: 2, oiliness: 2, tone: 1 }, sensitive: -1 },
};

const reasons: Record<string, { dosha: Record<Dosha, string>; concern: Partial<Record<Concern, string>> }> = {
  "neem-cleanser": {
    dosha: {
      vata: "Cleans without stripping, so your skin never feels tight afterward.",
      pitta: "A cool gel that clears the day away without heating up your skin.",
      kapha: "Neem clears excess oil and keeps pores from clogging.",
    },
    concern: {
      breakouts: "Neem keeps pores clear, which is where breakouts start.",
      oiliness: "Takes down shine without leaving skin squeaky.",
    },
  },
  "lotus-serum": {
    dosha: {
      vata: "Light hydration that layers under oil for extra moisture.",
      pitta: "Pink lotus and sandalwood calm warmth and reactivity.",
      kapha: "Weightless hydration that won't add shine.",
    },
    concern: {
      redness: "Pink lotus and sandalwood visibly calm redness.",
      dryness: "Lightweight hydration your skin drinks in.",
    },
  },
  "kumkumadi-oil": {
    dosha: {
      vata: "Rich overnight moisture for skin that runs dry.",
      pitta: "Saffron evens out tone while you sleep.",
      kapha: "A few drops at night for glow—a little goes a long way.",
    },
    concern: {
      tone: "Saffron gradually evens out dark spots and patches.",
      lines: "Deep overnight nourishment that softens the look of fine lines.",
      dryness: "Seals in moisture overnight so you wake up comfortable.",
      dullness: "Wake up with a candle-lit glow.",
    },
  },
  "haldi-mask": {
    dosha: {
      vata: "A weekly brightening reset—use with oil afterward.",
      pitta: "Brightens without heat; keep it to ten minutes.",
      kapha: "Kaolin clay draws out oil and congestion once a week.",
    },
    concern: {
      dullness: "Turmeric brightens tired-looking skin in ten minutes.",
      breakouts: "Clay and turmeric gently clear congestion weekly.",
      oiliness: "Clay soaks up excess oil for a matte week.",
      tone: "Turmeric helps brighten uneven patches over time.",
    },
  },
};

const timing: Record<string, string> = {
  "neem-cleanser": "AM + PM",
  "lotus-serum": "AM + PM",
  "kumkumadi-oil": "PM",
  "haldi-mask": "Weekly",
};

const routineOrder = ["neem-cleanser", "lotus-serum", "kumkumadi-oil", "haldi-mask"];

export type QuizResult = {
  percents: Record<Dosha, number>;
  primary: Dosha;
  secondary?: Dosha;
  concerns: Concern[];
  routine: { product: Product; when: string; why: string }[];
  tips: string[];
  full: number;
  bundle: number;
  discount: number;
};

export function scoreQuiz(answers: Record<string, number[]>): QuizResult {
  const totals: Record<Dosha, number> = { vata: 0, pitta: 0, kapha: 0 };
  const concerns: Concern[] = [];
  let climate: Climate = "seasonal";
  let sensitivity: Sensitivity = "low";
  let size: RoutineSize = 3;

  for (const q of questions) {
    for (const i of answers[q.id] ?? []) {
      const o = q.options[i];
      for (const [d, w] of Object.entries(o.weights ?? {}) as [Dosha, number][]) totals[d] += w;
      if (o.concern) concerns.push(o.concern);
      if (o.climate) climate = o.climate;
      if (o.sensitivity) sensitivity = o.sensitivity;
      if (o.size) size = o.size;
    }
  }

  const sum = totals.vata + totals.pitta + totals.kapha || 1;
  const percents = {
    vata: Math.round((totals.vata / sum) * 100),
    pitta: Math.round((totals.pitta / sum) * 100),
    kapha: 0,
  };
  percents.kapha = 100 - percents.vata - percents.pitta;

  const ranked = (Object.keys(totals) as Dosha[]).sort((a, b) => totals[b] - totals[a]);
  const primary = ranked[0];
  const secondary = percents[ranked[1]] >= percents[primary] - 12 ? ranked[1] : undefined;

  const score = (id: string) => {
    const f = fit[id];
    let s = (f.dosha[primary] ?? 0) * 2 + (secondary ? f.dosha[secondary] ?? 0 : 0);
    for (const c of concerns) s += (f.concern[c] ?? 0) * 2;
    if (sensitivity === "high") s += f.sensitive * 2;
    return s;
  };
  const treatments = Object.keys(fit)
    .filter((id) => size > 2 || timing[id] !== "Weekly")
    .sort((a, b) => score(b) - score(a));
  const picked = new Set(["neem-cleanser", ...treatments.slice(0, size - 1)]);

  const routine = routineOrder
    .filter((id) => picked.has(id))
    .map((id) => {
      const r = reasons[id];
      const concern = concerns.find((c) => r.concern[c]);
      return {
        product: productById[id],
        when: timing[id],
        why: concern ? r.concern[concern]! : r.dosha[primary],
      };
    });

  const doshaTip: Record<Dosha, string> = {
    vata: "Apply serum and oil to slightly damp skin—it locks in far more moisture.",
    pitta: "Rinse with cool water, not hot. Heat is the fastest way to trigger redness.",
    kapha: "Cleanse twice a day and don't skip it at night—that's when pores clog.",
  };
  const climateTip: Record<Climate, string> = {
    dry: "Run a humidifier while you sleep in the dry months.",
    humid: "In summer, go lighter: fewer layers, and blot instead of re-applying.",
    seasonal: "Your skin shifts with the seasons. Lean richer in winter, lighter in summer.",
  };
  const tips = [
    doshaTip[primary],
    climateTip[climate],
    sensitivity === "high"
      ? "Introduce one product at a time, and patch test on your jaw for 24 hours first."
      : "Finish every morning with SPF—no routine works without it.",
  ];

  const discount = 0.15;
  const full = routine.reduce((n, r) => n + r.product.price, 0);
  const bundle = Math.round(full * (1 - discount));

  return { percents, primary, secondary, concerns, routine, tips, full, bundle, discount };
}
