"use client";

import { motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";
import constants from "@/data/constants.json";
import content from "@/data/content.json";
import { waLink } from "@/lib/helpers";
import Reveal from "../ui/Reveal";
import Media from "../ui/Media";

const t = content.trainers;

export default function Trainers() {
  return (
    <section id="trainers" className="section-y bg-iron">
      <div className="container-x">
        <Reveal className="mb-12"><span className="eyebrow">{t.eyebrow}</span><h2 className="h-section mt-4">{t.title}</h2></Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.items.map((it, i) => (
            <Reveal key={it.name} delay={i * 0.08}>
              <motion.article whileHover={{ y: -8 }} className="group border border-line bg-ink">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Media src={it.image} alt={it.name} className="absolute inset-0" imgClassName="grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0" sizes="(min-width:1024px) 25vw, 50vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink to-transparent" />
                  <span className="absolute right-3 top-3 bg-volt px-3 py-1 font-display text-lg text-ink">{it.exp}</span>
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <h3 className="font-display text-3xl uppercase">{it.name}</h3>
                    <p className="text-sm font-bold uppercase tracking-widest text-volt">{it.role}</p>
                  </div>
                </div>
                <div className="p-5">
                  <ul className="mb-4 flex flex-col gap-1.5 text-sm text-mute">
                    {it.certs.map((c) => <li key={c} className="flex items-center gap-2"><BadgeCheck size={15} className="text-volt" /> {c}</li>)}
                  </ul>
                  <a href={waLink(`${constants.whatsappMessages.default}\nI want to book a session with ${it.name}.`)} target="_blank" rel="noopener noreferrer"
                    className="block border-2 border-line py-3 text-center font-display text-lg uppercase transition hover:border-volt hover:text-volt">{t.cta}</a>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
