import { FlaskConical, Leaf, Rabbit, Sprout } from "lucide-react";

const items = [
  { icon: Leaf, title: "Clean formulas", copy: "No parabens, sulfates or synthetic fragrance" },
  { icon: Sprout, title: "100% vegan", copy: "Plant-powered, start to finish" },
  { icon: Rabbit, title: "Cruelty-free", copy: "Never tested on animals" },
  { icon: FlaskConical, title: "Dermatologist tested", copy: "Safe for sensitive skin" },
];

export function TrustBar() {
  return (
    <section className="border-y border-ink/10 bg-white">
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-6 px-5 py-8 md:grid-cols-4 md:px-10">
        {items.map(({ icon: Icon, title, copy }) => (
          <div key={title} className="flex items-start gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-petal text-forest">
              <Icon className="size-5" strokeWidth={1.6} />
            </span>
            <div>
              <p className="text-sm font-medium">{title}</p>
              <p className="mt-0.5 text-xs text-ink/55">{copy}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
