export type VesselKind = "dropper" | "oil" | "tube" | "jar" | "kajal" | "pot";

export type Product = {
  id: string;
  name: string;
  short: string;
  category: "Serum" | "Face oil" | "Cleanser" | "Mask" | "Eyes" | "Lips & cheeks";
  line: "Skincare" | "Makeup";
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
    line: "Skincare",
    price: 58,
    size: "30 ml",
    dosha: "Best for warm, reactive skin (Pitta)",
    tagline: "Calms redness, boosts glow",
    blurb:
      "Pink lotus and sandalwood calm redness and leave a glow that looks like you slept nine hours. (We won't tell.)",
    benefits: ["Visibly calms redness", "Lightweight daily hydration", "Layers under makeup"],
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
    line: "Skincare",
    price: 72,
    size: "20 ml",
    dosha: "Best for dry, delicate skin (Vata)",
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
    line: "Skincare",
    price: 36,
    size: "120 ml",
    dosha: "Best for oily, congested skin (Kapha)",
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
    line: "Skincare",
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
  {
    id: "kajal-liner",
    name: "Soft Kohl Liner",
    short: "Kohl Liner",
    category: "Eyes",
    line: "Makeup",
    price: 28,
    size: "0.35 g",
    dosha: "Gentle on sensitive eyes",
    tagline: "Smudge-proof, all-day black",
    blurb:
      "Inspired by traditional kajal. Buttery-soft, smoke-black, and smudge-proof all day. Gentle enough for the waterline.",
    benefits: ["Glides on without tugging", "Smudge-proof for 12 hours", "Ophthalmologist tested"],
    ritual: "Line the waterline or lash line. Smudge with a fingertip for a softer look.",
    notes: ["Castor oil", "Almond oil", "Camphor"],
    vessel: "kajal",
    glass: "#0b0f0c",
    fill: "#3a3a3a",
    tint: "#e4e6e5",
    rating: 4.8,
    reviews: 903,
  },
  {
    id: "beetroot-tint",
    name: "Beetroot Lip & Cheek",
    short: "Beetroot Tint",
    category: "Lips & cheeks",
    line: "Makeup",
    price: 32,
    size: "8 g",
    dosha: "Flatters every skin tone",
    tagline: "Buildable natural flush",
    blurb:
      "One sheer stain that builds from barely-there to bold. Lips, cheeks, even a dab on the eyelids.",
    benefits: ["Buildable sheer-to-bold color", "Conditions lips with kokum butter", "Colored by real beetroot"],
    ritual: "Tap on with a fingertip. Layer until you like what you see.",
    notes: ["Beetroot", "Rose", "Kokum butter"],
    vessel: "pot",
    glass: "#a11047",
    fill: "#d13a6c",
    tint: "#f8d0dc",
    rating: 4.9,
    reviews: 1204,
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
  {
    id: "beetroot",
    name: "Beetroot",
    role: "Natural color",
    origin: "Punjab, India",
    story:
      "The original lip stain—stolen from the kitchen. Buildable, sheer, and totally natural.",
    color: "#a11047",
    products: ["beetroot-tint"],
  },
  {
    id: "castor",
    name: "Castor Oil",
    role: "Conditions",
    origin: "Gujarat, India",
    story:
      "Cold-pressed and used in homemade kajal for generations. Keeps the liner silky and conditions lashes.",
    color: "#d9b25c",
    products: ["kajal-liner"],
  },
];

export const ingredientsFor = (productId: string) =>
  ingredients.filter((i) => i.products.includes(productId));

export type Dosha = "vata" | "pitta" | "kapha";

export const doshaInfo: Record<Dosha, { name: string; plain: string; element: string }> = {
  vata: { name: "Vata", plain: "Dry & delicate", element: "Air" },
  pitta: { name: "Pitta", plain: "Warm & reactive", element: "Fire" },
  kapha: { name: "Kapha", plain: "Oily & congested", element: "Earth" },
};

export const doshaRituals: Record<
  Dosha,
  {
    title: string;
    copy: string;
    products: string[];
    discount: number;
  }
> = {
  vata: {
    title: "The Moisture Routine",
    copy: "Your skin is on the dry side and wants richness. Oil-first, slow hands, lots of moisture.",
    products: ["kumkumadi-oil", "lotus-serum", "haldi-mask"],
    discount: 0.15,
  },
  pitta: {
    title: "The Calm Routine",
    copy: "Your skin runs warm and reactive. Calm the redness first, then glow.",
    products: ["lotus-serum", "neem-cleanser", "beetroot-tint"],
    discount: 0.15,
  },
  kapha: {
    title: "The Fresh Start Routine",
    copy: "Your skin leans oily. Clear gently, brighten weekly, and keep it fresh.",
    products: ["neem-cleanser", "haldi-mask", "kajal-liner"],
    discount: 0.15,
  },
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
    product: "beetroot-tint",
    quote: "One pot, lips and cheeks, looks like my actual flush. It's the only thing in my makeup bag now.",
  },
];

export const FREE_GIFT_THRESHOLD = 95;

export const formatPrice = (n: number) =>
  `$${n % 1 === 0 ? n : n.toFixed(2)}`;
