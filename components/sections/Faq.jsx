"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import content from "@/data/content.json";
import Reveal from "../ui/Reveal";

const f = content.faq;

export default function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section-y container-x grid gap-12 lg:grid-cols-12">
      <Reveal className="lg:col-span-4"><span className="eyebrow">{f.eyebrow}</span><h2 className="h-section mt-4">{f.title}</h2></Reveal>
      <Reveal delay={0.1} className="lg:col-span-8">
        {f.items.map((it, i) => (
          <div key={it.q} className="border-b border-line">
            <button onClick={() => setOpen(open === i ? -1 : i)} className="flex w-full items-center justify-between gap-6 py-6 text-left">
              <span className={`font-display text-2xl uppercase transition-colors md:text-3xl ${open === i ? "text-volt" : ""}`}>{it.q}</span>
              <motion.span animate={{ rotate: open === i ? 135 : 0 }} className={`flex h-10 w-10 shrink-0 items-center justify-center ${open === i ? "bg-volt text-ink" : "border-2 border-line"}`}><Plus size={18} /></motion.span>
            </button>
            <AnimatePresence initial={false}>
              {open === i && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35 }} className="overflow-hidden"><p className="max-w-2xl pb-6 text-mute">{it.a}</p></motion.div>}
            </AnimatePresence>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
