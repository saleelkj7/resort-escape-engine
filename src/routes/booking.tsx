import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Btn } from "@/components/site/btn";
import { Reveal } from "@/components/site/reveal";
import { siteConfig, telHref, whatsappHref, waMessages } from "@/config/site";
import { rooms, getRoom, roomPolicies } from "@/data/rooms";
import {
  validateBookingSearch,
  nightsBetween,
  formatDate,
  todayISO,
  type BookingSearch,
} from "@/lib/booking";
import { cn } from "@/lib/utils";

const title = `Book Your Stay — ${siteConfig.name}`;
const description =
  "Send a booking request for rooms, cottages or the private villa at Rehcruz D Retreat, Gorai, Borivali West. Our team confirms availability and rates directly.";

export const Route = createFileRoute("/booking")({
  validateSearch: (search: Record<string, unknown>) => validateBookingSearch(search),
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "https://resort-escape-engine.lovable.app/booking" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "https://resort-escape-engine.lovable.app/booking" }],
  }),
  component: BookingPage,
});

const steps = [
  { key: "select", label: "Dates & Room" },
  { key: "guest", label: "Your Details" },
  { key: "summary", label: "Review" },
  { key: "confirmation", label: "Request Sent" },
] as const;

const fieldClass =
  "h-11 w-full border-0 border-b border-border bg-transparent px-0 text-sm text-foreground outline-none transition-colors focus:border-gold";
const labelClass = "eyebrow text-[0.6rem]";

type GuestDetails = { name: string; email: string; phone: string; notes: string };

function BookingPage() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/booking" });
  const step = search.step ?? "select";
  const activeIndex = steps.findIndex((s) => s.key === step);

  const [guest, setGuest] = useState<GuestDetails>({ name: "", email: "", phone: "", notes: "" });
  const [error, setError] = useState<string | null>(null);

  const setSearch = (next: Partial<BookingSearch>) =>
    navigate({ search: (prev) => ({ ...prev, ...next }) });

  const nights = nightsBetween(search.checkIn, search.checkOut);
  const selectedRoom = search.room ? getRoom(search.room) : undefined;

  return (
    <>
      <section className="bg-forest-deep pb-16 pt-36 text-ivory lg:pt-40">
        <div className="mx-auto max-w-[86rem] px-5 lg:px-10">
          <p className="eyebrow text-ivory/70">Reservations</p>
          <h1 className="mt-5 max-w-2xl text-4xl leading-[1.08] sm:text-5xl">
            Book your stay at {siteConfig.name}
          </h1>
          <p className="mt-6 max-w-xl text-sm text-ivory/75">
            Availability and final rates are confirmed by our team. Send a request here, or call us
            directly for an immediate answer.
          </p>

          <ol className="mt-12 grid gap-3 sm:grid-cols-4">
            {steps.map((s, i) => (
              <li
                key={s.key}
                className={cn(
                  "border-t pt-3 text-[0.68rem] uppercase tracking-[0.2em]",
                  i <= activeIndex ? "border-gold text-ivory" : "border-ivory/25 text-ivory/45",
                )}
              >
                <span className="mr-2">{String(i + 1).padStart(2, "0")}</span>
                {s.label}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-[86rem] px-5 py-20 lg:px-10 lg:py-28">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div>
            {step === "select" ? (
              <SelectStep
                search={search}
                nights={nights}
                error={error}
                setError={setError}
                setSearch={setSearch}
              />
            ) : null}

            {step === "guest" ? (
              <GuestStep
                guest={guest}
                setGuest={setGuest}
                error={error}
                setError={setError}
                onBack={() => setSearch({ step: "select" })}
                onNext={() => setSearch({ step: "summary" })}
              />
            ) : null}

            {step === "summary" ? (
              <SummaryStep
                search={search}
                guest={guest}
                nights={nights}
                roomName={selectedRoom?.name}
                onBack={() => setSearch({ step: "guest" })}
                onConfirm={() => {
                  toast.success("Request sent. Our team will be in touch shortly.");
                  setSearch({ step: "confirmation" });
                }}
              />
            ) : null}

            {step === "confirmation" ? (
              <ConfirmationStep search={search} guest={guest} roomName={selectedRoom?.name} />
            ) : null}
          </div>

          <aside className="h-fit bg-sand/50 p-8 lg:sticky lg:top-32">
            <p className="eyebrow">Your request</p>
            <dl className="mt-6 space-y-4 text-sm">
              <SummaryRow label="Check-in" value={formatDate(search.checkIn)} />
              <SummaryRow label="Check-out" value={formatDate(search.checkOut)} />
              <SummaryRow label="Nights" value={nights ? String(nights) : "—"} />
              <SummaryRow
                label="Guests"
                value={`${search.adults} adult${search.adults > 1 ? "s" : ""}${
                  search.children ? `, ${search.children} children` : ""
                }`}
              />
              <SummaryRow label="Rooms" value={String(search.rooms)} />
              <SummaryRow label="Accommodation" value={selectedRoom?.name ?? "Not selected"} />
            </dl>
            <p className="mt-8 border-t border-border pt-6 text-xs leading-relaxed text-muted-foreground">
              This form sends an enquiry only — no payment is taken and no room is held until the
              resort confirms.
            </p>
            <div className="mt-6 grid gap-3">
              <Btn asChild variant="outline" size="sm">
                <a href={telHref()}>Call {siteConfig.contact.phoneDisplay}</a>
              </Btn>
              <Btn asChild variant="gold" size="sm">
                <a href={whatsappHref(waMessages.general)} target="_blank" rel="noreferrer">
                  WhatsApp us
                </a>
              </Btn>
            </div>
          </aside>
        </div>

        <div className="mt-20 grid gap-8 border-t border-border pt-12 md:grid-cols-3">
          {roomPolicies.map((p) => (
            <Reveal key={p.title}>
              <h2 className="text-xl">{p.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{label}</dt>
      <dd className="text-right text-foreground">{value}</dd>
    </div>
  );
}

function SelectStep({
  search,
  nights,
  error,
  setError,
  setSearch,
}: {
  search: BookingSearch;
  nights: number;
  error: string | null;
  setError: (v: string | null) => void;
  setSearch: (next: Partial<BookingSearch>) => void;
}) {
  const onContinue = () => {
    if (!search.checkIn || !search.checkOut) {
      setError("Please choose both a check-in and a check-out date.");
      return;
    }
    if (nights <= 0) {
      setError("Check-out must be after check-in.");
      return;
    }
    if (!search.room) {
      setError("Please select an accommodation type.");
      return;
    }
    setError(null);
    setSearch({ step: "guest" });
  };

  return (
    <div>
      <h2 className="text-3xl">Dates, guests & accommodation</h2>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <label className={labelClass} htmlFor="bk-checkin">
            Check-in
          </label>
          <input
            id="bk-checkin"
            type="date"
            className={fieldClass}
            value={search.checkIn}
            min={todayISO()}
            onChange={(e) => setSearch({ checkIn: e.target.value })}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="bk-checkout">
            Check-out
          </label>
          <input
            id="bk-checkout"
            type="date"
            className={fieldClass}
            value={search.checkOut}
            min={search.checkIn || todayISO()}
            onChange={(e) => setSearch({ checkOut: e.target.value })}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="bk-rooms">
            Rooms
          </label>
          <select
            id="bk-rooms"
            className={fieldClass}
            value={search.rooms}
            onChange={(e) => setSearch({ rooms: Number(e.target.value) })}
          >
            {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="bk-adults">
            Adults
          </label>
          <select
            id="bk-adults"
            className={fieldClass}
            value={search.adults}
            onChange={(e) => setSearch({ adults: Number(e.target.value) })}
          >
            {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="bk-children">
            Children
          </label>
          <select
            id="bk-children"
            className={fieldClass}
            value={search.children}
            onChange={(e) => setSearch({ children: Number(e.target.value) })}
          >
            {Array.from({ length: 11 }, (_, i) => i).map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
      </div>

      <h3 className="mt-16 text-2xl">Choose your accommodation</h3>
      <p className="mt-3 text-sm text-muted-foreground">
        Rates shown are the property's published tariffs. Where a rate reads “on request”, our team
        will quote it for your dates.
      </p>
      <ul className="mt-8 grid gap-5 sm:grid-cols-2">
        {rooms.map((room) => {
          const active = search.room === room.slug;
          const overnight = room.tariffs.find((t) => t.label === "Overnight Stay");
          return (
            <li key={room.slug}>
              <button
                type="button"
                onClick={() => setSearch({ room: room.slug })}
                aria-pressed={active}
                className={cn(
                  "group flex w-full gap-4 border p-4 text-left transition-colors",
                  active ? "border-gold bg-sand/40" : "border-border hover:border-gold/60",
                )}
              >
                <img
                  src={room.image}
                  alt={room.name}
                  width={160}
                  height={120}
                  loading="lazy"
                  className="h-24 w-28 shrink-0 object-cover"
                />
                <span className="min-w-0">
                  <span className="block text-lg leading-snug text-foreground">{room.name}</span>
                  <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
                    {room.short}
                  </span>
                  <span className="mt-2 block text-xs uppercase tracking-[0.18em] text-forest">
                    {overnight?.price
                      ? `${siteConfig.currencySymbol}${overnight.price.toLocaleString("en-IN")} / overnight`
                      : "Rate on request"}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {error ? (
        <p role="alert" className="mt-8 text-xs text-destructive">
          {error}
        </p>
      ) : null}

      <div className="mt-10 flex flex-wrap gap-4">
        <Btn type="button" variant="solid" onClick={onContinue}>
          Continue
        </Btn>
        <Btn asChild variant="outline">
          <Link to="/stay">Compare all accommodation</Link>
        </Btn>
      </div>
    </div>
  );
}

function GuestStep({
  guest,
  setGuest,
  error,
  setError,
  onBack,
  onNext,
}: {
  guest: GuestDetails;
  setGuest: (g: GuestDetails) => void;
  error: string | null;
  setError: (v: string | null) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!guest.name.trim() || !guest.phone.trim()) {
      setError("Please share your name and a phone number so we can confirm.");
      return;
    }
    setError(null);
    onNext();
  };

  return (
    <form onSubmit={submit} noValidate>
      <h2 className="text-3xl">Your details</h2>
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="bk-name">
            Full name
          </label>
          <input
            id="bk-name"
            className={fieldClass}
            value={guest.name}
            onChange={(e) => setGuest({ ...guest, name: e.target.value })}
            autoComplete="name"
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="bk-phone">
            Phone
          </label>
          <input
            id="bk-phone"
            type="tel"
            className={fieldClass}
            value={guest.phone}
            onChange={(e) => setGuest({ ...guest, phone: e.target.value })}
            autoComplete="tel"
          />
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="bk-email">
            Email (optional)
          </label>
          <input
            id="bk-email"
            type="email"
            className={fieldClass}
            value={guest.email}
            onChange={(e) => setGuest({ ...guest, email: e.target.value })}
            autoComplete="email"
          />
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="bk-notes">
            Anything we should know?
          </label>
          <textarea
            id="bk-notes"
            rows={4}
            className={cn(fieldClass, "h-auto resize-none py-3")}
            value={guest.notes}
            onChange={(e) => setGuest({ ...guest, notes: e.target.value })}
          />
        </div>
      </div>

      {error ? (
        <p role="alert" className="mt-8 text-xs text-destructive">
          {error}
        </p>
      ) : null}

      <div className="mt-10 flex flex-wrap gap-4">
        <Btn type="submit" variant="solid">
          Review request
        </Btn>
        <Btn type="button" variant="outline" onClick={onBack}>
          Back
        </Btn>
      </div>
    </form>
  );
}

function SummaryStep({
  search,
  guest,
  nights,
  roomName,
  onBack,
  onConfirm,
}: {
  search: BookingSearch;
  guest: GuestDetails;
  nights: number;
  roomName?: string | undefined;
  onBack: () => void;
  onConfirm: () => void;
}) {
  return (
    <div>
      <h2 className="text-3xl">Review your request</h2>
      <dl className="mt-8 divide-y divide-border border-y border-border text-sm">
        {[
          ["Accommodation", roomName ?? "Not selected"],
          ["Check-in", formatDate(search.checkIn)],
          ["Check-out", formatDate(search.checkOut)],
          ["Nights", nights ? String(nights) : "—"],
          ["Guests", `${search.adults} adults, ${search.children} children`],
          ["Rooms", String(search.rooms)],
          ["Name", guest.name || "—"],
          ["Phone", guest.phone || "—"],
          ["Email", guest.email || "—"],
          ["Notes", guest.notes || "—"],
        ].map(([label, value]) => (
          <div key={label} className="flex flex-wrap items-baseline justify-between gap-4 py-4">
            <dt className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{label}</dt>
            <dd className="text-right text-foreground">{value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
        Submitting sends a booking request to the resort. Rates, availability and cancellation terms
        are confirmed by our team before anything is finalised.
      </p>
      <div className="mt-10 flex flex-wrap gap-4">
        <Btn type="button" variant="gold" onClick={onConfirm}>
          Send booking request
        </Btn>
        <Btn type="button" variant="outline" onClick={onBack}>
          Back
        </Btn>
      </div>
    </div>
  );
}

function ConfirmationStep({
  search,
  guest,
  roomName,
}: {
  search: BookingSearch;
  guest: GuestDetails;
  roomName?: string | undefined;
}) {
  const message = `Hello ${siteConfig.name}, I have sent a booking request${
    roomName ? ` for the ${roomName}` : ""
  } from ${formatDate(search.checkIn)} to ${formatDate(search.checkOut)} for ${search.adults} adults${
    guest.name ? ` under the name ${guest.name}` : ""
  }.`;

  return (
    <div>
      <p className="eyebrow">Request received</p>
      <h2 className="mt-4 text-4xl leading-tight">Thank you — we'll be in touch shortly</h2>
      <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground">
        Our reservations team reviews every request personally and will confirm availability and the
        final tariff for your dates. For anything urgent, call us and we'll help straight away.
      </p>
      <div className="mt-10 flex flex-wrap gap-4">
        <Btn asChild variant="solid">
          <a href={telHref()}>Call {siteConfig.contact.phoneDisplay}</a>
        </Btn>
        <Btn asChild variant="gold">
          <a href={whatsappHref(message)} target="_blank" rel="noreferrer">
            Continue on WhatsApp
          </a>
        </Btn>
        <Btn asChild variant="outline">
          <Link to="/experiences">Plan your days here</Link>
        </Btn>
      </div>
    </div>
  );
}
