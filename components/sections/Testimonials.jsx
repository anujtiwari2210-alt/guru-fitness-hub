import { Star } from "lucide-react";
import content from "@/data/content.json";
import Reveal from "../ui/Reveal";

const t = content.testimonials;

/** Auto-scrolling review strip (CSS animation, hover par pause) */
export default function Testimonials() {
  const row = [...t.items, ...t.items];
  return (
    <section className="section-y overflow-hidden bg-iron">
      <div className="container-x"><Reveal className="mb-10"><span className="eyebrow">{t.eyebrow}</span><h2 className="h-section mt-4">{t.title}</h2></Reveal></div>
      <div className="flex w-max animate-marquee gap-4 hover:[animation-play-state:paused]">
        {row.map((it, i) => (
          <figure key={i} className="w-[85vw] shrink-0 border border-line bg-ink p-8 sm:w-[26rem]">
            <div className="mb-4 flex gap-1 text-volt">{[...Array(5)].map((_, k) => <Star key={k} size={16} fill="currentColor" />)}</div>
            <blockquote className="text-lg">“{it.quote}”</blockquote>
            <figcaption className="mt-5 font-display text-xl uppercase text-volt">{it.name}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
