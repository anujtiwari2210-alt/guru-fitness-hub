"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Clock } from "lucide-react";
import constants from "@/data/constants.json";
import content from "@/data/content.json";
import { waLink } from "@/lib/helpers";
import Reveal from "../ui/Reveal";

const s = content.schedule;

export default function Schedule() {
  const [i, setI] = useState(0);

  // Aaj ka din default (client par set hota hai, hydration mismatch nahi)
  useEffect(() => { setI((new Date().getDay() + 6) % 7); }, []);

  const day = s.days[i];
  return (
    <section id="schedule" className="section-y container-x">
      <Reveal className="mb-10">
        <span className="eyebrow">{s.eyebrow}</span>
        <h2 className="h-section mt-4">{s.title}</h2>
        <p className="mt-3 text-mute">{s.text}</p>
      </Reveal>

      <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
        {s.days.map((d, idx) => (
          <button key={d.day} onClick={() => setI(idx)} className={`relative min-w-[4.5rem] flex-1 border-2 px-4 py-3 font-display text-xl uppercase transition-colors ${idx === i ? "border-volt text-ink" : "border-line text-mute hover:text-bone"}`}>
            {idx === i && <motion.span layoutId="day-bg" className="absolute inset-0 -z-10 bg-volt" />}
            {d.day}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.ul key={day.day} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35 }} className="divide-y divide-line border-y border-line">
          {day.classes.map((c) => (
            <li key={c.time + c.name} className="group grid items-center gap-3 py-5 transition-colors hover:bg-iron sm:grid-cols-[10rem_1fr_auto_auto] sm:gap-6 sm:px-4">
              <span className="flex items-center gap-2 font-display text-3xl text-volt"><Clock size={18} className="text-mute" /> {c.time}</span>
              <div>
                <p className="font-display text-2xl uppercase">{c.name}</p>
                <p className="text-sm text-mute">with {c.trainer}</p>
              </div>
              <span className="w-fit border border-line px-3 py-1 text-xs font-bold uppercase tracking-widest text-mute">{c.level}</span>
              <a href={waLink(`${constants.whatsappMessages.default}\nI want to book: ${c.name}, ${day.day} ${c.time}`)} target="_blank" rel="noopener noreferrer"
                className="w-fit bg-bone px-6 py-2.5 font-display text-lg uppercase text-ink transition hover:bg-volt">{s.book}</a>
            </li>
          ))}
        </motion.ul>
      </AnimatePresence>
    </section>
  );
}
