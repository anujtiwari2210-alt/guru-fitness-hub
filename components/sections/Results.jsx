"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { MoveHorizontal } from "lucide-react";
import content from "@/data/content.json";
import Reveal from "../ui/Reveal";

const r = content.results;

function BeforeAfter({ item }) {
  const [pos, setPos] = useState(50);

  return (
    <div className="relative aspect-[4/5] w-full select-none overflow-hidden border border-line sm:aspect-[4/3]">
      {/* After Image */}
      <Image
        src={item.after}
        alt={`${item.name} ${r.after}`}
        fill
        priority
        sizes="(min-width:1024px) 60vw, 100vw"
        className="object-cover object-center"
      />

      {/* Before Image */}
      <div
        className="absolute inset-0 z-10"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <Image
          src={item.before}
          alt={`${item.name} ${r.before}`}
          fill
          sizes="(min-width:1024px) 60vw, 100vw"
          className="object-cover object-center grayscale contrast-125 brightness-90"
        />
      </div>

      {/* Labels */}
      <span className="absolute left-4 top-4 z-20 bg-ink px-3 py-1 text-xs font-bold uppercase tracking-widest">
        {r.before}
      </span>

      <span className="absolute right-4 top-4 z-20 bg-volt px-3 py-1 text-xs font-bold uppercase tracking-widest text-ink">
        {r.after}
      </span>

      {/* Slider Handle */}
      <div
        className="pointer-events-none absolute inset-y-0 z-20 w-0.5 bg-volt"
        style={{ left: `${pos}%` }}
      >
        <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-volt text-ink shadow-volt">
          <MoveHorizontal size={20} />
        </span>
      </div>

      {/* Drag Control */}
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Before and after slider"
        className="absolute inset-0 z-30 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}

export default function Results() {
  const [i, setI] = useState(0);
  const cur = r.items[i];

  return (
    <section id="results" className="section-y bg-iron">
      <div className="container-x">
        <Reveal className="mb-10">
          <span className="eyebrow">{r.eyebrow}</span>
          <h2 className="h-section mt-4">{r.title}</h2>
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-8">
            <BeforeAfter key={cur.name} item={cur} />
          </Reveal>

          <div className="flex flex-col gap-3 lg:col-span-4">
            {r.items.map((it, idx) => (
              <button
                key={it.name}
                onClick={() => setI(idx)}
                aria-pressed={idx === i}
                className={`border-2 p-5 text-left transition-colors ${
                  idx === i
                    ? "border-volt bg-ink"
                    : "border-line hover:border-bone/40"
                }`}
              >
                <p className="text-xs font-bold uppercase tracking-widest text-mute">
                  {it.name} • {it.program}
                </p>

                <p
                  className={`font-display text-3xl uppercase ${
                    idx === i ? "text-volt" : ""
                  }`}
                >
                  {it.result}
                </p>

                <AnimatePresence initial={false}>
                  {idx === i && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden pt-2 text-bone/80"
                    >
                      “{it.quote}”
                    </motion.p>
                  )}
                </AnimatePresence>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
