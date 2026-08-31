import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { navLinks, siteConfig, telHref, whatsappHref, waMessages } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="bg-forest-deep text-ivory">
      <div className="mx-auto max-w-[86rem] px-5 py-20 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1.2fr]">
          <div className="max-w-sm">
            <p className="font-serif text-3xl tracking-[0.12em]">REHCRUZ</p>
            <p className="mt-1 text-[0.6rem] uppercase tracking-[0.42em] text-ivory/60">D Retreat</p>
            <p className="mt-7 text-sm leading-relaxed text-ivory/70">
              A retreat in Gorai where comfort, hospitality and green surroundings come together —
              for a weekend away, a celebration, or a quiet night under the trees.
            </p>
            <div className="mt-7 flex gap-3">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/25 transition-colors hover:border-gold hover:text-gold"
              >
                <Instagram className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/25 transition-colors hover:border-gold hover:text-gold"
              >
                <Facebook className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={whatsappHref(waMessages.general)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/25 transition-colors hover:border-gold hover:text-gold"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          <nav aria-label="Footer">
            <p className="eyebrow text-ivory/50">Explore</p>
            <ul className="mt-6 space-y-3">
              {navLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-ivory/75 transition-colors hover:text-gold">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/dining" className="text-sm text-ivory/75 transition-colors hover:text-gold">
                  Dining
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <p className="eyebrow text-ivory/50">Contact</p>
            <ul className="mt-6 space-y-4 text-sm text-ivory/75">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                <span>{siteConfig.contact.addressLine}</span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                <span className="flex flex-col">
                  <a href={telHref()} className="hover:text-gold">
                    {siteConfig.contact.phoneDisplay}
                  </a>
                  <a
                    href={telHref(siteConfig.contact.phoneSecondary)}
                    className="hover:text-gold"
                  >
                    {siteConfig.contact.phoneSecondaryDisplay}
                  </a>
                </span>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                <a href={`mailto:${siteConfig.contact.email}`} className="break-all hover:text-gold">
                  {siteConfig.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-ivory/15 pt-8 text-[0.7rem] uppercase tracking-[0.18em] text-ivory/55 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Rehcruz D Retreat. All Rights Reserved.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link to="/privacy" className="hover:text-gold">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-gold">
              Terms & Conditions
            </Link>
            <Link to="/terms" hash="cancellation" className="hover:text-gold">
              Cancellation Policy
            </Link>
            <Link to="/terms" hash="booking" className="hover:text-gold">
              Booking Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
