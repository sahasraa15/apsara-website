export type VesselKind = "dropper" | "oil" | "tube" | "jar" | "kajal" | "pot";

export type Product = {
  id: string;
  name: string;
  short: string;
  category: "Face" | "Treatment" | "Cleanse" | "Mask" | "Makeup";
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
      "Pink lotus and sandalwood calm the flush and leave a glow that looks like you slept nine hours. (We won't tell.)",
    ritual: "Press three drops into damp skin, morning or night.",
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
    category: "Treatment",
    price: 72,
    size: "20 ml",
    dosha: "Vata-nourishing",
    blurb:
      "Sixteen botanicals and real saffron in a lightweight overnight oil. Wake up looking like you have your life together.",
    ritual: "Warm four drops between your palms and press into skin before bed.",
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
      "A cool gel of neem and holy basil that clears the day away without that tight, squeaky feeling.",
    ritual: "Massage onto damp skin for a minute. Rinse with cool water.",
    notes: ["Neem", "Holy basil", "Aloe"],
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
    name: "Golden Turmeric Mask",
    short: "Turmeric Mask",
    category: "Mask",
    price: 44,
    size: "60 g",
    dosha: "All doshas",
    blurb:
      "Turmeric, kaolin clay and rose for a weekly brightening mask. Ten minutes, real glow, no filter needed.",
    ritual: "Apply a thick layer, leave ten minutes, remove with a warm cloth. Once a week.",
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
    name: "Soft Kohl Liner",
    short: "Kohl Liner",
    category: "Makeup",
    price: 28,
    size: "0.35 g",
    dosha: "Eye ritual",
    blurb:
      "Buttery-soft, smoke-black, and smudge-proof all day. Gentle enough for the waterline.",
    ritual: "Line the waterline or lash line. Smudge with a fingertip for a softer look.",
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
    dosha: "Color",
    blurb:
      "One sheer stain that builds from barely-there to bold. Lips, cheeks, even a dab on the eyelids.",
    ritual: "Tap on with a fingertip. Layer until you like what you see.",
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
    role: "Calms & softens",
    origin: "Kerala, India",
    story:
      "It grows clean out of muddy water—so we use it on skin that's had a day. Soothing and quietly hydrating.",
    color: "#d0577f",
    products: ["lotus-serum"],
  },
  {
    id: "saffron",
    name: "Saffron",
    role: "Luminosity",
    origin: "Kashmir, India",
    story:
      "Hand-picked threads, 150 flowers to the gram. A little evens out tone and adds a candle-lit glow.",
    color: "#e8a33d",
    products: ["kumkumadi-oil"],
  },
  {
    id: "turmeric",
    name: "Turmeric",
    role: "Brightens",
    origin: "Tamil Nadu, India",
    story:
      "The glow trick generations swore by, now backed by research. Antioxidant, brightening, calming.",
    color: "#f2c14e",
    products: ["haldi-mask"],
  },
  {
    id: "neem",
    name: "Neem",
    role: "Clarifies",
    origin: "Rajasthan, India",
    story:
      "The backyard tree with a medicine-cabinet reputation. Clears pores without stripping your skin barrier.",
    color: "#5fae73",
    products: ["neem-cleanser"],
  },
  {
    id: "sandalwood",
    name: "Sandalwood",
    role: "Cools & scents",
    origin: "Karnataka, India",
    story:
      "Naturally cooling and calming, with a warm woody scent that lingers. Great for redness.",
    color: "#c9a27a",
    products: ["lotus-serum", "kumkumadi-oil"],
  },
  {
    id: "beetroot",
    name: "Beetroot",
    role: "Natural colour",
    origin: "Punjab, India",
    story:
      "The original lip stain—stolen from the kitchen. Buildable, sheer, and totally natural.",
    color: "#a11047",
    products: ["beetroot-tint"],
  },
  {
    id: "ghee",
    name: "Ghee",
    role: "Nourishes",
    origin: "Gujarat, India",
    story:
      "Clarified butter, whipped until silky. The secret behind a liner that glides and never tugs.",
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
    title: "The Moonlit Routine",
    element: "Air & space",
    copy: "Your skin is on the dry side and wants richness. Oil-first, slow hands, lots of moisture.",
    products: ["kumkumadi-oil", "lotus-serum", "haldi-mask"],
    discount: 0.15,
  },
  pitta: {
    title: "The Calm Routine",
    element: "Fire & water",
    copy: "Your skin runs warm and reactive. Calm the redness first, then glow.",
    products: ["lotus-serum", "neem-cleanser", "beetroot-tint"],
    discount: 0.15,
  },
  kapha: {
    title: "The Fresh Start Routine",
    element: "Earth & water",
    copy: "Your skin leans oily. Clear gently, brighten weekly, and keep it fresh.",
    products: ["neem-cleanser", "haldi-mask", "kajal-liner"],
    discount: 0.15,
  },
};

export const FREE_GIFT_THRESHOLD = 95;

export const formatPrice = (n: number) =>
  `$${n % 1 === 0 ? n : n.toFixed(2)}`;
