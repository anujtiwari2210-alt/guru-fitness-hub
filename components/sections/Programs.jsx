"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Flame, Timer } from "lucide-react";
import content from "@/data/content.json";
import Reveal from "../ui/Reveal";
import Media from "../ui/Media";
import Image from "next/image";

const p = content.programs;

export default function Programs() {
  // CTA se Join form me interest auto-select hota hai
  const pick = (title) =>
    window.dispatchEvent(new CustomEvent("dw:program", { detail: title }));

  return (
    <section id="programs" className="section-y container-x">
      <Reveal className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <span className="eyebrow">{p.eyebrow}</span>
          <h2 className="h-section mt-4">{p.title}</h2>
        </div>
        <p className="max-w-sm text-mute">{p.text}</p>
      </Reveal>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {p.items.map((it, i) => (
          <Reveal key={it.title} delay={(i % 3) * 0.08}>
            <motion.article
              whileHover={{ y: -6 }}
              className="group relative flex h-[440px] flex-col justify-between overflow-hidden border border-line p-6"
            >
              {/* <Media
                src={it.image}
                alt={it.title}
                className="absolute inset-0 z-0"
                imgClassName="grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                sizes="(min-width:1024px) 33vw, 100vw"
              /> */}
              <Image
                src={it.image}
                alt={it.title}
                fill
                sizes="(min-width:1024px) 33vw, 100vw"
                className="z-0 object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
              />

              <div className="absolute inset-0 z-10 bg-gradient-to-t from-ink via-ink/60 to-ink/20" />
              <div className="relative z-20 flex items-start justify-between">
                <span className="outline-text font-display text-6xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="bg-volt px-3 py-1 text-xs font-bold uppercase tracking-widest text-ink">
                  {it.level}
                </span>
              </div>
              <div className="relative z-20">
                <h3 className="font-display text-3xl uppercase md:text-4xl">
                  {it.title}
                </h3>
                <div className="mt-2 flex gap-4 text-xs font-bold uppercase tracking-widest text-volt">
                  <span className="flex items-center gap-1">
                    <Timer size={14} /> {it.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Flame size={14} /> {it.burn}
                  </span>
                </div>
                <div className="grid grid-rows-[0fr] transition-all duration-500 group-hover:grid-rows-[1fr] max-md:grid-rows-[1fr]">
                  <div className="overflow-hidden">
                    <p className="pt-3 text-bone/80">{it.text}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {it.tags.map((t) => (
                        <span
                          key={t}
                          className="border border-bone/30 px-2.5 py-1 text-[11px] font-bold uppercase tracking-widest"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <a
                      href="#join"
                      onClick={() => pick(it.title)}
                      className="mt-4 inline-flex items-center gap-2 font-display text-lg uppercase text-volt"
                    >
                      {p.cta} <ArrowUpRight size={18} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
