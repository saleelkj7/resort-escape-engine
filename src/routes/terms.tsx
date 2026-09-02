import { createFileRoute } from "@tanstack/react-router";
import { siteConfig } from "@/config/site";

const title = `Terms & Conditions — ${siteConfig.name}`;
const description =
  "Booking, tariff, check-in and cancellation terms for stays and events at Rehcruz D Retreat, Gorai, Mumbai.";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Terms,
});

function Terms() {
  return (
    <article className="mx-auto max-w-3xl px-5 pb-28 pt-40 lg:px-10">
      <p className="eyebrow">Legal</p>
      <h1 className="mt-4 text-4xl sm:text-5xl">Terms &amp; Conditions</h1>
      <span className="mt-6 block h-px w-14 bg-gold" aria-hidden="true" />
      <div className="mt-10 space-y-6 text-sm leading-relaxed text-muted-foreground">
        <p className="border-l-2 border-gold pl-5 text-foreground">
          Placeholder terms for development. Replace with the property's reviewed terms before
          launch.
        </p>
        <h2 className="text-2xl text-foreground">Bookings</h2>
        <p>
          Requests made through this website are enquiries. A reservation is confirmed only once the
          resort team confirms availability and payment terms with you directly.
        </p>
        <h2 className="text-2xl text-foreground">Tariffs</h2>
        <p>
          Published tariffs are inclusive of taxes and may change without notice. Festive dates,
          group bookings and exclusive villa stays are quoted on request.
        </p>
        <h2 className="text-2xl text-foreground">Check-in &amp; check-out</h2>
        <p>
          Day use runs {siteConfig.policies.checkInDay} to {siteConfig.policies.checkOutDay}; night use
          runs {siteConfig.policies.checkInNight} to {siteConfig.policies.checkOutNight}. Valid
          government photo identification is required at check-in.
        </p>
        <h2 className="text-2xl text-foreground">Cancellation</h2>
        <p>
          Cancellation and refund terms are confirmed at the time of booking. Please contact the
          resort directly to amend or cancel a confirmed reservation.
        </p>
        <h2 className="text-2xl text-foreground">Conduct</h2>
        <p>
          Guests are asked to respect the property, other guests and pool safety rules. The resort
          may refuse service where conduct affects the safety or comfort of others.
        </p>
      </div>
    </article>
  );
}
