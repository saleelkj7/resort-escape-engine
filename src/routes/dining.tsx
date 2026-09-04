import { createFileRoute } from "@tanstack/react-router";
import dining from "@/assets/dining.jpg";
import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import { CtaBand } from "@/components/site/cta-band";
import { Btn } from "@/components/site/btn";
import { diningHighlights } from "@/data/content";
import { siteConfig, whatsappHref, waMessages, telHref } from "@/config/site";

const title = `Dining — ${siteConfig.name}`;
const description =
  "Open-air dining, breakfast and food packages for stays, day picnics and celebrations at Rehcruz D Retreat, Gorai, Mumbai.";

export const Route = createFileRoute("/dining")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "https://resort-escape-engine.lovable.app/dining" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  links: [{ rel: "canonical", href: "https://resort-escape-engine.lovable.app/dining" }],
  }),
  component: Dining,
});

function Dining() {
  return (
    <>
      <PageHero
        eyebrow="Dining"
        title="Meals under the trees"
        intro="Food packages arranged around your group, served in the open air."
        image={dining}
        alt="Open-air dining tables set under string lights at Rehcruz D Retreat"
      />

      <section className="mx-auto max-w-[86rem] px-5 py-24 lg:px-10 lg:py-32">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <SectionHeading
            eyebrow="At the table"
            title="Dining at Rehcruz"
            intro="Meals are planned with you in advance — for a family weekend, a one-day picnic or a full celebration menu."
          />
          <Reveal delay={100} className="space-y-6 text-sm leading-relaxed text-muted-foreground">
            <p>
              Rather than a fixed à la carte restaurant, dining here is arranged as packages that suit
              the size of your group and the occasion. Tell us how many are coming and what you would
              like on the table, and our team will put a plan together.
            </p>
            <p className="border-l-2 border-gold pl-5 text-foreground">
              Menus, meal timings and per-person package rates are confirmed by the property at the
              time of enquiry — nothing is published here that has not been verified.
            </p>
          </Reveal>
        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {diningHighlights.map((d, i) => (
            <Reveal key={d.title} delay={i * 70} className="bg-card p-8 shadow-soft">
              <h2 className="text-2xl">{d.title}</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{d.body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={80} className="mt-16 flex flex-wrap gap-4">
          <Btn asChild variant="solid" size="lg">
            <a href={whatsappHref(waMessages.dining)} target="_blank" rel="noopener noreferrer">
              Plan Your Menu
            </a>
          </Btn>
          <Btn asChild variant="outline" size="lg">
            <a href={telHref()}>Call {siteConfig.contact.phoneDisplay}</a>
          </Btn>
        </Reveal>
      </section>

      <CtaBand
        title="Stay for dinner"
        body="Tell us your dates and group size and we'll arrange the table."
        waMessage={waMessages.dining}
      />
    </>
  );
}
