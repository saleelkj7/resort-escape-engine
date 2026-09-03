import { createFileRoute, Link } from "@tanstack/react-router";
import { defaultBookingSearch } from "@/lib/booking";
import { useState } from "react";
import { Star, MapPin, Clock, Car } from "lucide-react";

import hero from "@/assets/hero-resort.jpg";
import nature from "@/assets/nature.jpg";
import dining from "@/assets/dining.jpg";
import weddings from "@/assets/weddings.jpg";

import { Btn } from "@/components/site/btn";
import { BookingBar } from "@/components/site/booking-bar";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import { RoomCard } from "@/components/site/room-card";
import { CtaBand } from "@/components/site/cta-band";
import { EnquiryForm } from "@/components/site/enquiry-form";
import { Lightbox } from "@/components/site/lightbox";

import { rooms } from "@/data/rooms";
import {
  experiences,
  amenities,
  highlights,
  diningHighlights,
  offers,
  testimonials,
  galleryImages,
} from "@/data/content";
import { siteConfig, mapsDirectionsHref, mapsEmbedHref, waMessages, whatsappHref } from "@/config/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${siteConfig.name} — Resort in Gorai, Borivali West, Mumbai` },
      { name: "description", content: siteConfig.description },
      { property: "og:title", content: `${siteConfig.name} — Resort in Gorai, Mumbai` },
      { property: "og:description", content: siteConfig.description },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const previewImages = galleryImages.slice(0, 6);

  return (
    <>
      {/* 1. Hero */}
      <section className="relative flex min-h-[100svh] items-center overflow-hidden">
        <img
          src={hero}
          alt="Palm-lined pool and gardens at Rehcruz D Retreat in Gorai, Mumbai"
          width={1920}
          height={1088}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="veil absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto w-full max-w-[86rem] px-5 pb-28 pt-36 lg:px-10">
          <Reveal className="max-w-3xl">
            <p className="eyebrow text-ivory/70">Gorai · Borivali West · Mumbai</p>
            <h1 className="mt-6 text-5xl leading-[1.02] text-ivory sm:text-6xl lg:text-8xl">
              Escape to Comfort.
              <span className="block italic text-gold">Reconnect with Nature.</span>
            </h1>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-ivory/85">
              A green, unhurried retreat minutes from the city — rooms, cottages and a private villa
              around a pool, with dining and lawns for the occasions worth gathering for.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Btn asChild variant="gold" size="lg">
                <Link to="/booking" search={defaultBookingSearch()}>Book Your Stay</Link>
              </Btn>
              <Btn asChild variant="light" size="lg">
                <Link to="/stay">Explore Rooms</Link>
              </Btn>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2. Booking bar */}
      <div className="relative z-20 mx-auto -mt-16 w-full max-w-[80rem] px-5 lg:px-10">
        <BookingBar floating />
      </div>

      {/* 3. Welcome */}
      <section className="mx-auto max-w-[86rem] px-5 py-24 lg:px-10 lg:py-32">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
          <SectionHeading
            eyebrow="Welcome"
            title="A quieter side of Mumbai"
            intro="Rehcruz D Retreat sits on the Gorai–Manori road, where the traffic thins out and the palms take over. It is close enough for a day trip and calm enough for a long weekend — a place built around slow mornings, long swims and meals eaten outdoors."
          />
          <Reveal delay={120} className="space-y-6">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Seven ways to stay — deluxe and super deluxe rooms, executive rooms and suites, wooden
              cottages, a dormitory for groups, and a private villa for those who would rather have the
              place to themselves.
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Our team handles the details: dining packages, day picnics, celebrations on the lawns and
              the timings that make a short stay feel longer than it is.
            </p>
            <div className="grid grid-cols-2 gap-6 border-t border-border pt-8 sm:grid-cols-4">
              {highlights.map((h) => (
                <div key={h.label}>
                  <p className="font-serif text-3xl text-forest">{h.value}</p>
                  <p className="mt-2 text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground">
                    {h.label}
                  </p>
                </div>
              ))}
            </div>
            <Btn asChild variant="link" size="sm">
              <Link to="/about">Our story</Link>
            </Btn>
          </Reveal>
        </div>
      </section>

      {/* 4. Accommodation */}
      <section className="bg-secondary/50 py-24 lg:py-32">
        <div className="mx-auto max-w-[86rem] px-5 lg:px-10">
          <SectionHeading
            eyebrow="Accommodation"
            title="Rooms, cottages & a private villa"
            intro="Every category opens on to the gardens. Choose the space that suits your stay."
            align="center"
          />
          <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {rooms.slice(0, 6).map((room, i) => (
              <RoomCard key={room.slug} room={room} delay={i * 60} />
            ))}
          </div>
          <div className="mt-14 text-center">
            <Btn asChild variant="outline" size="md">
              <Link to="/stay">View All Stays</Link>
            </Btn>
          </div>
        </div>
      </section>

      {/* 5. Experiences */}
      <section className="mx-auto max-w-[86rem] px-5 py-24 lg:px-10 lg:py-32">
        <SectionHeading eyebrow="Experiences" title="Days worth slowing down for" />
        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {experiences.slice(0, 6).map((e, i) => (
            <Reveal key={e.title} delay={i * 60} as="article" className="group">
              <div className="relative aspect-[5/4] overflow-hidden">
                <img
                  src={e.image}
                  alt={e.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                />
              </div>
              <p className="eyebrow mt-6 text-[0.58rem]">{e.kicker}</p>
              <h3 className="mt-3 text-2xl">{e.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{e.body}</p>
            </Reveal>
          ))}
        </div>
        <div className="mt-14">
          <Btn asChild variant="link" size="sm">
            <Link to="/experiences">All experiences</Link>
          </Btn>
        </div>
      </section>

      {/* 6. Amenities */}
      <section className="border-y border-border bg-card py-20">
        <div className="mx-auto max-w-[86rem] px-5 lg:px-10">
          <SectionHeading eyebrow="Facilities" title="Everything on the property" align="center" />
          <ul className="mt-14 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-5">
            {amenities.map((a, i) => (
              <Reveal as="li" key={a.name} delay={i * 30} className="border-t border-border pt-4">
                <p className="text-sm text-foreground">{a.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">{a.note}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* 7. Dining */}
      <section className="mx-auto max-w-[86rem] px-5 py-24 lg:px-10 lg:py-32">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
          <Reveal className="order-2 lg:order-1">
            <img
              src={dining}
              alt="Open-air dining tables set under string lights at the retreat"
              loading="lazy"
              className="aspect-[4/5] w-full object-cover"
            />
          </Reveal>
          <div className="order-1 lg:order-2">
            <SectionHeading
              eyebrow="Dining"
              title="Meals under the trees"
              intro="Food packages are arranged around your group and the occasion — from a family lunch by the pool to a full celebration menu."
            />
            <dl className="mt-10 grid gap-6 sm:grid-cols-2">
              {diningHighlights.map((d) => (
                <div key={d.title} className="border-t border-border pt-5">
                  <dt className="text-sm text-foreground">{d.title}</dt>
                  <dd className="mt-2 text-xs leading-relaxed text-muted-foreground">{d.body}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-10 flex flex-wrap gap-3">
              <Btn asChild variant="solid" size="sm">
                <Link to="/dining">Explore Dining</Link>
              </Btn>
              <Btn asChild variant="outline" size="sm">
                <a href={whatsappHref(waMessages.dining)} target="_blank" rel="noopener noreferrer">
                  Ask About Menus
                </a>
              </Btn>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Weddings */}
      <section className="relative overflow-hidden">
        <img
          src={weddings}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="veil absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-[86rem] px-5 py-28 lg:px-10 lg:py-36">
          <SectionHeading
            eyebrow="Weddings & Events"
            title="Lawns made for celebrating"
            intro="Weddings, pre-wedding functions, corporate offsites and family gatherings — with rooms, cottages and the villa for your guests."
            tone="light"
          />
          <div className="mt-10 flex flex-wrap gap-4">
            <Btn asChild variant="gold" size="md">
              <Link to="/weddings">Plan Your Event</Link>
            </Btn>
            <Btn asChild variant="light" size="md">
              <a href={whatsappHref(waMessages.wedding)} target="_blank" rel="noopener noreferrer">
                Enquire on WhatsApp
              </a>
            </Btn>
          </div>
        </div>
      </section>

      {/* 9. Gallery preview */}
      <section className="mx-auto max-w-[86rem] px-5 py-24 lg:px-10 lg:py-32">
        <SectionHeading eyebrow="Gallery" title="A look around" align="center" />
        <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-3">
          {previewImages.map((img, i) => (
            <button
              key={img.alt}
              type="button"
              onClick={() => setLightbox(i)}
              className="group relative aspect-square overflow-hidden"
              aria-label={`Open image: ${img.alt}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
              />
            </button>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Btn asChild variant="outline" size="md">
            <Link to="/gallery">Full Gallery</Link>
          </Btn>
        </div>
        <Lightbox
          images={previewImages.map((i) => ({ src: i.src, alt: i.alt }))}
          index={lightbox}
          onClose={() => setLightbox(null)}
          onIndexChange={setLightbox}
        />
      </section>

      {/* 10. Offers */}
      <section className="bg-secondary/50 py-24 lg:py-32">
        <div className="mx-auto max-w-[86rem] px-5 lg:px-10">
          <SectionHeading eyebrow="Offers" title="Reasons to come sooner" align="center" />
          <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {offers.map((o, i) => (
              <Reveal key={o.title} delay={i * 60} as="article" className="flex flex-col bg-card shadow-soft">
                <img src={o.image} alt="" aria-hidden="true" loading="lazy" className="aspect-[4/3] w-full object-cover" />
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="text-xl">{o.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{o.body}</p>
                  <p className="mt-5 text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">
                    {o.validity}
                  </p>
                  <Btn asChild variant="link" size="sm" className="mt-4 self-start">
                    <a href={whatsappHref(waMessages.offer(o.title))} target="_blank" rel="noopener noreferrer">
                      Enquire
                    </a>
                  </Btn>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-8 text-center text-xs text-muted-foreground">
            Offer details are indicative placeholders pending confirmation by the property.
          </p>
        </div>
      </section>

      {/* 11. Reviews */}
      <section className="mx-auto max-w-[86rem] px-5 py-24 lg:px-10 lg:py-32">
        <SectionHeading eyebrow="Guest Voices" title="What guests say" align="center" />
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={i} delay={i * 60} as="blockquote" className="bg-card p-8 shadow-soft">
              <div className="flex gap-1 text-gold" aria-label={`${t.rating} out of 5`}>
                {Array.from({ length: t.rating }).map((_, s) => (
                  <Star key={s} className="h-4 w-4 fill-current" aria-hidden="true" />
                ))}
              </div>
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{t.body}</p>
              <footer className="mt-6 text-xs uppercase tracking-[0.16em] text-foreground">
                {t.name}
                <span className="mt-1 block normal-case tracking-normal text-muted-foreground">{t.stay}</span>
              </footer>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-center text-xs text-muted-foreground">
          Placeholder cards — verified guest reviews will replace these before launch.
        </p>
      </section>

      {/* 12. Location */}
      <section className="border-y border-border bg-card py-24 lg:py-32">
        <div className="mx-auto grid max-w-[86rem] gap-14 px-5 lg:grid-cols-2 lg:items-center lg:px-10">
          <div>
            <SectionHeading
              eyebrow="Location"
              title="Gorai–Manori Road, Borivali West"
              intro={siteConfig.contact.addressLine}
            />
            <ul className="mt-10 space-y-5 text-sm text-muted-foreground">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                Near Ambedkar Nagar Bus Stop, Culvem Village
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                Day use {siteConfig.policies.checkInDay} – {siteConfig.policies.checkOutDay}; night use{" "}
                {siteConfig.policies.checkInNight} – {siteConfig.policies.checkOutNight}
              </li>
              <li className="flex gap-3">
                <Car className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                On-property parking available
              </li>
            </ul>
            <div className="mt-10 flex flex-wrap gap-3">
              <Btn asChild variant="solid" size="sm">
                <a href={mapsDirectionsHref} target="_blank" rel="noopener noreferrer">
                  Get Directions
                </a>
              </Btn>
              <Btn asChild variant="outline" size="sm">
                <Link to="/contact">Contact Us</Link>
              </Btn>
            </div>
          </div>
          <Reveal>
            <iframe
              title="Map showing Rehcruz D Retreat location"
              src={mapsEmbedHref}
              loading="lazy"
              className="h-[420px] w-full border-0"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Reveal>
        </div>
      </section>

      {/* 13. Enquiry */}
      <section className="mx-auto max-w-[86rem] px-5 py-24 lg:px-10 lg:py-32">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Enquiries"
              title="Tell us about your stay"
              intro="Share your dates and we will call you back with availability and tariffs."
            />
            <img
              src={nature}
              alt="Garden path lined with palms at the retreat"
              loading="lazy"
              className="mt-10 hidden aspect-[4/3] w-full object-cover lg:block"
            />
          </div>
          <EnquiryForm />
        </div>
      </section>

      {/* 14. Closing CTA */}
      <CtaBand />
    </>
  );
}
