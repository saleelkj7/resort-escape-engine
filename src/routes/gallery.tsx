import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import nature from "@/assets/nature.jpg";
import { PageHero } from "@/components/site/page-hero";
import { Lightbox } from "@/components/site/lightbox";
import { Reveal } from "@/components/site/reveal";
import { CtaBand } from "@/components/site/cta-band";
import { galleryImages, galleryCategories } from "@/data/content";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

const title = `Gallery — ${siteConfig.name}`;
const description =
  "Photographs of the pool, gardens, rooms, cottages, dining and event spaces at Rehcruz D Retreat in Gorai, Borivali West, Mumbai.";

export const Route = createFileRoute("/gallery")({
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
  component: Gallery,
});

function Gallery() {
  const [category, setCategory] = useState("All");
  const [index, setIndex] = useState<number | null>(null);

  const images = useMemo(
    () =>
      category === "All"
        ? galleryImages
        : galleryImages.filter((i) => i.category === category),
    [category],
  );

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="A look around"
        intro="The pool, the gardens, the rooms and the spaces where celebrations happen."
        image={nature}
        alt="Garden path lined with palm trees at Rehcruz D Retreat"
      />

      <section className="mx-auto max-w-[86rem] px-5 py-24 lg:px-10 lg:py-32">
        <div className="flex flex-wrap gap-3" role="group" aria-label="Filter gallery by category">
          {galleryCategories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => {
                setCategory(c);
                setIndex(null);
              }}
              aria-pressed={category === c}
              className={cn(
                "border px-5 py-2 text-[0.68rem] uppercase tracking-[0.2em] transition-colors",
                category === c
                  ? "border-forest bg-forest text-primary-foreground"
                  : "border-foreground/20 text-muted-foreground hover:border-gold hover:text-foreground",
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((img, i) => (
            <Reveal key={`${img.src}-${i}`} delay={(i % 6) * 50}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                className="group relative block aspect-[4/3] w-full overflow-hidden"
                aria-label={`Open image: ${img.alt}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
                />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/70 to-transparent p-4 text-left text-[0.62rem] uppercase tracking-[0.22em] text-ivory opacity-0 transition-opacity group-hover:opacity-100">
                  {img.category}
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand />

      <Lightbox images={images} index={index} onClose={() => setIndex(null)} onIndexChange={setIndex} />
    </>
  );
}
