import { createFileRoute } from "@tanstack/react-router";
import weddings from "@/assets/weddings.jpg";
import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import { CtaBand } from "@/components/site/cta-band";
import { EnquiryForm } from "@/components/site/enquiry-form";
import { eventTypes } from "@/data/content";
import { siteConfig, waMessages } from "@/config/site";

const title = `Weddings & Events — ${siteConfig.name}`;
const description =
  "Host weddings, pre-wedding functions, corporate offsites and private celebrations on the lawns and indoor spaces at Rehcruz D Retreat, Gorai, Mumbai.";

export const Route = createFileRoute("/weddings")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Weddings,
});

function Weddings() {
  return (
    <>
      <PageHero
        eyebrow="Weddings & Events"
        title="Celebrate under open sky"
        intro="Lawns, indoor spaces and on-site accommodation for the people who matter most."
        image={weddings}
        alt="Wedding mandap set up on the resort lawn at dusk"
      />

      <section className="mx-auto max-w-[86rem] px-5 py-24 lg:px-10 lg:py-32">
        <SectionHeading
          eyebrow="Occasions"
          title="What we host"
          intro="From an intimate anniversary dinner to a full wedding weekend with the party staying on site."
        />
        <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {eventTypes.map((e, i) => (
            <Reveal key={e.title} delay={i * 60} className="border-t border-border pt-6">
              <h2 className="text-2xl">{e.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{e.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-secondary py-24 lg:py-32">
        <div className="mx-auto max-w-[86rem] px-5 lg:px-10">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
            <div>
              <SectionHeading
                eyebrow="Plan with us"
                title="Send an event enquiry"
                intro="Share your dates, guest count and the kind of celebration you have in mind. Our team will come back with availability and a plan."
              />
              <Reveal delay={80} className="mt-8 space-y-4 text-sm text-muted-foreground">
                <p className="border-l-2 border-gold pl-5 text-foreground">
                  Venue capacities, décor partners and per-plate rates are confirmed directly by the
                  property — no figures are published here until verified.
                </p>
              </Reveal>
            </div>
            <Reveal delay={120}>
              <EnquiryForm defaultType="Wedding" />
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand
        title="Let's plan your celebration"
        body="Speak with our events team about dates, spaces and stay packages."
        waMessage={waMessages.wedding}
      />
    </>
  );
}
