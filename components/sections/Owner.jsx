"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, BadgeCheck } from "lucide-react";
import constants from "@/data/constants.json";
import content from "@/data/content.json";
import { waLink } from "@/lib/helpers";
import Reveal from "../ui/Reveal";
import Media from "../ui/Media";
import Image from "next/image";

const o = content.owner;

export default function Owner() {
  return (
    <section id="owner" className="section-y bg-iron">
      <div className="container-x">
        <Reveal className="mb-12">
          <span className="eyebrow">{o.eyebrow}</span>
          <h2 className="h-section mt-4">{o.title}</h2>
        </Reveal>

        <Reveal>
          <motion.article
            whileHover={{ y: -4 }}
            className="grid overflow-hidden border border-line bg-ink md:grid-cols-2"
          >
            {/* Owner Image */}
           
            <div className="relative min-h-[380px] overflow-hidden md:min-h-[560px]">
              <Image
                src={o.image}
                alt={o.name}
                fill
                priority
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover grayscale transition-all duration-700 hover:scale-105 hover:grayscale-0"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent pointer-events-none" />

              <span className="absolute bottom-5 left-5 z-10 border border-bone/30 px-4 py-2 font-display text-sm uppercase tracking-widest text-bone">
                {o.experience}
              </span>
            </div>

            {/* Owner Details */}
            <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-14">
              <span className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-volt">
                {o.role}
              </span>

              <h3 className="font-display text-4xl uppercase leading-tight sm:text-5xl lg:text-6xl">
                {o.name}
              </h3>

              <p className="mt-6 max-w-xl leading-7 text-mute">{o.text}</p>

              <ul className="mt-8 flex flex-col gap-4">
                {o.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-sm font-medium text-bone"
                  >
                    <BadgeCheck size={18} className="shrink-0 text-volt" />
                    {item}
                  </li>
                ))}
              </ul>

              <a
                href={waLink(constants.whatsappMessages.default)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-9 inline-flex w-fit items-center gap-3 border-2 border-volt px-6 py-3 font-display text-lg uppercase transition hover:bg-volt hover:text-ink"
              >
                {o.cta}
                <ArrowUpRight size={20} />
              </a>
            </div>
          </motion.article>
        </Reveal>
      </div>
    </section>
  );
}
