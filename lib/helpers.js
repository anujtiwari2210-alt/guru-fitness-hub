import { createElement } from "react";
import { Dumbbell, HeartPulse, Snowflake, ShowerHead, Users, Salad, ParkingCircle, Target, Sparkles } from "lucide-react";
import constants from "@/data/constants.json";

/** wa.me link with pre-filled message */
export const waLink = (message = constants.whatsappMessages.default) =>
  `https://wa.me/${constants.contact.whatsapp}?text=${encodeURIComponent(message)}`;

/** JSON me icon ka naam likho, yahan se component milta hai */
const ICONS = { dumbbell: Dumbbell, heart: HeartPulse, snow: Snowflake, shower: ShowerHead, users: Users, salad: Salad, parking: ParkingCircle, target: Target };
export function Icon({ name, ...props }) {
  return createElement(ICONS[name] || Sparkles, props);
}
