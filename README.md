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

## What’s on the page

- Hero: product shelf inside a rounded arch with a soft cursor glow; scrolling walks you through the arch
- Collection: pinned horizontal scroll, one color-shifting panel per product with tilt-to-cursor vessels, stock bar and add-to-bag
- Try a shade: drag the beetroot tint from Sheer to Statement and preview it on six skin tones
- Skin quiz: three questions → a personalized three-product routine at 15% off, added in one click
- Ingredients: ingredient orbs with origin stories, linked to the products that contain them
- Story: parallax collage cut from the moodboard
- Early access: live spot counter, perks, and a numbered confirmation card on sign-up
- Bag drawer with free-gift progress bar and pre-launch "reserve" checkout (client-side demo, persisted in localStorage)

Product vessels are drawn in SVG (`src/components/brand/Vessel.tsx`); imagery in `public/images/mood/` is cropped from the moodboard.

## Brand notes

Palette (forest green, magenta, gold accents) and the lotus mark are drawn from the project moodboard in `assets/` and `public/images/moodboard.jpg`.
