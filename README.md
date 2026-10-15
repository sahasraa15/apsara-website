# Apsara & Co.

Interactive prototype site for an Indian-American Ayurvedic skincare brand. Visual direction follows a **modern luxe heritage** moodboard: deep forest green, midnight, beetroot magenta, and antique gold—rich texture without costume excess.

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

- `/` Home: hero with mouse-parallax product group, trust badges, scroll-driven "Kumkumadi decoded" story, scroll-through routine (cleanse → treat → glow → reset), collection, gold stats, skin-quiz teaser, swipeable reviews filtered by skin type, early-access signup
- `/shop` All products, "Build your shelf" (drag products into a routine, 15% off 3+), and the Discovery Kit (minis of all four)
- `/shop/[id]` Product page: drag-to-turn product with "Try a drop", feel/ingredients/how-long-it-lasts tabs, subscribe & save, details, scroll-driven "what's inside", "pairs well with"
- `/quiz` Eight-question Ayurvedic skin quiz → skin-type mix, personalized routine with reasons, tips, 15% off
- `/ingredients` Expanding ingredient panels (hover or tap to explore), "Where it grows" map of India, "what we never use"
- `/glow-room` The Glow Room: pick a tool (skin forecast from live weather, bridal glow countdown)
- `/rewards` Gold Leaf rewards: tiers, points calculator, join
- `/about` Story, "What is Ayurveda?", stacking value cards, contact & FAQ
- Bag drawer on every page with free-gift progress, gift wrap and notes, Gold Leaf points and pre-launch "reserve" checkout (client-side demo, persisted in localStorage)

Product vessels are drawn in SVG (`src/components/brand/Vessel.tsx`); imagery in `public/images/mood/` is cropped from the moodboard.

## Brand notes

Palette (pink lotus base, forest green, magenta) and the lotus mark are drawn from the project moodboard in `assets/` and `public/images/moodboard.jpg`.
