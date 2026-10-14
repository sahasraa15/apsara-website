# Apsara & Co.

Interactive prototype site for an Indian-American Ayurvedic skincare and makeup brand. Visual direction follows a **modern luxe heritage** moodboard: deep forest green, midnight, beetroot magenta, and antique gold—rich texture without costume excess.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS v4
- Framer Motion
- shadcn/ui primitives

## Run locally

```bash
npm install
npm run dev
```

Open [http://127.0.0.1:4321](http://127.0.0.1:4321).

## Pages

- `/` Home: hero with mouse-parallax product group, trust badges, bestsellers, live tint try-on, skin-quiz teaser, ingredients, reviews, early-access signup
- `/shop` All products, filterable by Skincare / Makeup (`/shop?line=Makeup`)
- `/shop/[id]` Product page: tilt-to-cursor product, benefits, shade picker (tint), quantity, details, "pairs well with"
- `/quiz` Three-question Ayurvedic skin-type quiz → a routine bundle at 15% off
- `/ingredients` Interactive ingredient wheel, full ingredient list, "what we never use"
- `/about` Story, "What is Ayurveda?", values, contact & FAQ
- Bag drawer on every page with free-gift progress and pre-launch "reserve" checkout (client-side demo, persisted in localStorage)

Product vessels are drawn in SVG (`src/components/brand/Vessel.tsx`); imagery in `public/images/mood/` is cropped from the moodboard.

## Brand notes

Palette (pink lotus base, forest green, magenta) and the lotus mark are drawn from the project moodboard in `assets/` and `public/images/moodboard.jpg`.
