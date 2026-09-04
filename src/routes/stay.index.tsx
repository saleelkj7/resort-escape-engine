import { createFileRoute } from "@tanstack/react-router";
import villa from "@/assets/villa.jpg";
import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { RoomCard } from "@/components/site/room-card";
import { Reveal } from "@/components/site/reveal";
import { CtaBand } from "@/components/site/cta-band";
import { BookingBar } from "@/components/site/booking-bar";
import { rooms, roomPolicies } from "@/data/rooms";
import { siteConfig } from "@/config/site";

const title = `Rooms, Cottages & Villa — ${siteConfig.name}`;
const description =
  "Seven ways to stay at Rehcruz D Retreat, Gorai: deluxe, super deluxe, executive and suite rooms, wooden cottages, a dormitory for groups and a private villa.";

export const Route = createFileRoute("/stay/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "https://resort-escape-engine.lovable.app/stay" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  links: [{ rel: "canonical", href: "https://resort-escape-engine.lovable.app/stay" }],
  }),
  component: StayIndex,
});

function StayIndex() {
  return (
    <>
      <PageHero
        eyebrow="Accommodation"
        title="Seven ways to stay"
        intro="Rooms, cottages, a dormitory for groups and a private villa — each within a few steps of the pool and the gardens."
        image={villa}
        alt="Private villa with terrace at Rehcruz D Retreat"
      />

      <section className="mx-auto -mt-10 max-w-[86rem] px-5 lg:px-10">
        <BookingBar floating />
      </section>

      <section className="mx-auto max-w-[86rem] px-5 py-24 lg:px-10 lg:py-32">
        <SectionHeading
          eyebrow="Choose your room"
          title="Accommodation at Rehcruz"
          intro="Published tariffs are inclusive of taxes. Where a rate is not published, our team will quote it on request."
        />
        <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {rooms.map((room, i) => (
            <RoomCard key={room.slug} room={room} delay={i * 60} />
          ))}
        </div>
      </section>

      <section className="bg-secondary py-24 lg:py-32">
        <div className="mx-auto max-w-[86rem] px-5 lg:px-10">
          <SectionHeading eyebrow="Good to know" title="Stay policies" />
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {roomPolicies.map((p, i) => (
              <Reveal key={p.title} delay={i * 80} className="border-t border-border pt-6">
                <h3 className="text-xl">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
