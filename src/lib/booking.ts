/**
 * Booking search-param contract.
 *
 * INTEGRATION NOTE: this project ships a frontend-ready booking journey with
 * mock availability. To connect a real booking engine / PMS / channel manager,
 * replace `checkAvailability` with an API call — the rest of the UI consumes
 * only the types below.
 */

export type BookingSearch = {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  rooms: number;
  room?: string;
  step?: "select" | "guest" | "summary" | "confirmation";
};

const num = (v: unknown, fallback: number, min: number, max: number) => {
  const n = Number(v);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, Math.round(n)));
};

const str = (v: unknown) => (typeof v === "string" ? v : "");

export function validateBookingSearch(search: Record<string, unknown>): BookingSearch {
  const step = str(search["step"]);
  const room = str(search["room"]);
  return {
    checkIn: str(search["checkIn"]) || todayISO(),
    checkOut: str(search["checkOut"]) || tomorrowISO(),
    adults: num(search["adults"], 2, 1, 20),
    children: num(search["children"], 0, 0, 20),
    rooms: num(search["rooms"], 1, 1, 20),
    ...(room ? { room } : {}),
    step:
      step === "select" || step === "guest" || step === "summary" || step === "confirmation"
        ? step
        : "select",
  };
}

/** Default search params for links into the booking journey. */
export const defaultBookingSearch = (
  overrides: Partial<BookingSearch> = {},
): BookingSearch => ({
  checkIn: todayISO(),
  checkOut: tomorrowISO(),
  adults: 2,
  children: 0,
  rooms: 1,
  step: "select",
  ...overrides,
});

export const todayISO = () => new Date().toISOString().slice(0, 10);

export const tomorrowISO = () =>
  new Date(Date.now() + 86_400_000).toISOString().slice(0, 10);

export function nightsBetween(checkIn: string, checkOut: string) {
  if (!checkIn || !checkOut) return 0;
  const a = new Date(checkIn).getTime();
  const b = new Date(checkOut).getTime();
  if (Number.isNaN(a) || Number.isNaN(b) || b <= a) return 0;
  return Math.round((b - a) / 86_400_000);
}

export function formatDate(value: string) {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}
