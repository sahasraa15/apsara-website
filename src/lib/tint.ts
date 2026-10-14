export const tintLevels = [
  { name: "Sheer", note: "One tap. Looks like you just walked in from the cold." },
  { name: "Flush", note: "Two taps. Rested, rosy, slightly in love." },
  { name: "Night Out", note: "Three taps. Dancing until 2am, still glowing." },
  { name: "Statement", note: "Four taps. Full color. Heads turn." },
];

const toRgb = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));

export const mixHex = (a: string, b: string, t: number) => {
  const A = toRgb(a);
  const B = toRgb(b);
  return `#${A.map((v, i) => Math.round(v + (B[i] - v) * t).toString(16).padStart(2, "0")).join("")}`;
};
