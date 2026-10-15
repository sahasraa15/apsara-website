/** Placeholder formulas, textures and usage. Swap in the real numbers before launch. */

export const fullIngredients: Record<string, { inci: string; plain: string; hero?: boolean }[]> = {
  "lotus-serum": [
    { inci: "Rosa Damascena Flower Water", plain: "Rose water. The base, instead of plain water." },
    { inci: "Glycerin", plain: "Pulls moisture into skin and holds it there." },
    { inci: "Nelumbo Nucifera Flower Extract", plain: "Pink lotus. Calms redness.", hero: true },
    { inci: "Santalum Album Wood Extract", plain: "Sandalwood. Cools and soothes.", hero: true },
    { inci: "Sodium Hyaluronate", plain: "Hyaluronic acid. Plumps with water." },
    { inci: "Niacinamide", plain: "Vitamin B3. Evens tone, strengthens the barrier." },
    { inci: "Xanthan Gum", plain: "From fermented sugar. Gives the serum its silky slip." },
    { inci: "Phenoxyethanol", plain: "Keeps the bottle free of bacteria. Under 1%." },
  ],
  "kumkumadi-oil": [
    { inci: "Sesamum Indicum Seed Oil", plain: "Sesame oil. The traditional Ayurvedic base." },
    { inci: "Prunus Amygdalus Dulcis Oil", plain: "Sweet almond oil. Softens without clogging." },
    { inci: "Crocus Sativus Flower Extract", plain: "Saffron. Evens tone, adds glow.", hero: true },
    { inci: "Santalum Album Wood Oil", plain: "Sandalwood. Calms and scents.", hero: true },
    { inci: "Rubia Cordifolia Root Extract", plain: "Manjistha. Brightens dull patches.", hero: true },
    { inci: "Glycyrrhiza Glabra Root Extract", plain: "Licorice root. Fades dark spots." },
    { inci: "Tocopherol", plain: "Vitamin E. Keeps the oils fresh." },
  ],
  "neem-cleanser": [
    { inci: "Aloe Barbadensis Leaf Juice", plain: "Aloe. The cooling base." },
    { inci: "Coco-Glucoside", plain: "A gentle cleanser made from coconut and sugar." },
    { inci: "Glycerin", plain: "Stops that tight, squeaky feeling." },
    { inci: "Azadirachta Indica Leaf Extract", plain: "Neem. Clears pores.", hero: true },
    { inci: "Ocimum Sanctum Leaf Extract", plain: "Holy basil (tulsi). Balances oil.", hero: true },
    { inci: "Sodium Benzoate", plain: "A food-grade preservative." },
  ],
  "haldi-mask": [
    { inci: "Kaolin", plain: "Soft white clay. Draws out oil and grime." },
    { inci: "Cicer Arietinum Seed Powder", plain: "Besan (chickpea flour). Grandma's gentle exfoliant." },
    { inci: "Rosa Damascena Flower Water", plain: "Rose water. Softens the clay." },
    { inci: "Curcuma Longa Root Extract", plain: "Turmeric. Brightens, without the yellow stain.", hero: true },
    { inci: "Squalane", plain: "Plant-based moisture so the clay doesn't over-dry." },
    { inci: "Glycerin", plain: "Keeps skin comfortable while it sets." },
  ],
};

export const feel: Record<string, { texture: number; finish: number; scent: number; scentNote: string; absorbs: string }> = {
  "lotus-serum": { texture: 22, finish: 30, scent: 25, scentNote: "Soft rose", absorbs: "~20 sec" },
  "kumkumadi-oil": { texture: 68, finish: 18, scent: 62, scentNote: "Warm saffron & sandalwood", absorbs: "~2 min" },
  "neem-cleanser": { texture: 35, finish: 78, scent: 40, scentNote: "Fresh & herbal", absorbs: "Rinses off" },
  "haldi-mask": { texture: 88, finish: 85, scent: 30, scentNote: "Earthy rose", absorbs: "Rinses off" },
};

export const lasts: Record<string, { weeks: number; dose: string }> = {
  "lotus-serum": { weeks: 9, dose: "3 drops, twice a day" },
  "kumkumadi-oil": { weeks: 8, dose: "4 drops, every night" },
  "neem-cleanser": { weeks: 10, dose: "A pea-size, twice a day" },
  "haldi-mask": { weeks: 12, dose: "One thick layer, once a week" },
};
