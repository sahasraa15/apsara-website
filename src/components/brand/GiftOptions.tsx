"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Gift as GiftIcon } from "lucide-react";
import { useCart } from "@/lib/cart";
import { FREE_GIFT_THRESHOLD, GIFT_WRAP_FEE, formatPrice } from "@/lib/products";
import { cn } from "@/lib/utils";

export const wraps = [
  { id: "gold", name: "Gold foil", bg: "linear-gradient(135deg,#8a6224,#e3c27c 35%,#f6e3a8 50%,#c79a45 70%,#8a6224)", ribbon: "#a11047" },
  { id: "lotus", name: "Lotus pink", bg: "linear-gradient(135deg,#f3bfd0,#e0507e)", ribbon: "#b8893a" },
  { id: "forest", name: "Forest", bg: "linear-gradient(135deg,#0c5029,#0a1c10)", ribbon: "#e3c27c" },
  { id: "marigold", name: "Marigold", bg: "linear-gradient(135deg,#f2c14e,#e8862d)", ribbon: "#a11047" },
  { id: "plum", name: "Plum", bg: "linear-gradient(135deg,#7a1640,#4d0821)", ribbon: "#e3c27c" },
  { id: "ivory", name: "Ivory & gold", bg: "linear-gradient(135deg,#fffaf0,#f3e6cc)", ribbon: "#b8893a" },
  {
    id: "blockprint",
    name: "Block print",
    bg: "radial-gradient(circle at 25% 25%,#a11047 0 2.5px,transparent 3px) 0 0/12px 12px,radial-gradient(circle at 75% 75%,#0c5029 0 2.5px,transparent 3px) 0 0/12px 12px,#fbecc4",
    ribbon: "#a11047",
  },
  { id: "kraft", name: "Recycled kraft", bg: "linear-gradient(135deg,#c9a77c,#a9845a)", ribbon: "#0c5029" },
];

const occasions: Record<string, Record<string, string>> = {
  Celebrations: {
    Birthday: "Happy birthday, gorgeous. Treat your skin like the main character.",
    Wedding: "For the newlyweds: here's to a lifetime of glowing.",
    Engagement: "You said yes! Now glow all the way to the big day.",
    "Bridal shower": "For the bride-to-be: glow up, then glow down the aisle.",
    "Baby shower": "For the mama-to-be. You deserve ten quiet minutes and a face mask.",
    Graduation: "You did it! New chapter, new glow.",
    Anniversary: "Another year of you. Still glowing.",
    "New job": "New job, who dis? Go get 'em.",
  },
  Holidays: {
    Diwali: "Happy Diwali! May your year glow as bright as the diyas.",
    Eid: "Eid Mubarak! Wishing you peace, joy and a little glow.",
    Christmas: "Merry Christmas! Something golden for under the tree.",
    Hanukkah: "Happy Hanukkah! Eight nights, one glow.",
    "Lunar New Year": "Happy Lunar New Year! Wishing you luck, health and great skin.",
    Holi: "Happy Holi! For after the colors wash off.",
    Rakhi: "Happy Raksha Bandhan. Thanks for always having my back.",
    Kwanzaa: "Joyous Kwanzaa! Wishing you a season of light.",
    "Mother's Day": "For the woman who taught me the haldi trick. Love you, Mom.",
    "Valentine's": "Be mine? (Your skin will thank you.)",
    "Galentine's": "To my favorite girl. Glow together, stay together.",
  },
  Everyday: {
    "Thank you": "Thank you, truly. This is a little something to say it.",
    "Get well soon": "Feel better soon. Rest, hydrate, and be gentle with yourself.",
    "Thinking of you": "Thinking of you today, and sending a little glow your way.",
    Congrats: "Congratulations! You earned this.",
    Sorry: "I'm sorry. Let me make it up to you.",
    "Just because": "Saw this and thought of you.",
    "Treat yourself": "A note to me: you deserve this.",
  },
};

export function GiftOptions() {
  const { gift, setGift, subtotal } = useCart();
  const [group, setGroup] = useState<keyof typeof occasions>("Celebrations");
  const free = subtotal >= FREE_GIFT_THRESHOLD;
  const wrap = wraps.find((w) => w.id === gift?.wrap) ?? wraps[0];

  const toggle = () =>
    setGift(
      gift
        ? null
        : { wrap: wraps[0].id, occasion: "Birthday", note: occasions.Celebrations.Birthday, hidePrices: true }
    );

  return (
    <div className="mx-2 mt-3 rounded-2xl bg-blush ring-1 ring-ink/5">
      <button type="button" onClick={toggle} className="flex w-full items-center gap-3 p-4 text-left">
        <span className="grid size-9 place-items-center rounded-full text-white" style={{ background: wrap.bg }}>
          <GiftIcon className="size-4 drop-shadow" />
        </span>
        <span className="flex-1">
          <span className="block text-sm font-medium">Make it a gift</span>
          <span className="block text-xs text-ink/55">
            Wrapped, with a handwritten-style note · {free ? "Free on this order" : formatPrice(GIFT_WRAP_FEE)}
          </span>
        </span>
        <span className={cn("relative h-6 w-10 rounded-full transition-colors", gift ? "bg-forest" : "bg-ink/15")}>
          <motion.span
            className="absolute top-1 size-4 rounded-full bg-white shadow"
            animate={{ left: gift ? 20 : 4 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {gift && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="space-y-4 px-4 pb-4">
              <div>
                <p className="text-xs font-medium text-ink/60">
                  Wrap · <span className="text-ink">{wrap.name}</span>
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {wraps.map((w) => (
                    <button
                      key={w.id}
                      type="button"
                      aria-label={w.name}
                      onClick={() => setGift({ ...gift, wrap: w.id })}
                      className={cn(
                        "relative size-9 overflow-hidden rounded-full ring-1 ring-ink/10 ring-offset-2 ring-offset-blush transition",
                        gift.wrap === w.id && "ring-2 ring-ink"
                      )}
                      style={{ background: w.bg }}
                    >
                      <span className="absolute inset-y-0 left-1/2 w-1 -translate-x-1/2" style={{ background: w.ribbon }} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-ink/60">Occasion</p>
                <div className="mt-2 flex gap-1 rounded-full bg-white p-1">
                  {Object.keys(occasions).map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setGroup(g)}
                      className={cn(
                        "flex-1 rounded-full py-1.5 text-xs transition",
                        group === g ? "bg-ink text-white" : "text-ink/60 hover:text-ink"
                      )}
                    >
                      {g}
                    </button>
                  ))}
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {Object.entries(occasions[group]).map(([name, note]) => (
                    <button
                      key={name}
                      type="button"
                      onClick={() => setGift({ ...gift, occasion: name, note })}
                      className={cn(
                        "rounded-full px-3 py-1 text-xs transition",
                        gift.occasion === name ? "bg-magenta text-white" : "bg-white ring-1 ring-ink/10 hover:ring-ink/30"
                      )}
                    >
                      {name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="relative rounded-xl bg-[#fffaf0] p-3 ring-1 ring-gold/40">
                <div className="gold-hairline mb-2" />
                <textarea
                  value={gift.note}
                  onChange={(e) => setGift({ ...gift, note: e.target.value })}
                  rows={3}
                  maxLength={200}
                  placeholder="Write your note…"
                  aria-label="Gift note"
                  className="w-full resize-none bg-transparent font-display text-lg italic leading-snug outline-none placeholder:text-ink/35"
                />
                <p className="text-right text-[0.65rem] text-ink/40">{gift.note.length}/200</p>
              </div>

              <label className="flex cursor-pointer items-center gap-2 text-xs text-ink/70">
                <input
                  type="checkbox"
                  checked={gift.hidePrices}
                  onChange={(e) => setGift({ ...gift, hidePrices: e.target.checked })}
                  className="accent-[#0c5029]"
                />
                Leave prices out of the box
              </label>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function giftFee(subtotal: number, hasGift: boolean) {
  return hasGift && subtotal < FREE_GIFT_THRESHOLD ? GIFT_WRAP_FEE : 0;
}
