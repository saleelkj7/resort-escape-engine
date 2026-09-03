import { defaultBookingSearch } from "@/lib/booking";
import { Link } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import hero from "@/assets/hero-resort.jpg";
import { whatsappHref, waMessages } from "@/config/site";
import { Btn } from "./btn";
import { Reveal } from "./reveal";

export function CtaBand({
  title = "Your Escape Is Waiting",
  body = "Come away from the ordinary and experience Rehcruz D Retreat.",
  waMessage = waMessages.general,
}: {
  title?: string;
  body?: string;
  waMessage?: string;
}) {
  return (
    <section className="relative overflow-hidden">
      <img
        src={hero}
        alt=""
        loading="lazy"
        width={1920}
        height={1088}
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden="true"
      />
      <div className="veil absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-[86rem] px-5 py-28 text-center lg:px-10 lg:py-36">
        <Reveal>
          <h2 className="mx-auto max-w-3xl text-4xl leading-[1.08] text-ivory sm:text-5xl lg:text-6xl">
            {title}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base text-ivory/80">{body}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Btn asChild variant="gold" size="lg">
              <Link to="/booking" search={defaultBookingSearch()}>Book Your Stay</Link>
            </Btn>
            <Btn asChild variant="light" size="lg">
              <a href={whatsappHref(waMessage)} target="_blank" rel="noopener noreferrer">
                <MessageCircle aria-hidden="true" /> Enquire on WhatsApp
              </a>
            </Btn>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
