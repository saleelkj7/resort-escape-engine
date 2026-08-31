import { Link } from "@tanstack/react-router";
import { Menu, Phone, X, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { navLinks, siteConfig, telHref, whatsappHref, waMessages } from "@/config/site";
import { Btn } from "./btn";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-500",
        scrolled
          ? "border-b border-border/70 bg-background/92 py-3 backdrop-blur-md"
          : "border-b border-transparent py-5",
      )}
    >
      <div className="mx-auto grid max-w-[86rem] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 lg:px-10">
        <Link to="/" className="min-w-0" aria-label={`${siteConfig.name} home`}>
          <span
            className={cn(
              "block truncate font-serif text-xl leading-none tracking-[0.14em] transition-colors duration-500 sm:text-2xl",
              scrolled ? "text-foreground" : "text-ivory",
            )}
          >
            REHCRUZ
          </span>
          <span
            className={cn(
              "mt-1 block text-[0.55rem] uppercase tracking-[0.42em] transition-colors duration-500",
              scrolled ? "text-muted-foreground" : "text-ivory/70",
            )}
          >
            D Retreat
          </span>
        </Link>

        <nav className="hidden items-center gap-7 xl:flex" aria-label="Primary">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className={cn(
                "text-[0.68rem] uppercase tracking-[0.2em] transition-colors duration-300",
                scrolled ? "text-foreground/75 hover:text-forest" : "text-ivory/80 hover:text-ivory",
              )}
              activeProps={{ className: scrolled ? "text-forest" : "text-gold" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={telHref()}
            aria-label={`Call ${siteConfig.name}`}
            className={cn(
              "hidden h-11 w-11 items-center justify-center rounded-full border transition-colors sm:flex",
              scrolled
                ? "border-border text-foreground hover:border-gold"
                : "border-ivory/40 text-ivory hover:border-ivory",
            )}
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
          </a>
          <Btn asChild variant={scrolled ? "solid" : "light"} size="sm" className="hidden sm:inline-flex">
            <Link to="/booking">Book Now</Link>
          </Btn>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className={cn(
              "flex h-11 w-11 items-center justify-center xl:hidden",
              scrolled ? "text-foreground" : "text-ivory",
            )}
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-forest-deep transition-opacity duration-300 xl:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        hidden={!open}
      >
        <div className="flex h-full flex-col px-6 py-6">
          <div className="flex items-center justify-between">
            <span className="font-serif text-xl tracking-[0.14em] text-ivory">REHCRUZ</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="flex h-11 w-11 items-center justify-center text-ivory"
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <nav className="mt-10 flex flex-col gap-5 overflow-y-auto" aria-label="Mobile">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="font-serif text-3xl text-ivory/90 hover:text-gold"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto grid gap-3 pt-8">
            <Btn asChild variant="gold" size="md">
              <Link to="/booking" onClick={() => setOpen(false)}>
                Book Now
              </Link>
            </Btn>
            <div className="grid grid-cols-2 gap-3">
              <Btn asChild variant="light" size="md">
                <a href={whatsappHref(waMessages.general)} target="_blank" rel="noopener noreferrer">
                  <MessageCircle aria-hidden="true" /> WhatsApp
                </a>
              </Btn>
              <Btn asChild variant="light" size="md">
                <a href={telHref()}>
                  <Phone aria-hidden="true" /> Call
                </a>
              </Btn>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
