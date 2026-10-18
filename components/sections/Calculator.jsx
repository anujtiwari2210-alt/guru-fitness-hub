"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import constants from "@/data/constants.json";
import content from "@/data/content.json";
import { waLink } from "@/lib/helpers";
import Reveal from "../ui/Reveal";
import { FaWhatsapp } from "react-icons/fa";

const c = content.calculator;

// BMI scale 15 -> 40, gauge ke 4 coloured segments (percent of arc)
const SEGMENTS = [
  { start: 0, len: 14, color: "#4DA3FF" },
  { start: 14, len: 26, color: "#C6FF00" },
  { start: 40, len: 20, color: "#FFB020" },
  { start: 60, len: 40, color: "#FF4D1C" },
];

function Num({ value, format }) {
  const spring = useSpring(value, { stiffness: 80, damping: 18 });
  useEffect(() => {
    spring.set(value);
  }, [value, spring]);
  const text = useTransform(spring, format);
  return <motion.span>{text}</motion.span>;
}

function Pills({ items, value, set }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((it) => (
        <button
          key={it.value}
          type="button"
          onClick={() => set(it.value)}
          className={`pill ${value === it.value ? "pill-on" : ""}`}
        >
          {it.label}
        </button>
      ))}
    </div>
  );
}

function Slider({ label, value, set, min, max }) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between">
        <span className="text-xs font-bold uppercase tracking-widest text-mute">
          {label}
        </span>
        <span className="font-display text-3xl text-volt">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => set(+e.target.value)}
        className="h-1.5 w-full cursor-pointer appearance-none bg-line"
      />
    </div>
  );
}

export default function Calculator() {
  const [gender, setGender] = useState("m");
  const [age, setAge] = useState(26);
  const [height, setHeight] = useState(172);
  const [weight, setWeight] = useState(72);
  const [activity, setActivity] = useState("mid");
  const [goal, setGoal] = useState("lose");
  const [diet, setDiet] = useState("pure-veg");

  const bmi = weight / (height / 100) ** 2;
  const bmr =
    10 * weight + 6.25 * height - 5 * age + (gender === "m" ? 5 : -161);
  const act = c.activities.find((a) => a.value === activity);
  const g = c.goals.find((x) => x.value === goal);
  const kcal = Math.round((bmr * act.mult + g.delta) / 10) * 10;
  const protein = Math.round(weight * (goal === "build" ? 2 : 1.6));
  const dietOption = c.diet.options.find((item) => item.value === diet);

  const cat =
    bmi < 18.5
      ? c.categories.under
      : bmi < 25
        ? c.categories.normal
        : bmi < 30
          ? c.categories.over
          : c.categories.obese;
  const angle = -90 + ((Math.min(Math.max(bmi, 15), 40) - 15) / 25) * 180;

  const msg = `${constants.whatsappMessages.default}
BMI: ${bmi.toFixed(1)} (${cat})
Goal: ${g.label}
Diet preference: ${dietOption.label}
Daily calories: ${kcal}
Protein: ${protein} g
Program: ${g.program}`;

  return (
    <section className="section-y bg-iron">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <span className="eyebrow">{c.eyebrow}</span>
          <h2 className="h-section mt-4">{c.title}</h2>
          <p className="mt-4 max-w-md text-mute">{c.text}</p>
          <div className="mt-8 flex flex-col gap-6">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-mute">
                {c.labels.gender}
              </p>
              <Pills items={c.genders} value={gender} set={setGender} />
            </div>
            <Slider
              label={c.labels.age}
              value={age}
              set={setAge}
              min={14}
              max={70}
            />
            <Slider
              label={c.labels.height}
              value={height}
              set={setHeight}
              min={140}
              max={210}
            />
            <Slider
              label={c.labels.weight}
              value={weight}
              set={setWeight}
              min={35}
              max={160}
            />
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-mute">
                {c.labels.activity}
              </p>
              <Pills items={c.activities} value={activity} set={setActivity} />
            </div>
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-mute">
                {c.diet.label}
              </p>
              <Pills items={c.diet.options} value={diet} set={setDiet} />
            </div>
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-mute">
                {c.labels.goal}
              </p>
              <Pills items={c.goals} value={goal} set={setGoal} />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-7">
          <div className="border border-line bg-ink p-6 md:p-10">
            <p className="text-xs font-bold uppercase tracking-widest text-mute">
              {c.bmiLabel}
            </p>
            <div className="relative mx-auto mt-4 w-full max-w-sm">
              <svg viewBox="0 0 200 110" className="w-full">
                {SEGMENTS.map((s) => (
                  <path
                    key={s.color}
                    d="M10 100 A90 90 0 0 1 190 100"
                    pathLength="100"
                    fill="none"
                    stroke={s.color}
                    strokeWidth="14"
                    strokeDasharray={`${s.len - 0.8} ${100 - s.len + 0.8}`}
                    strokeDashoffset={-s.start}
                  />
                ))}
              </svg>
              {/* Needle */}
              <motion.div
                className="absolute bottom-[9%] left-1/2 h-[78%] w-1 origin-bottom -translate-x-1/2 bg-bone"
                animate={{ rotate: angle }}
                transition={{ type: "spring", stiffness: 70, damping: 14 }}
              >
                <span className="absolute -top-1 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-bone" />
              </motion.div>
              <span className="absolute bottom-[6%] left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-bone" />
            </div>
            <div className="text-center">
              <p className="font-display text-7xl text-volt">
                <Num value={bmi} format={(v) => v.toFixed(1)} />
              </p>
              <p className="text-sm font-bold uppercase tracking-[0.25em]">
                {cat}
              </p>
            </div>

            <div className="mt-8 grid gap-px bg-line sm:grid-cols-2">
              <div className="bg-ink p-5">
                <p className="text-xs font-bold uppercase tracking-widest text-mute">
                  {c.kcalLabel}
                </p>
                <p className="font-display text-5xl">
                  <Num
                    value={kcal}
                    format={(v) => Math.round(v).toLocaleString("en-IN")}
                  />{" "}
                  <span className="text-lg text-mute">kcal</span>
                </p>
              </div>
              <div className="bg-ink p-5">
                <p className="text-xs font-bold uppercase tracking-widest text-mute">
                  {c.proteinLabel}
                </p>
                <p className="font-display text-5xl">
                  <Num value={protein} format={(v) => Math.round(v)} />{" "}
                  <span className="text-lg text-mute">g / day</span>
                </p>
              </div>
            </div>
            <div className="mt-px bg-volt p-5 text-ink">
              <p className="text-xs font-bold uppercase tracking-widest opacity-70">
                {c.programLabel}
              </p>
              <p className="font-display text-3xl uppercase">{g.program}</p>
            </div>

            <p className="mt-4 text-xs text-mute">{c.disclaimer}</p>
            <a
              href={waLink(msg)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-volt mt-5 w-full"
            >
              <FaWhatsapp size={18} /> {c.cta}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
