"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, MapPin, Send } from "lucide-react";
import constants from "@/data/constants.json";
import content from "@/data/content.json";
import { waLink } from "@/lib/helpers";
import Reveal from "../ui/Reveal";

const j = content.join;
const EMPTY = { name: "", phone: "", interest: "", time: "" };

export default function Join() {
  const [data, setData] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  // Programs section ke "Try this" button se interest auto-select
  useEffect(() => {
    const on = (e) => setData((d) => ({ ...d, interest: e.detail }));
    window.addEventListener("dw:program", on);
    return () => window.removeEventListener("dw:program", on);
  }, []);

  const set = (k, v) => {
    setData((d) => ({ ...d, [k]: v }));
    setErrors((e) => ({ ...e, [k]: false }));
  };

  const validateForm = () => {
    const newErrors = {};
    const name = data.name.trim();
    const phone = data.phone.trim();
    const digits = phone.replace(/\D/g, "");

    if (!name) {
      newErrors.name = "Name is required";
    } else if (name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    } else if (name.length > 50) {
      newErrors.name = "Name cannot exceed 50 characters";
    } else if (!/^[a-zA-Z\s.'-]+$/.test(name)) {
      newErrors.name = "Enter a valid name";
    }

    if (!phone) {
      newErrors.phone = "WhatsApp number is required";
    } else if (!/^\+?[0-9\s()-]+$/.test(phone)) {
      newErrors.phone = "Enter a valid phone number";
    } else if (digits.length !== 10) {
      newErrors.phone = "Enter a 10-digit mobile number";
    } else if (!/^[6-9]\d{9}$/.test(digits)) {
      newErrors.phone = "Enter a valid Indian mobile number";
    }

    if (!data.interest) {
      newErrors.interest = "Please select a program";
    }

    if (!data.time) {
      newErrors.time = "Please select a preferred time";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setSent(false);
      return;
    }

    const msg = [
      constants.whatsappMessages.trial,
      `Name: ${data.name.trim()}`,
      `Phone: ${data.phone.trim()}`,
      `Interested in: ${data.interest}`,
      `Preferred time: ${data.time}`,
    ].join("\n");

    window.open(waLink(msg), "_blank", "noopener,noreferrer");

    setSent(true);
    setData(EMPTY);

    setTimeout(() => setSent(false), 7000);
  };

  return (
    <section
      id="join"
      className="section-y relative overflow-hidden bg-volt text-ink"
    >
      <span className="pointer-events-none absolute -right-10 -top-10 select-none font-display text-[22rem] leading-none text-ink/5">
        GO
      </span>
      <div className="container-x relative grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em]">
            <span className="h-3 w-3 -skew-x-12 bg-ink" /> {j.eyebrow}
          </span>
          <h2 className="mt-4 font-display text-display uppercase">
            {j.title}
          </h2>
          <p className="mt-4 max-w-md text-lg">{j.text}</p>
          <ul className="mt-6 flex flex-col gap-2 font-bold">
            {j.bullets.map((b) => (
              <li key={b} className="flex items-center gap-2">
                <Check size={18} /> {b}
              </li>
            ))}
          </ul>

          <div className="mt-8 border-t-2 border-ink pt-5">
            <p className="text-xs font-bold uppercase tracking-widest">
              {j.hoursTitle}
            </p>
            {constants.contact.hours.map((h) => (
              <p
                key={h.days}
                className="flex justify-between font-display text-2xl uppercase"
              >
                <span>{h.days}</span>
                <span>{h.time}</span>
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-7">
          <form
            onSubmit={submit}
            noValidate
            className="flex flex-col gap-6 bg-ink p-6 text-bone md:p-10"
          >
            <div>
              <input
                value={data.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="Your name"
                aria-label="Name"
                aria-invalid={!!errors.name}
                className={`field w-full ${errors.name ? "!border-flame" : ""}`}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-flame">{errors.name}</p>
              )}
            </div>

            <div>
              <input
                value={data.phone}
                onChange={(e) =>
                  set("phone", e.target.value.replace(/\D/g, ""))
                }
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={10}
                placeholder="WhatsApp number"
                aria-label="Phone"
                aria-invalid={!!errors.phone}
                className={`field w-full ${errors.phone ? "!border-flame" : ""}`}
              />
              {errors.phone && (
                <p className="mt-1 text-xs text-flame">{errors.phone}</p>
              )}
            </div>
            <div>
              <p
                className={`mb-3 text-xs font-bold uppercase tracking-widest ${errors.interest ? "text-flame" : "text-mute"}`}
              >
                {j.interestLabel}
              </p>
              <div className="flex flex-wrap gap-2">
                {content.programs.items.map((p) => (
                  <button
                    key={p.title}
                    type="button"
                    onClick={() => set("interest", p.title)}
                    className={`pill ${data.interest === p.title ? "pill-on" : ""}`}
                  >
                    {p.title}
                  </button>
                ))}
                {errors.interest && (
                  <p className="mt-2 text-xs text-flame">{errors.interest}</p>
                )}
              </div>
            </div>
            <div>
              <p
                className={`mb-3 text-xs font-bold uppercase tracking-widest ${errors.time ? "text-flame" : "text-mute"}`}
              >
                {j.timeLabel}
              </p>
              <div className="flex flex-wrap gap-2">
                {j.times.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => set("time", t)}
                    className={`pill ${data.time === t ? "pill-on" : ""}`}
                  >
                    {t}
                  </button>
                ))}
                {errors.time && (
                  <p className="mt-2 text-xs text-flame">{errors.time}</p>
                )}
              </div>
            </div>
            <button type="submit" className="btn-volt w-full">
              <Send size={18} /> {j.submit}
            </button>
            <AnimatePresence>
              {sent && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-start gap-2 overflow-hidden text-sm font-bold text-volt"
                >
                  <Check size={18} className="mt-0.5 shrink-0" /> {j.success}
                </motion.p>
              )}
            </AnimatePresence>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
