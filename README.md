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

- Intro: lotus mark draws itself, then jali palace doors open
- Hero: product shelf inside the logo arch, cursor lamplight through jali, gold dust; scrolling walks you through the arch
- The Vanity: pinned horizontal scroll, one colour-shifting "room" per product with tilt-to-cursor vessels, stock scarcity and add-to-bag
- Shade Studio: drag the beetroot tint from Whisper to Banquet and preview it on six skin tones
- Ritual consult: three questions → a personalised three-product ritual bundle at 15% off, added in one click
- The Garden: ingredient seals with origin stories, linked to the products that contain them
- Story: parallax collage cut from the moodboard
- Founding Circle: live seat counter, perks, and a numbered member card on sign-up
- Bag drawer with free-gift progress bar and pre-launch "reserve" checkout (client-side demo, persisted in localStorage)

Product vessels are drawn in SVG (`src/components/brand/Vessel.tsx`); imagery in `public/images/mood/` is cropped from the moodboard.

## Brand notes

Palette and motifs (lotus arch, jali overlay, silk/stone atmosphere) are drawn from the project moodboard in `assets/` and `public/images/moodboard.jpg`.
