"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import constants from "@/data/constants.json";

/**
 * Opening: heartbeat (ECG) line draw hoti hai, brand name letters "slam" hote hain,
 * loading bar fill hota hai, phir screen tirchi (diagonal) wipe se upar khulta hai.
 * `useIntroReady()` baaki sections ko batata hai kab animate karna hai.
 */
const IntroContext = createContext(true);
export const useIntroReady = () => useContext(IntroContext);

const { enabled, oncePerSession, durationMs } = constants.intro;
const OPEN = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";
const CLOSED = "polygon(0% 0%, 100% 0%, 100% -20%, 0% -70%)";

export default function IntroProvider({ children }) {
  const [showing, setShowing] = useState(enabled);

  useEffect(() => {
    if (!enabled) return;
    let seen = false;
    try { seen = oncePerSession && sessionStorage.getItem("vf-intro") === "1"; } catch {}
    if (seen) { setShowing(false); return; }
    const t = setTimeout(() => {
      setShowing(false);
      try { sessionStorage.setItem("vf-intro", "1"); } catch {}
    }, durationMs);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    document.body.style.overflow = showing ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [showing]);

  const letters = constants.brand.name.toUpperCase().split("");

  return (
    <MotionConfig reducedMotion="user">
      <IntroContext.Provider value={!showing}>
        {children}
        <AnimatePresence>
          {showing && (
            <motion.div key="intro" aria-hidden initial={{ clipPath: OPEN }} animate={{ clipPath: OPEN }}
              exit={{ clipPath: CLOSED, transition: { duration: 0.95, ease: [0.76, 0, 0.24, 1] } }}
              className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink px-4">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,rgba(198,255,0,0.12),transparent_55%)]" />

              {/* Heartbeat line */}
              <svg viewBox="0 0 600 100" className="relative mb-6 h-20 w-full max-w-xl">
                <motion.path d="M0 50 H170 L195 50 L220 8 L252 92 L280 28 L300 50 H600" fill="none" stroke="#C6FF00" strokeWidth="3" strokeLinejoin="round"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, ease: "easeInOut" }} />
              </svg>

              <div className="relative flex font-display text-[clamp(3rem,13vw,9rem)] uppercase leading-none text-bone">
                {letters.map((ch, i) => (
                  <motion.span key={i} initial={{ y: -120, opacity: 0, scale: 1.6 }} animate={{ y: 0, opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.05, type: "spring", stiffness: 380, damping: 18 }}
                    className={i >= 5 ? "text-volt" : ""}>
                    {ch === " " ? "\u00A0" : ch}
                  </motion.span>
                ))}
              </div>

              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="relative mt-4 text-sm font-bold uppercase tracking-[0.35em] text-mute">
                {constants.brand.tagline}
              </motion.p>

              <div className="absolute inset-x-0 bottom-0 h-1.5 bg-line">
                <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: (durationMs - 400) / 1000, ease: "easeInOut" }} className="h-full bg-volt" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </IntroContext.Provider>
    </MotionConfig>
  );
}
