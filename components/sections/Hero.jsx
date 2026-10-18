"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import constants from "@/data/constants.json";
import content from "@/data/content.json";
import { waLink } from "@/lib/helpers";
import { EASE_LUXE } from "@/lib/motion";
import { useIntroReady } from "../Intro";

const h = content.hero;

// Text line mask ke andar neeche se uthti hai
function Line({ children, delay, ready, className = "" }) {
  return (
    <span className="block overflow-hidden pb-[0.04em]">
      <motion.span className={`block ${className}`} initial={{ y: "110%" }} animate={ready ? { y: 0 } : {}} transition={{ duration: 0.9, delay, ease: EASE_LUXE }}>
        {children}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  const ready = useIntroReady();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="top" ref={ref} className="relative min-h-[100svh] overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 scale-110">
        <video className="h-full w-full object-cover grayscale" autoPlay muted loop playsInline preload="metadata" poster={h.poster}>
          <source src={h.video} type="video/mp4" />
        </video>
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(198,255,0,0.14),transparent_50%)]" />

      <motion.div style={{ opacity }} className="container-x relative z-10 flex min-h-[100svh] flex-col justify-end pb-28 pt-28 md:pb-16">
        <motion.span initial={{ opacity: 0, x: -20 }} animate={ready ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.1 }} className="eyebrow mb-5">{h.eyebrow}</motion.span>

        <h1 className="font-display text-mega uppercase">
          <Line delay={0.1} ready={ready}>{h.lines[0]}</Line>
          <Line delay={0.2} ready={ready} className="outline-text">{h.lines[1]}</Line>
          {/* <Line delay={0.3} ready={ready} className="outline-text">{h.lines[2]}</Line> */}
          <Line delay={0.4} ready={ready} className="text-volt">{h.lines[2]}</Line>
        </h1>

        <div className="mt-8 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.8, duration: 0.8 }}>
            <p className="max-w-md text-lg text-bone/80">{h.subtitle}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={waLink(constants.whatsappMessages.trial)} target="_blank" rel="noopener noreferrer" className="btn-volt">{h.primaryCta}</a>
              <a href="#plans" className="btn-line">{h.secondaryCta}</a>
            </div>
          </motion.div>

          <motion.dl initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : {}} transition={{ delay: 1.1, duration: 0.9 }}
            className="grid grid-cols-2 gap-x-10 gap-y-5 border-t-2 border-volt pt-5 sm:grid-cols-4 lg:max-w-2xl">
            {h.stats.map((s) => (
              <div key={s.label}>
                <dt className="font-display text-3xl text-volt md:text-4xl">{s.value}</dt>
                <dd className="text-xs font-bold uppercase tracking-widest text-mute">{s.label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </motion.div>

      <motion.a href="#programs" aria-label="Scroll" animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}
        className="absolute right-6 top-1/2 z-10 hidden h-12 w-12 items-center justify-center border-2 border-bone/30 text-bone md:flex"><ArrowDown size={18} /></motion.a>
    </section>
  );
}
