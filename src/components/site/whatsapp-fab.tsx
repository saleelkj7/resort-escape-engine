import { MessageCircle } from "lucide-react";
import { whatsappHref, waMessages } from "@/config/site";

/** Floating WhatsApp enquiry button, present on every page. */
export function WhatsAppFab() {
  return (
    <a
      href={whatsappHref(waMessages.general)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Rehcruz D Retreat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-forest text-primary-foreground shadow-elevated transition-transform duration-300 hover:scale-105 focus-visible:scale-105"
    >
      <MessageCircle className="h-6 w-6" aria-hidden="true" />
    </a>
  );
}
