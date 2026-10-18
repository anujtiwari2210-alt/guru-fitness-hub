"use client";

import { motion } from "framer-motion";
import content from "@/data/content.json";

// Do bands: ek lime (left), ek outline (right): opposite direction me chalte hain
function Band({ items, reverse, filled }) {
  const row = [...items, ...items, ...items, ...items];
  return (
    <div className={`overflow-hidden py-3 ${filled ? "bg-volt text-ink" : "border-y border-line bg-ink"}`}>
      <motion.div className="flex w-max whitespace-nowrap" animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }} transition={{ repeat: Infinity, duration: 28, ease: "linear" }}>
        {row.map((t, i) => (
          <span key={i} className={`flex items-center gap-8 pr-8 font-display text-4xl uppercase md:text-6xl ${filled ? "" : "outline-text"}`}>
            {t} <span className={filled ? "text-ink" : "text-volt"} style={{ WebkitTextStroke: 0 }}>/</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function Marquee() {
  return (
    <div className="relative z-10">
      <Band items={content.marquee} filled />
      <Band items={content.marquee} reverse />
    </div>
  );
}
