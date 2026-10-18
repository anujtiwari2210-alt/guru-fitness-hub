"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import constants from "@/data/constants.json";
import { useIntroReady } from "./Intro";
import Image from "next/image";

const { brand, nav } = constants;

export default function Header() {
  const ready = useIntroReady();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    nav.forEach((n) => {
      const el = document.querySelector(n.href);
      el && io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed inset-x-0 top-0 z-[70] h-1 origin-left bg-volt"
      />
      <motion.header
        initial={{ y: -80 }}
        animate={ready ? { y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 border-b border-line bg-ink/80 backdrop-blur-xl"
      >
        <div className="container-x flex h-16 items-center justify-between">
          <a href="#top" className="flex items-center gap-3">
            <Image
              src="/images/logo.png"
              alt={`${brand.name} logo`}
              width={40}
              height={40}
              priority
              className="h-10 w-10 shrink-0 object-contain"
            />

            <span className="font-display text-2xl uppercase tracking-wide">
              {brand.name}
            </span>
          </a>

          <nav className="hidden items-center gap-7 lg:flex">
            {nav.slice(0, -1).map((n) => (
              <a
                key={n.href}
                href={n.href}
                className={`relative py-1 text-sm font-bold uppercase tracking-widest transition-colors hover:text-volt ${active === n.href ? "text-volt" : "text-bone/70"}`}
              >
                {n.label}
                {active === n.href && (
                  <motion.span
                    layoutId="nav-bar"
                    className="absolute inset-x-0 -bottom-1 h-0.5 bg-volt"
                  />
                )}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#join"
              className="btn-volt hidden px-6 py-2.5 text-base sm:inline-flex"
            >
              Free Trial
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
              className="flex h-10 w-10 items-center justify-center border-2 border-line lg:hidden"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 flex overflow-y-auto mt-4 flex-col justify-center bg-ink px-8 lg:hidden"
          >
            {nav.map((n, i) => (
              <motion.a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.06 }}
                className="border-b border-line py-3 font-display text-5xl uppercase hover:text-volt"
              >
                {n.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
