"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Droplets, MapPin, Sun, Thermometer, Wind } from "lucide-react";
import { productById } from "@/lib/products";
import { Vessel } from "@/components/brand/Vessel";

type Weather = { place: string; temp: number; humidity: number; wind: number; uv: number; month: number };

const presets: Weather[] = [
  { place: "Chicago in January", temp: -6, humidity: 30, wind: 28, uv: 1, month: 0 },
  { place: "Houston in July", temp: 34, humidity: 78, wind: 10, uv: 10, month: 6 },
  { place: "Phoenix in June", temp: 41, humidity: 9, wind: 14, uv: 11, month: 5 },
  { place: "Seattle in October", temp: 12, humidity: 82, wind: 12, uv: 2, month: 9 },
];

const seasons = [
  { months: [11, 0, 1], name: "Shishira", plain: "deep winter", note: "Ayurveda's driest season. Skin needs oil, not more water." },
  { months: [2, 3], name: "Vasanta", plain: "spring", note: "Things get heavier and congested. Keep cleansing light and regular." },
  { months: [4, 5], name: "Grishma", plain: "summer", note: "Heat builds up in the skin. Cool it down and go easy on actives." },
  { months: [6, 7], name: "Varsha", plain: "monsoon", note: "Humid but unsettled. Balance is the goal, so keep it simple." },
  { months: [8, 9], name: "Sharad", plain: "late-summer heat", note: "Leftover summer heat shows up as redness. Soothe, don't scrub." },
  { months: [10], name: "Hemanta", plain: "early winter", note: "Skin starts to tighten. Bring the face oil back in at night." },
];

function advise(w: Weather) {
  const season = seasons.find((s) => s.months.includes(w.month))!;
  if (w.humidity < 35 || w.temp < 4)
    return {
      season,
      mood: "Dry-air day",
      color: "#e8a33d",
      tip: "The air is pulling moisture out of your skin. Press 4 drops of Kumkumadi oil over your serum tonight, and skip hot showers.",
      picks: ["kumkumadi-oil", "lotus-serum"],
    };
  if (w.temp > 29 || w.uv >= 7)
    return {
      season,
      mood: "Hot, bright day",
      color: "#d0577f",
      tip: "Heat and sun make sensitive skin flush. Keep the serum in the fridge for a cooling hit, and don't skip SPF.",
      picks: ["lotus-serum", "neem-cleanser"],
    };
  if (w.humidity > 70)
    return {
      season,
      mood: "Sticky, humid day",
      color: "#4f9e66",
      tip: "Humidity means more oil and sweat. Double-cleanse with Neem tonight and swap the oil for a lighter layer of serum.",
      picks: ["neem-cleanser", "lotus-serum"],
    };
  return {
    season,
    mood: "Easy-skin day",
    color: "#b8893a",
    tip: "Nothing extreme out there. A perfect night for your weekly turmeric mask.",
    picks: ["haldi-mask", "lotus-serum"],
  };
}

export function SkinForecastDemo() {
  const [weather, setWeather] = useState<Weather>(presets[0]);
  const [city, setCity] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const a = advise(weather);

  async function lookup(e: FormEvent) {
    e.preventDefault();
    if (!city.trim()) return;
    setStatus("loading");
    try {
      const geo = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?count=1&name=${encodeURIComponent(city.trim())}`
      ).then((r) => r.json());
      const g = geo.results?.[0];
      if (!g) throw new Error("not found");
      const wx = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${g.latitude}&longitude=${g.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m&daily=uv_index_max&forecast_days=1&timezone=auto`
      ).then((r) => r.json());
      setWeather({
        place: `${g.name}${g.admin1 ? `, ${g.admin1}` : ""} right now`,
        temp: Math.round(wx.current.temperature_2m),
        humidity: Math.round(wx.current.relative_humidity_2m),
        wind: Math.round(wx.current.wind_speed_10m),
        uv: Math.round(wx.daily.uv_index_max[0]),
        month: new Date().getMonth(),
      });
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  }

  const stats = [
    { icon: Thermometer, label: "Temp", value: `${Math.round((weather.temp * 9) / 5 + 32)}°F` },
    { icon: Droplets, label: "Humidity", value: `${weather.humidity}%` },
    { icon: Wind, label: "Wind", value: `${Math.round(weather.wind * 0.62)} mph` },
    { icon: Sun, label: "UV", value: `${weather.uv}` },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
      <div className="rounded-[2rem] bg-white p-6 ring-1 ring-ink/5 md:p-8">
        <form onSubmit={lookup} className="flex gap-2">
          <label className="flex flex-1 items-center gap-2 rounded-full bg-petal px-4">
            <MapPin className="size-4 text-magenta" />
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Type your city"
              className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-ink/45"
            />
          </label>
          <button type="submit" className="rounded-full bg-forest px-5 text-sm font-medium text-white hover:bg-forest-deep">
            {status === "loading" ? "…" : "Check"}
          </button>
        </form>
        {status === "error" && <p className="mt-2 text-sm text-magenta">Couldn&apos;t find that city. Try another?</p>}
        <p className="mt-6 text-xs text-ink/50">Or try a sample day:</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {presets.map((p) => (
            <button
              key={p.place}
              type="button"
              onClick={() => setWeather(p)}
              className={`rounded-full px-3.5 py-1.5 text-sm transition ${
                weather.place === p.place ? "bg-ink text-white" : "bg-ink/5 hover:bg-ink/10"
              }`}
            >
              {p.place}
            </button>
          ))}
        </div>
        <div className="mt-8 grid grid-cols-4 gap-2">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl bg-blush p-3 text-center">
              <s.icon className="mx-auto size-4 text-gold-deep" />
              <p className="mt-1.5 font-display text-xl">{s.value}</p>
              <p className="text-[0.7rem] text-ink/50">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={weather.place}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.35 }}
          className="relative overflow-hidden rounded-[2rem] bg-forest-deep p-6 text-white md:p-8"
        >
          <div
            className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full opacity-50 blur-3xl"
            style={{ background: a.color }}
          />
          <p className="eyebrow text-gold-light">Today&apos;s skin forecast · {weather.place}</p>
          <h3 className="mt-3 font-display text-4xl md:text-5xl">{a.mood}</h3>
          <p className="mt-4 max-w-md leading-relaxed text-white/80">{a.tip}</p>
          <div className="mt-6 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
            <p className="text-sm">
              <span className="gold-foil font-display text-lg">
                {a.season.name}
              </span>{" "}
              <span className="text-white/60">· Ayurveda&apos;s {a.season.plain}</span>
            </p>
            <p className="mt-1 text-sm text-white/70">{a.season.note}</p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            {a.picks.map((id) => {
              const p = productById[id];
              return (
                <div key={id} className="flex items-center gap-3 rounded-2xl bg-white p-2 pr-4 text-ink">
                  <div className="grid h-14 w-10 place-items-end rounded-xl" style={{ background: p.tint }}>
                    <Vessel product={p} className="h-12" />
                  </div>
                  <p className="text-sm font-medium">{p.short}</p>
                </div>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
