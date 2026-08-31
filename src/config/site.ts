/**
 * Central site configuration.
 * All contact details, WhatsApp number and social links live here —
 * never hard-code them in components.
 */

export const siteConfig = {
  name: "Rehcruz D Retreat",
  shortName: "Rehcruz",
  tagline: "Escape to Comfort. Reconnect with Nature.",
  description:
    "Rehcruz D Retreat is a resort in Gorai, Borivali West, Mumbai offering rooms, cottages, a private villa, dining, pool and venues for weddings, events and group stays.",
  url: "https://www.rehcruz.in",
  locale: "en_IN",
  currency: "INR",
  currencySymbol: "₹",

  contact: {
    phonePrimary: "+919137966337",
    phoneSecondary: "+919930689196",
    phoneDisplay: "+91 91379 66337",
    phoneSecondaryDisplay: "+91 99306 89196",
    email: "rehcruz.d@gmail.com",
    whatsapp: "919137966337",
    address: {
      street: "Gorai - Manori Road, Near Ambedkar Nagar Bus Stop, Culvem Village",
      locality: "Borivali (West)",
      region: "Maharashtra",
      city: "Mumbai",
      country: "IN",
    },
    addressLine:
      "Gorai - Manori Road, Near Ambedkar Nagar Bus Stop, Culvem Village, Borivali (West), Mumbai",
    mapsQuery: "Rehcruz D Retreat, Gorai Manori Road, Culvem Village, Borivali West, Mumbai",
  },

  social: {
    instagram: "https://www.instagram.com/",
    facebook: "https://www.facebook.com/",
  },

  policies: {
    checkInDay: "10:00 AM",
    checkOutDay: "6:00 PM",
    checkInNight: "7:00 PM",
    checkOutNight: "9:00 AM",
  },
} as const;

export const telHref = (number: string = siteConfig.contact.phonePrimary) => `tel:${number}`;

/** Builds a WhatsApp deep link with a pre-filled, context-aware message. */
export function whatsappHref(message?: string) {
  const text =
    message ??
    `Hello ${siteConfig.name}, I would like to enquire about staying at the property.`;
  return `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(text)}`;
}

export const waMessages = {
  general: `Hello ${siteConfig.name}, I would like to enquire about staying at the property.`,
  room: (room: string) => `Hello ${siteConfig.name}, I am interested in booking the ${room}.`,
  wedding: `Hello ${siteConfig.name}, I would like to enquire about hosting an event/wedding.`,
  dining: `Hello ${siteConfig.name}, I would like to enquire about dining at the property.`,
  offer: (offer: string) => `Hello ${siteConfig.name}, I would like to know more about the "${offer}" offer.`,
};

export const mapsDirectionsHref = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  siteConfig.contact.mapsQuery,
)}`;

export const mapsEmbedHref = `https://www.google.com/maps?q=${encodeURIComponent(
  siteConfig.contact.mapsQuery,
)}&output=embed`;

export const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Stay", to: "/stay" },
  { label: "Experiences", to: "/experiences" },
  { label: "Weddings & Events", to: "/weddings" },
  { label: "Gallery", to: "/gallery" },
  { label: "Offers", to: "/offers" },
  { label: "Contact", to: "/contact" },
] as const;
