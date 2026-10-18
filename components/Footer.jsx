import {
  Mail,
  MapPin,
  Phone,
  Instagram,
  Youtube,
} from "lucide-react";
import constants from "@/data/constants.json";
import content from "@/data/content.json";

const { brand, contact, nav } = constants;
const f = content.footer;

export default function Footer() {
  return (
    <footer className="overflow-hidden border-t border-line bg-iron pb-24 pt-16 md:pb-10">
      <div className="container-x">
        <div className="grid gap-10 md:grid-cols-3">
          <p className="max-w-xs text-mute">{f.about}</p>

          <div className="flex flex-col gap-2">
            <span className="mb-1 text-xs font-bold uppercase tracking-[0.25em] text-volt">
              {f.navTitle}
            </span>

            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="w-fit text-mute transition hover:text-volt"
              >
                {n.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-2 text-mute">
            <span className="mb-1 text-xs font-bold uppercase tracking-[0.25em] text-volt">
              {f.contactTitle}
            </span>

            <a
              href={`tel:${contact.phoneRaw}`}
              className="flex items-center gap-2 hover:text-volt"
            >
              <Phone size={15} />
              {contact.phoneDisplay}
            </a>

            <a
              href={`mailto:${contact.email}`}
              className="flex items-center gap-2 hover:text-volt"
            >
              <Mail size={15} />
              {contact.email}
            </a>

            <a
              href={contact.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2 hover:text-volt"
            >
              <MapPin size={15} className="mt-1 shrink-0" />
              {contact.address}
            </a>

            {/* Social Links */}
            <div className="mt-4 flex items-center gap-4">
              {contact.instagram && (
                <a
                  href={contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on Instagram"
                  className="transition hover:text-volt"
                >
                  <Instagram size={22} />
                </a>
              )}

              {contact.youtube && (
                <a
                  href={contact.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Subscribe to our YouTube channel"
                  className="transition hover:text-volt"
                >
                  <Youtube size={23} />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Google Maps */}
        <div className="mt-12 overflow-hidden border border-line">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3572.677483761933!2d80.30221617487861!3d26.43388248050509!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399c47b913308fbf%3A0xfe345c9be6b239c4!2sGuru%20Fitness%20Hub!5e0!3m2!1sen!2sin!4v1792315678873!5m2!1sen!2sin"
            title="Guru Fitness Hub location on Google Maps"
            className="h-[300px] w-full md:h-[400px]"
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>

        {/* Footer Credits */}
        <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-line pt-6 text-xs text-mute md:flex-row">
          <span>
            © {new Date().getFullYear()} {brand.name}. All rights reserved.
          </span>
          <span>{f.tagline}</span>
        </div>
      </div>
    </footer>
  );
}