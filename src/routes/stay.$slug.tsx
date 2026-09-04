import { defaultBookingSearch } from "@/lib/booking";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Check } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import { CtaBand } from "@/components/site/cta-band";
import { Btn } from "@/components/site/btn";
import { Lightbox } from "@/components/site/lightbox";
import { RoomCard } from "@/components/site/room-card";
import { rooms, getRoom, roomPolicies } from "@/data/rooms";
import { siteConfig, whatsappHref, waMessages } from "@/config/site";

export const Route = createFileRoute("/stay/$slug")({
  loader: ({ params }) => {
    const room = getRoom(params.slug);
    if (!room) throw notFound();
    return { room };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: `Room not found — ${siteConfig.name}` }, { name: "robots", content: "noindex" }],
      };
    }
    const { room } = loaderData;
    const title = `${room.name} — ${siteConfig.name}`;
    const url = `https://resort-escape-engine.lovable.app/stay/${room.slug}`;
    const overnight = room.tariffs.find((t) => t.label === "Overnight Stay" && t.price !== null);
    return {
      meta: [
        { title },
        { name: "description", content: room.short },
        { property: "og:title", content: title },
        { property: "og:description", content: room.short },
        { property: "og:url", content: url },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HotelRoom",
            name: room.name,
            description: room.short,
            url,
            amenityFeature: room.amenities.map((a) => ({
              "@type": "LocationFeatureSpecification",
              name: a,
              value: true,
            })),
            containedInPlace: { "@type": "Resort", name: siteConfig.name },
            ...(overnight
              ? {
                  offers: {
                    "@type": "Offer",
                    price: overnight.price,
                    priceCurrency: siteConfig.currency,
                    availability: "https://schema.org/InStock",
                  },
                }
              : {}),
          }),
        },
      ],
    };
  },
  notFoundComponent: RoomNotFound,
  component: RoomDetail,
});

function RoomNotFound() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-40 text-center">
      <p className="eyebrow">Unavailable</p>
      <h1 className="mt-4 text-4xl">We couldn’t find that room</h1>
      <p className="mt-4 text-sm text-muted-foreground">
        The room you are looking for may have been renamed. Browse all our accommodation instead.
      </p>
      <Btn asChild variant="solid" size="md" className="mt-8">
        <Link to="/stay">View all rooms</Link>
      </Btn>
    </div>
  );
}

function RoomDetail() {
  const { room } = Route.useLoaderData();
  const [index, setIndex] = useState<number | null>(null);
  const others = rooms.filter((r) => r.slug !== room.slug).slice(0, 3);
  const images = room.gallery.map((src) => ({ src, alt: `${room.name} at ${siteConfig.name}` }));

  return (
    <>
      <PageHero
        eyebrow="Accommodation"
        title={room.name}
        intro={room.short}
        image={room.image}
        alt={`${room.name} at ${siteConfig.name}`}
      />

      <section className="mx-auto max-w-[86rem] px-5 py-24 lg:px-10 lg:py-32">
        <div className="grid gap-16 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <Reveal className="space-y-6 text-sm leading-relaxed text-muted-foreground">
              {room.description.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </Reveal>

            <Reveal delay={80} className="mt-12 grid gap-6 border-t border-border pt-8 sm:grid-cols-3">
              {[
                { label: "Capacity", value: room.capacity },
                { label: "Beds", value: room.beds },
                { label: "Size", value: room.size },
              ].map((d) => (
                <div key={d.label}>
                  <p className="eyebrow text-[0.58rem]">{d.label}</p>
                  <p className="mt-2 text-sm text-foreground">{d.value}</p>
                </div>
              ))}
            </Reveal>

            <Reveal delay={120} className="mt-12">
              <h2 className="text-2xl">In this room</h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {room.amenities.map((a) => (
                  <li key={a} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                    {a}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={160} className="mt-14">
              <h2 className="text-2xl">Gallery</h2>
              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
                {images.map((img, i) => (
                  <button
                    key={`${img.src}-${i}`}
                    type="button"
                    onClick={() => setIndex(i)}
                    className="group relative aspect-[4/3] overflow-hidden"
                    aria-label={`Open image ${i + 1} of ${room.name}`}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </button>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={100} as="aside" className="h-fit bg-card p-8 shadow-elevated lg:sticky lg:top-28">
            <p className="eyebrow text-[0.58rem]">Tariffs</p>
            <h2 className="mt-3 text-2xl">Rates &amp; stay windows</h2>
            <ul className="mt-6 divide-y divide-border">
              {room.tariffs.map((t) => (
                <li key={t.label} className="flex items-start justify-between gap-4 py-4">
                  <div>
                    <p className="text-sm text-foreground">{t.label}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{t.window}</p>
                  </div>
                  <p className="whitespace-nowrap font-serif text-xl">
                    {t.price !== null
                      ? `${siteConfig.currencySymbol}${t.price.toLocaleString("en-IN")}`
                      : "On request"}
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-muted-foreground">
              Tariffs are inclusive of taxes. Festive and group rates are quoted on request.
            </p>
            <div className="mt-8 space-y-3">
              <Btn asChild variant="solid" size="md" className="w-full">
                <Link to="/booking" search={defaultBookingSearch({ room: room.slug })}>
                  Book This Room
                </Link>
              </Btn>
              <Btn asChild variant="outline" size="md" className="w-full">
                <a href={whatsappHref(waMessages.room(room.name))} target="_blank" rel="noopener noreferrer">
                  Enquire on WhatsApp
                </a>
              </Btn>
            </div>
            {room.unverified.length ? (
              <p className="mt-6 border-t border-border pt-4 text-[0.7rem] leading-relaxed text-muted-foreground">
                Details shown as “on request” are yet to be confirmed by the property and are not
                published figures.
              </p>
            ) : null}
          </Reveal>
        </div>
      </section>

      <section className="bg-secondary py-24 lg:py-28">
        <div className="mx-auto max-w-[86rem] px-5 lg:px-10">
          <SectionHeading eyebrow="Policies" title="Before you arrive" />
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

      <section className="mx-auto max-w-[86rem] px-5 py-24 lg:px-10 lg:py-32">
        <SectionHeading eyebrow="You may also like" title="Other ways to stay" />
        <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {others.map((r, i) => (
            <RoomCard key={r.slug} room={r} delay={i * 60} />
          ))}
        </div>
      </section>

      <CtaBand waMessage={waMessages.room(room.name)} />

      <Lightbox images={images} index={index} onClose={() => setIndex(null)} onIndexChange={setIndex} />
    </>
  );
}
