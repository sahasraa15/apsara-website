export type Product = {
  id: string;
  name: string;
  category: string;
  price: string;
  dosha: string;
  blurb: string;
  image: string;
  accent: "forest" | "magenta" | "gold";
};

export const products: Product[] = [
  {
    id: "lotus-serum",
    name: "Lotus Radiance Serum",
    category: "Face",
    price: "$58",
    dosha: "Pitta-balancing",
    blurb: "Pink lotus & sandalwood to calm flush and restore a quiet glow.",
    image:
      "https://images.unsplash.com/photo-1620916567138-c4ccad5ab738?auto=format&fit=crop&w=900&q=80",
    accent: "magenta",
  },
  {
    id: "kumkumadi-oil",
    name: "Kumkumadi Night Oil",
    category: "Ritual",
    price: "$72",
    dosha: "Vata-nourishing",
    blurb: "Saffron-kissed oil for overnight repair and moonlit softness.",
    image:
      "https://images.unsplash.com/photo-1608248543802-bae6d9c8f3e8?auto=format&fit=crop&w=900&q=80",
    accent: "gold",
  },
  {
    id: "neem-cleanser",
    name: "Neem Clarity Cleanse",
    category: "Cleanse",
    price: "$36",
    dosha: "Kapha-clarifying",
    blurb: "A gel cleanse with neem & tulsi that leaves skin clear, never stripped.",
    image:
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=900&q=80",
    accent: "forest",
  },
  {
    id: "haldi-mask",
    name: "Golden Haldi Mask",
    category: "Mask",
    price: "$44",
    dosha: "All doshas",
    blurb: "Turmeric, clay, and rose for a luminous weekly reset.",
    image:
      "https://images.unsplash.com/photo-1570554886111-e80fcca6a029?auto=format&fit=crop&w=900&q=80",
    accent: "gold",
  },
  {
    id: "kajal-liner",
    name: "Kohl Noir Kajal",
    category: "Makeup",
    price: "$28",
    dosha: "Eye ritual",
    blurb: "Soft, smudgeable black with ghee-infused glide—modern liner, old soul.",
    image:
      "https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?auto=format&fit=crop&w=900&q=80",
    accent: "forest",
  },
  {
    id: "beetroot-tint",
    name: "Beetroot Lip & Cheek",
    category: "Makeup",
    price: "$32",
    dosha: "Color ritual",
    blurb: "A sheer magenta stain that builds from whisper to banquet.",
    image:
      "https://images.unsplash.com/photo-1586495777744-4413f21067fa?auto=format&fit=crop&w=900&q=80",
    accent: "magenta",
  },
];

export const ingredients = [
  {
    name: "Pink Lotus",
    role: "Calm & clarify",
    detail: "Soothing botanicals for sensitive, heat-prone skin.",
    image:
      "https://images.unsplash.com/photo-1516194142086-7f3f5c8c8f8a?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Saffron",
    role: "Luminosity",
    detail: "Trace amounts for tone evening and quiet radiance.",
    image:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Neem",
    role: "Balance",
    detail: "Time-honored clarity without the harsh strip.",
    image:
      "https://images.unsplash.com/photo-1466692476866-aef1df0923d9?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Turmeric",
    role: "Brighten",
    detail: "Golden root for weekly renewal rituals.",
    image:
      "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80",
  },
];

export const rituals = [
  {
    step: "01",
    title: "Cleanse with intention",
    copy: "Warm water, soft hands, neem clarity. Begin where the day ends.",
  },
  {
    step: "02",
    title: "Treat the dosha",
    copy: "Serum or oil matched to your skin’s current season—not a rigid type.",
  },
  {
    step: "03",
    title: "Seal & color",
    copy: "A drop of oil, a flush of beetroot. Beauty as quiet ceremony.",
  },
];
