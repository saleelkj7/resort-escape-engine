import { createFileRoute } from "@tanstack/react-router";
import { siteConfig } from "@/config/site";

const title = `Privacy Policy — ${siteConfig.name}`;
const description =
  "How Rehcruz D Retreat collects and uses the information you share when you enquire or book a stay.";

export const Route = createFileRoute("/privacy")({
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
  component: Privacy,
});

function Privacy() {
  return (
    <article className="mx-auto max-w-3xl px-5 pb-28 pt-40 lg:px-10">
      <p className="eyebrow">Legal</p>
      <h1 className="mt-4 text-4xl sm:text-5xl">Privacy Policy</h1>
      <span className="mt-6 block h-px w-14 bg-gold" aria-hidden="true" />
      <div className="mt-10 space-y-6 text-sm leading-relaxed text-muted-foreground">
        <p className="border-l-2 border-gold pl-5 text-foreground">
          Placeholder policy text for development. Replace with the property's reviewed privacy
          policy before launch.
        </p>
        <h2 className="text-2xl text-foreground">Information we collect</h2>
        <p>
          When you send an enquiry or make a booking request we collect the name, phone number, email
          address, dates and message you provide, so that our team can respond to you.
        </p>
        <h2 className="text-2xl text-foreground">How we use it</h2>
        <p>
          Your details are used only to answer your enquiry, confirm a reservation and communicate
          about your stay. We do not sell your information.
        </p>
        <h2 className="text-2xl text-foreground">Sharing</h2>
        <p>
          Information may be shared with service providers who help us operate the resort and this
          website, and where required by law.
        </p>
        <h2 className="text-2xl text-foreground">Contact</h2>
        <p>
          For any question about your data, write to{" "}
          <a className="text-forest underline underline-offset-4" href={`mailto:${siteConfig.contact.email}`}>
            {siteConfig.contact.email}
          </a>{" "}
          or call {siteConfig.contact.phoneDisplay}.
        </p>
      </div>
    </article>
  );
}
