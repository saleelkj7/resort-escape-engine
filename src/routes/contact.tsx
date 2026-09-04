import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import villa from "@/assets/villa.jpg";
import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import { EnquiryForm } from "@/components/site/enquiry-form";
import { Btn } from "@/components/site/btn";
import {
  siteConfig,
  telHref,
  whatsappHref,
  waMessages,
  mapsDirectionsHref,
  mapsEmbedHref,
} from "@/config/site";

const title = `Contact & Location — ${siteConfig.name}`;
const description =
  "Call, WhatsApp or email Rehcruz D Retreat, Gorai–Manori Road, Culvem Village, Borivali West, Mumbai. Directions, contact numbers and enquiry form.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "https://resort-escape-engine.lovable.app/contact" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  links: [{ rel: "canonical", href: "https://resort-escape-engine.lovable.app/contact" }],
  }),
  component: Contact,
});

function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Get in touch"
        intro="Call, message or write to us — we answer quickly."
        image={villa}
        alt="Entrance and grounds at Rehcruz D Retreat"
      />

      <section className="mx-auto max-w-[86rem] px-5 py-24 lg:px-10 lg:py-32">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <div>
            <SectionHeading eyebrow="Reach us" title="Rehcruz D Retreat" />
            <Reveal delay={80} className="mt-10 space-y-8 text-sm">
              <div className="flex gap-4">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
                <address className="not-italic leading-relaxed text-muted-foreground">
                  {siteConfig.contact.addressLine}
                </address>
              </div>
              <div className="flex gap-4">
                <Phone className="mt-1 h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
                <p className="space-y-1">
                  <a className="block hover:text-forest" href={telHref()}>
                    {siteConfig.contact.phoneDisplay}
                  </a>
                  <a
                    className="block hover:text-forest"
                    href={telHref(siteConfig.contact.phoneSecondary)}
                  >
                    {siteConfig.contact.phoneSecondaryDisplay}
                  </a>
                </p>
              </div>
              <div className="flex gap-4">
                <Mail className="mt-1 h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
                <a className="hover:text-forest" href={`mailto:${siteConfig.contact.email}`}>
                  {siteConfig.contact.email}
                </a>
              </div>
              <div className="flex gap-4">
                <MessageCircle className="mt-1 h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
                <a
                  className="hover:text-forest"
                  href={whatsappHref(waMessages.general)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp us
                </a>
              </div>

              <div className="border-t border-border pt-6">
                <p className="eyebrow text-[0.58rem]">Stay windows</p>
                <ul className="mt-3 space-y-1 text-muted-foreground">
                  <li>
                    Day use — {siteConfig.policies.checkInDay} to {siteConfig.policies.checkOutDay}
                  </li>
                  <li>
                    Night use — {siteConfig.policies.checkInNight} to {siteConfig.policies.checkOutNight}
                  </li>
                </ul>
              </div>

              <Btn asChild variant="outline" size="md">
                <a href={mapsDirectionsHref} target="_blank" rel="noopener noreferrer">
                  Get Directions
                </a>
              </Btn>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <EnquiryForm defaultType="General Enquiry" />
          </Reveal>
        </div>
      </section>

      <section aria-label="Map" className="border-t border-border">
        <iframe
          title={`Map showing the location of ${siteConfig.name}`}
          src={mapsEmbedHref}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-[420px] w-full border-0 grayscale-[0.2]"
        />
      </section>
    </>
  );
}
