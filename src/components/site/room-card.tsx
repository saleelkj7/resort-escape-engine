import { defaultBookingSearch } from "@/lib/booking";
import { Link } from "@tanstack/react-router";
import { BedDouble, Users } from "lucide-react";
import type { Room } from "@/data/rooms";
import { siteConfig } from "@/config/site";
import { Btn } from "./btn";
import { Reveal } from "./reveal";

export function RoomCard({ room, delay = 0 }: { room: Room; delay?: number }) {
  const from = room.tariffs.find((t) => t.price !== null)?.price ?? null;

  return (
    <Reveal delay={delay} as="article" className="group flex flex-col bg-card shadow-soft">
      <Link
        to="/stay/$slug"
        params={{ slug: room.slug }}
        className="relative block aspect-[4/3] overflow-hidden"
        tabIndex={-1}
        aria-hidden="true"
      >
        <img
          src={room.image}
          alt=""
          loading="lazy"
          width={1400}
          height={933}
          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
        />
      </Link>
      <div className="flex flex-1 flex-col p-7">
        <h3 className="text-2xl">
          <Link to="/stay/$slug" params={{ slug: room.slug }} className="transition-colors hover:text-forest">
            {room.name}
          </Link>
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{room.short}</p>

        <dl className="mt-6 grid grid-cols-2 gap-3 border-t border-border pt-5 text-xs text-muted-foreground">
          <div className="flex min-w-0 items-center gap-2">
            <Users className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
            <span className="truncate">{room.capacity}</span>
          </div>
          <div className="flex min-w-0 items-center gap-2">
            <BedDouble className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
            <span className="truncate">{room.beds}</span>
          </div>
        </dl>

        <div className="mt-6 flex items-end justify-between gap-4">
          <p className="text-sm text-foreground">
            {from ? (
              <>
                <span className="eyebrow block text-[0.58rem]">From</span>
                <span className="font-serif text-2xl">
                  {siteConfig.currencySymbol}
                  {from.toLocaleString("en-IN")}
                </span>{" "}
                <span className="text-xs text-muted-foreground">incl. taxes</span>
              </>
            ) : (
              <span className="text-xs text-muted-foreground">Tariff on request</span>
            )}
          </p>
        </div>

        <div className="mt-7 flex flex-wrap gap-3">
          <Btn asChild variant="outline" size="sm">
            <Link to="/stay/$slug" params={{ slug: room.slug }}>
              View Room
            </Link>
          </Btn>
          <Btn asChild variant="solid" size="sm">
            <Link to="/booking" search={defaultBookingSearch({ room: room.slug })}>
              Book Now
            </Link>
          </Btn>
        </div>
      </div>
    </Reveal>
  );
}
