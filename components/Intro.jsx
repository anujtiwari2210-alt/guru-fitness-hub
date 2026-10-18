"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { MotionConfig, animate, motion } from "framer-motion";
import constants from "@/data/constants.json";

/**
 * Classy gym intro:
 *  1. A fine-line weight plate draws itself while a counter runs 000 -> 100
 *  2. Brand name rises out of a mask, tagline fades in beneath
 *  3. Two heavy panels part along a hairline seam to reveal the site
 *
 * `useIntroReady()` is true as soon as the panels start opening.
 * Suggested constants.intro.durationMs: ~3600.
 */
const IntroContext = createContext(true);
export const useIntroReady = () => useContext(IntroContext);

const { enabled, oncePerSession, durationMs } = constants.intro;

const OPEN_MS = 1100;
const EASE = [0.76, 0, 0.24, 1];
const SOFT = [0.22, 1, 0.36, 1];

/* ---------- weight plate (line art) ---------- */
const TICKS = Array.from({ length: 48 }, (_, i) => i);

function Plate({ progress, durationS }) {
  return (
    <div className="relative mb-10 h-44 w-44 sm:h-56 sm:w-56">
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full">
        {/* faint full rings */}
        <circle cx="100" cy="100" r="92" fill="none" stroke="currentColor" strokeWidth="0.75" className="text-bone/15" />
        <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="0.75" className="text-bone/15" />
        <circle cx="100" cy="100" r="16" fill="none" stroke="currentColor" strokeWidth="0.75" className="text-bone/25" />

        {/* slow rotating ticks, like plate edge markings */}
        <motion.g
          style={{ originX: "100px", originY: "100px" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 24, ease: "linear", repeat: Infinity }}
        >
          {TICKS.map((i) => (
            <line
              key={i}
              x1="100" y1="12" x2="100" y2={i % 4 === 0 ? 20 : 16}
              stroke="currentColor"
              strokeWidth={i % 4 === 0 ? 1.2 : 0.6}
              className="text-bone/40"
              transform={`rotate(${(i * 360) / TICKS.length} 100 100)`}
            />
          ))}
        </motion.g>

        {/* progress ring */}
        <motion.circle
          cx="100" cy="100" r="92" fill="none" stroke="#c6ff00" strokeWidth="1.5" strokeLinecap="round"
          transform="rotate(-90 100 100)"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: durationS, ease: "easeInOut" }}
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-4xl tabular-nums text-bone sm:text-5xl">
          {String(progress).padStart(3, "0")}
        </span>
        <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.4em] text-mute">kg</span>
      </div>
    </div>
  );
}

/* ---------- panel ---------- */
function Panel({ side, opening }) {
  const left = side === "left";
  return (
    <motion.div
      className={`absolute inset-y-0 w-1/2 bg-ink ${left ? "left-0" : "right-0"}`}
      initial={{ x: 0 }}
      animate={{ x: opening ? (left ? "-100%" : "100%") : 0 }}
      transition={{ duration: OPEN_MS / 1000, ease: EASE }}
    >
      {/* hairline seam */}
      <div className={`absolute inset-y-0 w-px bg-volt/70 ${left ? "right-0" : "left-0"}`} />
      {/* faint inner glow toward the seam */}
      <div
        className={`absolute inset-y-0 w-40 ${left ? "right-0" : "left-0"}`}
        style={{
          background: `linear-gradient(${left ? "270deg" : "90deg"}, rgba(198,255,0,0.06), transparent)`,
        }}
      />
    </motion.div>
  );
}

/* ---------- provider ---------- */
export default function IntroProvider({ children }) {
  const [phase, setPhase] = useState(enabled ? "play" : "done"); // play -> open -> done
  const [progress, setProgress] = useState(0);

  const openAt = Math.max(durationMs - OPEN_MS, 2200);
  const fillS = (openAt - 300) / 1000;

  useEffect(() => {
    if (!enabled) return;
    let seen = false;
    try { seen = oncePerSession && sessionStorage.getItem("vf-intro") === "1"; } catch {}
    if (seen) { setPhase("done"); return; }

    const counter = animate(0, 100, {
      duration: fillS,
      ease: "easeInOut",
      onUpdate: (v) => setProgress(Math.round(v)),
    });
    const t1 = setTimeout(() => setPhase("open"), openAt);
    const t2 = setTimeout(() => {
      setPhase("done");
      try { sessionStorage.setItem("vf-intro", "1"); } catch {}
    }, openAt + OPEN_MS);

    return () => { counter.stop(); clearTimeout(t1); clearTimeout(t2); };
  }, []);

  useEffect(() => {
    document.body.style.overflow = phase === "done" ? "" : "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [phase]);

  const opening = phase === "open";
  const letters = constants.brand.name.toUpperCase().split("");

  return (
    <MotionConfig reducedMotion="user">
      <IntroContext.Provider value={phase !== "play"}>
        {children}

        {phase !== "done" && (
          <div aria-hidden className="fixed inset-0 z-[100] overflow-hidden">
            <Panel side="left" opening={opening} />
            <Panel side="right" opening={opening} />

            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center px-4"
              animate={opening ? { opacity: 0, y: -24 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeIn" }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, ease: SOFT }}
              >
                <Plate progress={progress} durationS={fillS} />
              </motion.div>

              {/* brand name: masked rise */}
              <div className="flex font-display text-[clamp(2.5rem,9vw,6.5rem)] uppercase leading-none tracking-[0.08em] text-bone">
                {letters.map((ch, i) => (
                  <span key={i} className="overflow-hidden pb-[0.08em]">
                    <motion.span
                      className={`inline-block ${i >= 5 ? "text-volt" : ""}`}
                      initial={{ y: "110%" }} animate={{ y: 0 }}
                      transition={{ delay: 0.7 + i * 0.045, duration: 0.8, ease: SOFT }}
                    >
                      {ch === " " ? "\u00A0" : ch}
                    </motion.span>
                  </span>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 1.3, duration: 0.8, ease: SOFT }}
                className="mt-6 h-px w-24 bg-volt/60"
              />
              <motion.p
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.8, ease: SOFT }}
                className="mt-5 text-[11px] font-semibold uppercase tracking-[0.5em] text-mute"
              >
                {constants.brand.tagline}
              </motion.p>
            </motion.div>
          </div>
        )}
      </IntroContext.Provider>
    </MotionConfig>
  );
}