import { createFileRoute } from "@tanstack/react-router";
import pool from "@/assets/pool.jpg";
import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import { CtaBand } from "@/components/site/cta-band";
import { experiences, amenities } from "@/data/content";
import { siteConfig } from "@/config/site";

const title = `Experiences & Amenities — ${siteConfig.name}`;
const description =
  "The pool, green surroundings, one-day picnics, open-air dining and celebrations at Rehcruz D Retreat in Gorai, Borivali West, Mumbai.";

export const Route = createFileRoute("/experiences")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "https://resort-escape-engine.lovable.app/experiences" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  links: [{ rel: "canonical", href: "https://resort-escape-engine.lovable.app/experiences" }],
  }),
  component: Experiences,
});

function Experiences() {
  return (
    <>
      <PageHero
        eyebrow="Experiences"
        title="Days that move at your pace"
        intro="Water, greenery, long meals and the kind of afternoon that doesn't need a plan."
        image={pool}
        alt="Swimming pool surrounded by palms at Rehcruz D Retreat"
      />

      <section className="mx-auto max-w-[86rem] px-5 py-24 lg:px-10 lg:py-32">
        <SectionHeading
          eyebrow="At the retreat"
          title="What a day here looks like"
          intro="Everything on the property is within a short walk — the pool, the lawns, the dining area and the gardens."
        />
        <div className="mt-16 space-y-20">
          {experiences.map((e, i) => (
            <Reveal
              key={e.title}
              delay={40}
              className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
                i % 2 === 1 ? "lg:[&>figure]:order-2" : ""
              }`}
            >
              <figure className="aspect-[4/3] overflow-hidden">
                <img
                  src={e.image}
                  alt={`${e.title} at ${siteConfig.name}`}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </figure>
              <div>
                <p className="eyebrow">{e.kicker}</p>
                <h2 className="mt-4 text-3xl sm:text-4xl">{e.title}</h2>
                <span className="mt-6 block h-px w-14 bg-gold" aria-hidden="true" />
                <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{e.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-secondary py-24 lg:py-32">
        <div className="mx-auto max-w-[86rem] px-5 lg:px-10">
          <SectionHeading eyebrow="Facilities" title="Amenities" />
          <ul className="mt-12 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {amenities.map((a, i) => (
              <Reveal key={a.name} delay={i * 40} as="li" className="border-t border-border pt-4">
                <p className="text-base text-foreground">{a.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">{a.note}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
