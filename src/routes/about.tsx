import { createFileRoute } from "@tanstack/react-router";
import nature from "@/assets/nature.jpg";
import pool from "@/assets/pool.jpg";
import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import { CtaBand } from "@/components/site/cta-band";
import { amenities, highlights } from "@/data/content";
import { siteConfig } from "@/config/site";

const title = `About — ${siteConfig.name}`;
const description =
  "Rehcruz D Retreat is a green resort on the Gorai–Manori road in Borivali West, Mumbai, with rooms, cottages, a private villa, a pool and event lawns.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

function About() {
  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title="A retreat built around green and quiet"
        intro="Minutes from Borivali, hours away in feeling."
        image={nature}
        alt="Palm-lined garden path at Rehcruz D Retreat"
      />

      <section className="mx-auto max-w-[86rem] px-5 py-24 lg:px-10 lg:py-32">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <SectionHeading
            eyebrow="Who we are"
            title="Rehcruz D Retreat"
            intro="Set on the Gorai–Manori road near Culvem Village, the property was made for people who want the outdoors back in their weekend — without a long drive out of Mumbai."
          />
          <Reveal delay={100} className="space-y-6 text-sm leading-relaxed text-muted-foreground">
            <p>
              The resort brings together seven ways to stay, a swimming pool at its centre, open lawns
              for gatherings and dining served in the open air. Days here can be as full or as empty as
              you like: a one-day picnic with the family, a night away for two, or a whole villa taken
              over for a celebration.
            </p>
            <p>
              Our team is small and hands-on. Meals, timings, décor and group logistics are planned with
              you directly, over a call or on WhatsApp, before you arrive.
            </p>
            <div className="grid grid-cols-2 gap-6 border-t border-border pt-8 sm:grid-cols-4">
              {highlights.map((h) => (
                <div key={h.label}>
                  <p className="font-serif text-3xl text-forest">{h.value}</p>
                  <p className="mt-2 text-[0.68rem] uppercase tracking-[0.16em]">{h.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-border bg-card py-24">
        <div className="mx-auto grid max-w-[86rem] gap-14 px-5 lg:grid-cols-2 lg:items-center lg:px-10 lg:gap-20">
          <Reveal>
            <img
              src={pool}
              alt="Swimming pool surrounded by palms at the resort"
              loading="lazy"
              className="aspect-[4/3] w-full object-cover"
            />
          </Reveal>
          <div>
            <SectionHeading eyebrow="Facilities" title="On the property" />
            <ul className="mt-10 grid gap-x-8 gap-y-5 sm:grid-cols-2">
              {amenities.map((a) => (
                <li key={a.name} className="border-t border-border pt-4">
                  <p className="text-sm">{a.name}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{a.note}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
