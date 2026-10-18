"use client";

import { motion } from "framer-motion";
import content from "@/data/content.json";
import { Icon } from "@/lib/helpers";
import Reveal from "../ui/Reveal";

const f = content.facilities;

export default function Facilities() {
  return (
    <section className="section-y container-x">
      <Reveal className="mb-12"><span className="eyebrow">{f.eyebrow}</span><h2 className="h-section mt-4">{f.title}</h2></Reveal>
      <div className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
        {f.items.map((it, i) => (
          <Reveal key={it.title} delay={(i % 4) * 0.06} className="bg-ink">
            <motion.div whileHover={{ backgroundColor: "#C6FF00", color: "#0A0A0A" }} transition={{ duration: 0.25 }} className="flex h-full flex-col gap-4 p-8">
              <Icon name={it.icon} size={34} strokeWidth={1.6} />
              <h3 className="font-display text-2xl uppercase">{it.title}</h3>
              <p className="opacity-70">{it.text}</p>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
