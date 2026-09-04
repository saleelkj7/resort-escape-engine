import { createFileRoute, Link } from "@tanstack/react-router";
import { defaultBookingSearch } from "@/lib/booking";
import pool from "@/assets/pool.jpg";
import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import { CtaBand } from "@/components/site/cta-band";
import { Btn } from "@/components/site/btn";
import { offers } from "@/data/content";
import { siteConfig, whatsappHref, waMessages } from "@/config/site";

const title = `Offers & Packages — ${siteConfig.name}`;
const description =
  "Stay, family, romantic and group packages at Rehcruz D Retreat, Gorai. Package details and rates are confirmed by the property on enquiry.";

export const Route = createFileRoute("/offers")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "https://resort-escape-engine.lovable.app/offers" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  links: [{ rel: "canonical", href: "https://resort-escape-engine.lovable.app/offers" }],
  }),
  component: Offers,
});

function Offers() {
  return (
    <>
      <PageHero
        eyebrow="Offers"
        title="Packages worth planning around"
        intro="Weekend escapes, family getaways and group stays — priced on enquiry."
        image={pool}
        alt="Poolside loungers at Rehcruz D Retreat"
      />

      <section className="mx-auto max-w-[86rem] px-5 py-24 lg:px-10 lg:py-32">
        <SectionHeading
          eyebrow="Current packages"
          title="Ways to stay for less"
          intro="Every package below is subject to availability, with the final tariff quoted at the time of enquiry."
        />

        <Reveal delay={60} className="mt-8 border-l-2 border-gold bg-card p-5 text-sm text-foreground shadow-soft">
          Placeholder content: these packages are development copy and have not yet been confirmed by
          the property. Replace them with live offers before launch.
        </Reveal>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {offers.map((o, i) => (
            <Reveal key={o.title} delay={i * 70} as="article" className="group flex flex-col bg-card shadow-soft">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={o.image}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
                />
                {o.placeholder ? (
                  <span className="absolute left-4 top-4 bg-charcoal/80 px-3 py-1 text-[0.58rem] uppercase tracking-[0.22em] text-ivory">
                    Placeholder
                  </span>
                ) : null}
              </div>
              <div className="flex flex-1 flex-col p-8">
                <h2 className="text-2xl">{o.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{o.body}</p>
                <dl className="mt-6 space-y-2 border-t border-border pt-5 text-xs text-muted-foreground">
                  <div>
                    <dt className="eyebrow text-[0.56rem]">Validity</dt>
                    <dd className="mt-1">{o.validity}</dd>
                  </div>
                  <div>
                    <dt className="eyebrow text-[0.56rem]">Terms</dt>
                    <dd className="mt-1">{o.terms}</dd>
                  </div>
                </dl>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Btn asChild variant="solid" size="sm">
                    <Link to="/booking" search={defaultBookingSearch()}>Book Now</Link>
                  </Btn>
                  <Btn asChild variant="outline" size="sm">
                    <a href={whatsappHref(waMessages.offer(o.title))} target="_blank" rel="noopener noreferrer">
                      Enquire
                    </a>
                  </Btn>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand title="Ask about today's rate" body="Our team will quote the best available tariff for your dates." />
    </>
  );
}
