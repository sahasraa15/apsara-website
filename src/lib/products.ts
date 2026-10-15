export type VesselKind = "dropper" | "oil" | "tube" | "jar";

export type Product = {
  id: string;
  name: string;
  short: string;
  category: "Serum" | "Face oil" | "Cleanser" | "Mask";
  price: number;
  size: string;
  /** Which Ayurvedic skin type it's built for */
  dosha: string;
  tagline: string;
  blurb: string;
  benefits: string[];
  ritual: string;
  notes: string[];
  vessel: VesselKind;
  /** Glass / body colour of the vessel */
  glass: string;
  /** Liquid or contents colour */
  fill: string;
  /** Soft background behind the product on light pages */
  tint: string;
  rating: number;
  reviews: number;
  bestseller?: boolean;
};

export const products: Product[] = [
  {
    id: "lotus-serum",
    name: "Lotus Radiance Serum",
    short: "Lotus Serum",
    category: "Serum",
    price: 58,
    size: "30 ml",
    dosha: "Best for sensitive, reactive skin",
    tagline: "Calms redness, boosts glow",
    blurb:
      "Pink lotus and sandalwood calm redness and leave a glow that looks like you slept nine hours. (We won't tell.)",
    benefits: ["Visibly calms redness", "Lightweight daily hydration", "Layers well under SPF"],
    ritual: "Press three drops into damp skin, morning or night.",
    notes: ["Pink lotus", "Sandalwood", "Rose water"],
    vessel: "dropper",
    glass: "#c4416f",
    fill: "#f08fb0",
    tint: "#fbd7e3",
    rating: 4.9,
    reviews: 412,
    bestseller: true,
  },
  {
    id: "kumkumadi-oil",
    name: "Kumkumadi Night Oil",
    short: "Kumkumadi Oil",
    category: "Face oil",
    price: 72,
    size: "20 ml",
    dosha: "Best for dry, delicate skin",
    tagline: "Overnight glow with saffron",
    blurb:
      "The classic Ayurvedic beauty oil: sixteen botanicals and real saffron in a lightweight overnight formula. Wake up looking like you have your life together.",
    benefits: ["Evens out skin tone", "Deep overnight moisture", "Absorbs without greasiness"],
    ritual: "Warm four drops between your palms and press into skin before bed.",
    notes: ["Saffron", "Sandalwood", "Manjistha"],
    vessel: "oil",
    glass: "#a8631a",
    fill: "#e8a33d",
    tint: "#fbe3c8",
    rating: 4.8,
    reviews: 638,
    bestseller: true,
  },
  {
    id: "neem-cleanser",
    name: "Neem Clarity Cleanser",
    short: "Neem Cleanser",
    category: "Cleanser",
    price: 36,
    size: "120 ml",
    dosha: "Best for oily, congested skin",
    tagline: "Clears pores, never tight",
    blurb:
      "A cool gel of neem and holy basil that clears the day away without that tight, squeaky feeling.",
    benefits: ["Clears pores and excess oil", "Keeps the skin barrier intact", "Gentle enough for twice daily"],
    ritual: "Massage onto damp skin for a minute. Rinse with cool water.",
    notes: ["Neem", "Holy basil", "Aloe"],
    vessel: "tube",
    glass: "#1f6b3c",
    fill: "#7fc28f",
    tint: "#d9efdf",
    rating: 4.7,
    reviews: 289,
  },
  {
    id: "haldi-mask",
    name: "Golden Turmeric Mask",
    short: "Turmeric Mask",
    category: "Mask",
    price: 44,
    size: "60 g",
    dosha: "Good for every skin type",
    tagline: "Ten-minute brightening",
    blurb:
      "Turmeric, kaolin clay and rose in a weekly brightening mask. Ten minutes, real glow, no filter needed.",
    benefits: ["Brightens dull skin", "Gently draws out impurities", "Won't stain"],
    ritual: "Apply a thick layer, leave ten minutes, remove with a warm cloth. Once a week.",
    notes: ["Turmeric", "Kaolin clay", "Rose"],
    vessel: "jar",
    glass: "#c99a3b",
    fill: "#f2c14e",
    tint: "#fbecc4",
    rating: 4.9,
    reviews: 521,
    bestseller: true,
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
    role: "Evens tone",
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
    color: "#e9b234",
    products: ["haldi-mask"],
  },
  {
    id: "neem",
    name: "Neem",
    role: "Clarifies",
    origin: "Rajasthan, India",
    story:
      "The backyard tree with a medicine-cabinet reputation. Clears pores without stripping your skin barrier.",
    color: "#4f9e66",
    products: ["neem-cleanser"],
  },
  {
    id: "sandalwood",
    name: "Sandalwood",
    role: "Cools & soothes",
    origin: "Karnataka, India",
    story:
      "Naturally cooling and calming, with a warm woody scent that lingers. Great for redness.",
    color: "#b98f66",
    products: ["lotus-serum", "kumkumadi-oil"],
  },
];

export const ingredientsFor = (productId: string) =>
  ingredients.filter((i) => i.products.includes(productId));

export type Dosha = "vata" | "pitta" | "kapha";

export const doshaInfo: Record<Dosha, { name: string; plain: string; element: string }> = {
  vata: { name: "Dry", plain: "Tight, flaky, early lines", element: "Air" },
  pitta: { name: "Sensitive", plain: "Redness, heat, reactions", element: "Fire" },
  kapha: { name: "Oily", plain: "Shine, pores, breakouts", element: "Earth" },
};

export const reviews = [
  {
    name: "Jess M.",
    place: "Austin, TX",
    product: "lotus-serum",
    quote: "My redness is honestly half of what it was. I've repurchased twice and I never repurchase anything.",
  },
  {
    name: "Priya K.",
    place: "Jersey City, NJ",
    product: "kumkumadi-oil",
    quote: "My mom swore by kumkumadi. This is the first one that doesn't feel heavy—and the bottle is gorgeous.",
  },
  {
    name: "Taylor R.",
    place: "Portland, OR",
    product: "haldi-mask",
    quote: "Ten minutes on a Sunday and my skin looks like I went on vacation. And no, it doesn't stain.",
  },
];

export const FREE_GIFT_THRESHOLD = 95;

export const formatPrice = (n: number) =>
  `$${n % 1 === 0 ? n : n.toFixed(2)}`;
