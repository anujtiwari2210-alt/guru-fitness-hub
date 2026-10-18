"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { Check } from "lucide-react";
import constants from "@/data/constants.json";
import content from "@/data/content.json";
import { waLink } from "@/lib/helpers";
import Reveal from "../ui/Reveal";

const p = content.plans;
const inr = (v) => `₹${Math.round(v).toLocaleString("en-IN")}`;

// Price smoothly count hota hai jab billing badalti hai
function Price({ value }) {
  const spring = useSpring(value, { stiffness: 90, damping: 18 });
  useEffect(() => { spring.set(value); }, [value, spring]);
  const text = useTransform(spring, inr);
  return <motion.span>{text}</motion.span>;
}

export default function Plans() {
  const [billing, setBilling] = useState(p.billing[1].value);
  const b = p.billing.find((x) => x.value === billing);

  return (
    <section id="plans" className="section-y container-x">
      <Reveal className="mx-auto mb-10 max-w-2xl text-center">
        <span className="eyebrow">{p.eyebrow}</span>
        <h2 className="h-section mt-4">{p.title}</h2>
        <p className="mt-3 text-mute">{p.text}</p>
      </Reveal>

      {/* Billing toggle */}
      <div className="mx-auto mb-12 flex w-fit border-2 border-line p-1">
        {p.billing.map((x) => (
          <button key={x.value} onClick={() => setBilling(x.value)} className={`relative px-4 py-3 font-display text-lg uppercase transition-colors sm:px-7 ${billing === x.value ? "text-ink" : "text-mute hover:text-bone"}`}>
            {billing === x.value && <motion.span layoutId="bill-bg" className="absolute inset-0 -z-10 bg-volt" />}
            {x.label}
            {x.note && <span className={`ml-2 hidden text-xs font-bold sm:inline ${billing === x.value ? "text-ink" : "text-volt"}`}>{x.note}</span>}
          </button>
        ))}
      </div>

      <div className="grid items-stretch gap-4 lg:grid-cols-3">
        {p.items.map((it, i) => {
          const pm = it.price[billing];
          return (
            <Reveal key={it.name} delay={i * 0.1} className="h-full">
              <motion.div whileHover={{ y: -8 }} className={`relative flex h-full flex-col p-8 ${it.popular ? "bg-volt text-ink shadow-volt" : "border border-line bg-iron"}`}>
                <span className={`absolute right-6 top-6 px-3 py-1 text-xs font-bold uppercase tracking-widest ${it.popular ? "bg-ink text-volt" : "border border-line text-mute"}`}>{it.tag}</span>
                <h3 className="font-display text-5xl uppercase">{it.name}</h3>
                <p className="mt-6 font-display text-7xl"><Price value={pm} /></p>
                <p className={`text-sm font-bold uppercase tracking-widest ${it.popular ? "text-ink/70" : "text-mute"}`}>{p.perMonth}</p>
                {b.months > 1 && <p className={`mt-2 text-sm ${it.popular ? "text-ink/70" : "text-mute"}`}>{p.billedLabel} {inr(pm * b.months)} / {b.label.toLowerCase()}</p>}
                <ul className="my-8 flex flex-1 flex-col gap-3">
                  {it.features.map((f) => <li key={f} className="flex gap-3"><Check size={18} className={`mt-0.5 shrink-0 ${it.popular ? "text-ink" : "text-volt"}`} /> {f}</li>)}
                </ul>
                <a href={waLink(`${constants.whatsappMessages.default}\nI want to join the ${it.name} plan (${b.label}).`)} target="_blank" rel="noopener noreferrer"
                  className={`block py-4 text-center font-display text-xl uppercase transition ${it.popular ? "bg-ink text-volt hover:bg-bone hover:text-ink" : "bg-bone text-ink hover:bg-volt"}`}>{p.cta} {it.name}</a>
              </motion.div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
