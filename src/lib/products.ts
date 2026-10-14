export type VesselKind = "dropper" | "oil" | "tube" | "jar" | "kajal" | "pot";

export type Product = {
  id: string;
  name: string;
  short: string;
  category: "Face" | "Ritual" | "Cleanse" | "Mask" | "Makeup";
  price: number;
  size: string;
  dosha: string;
  blurb: string;
  ritual: string;
  notes: string[];
  vessel: VesselKind;
  /** Glass / body colour of the vessel */
  glass: string;
  /** Liquid or contents colour */
  fill: string;
  /** Background of the product's room in the vanity */
  room: string;
  rating: number;
  reviews: number;
  left: number;
};

export const products: Product[] = [
  {
    id: "lotus-serum",
    name: "Lotus Radiance Serum",
    short: "Lotus Serum",
    category: "Face",
    price: 58,
    size: "30 ml",
    dosha: "Pitta-balancing",
    blurb:
      "Pink lotus and sandalwood calm the flush and leave a glow that looks like you slept nine hours in a palace.",
    ritual: "Three drops, pressed—never rubbed—into damp skin.",
    notes: ["Pink lotus", "Sandalwood", "Rose water"],
    vessel: "dropper",
    glass: "#c4416f",
    fill: "#f08fb0",
    room: "#3a0819",
    rating: 4.9,
    reviews: 412,
    left: 214,
  },
  {
    id: "kumkumadi-oil",
    name: "Kumkumadi Night Oil",
    short: "Kumkumadi Oil",
    category: "Ritual",
    price: 72,
    size: "20 ml",
    dosha: "Vata-nourishing",
    blurb:
      "Sixteen botanicals and real Kashmiri saffron. The oil grandmothers guarded—now in a bottle you'll want on display.",
    ritual: "Warm four drops between palms. Breathe. Press in before sleep.",
    notes: ["Saffron", "Sandalwood", "Manjistha"],
    vessel: "oil",
    glass: "#a8631a",
    fill: "#e8a33d",
    room: "#2a1704",
    rating: 4.8,
    reviews: 638,
    left: 96,
  },
  {
    id: "neem-cleanser",
    name: "Neem Clarity Cleanse",
    short: "Neem Cleanse",
    category: "Cleanse",
    price: 36,
    size: "120 ml",
    dosha: "Kapha-clarifying",
    blurb:
      "A cool gel of neem and tulsi that clears the day away without that tight, squeaky regret.",
    ritual: "Massage onto damp skin for one slow minute. Rinse cool.",
    notes: ["Neem", "Tulsi", "Aloe"],
    vessel: "tube",
    glass: "#1f6b3c",
    fill: "#7fc28f",
    room: "#082a15",
    rating: 4.7,
    reviews: 289,
    left: 341,
  },
  {
    id: "haldi-mask",
    name: "Golden Haldi Mask",
    short: "Haldi Mask",
    category: "Mask",
    price: 44,
    size: "60 g",
    dosha: "All doshas",
    blurb:
      "The haldi ceremony, distilled. Turmeric, kaolin and rose for a weekly glow that photographs like gold leaf.",
    ritual: "A thick veil, ten minutes, warm cloth. Sunday evenings.",
    notes: ["Turmeric", "Kaolin clay", "Rose"],
    vessel: "jar",
    glass: "#c99a3b",
    fill: "#f2c14e",
    room: "#0a1c10",
    rating: 4.9,
    reviews: 521,
    left: 158,
  },
  {
    id: "kajal-liner",
    name: "Kohl Noir Kajal",
    short: "Kohl Kajal",
    category: "Makeup",
    price: 28,
    size: "0.35 g",
    dosha: "Eye ritual",
    blurb:
      "Ghee-soft, smoke-black, smudge-proof by noon. Modern liner, very old soul.",
    ritual: "Line the waterline. Smudge with a fingertip. Look up.",
    notes: ["Ghee", "Almond oil", "Camphor"],
    vessel: "kajal",
    glass: "#0b0f0c",
    fill: "#b8893a",
    room: "#050e08",
    rating: 4.8,
    reviews: 903,
    left: 72,
  },
  {
    id: "beetroot-tint",
    name: "Beetroot Lip & Cheek",
    short: "Beetroot Tint",
    category: "Makeup",
    price: 32,
    size: "8 g",
    dosha: "Colour ritual",
    blurb:
      "One sheer stain that builds from a whisper to a full banquet. Lips, cheeks, a dab on the eyelid.",
    ritual: "Tap with a ring finger. Layer until the mirror agrees.",
    notes: ["Beetroot", "Rose", "Kokum butter"],
    vessel: "pot",
    glass: "#a11047",
    fill: "#d13a6c",
    room: "#4d0821",
    rating: 4.9,
    reviews: 1204,
    left: 41,
  },
];

export const productById = Object.fromEntries(
  products.map((p) => [p.id, p])
) as Record<string, Product>;

export type Ingredient = {
  id: string;
  name: string;
  hindi: string;
  role: string;
  origin: string;
  story: string;
  color: string;
  products: string[];
};

export const ingredients: Ingredient[] = [
  {
    id: "lotus",
    name: "Pink Lotus",
    hindi: "कमल",
    role: "Calms & softens",
    origin: "Temple ponds, Kerala",
    story:
      "It rises clean from muddy water—so we use it on skin that's had a day. Soothing, quietly hydrating, deeply symbolic.",
    color: "#d0577f",
    products: ["lotus-serum"],
  },
  {
    id: "saffron",
    name: "Saffron",
    hindi: "केसर",
    role: "Luminosity",
    origin: "Pampore fields, Kashmir",
    story:
      "Hand-picked threads, 150 flowers to the gram. A trace evens tone and lends that candle-lit radiance.",
    color: "#e8a33d",
    products: ["kumkumadi-oil"],
  },
  {
    id: "turmeric",
    name: "Turmeric",
    hindi: "हल्दी",
    role: "Brightens",
    origin: "Erode, Tamil Nadu",
    story:
      "The pre-wedding glow ritual every aunty swears by. Antioxidant, brightening, gold in every sense.",
    color: "#f2c14e",
    products: ["haldi-mask"],
  },
  {
    id: "neem",
    name: "Neem",
    hindi: "नीम",
    role: "Clarifies",
    origin: "Village groves, Rajasthan",
    story:
      "The courtyard tree with a medicine-cabinet reputation. Clears congestion without stripping the barrier.",
    color: "#5fae73",
    products: ["neem-cleanser"],
  },
  {
    id: "sandalwood",
    name: "Sandalwood",
    hindi: "चंदन",
    role: "Cools & scents",
    origin: "Mysore forests, Karnataka",
    story:
      "Cooling paste for summer foreheads, scent of every temple. It calms heat and lingers like a memory.",
    color: "#c9a27a",
    products: ["lotus-serum", "kumkumadi-oil"],
  },
  {
    id: "beetroot",
    name: "Beetroot",
    hindi: "चुकंदर",
    role: "Natural colour",
    origin: "Kitchen gardens, Punjab",
    story:
      "The original lip stain—stolen from the kitchen. Buildable, sheer, unmistakably alive.",
    color: "#a11047",
    products: ["beetroot-tint"],
  },
  {
    id: "ghee",
    name: "Ghee",
    hindi: "घी",
    role: "Nourishes",
    origin: "Family dairies, Gujarat",
    story:
      "Clarified butter, washed one hundred times. The secret behind kajal that glides and never tugs.",
    color: "#f3dda4",
    products: ["kajal-liner"],
  },
];

export type Dosha = "vata" | "pitta" | "kapha";

export const doshaRituals: Record<
  Dosha,
  {
    title: string;
    element: string;
    copy: string;
    products: string[];
    discount: number;
  }
> = {
  vata: {
    title: "The Moonlit Ritual",
    element: "Air & space",
    copy: "Your skin wants warmth and weight. Oil-first, slow hands, a little gold.",
    products: ["kumkumadi-oil", "lotus-serum", "haldi-mask"],
    discount: 0.15,
  },
  pitta: {
    title: "The Lotus Pond Ritual",
    element: "Fire & water",
    copy: "Cool the flush, keep the colour sheer and alive. Calm before glow.",
    products: ["lotus-serum", "neem-cleanser", "beetroot-tint"],
    discount: 0.15,
  },
  kapha: {
    title: "The Monsoon Ritual",
    element: "Earth & water",
    copy: "Wake the surface. Clarify gently, brighten weekly, one deliberate line of kohl.",
    products: ["neem-cleanser", "haldi-mask", "kajal-liner"],
    discount: 0.15,
  },
};

export const FREE_GIFT_THRESHOLD = 95;

export const formatPrice = (n: number) =>
  `$${n % 1 === 0 ? n : n.toFixed(2)}`;
