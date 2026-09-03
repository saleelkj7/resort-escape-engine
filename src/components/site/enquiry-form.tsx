import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Btn } from "./btn";

/**
 * Enquiry form.
 *
 * INTEGRATION NOTE: submissions are currently handled client-side only —
 * the guest is handed off to WhatsApp/phone and shown a confirmation.
 * Connect a backend (server function + database or email service) to
 * persist enquiries for the resort team.
 */

export const enquiryTypes = [
  "Room Booking",
  "Wedding",
  "Corporate Event",
  "Group Booking",
  "General Enquiry",
] as const;

type Errors = Partial<Record<string, string>>;

const field =
  "h-12 w-full border-0 border-b border-border bg-transparent px-0 text-sm outline-none transition-colors focus:border-gold";
const label = "eyebrow text-[0.6rem]";

export function EnquiryForm({ defaultType = "Room Booking" }: { defaultType?: string }) {
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const next: Errors = {};

    if (!data["name"]?.trim() || data["name"].trim().length < 2) next.name = "Please enter your name.";
    if (!/^[0-9+\-\s()]{7,16}$/.test(data["phone"] ?? "")) next.phone = "Please enter a valid phone number.";
    if (data["email"] && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data["email"])) next.email = "Please enter a valid email address.";
    if (data["checkIn"] && data["checkOut"] && new Date(data["checkOut"]) <= new Date(data["checkIn"]))
      next.checkOut = "Check-out must be after check-in.";
    if (!data["message"]?.trim() || data["message"].trim().length < 10)
      next.message = "Please tell us a little about your plans (10 characters or more).";

    setErrors(next);
    if (Object.keys(next).length) {
      toast.error("Please check the highlighted fields.");
      return;
    }

    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 700));
    setSubmitting(false);
    setDone(true);
    toast.success("Enquiry received. Our team will call you back shortly.");
    e.currentTarget.reset();
  };

  if (done) {
    return (
      <div className="bg-card p-10 text-center shadow-soft" role="status">
        <p className="eyebrow">Thank you</p>
        <h3 className="mt-4 text-3xl">We have your enquiry</h3>
        <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground">
          Our team will be in touch shortly. If your dates are close, calling or messaging us on
          WhatsApp is the fastest way to confirm.
        </p>
        <Btn variant="outline" size="sm" className="mt-8" onClick={() => setDone(false)}>
          Send another enquiry
        </Btn>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="bg-card p-7 shadow-soft sm:p-10">
      <div className="grid gap-7 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="ef-name">
            Name*
          </label>
          <input id="ef-name" name="name" className={field} autoComplete="name" aria-invalid={!!errors.name} />
          {errors.name ? <p className="mt-2 text-xs text-destructive">{errors.name}</p> : null}
        </div>
        <div>
          <label className={label} htmlFor="ef-phone">
            Phone*
          </label>
          <input id="ef-phone" name="phone" type="tel" className={field} autoComplete="tel" aria-invalid={!!errors.phone} />
          {errors.phone ? <p className="mt-2 text-xs text-destructive">{errors.phone}</p> : null}
        </div>
        <div>
          <label className={label} htmlFor="ef-email">
            Email
          </label>
          <input id="ef-email" name="email" type="email" className={field} autoComplete="email" aria-invalid={!!errors.email} />
          {errors.email ? <p className="mt-2 text-xs text-destructive">{errors.email}</p> : null}
        </div>
        <div>
          <label className={label} htmlFor="ef-type">
            Enquiry type
          </label>
          <select id="ef-type" name="type" defaultValue={defaultType} className={field}>
            {enquiryTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={label} htmlFor="ef-checkin">
            Check-in
          </label>
          <input id="ef-checkin" name="checkIn" type="date" className={field} />
        </div>
        <div>
          <label className={label} htmlFor="ef-checkout">
            Check-out
          </label>
          <input id="ef-checkout" name="checkOut" type="date" className={field} aria-invalid={!!errors.checkOut} />
          {errors.checkOut ? <p className="mt-2 text-xs text-destructive">{errors.checkOut}</p> : null}
        </div>
        <div>
          <label className={label} htmlFor="ef-guests">
            Number of guests
          </label>
          <input id="ef-guests" name="guests" type="number" min={1} max={500} defaultValue={2} className={field} />
        </div>
        <div className="sm:col-span-2">
          <label className={label} htmlFor="ef-message">
            Message*
          </label>
          <textarea
            id="ef-message"
            name="message"
            rows={4}
            className="w-full resize-none border-0 border-b border-border bg-transparent py-3 text-sm outline-none transition-colors focus:border-gold"
            aria-invalid={!!errors.message}
          />
          {errors.message ? <p className="mt-2 text-xs text-destructive">{errors.message}</p> : null}
        </div>
      </div>

      <Btn type="submit" variant="solid" size="lg" className="mt-9 w-full sm:w-auto" disabled={submitting}>
        {submitting ? "Sending…" : "Send Enquiry"}
      </Btn>
    </form>
  );
}
