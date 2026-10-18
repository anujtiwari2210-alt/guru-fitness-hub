"use client";

import { motion } from "framer-motion";
import { Phone, Zap } from "lucide-react";
import constants from "@/data/constants.json";
import { waLink } from "@/lib/helpers";
import { useIntroReady } from "./Intro";
import { FaWhatsapp } from "react-icons/fa";

const { contact, whatsappMessages } = constants;

/** Mobile: bottom bar (Call / Chat / Free Trial). Desktop: floating WhatsApp button. */
export default function QuickActions() {
  const ready = useIntroReady();
  return (
    <>
      <motion.div initial={{ y: 100 }} animate={ready ? { y: 0 } : {}} transition={{ delay: 1, duration: 0.6 }}
        className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-line bg-ink/95 backdrop-blur-xl md:hidden">
        <a href={`tel:${contact.phoneRaw}`} className="flex items-center justify-center gap-2 py-4 text-sm font-bold uppercase"><Phone size={16} /> Call</a>
        <a href={waLink(whatsappMessages.floating)} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-[#25D366] py-4 text-sm font-bold uppercase text-ink"><FaWhatsapp size={16} /> Chat</a>
        <a href="#join" className="flex items-center justify-center gap-2 bg-volt py-4 text-sm font-bold uppercase text-ink"><Zap size={16} /> Free Trial</a>
      </motion.div>

      <motion.a href={waLink(whatsappMessages.floating)} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp"
        initial={{ scale: 0 }} animate={ready ? { scale: 1 } : {}} transition={{ delay: 1.2, type: "spring", stiffness: 220, damping: 16 }}
        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-ink shadow-2xl md:flex">
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/40" />
        <FaWhatsapp className="relative" size={26} />
      </motion.a>
    </>
  );
}
