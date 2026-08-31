import { useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { cn } from "@/lib/utils";
import { todayISO, tomorrowISO } from "@/lib/booking";
import { Btn } from "./btn";

const fieldClass =
  "h-11 w-full border-0 border-b border-border bg-transparent px-0 text-sm text-foreground outline-none transition-colors focus:border-gold";

const labelClass = "eyebrow text-[0.6rem]";

export function BookingBar({ className, floating = false }: { className?: string; floating?: boolean }) {
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState(todayISO());
  const [checkOut, setCheckOut] = useState(tomorrowISO());
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!checkIn || !checkOut) {
      setError("Please choose both a check-in and a check-out date.");
      return;
    }
    if (new Date(checkOut) <= new Date(checkIn)) {
      setError("Check-out must be after check-in.");
      return;
    }
    setError(null);
    navigate({
      to: "/booking",
      search: { checkIn, checkOut, adults, children, rooms, step: "select" as const },
    });
  };

  return (
    <form
      onSubmit={onSubmit}
      aria-label="Check availability"
      className={cn(
        "w-full bg-card p-6 shadow-elevated sm:p-8",
        floating && "relative z-20",
        className,
      )}
    >
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-[repeat(5,minmax(0,1fr))_auto] xl:items-end">
        <div>
          <label className={labelClass} htmlFor="bb-checkin">
            Check-in
          </label>
          <input
            id="bb-checkin"
            type="date"
            className={fieldClass}
            value={checkIn}
            min={todayISO()}
            onChange={(e) => setCheckIn(e.target.value)}
            required
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="bb-checkout">
            Check-out
          </label>
          <input
            id="bb-checkout"
            type="date"
            className={fieldClass}
            value={checkOut}
            min={checkIn || todayISO()}
            onChange={(e) => setCheckOut(e.target.value)}
            required
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="bb-adults">
            Adults
          </label>
          <select
            id="bb-adults"
            className={fieldClass}
            value={adults}
            onChange={(e) => setAdults(Number(e.target.value))}
          >
            {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="bb-children">
            Children
          </label>
          <select
            id="bb-children"
            className={fieldClass}
            value={children}
            onChange={(e) => setChildren(Number(e.target.value))}
          >
            {Array.from({ length: 9 }, (_, i) => i).map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="bb-rooms">
            Rooms
          </label>
          <select
            id="bb-rooms"
            className={fieldClass}
            value={rooms}
            onChange={(e) => setRooms(Number(e.target.value))}
          >
            {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
        <Btn type="submit" variant="solid" size="md" className="w-full xl:w-auto">
          Check Availability
        </Btn>
      </div>
      {error ? (
        <p role="alert" className="mt-4 text-xs text-destructive">
          {error}
        </p>
      ) : null}
    </form>
  );
}
