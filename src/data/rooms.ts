import deluxe from "@/assets/room-deluxe.jpg";
import superDeluxe from "@/assets/room-super-deluxe.jpg";
import executive from "@/assets/room-executive.jpg";
import suite from "@/assets/room-suite.jpg";
import cottage from "@/assets/room-cottage.jpg";
import dormitory from "@/assets/room-dormitory.jpg";
import villa from "@/assets/villa.jpg";
import pool from "@/assets/pool.jpg";
import nature from "@/assets/nature.jpg";
import dining from "@/assets/dining.jpg";

/**
 * MOCK / CONTENT LAYER
 * ---------------------------------------------------------------
 * Room names and the published day-use / night-use / overnight tariffs are
 * taken from the current rehcruz.in website. Anything marked `unverified`
 * is placeholder copy for development and must be replaced with details
 * confirmed by the property before launch.
 *
 * Replace this module with a CMS / PMS API response when a booking engine
 * is connected — the shape below is what the UI consumes.
 */

export type Tariff = {
  label: string;
  window: string;
  price: number | null;
};

export type Room = {
  slug: string;
  name: string;
  short: string;
  description: string[];
  image: string;
  gallery: string[];
  capacity: string;
  beds: string;
  size: string;
  amenities: string[];
  tariffs: Tariff[];
  unverified: string[];
};

const standardTariffs: Tariff[] = [
  { label: "Day Use", window: "10:00 AM – 6:00 PM", price: 2240 },
  { label: "Night Use", window: "7:00 PM – 9:00 AM", price: 2800 },
  { label: "Overnight Stay", window: "10:00 AM – 9:00 AM / 7:00 PM – 6:00 PM", price: 3360 },
];

const onRequestTariffs: Tariff[] = [
  { label: "Day Use", window: "10:00 AM – 6:00 PM", price: null },
  { label: "Night Use", window: "7:00 PM – 9:00 AM", price: null },
  { label: "Overnight Stay", window: "10:00 AM – 9:00 AM / 7:00 PM – 6:00 PM", price: null },
];

const baseAmenities = [
  "Air conditioning",
  "Attached bathroom",
  "Daily housekeeping",
  "Wi-Fi",
  "Room service",
  "Swimming pool access",
];

export const rooms: Room[] = [
  {
    slug: "deluxe-room",
    name: "Deluxe Room",
    short: "Thoughtfully designed spaces for a comfortable and relaxing stay.",
    description: [
      "Our Deluxe Rooms are the easiest way to settle into the pace of the retreat — calm interiors, soft daylight and a view of the greenery that surrounds the property.",
      "Everything is kept simple and considered: a well-made bed, a quiet corner to sit with a coffee, and the pool and gardens a short walk away.",
    ],
    image: deluxe,
    gallery: [deluxe, nature, pool],
    capacity: "Guest capacity on request",
    beds: "Bed configuration on request",
    size: "Room size on request",
    amenities: baseAmenities,
    tariffs: onRequestTariffs,
    unverified: ["capacity", "beds", "size", "amenities", "tariffs"],
  },
  {
    slug: "super-deluxe-room",
    name: "Super Deluxe Room",
    short: "More space, warmer materials and a generous place to unwind.",
    description: [
      "A step up in space and comfort, the Super Deluxe Room pairs earthy tones with a roomier layout — ideal for couples and small families who like room to spread out.",
      "Wake up slowly, open the curtains to palms and quiet, and let the day take its own shape.",
    ],
    image: superDeluxe,
    gallery: [superDeluxe, pool, nature],
    capacity: "Guest capacity on request",
    beds: "Bed configuration on request",
    size: "Room size on request",
    amenities: baseAmenities,
    tariffs: standardTariffs,
    unverified: ["capacity", "beds", "size", "amenities"],
  },
  {
    slug: "executive-room",
    name: "Executive Room",
    short: "A refined room with a sitting area for longer, slower stays.",
    description: [
      "The Executive Room adds a comfortable sitting area to the formula — a good choice if you are staying a little longer, or travelling for work and want somewhere composed to return to.",
      "Deep tones, warm wood and soft lighting make evenings here feel unhurried.",
    ],
    image: executive,
    gallery: [executive, dining, nature],
    capacity: "Guest capacity on request",
    beds: "Bed configuration on request",
    size: "Room size on request",
    amenities: [...baseAmenities, "Seating area"],
    tariffs: standardTariffs,
    unverified: ["capacity", "beds", "size", "amenities"],
  },
  {
    slug: "suite-room",
    name: "Suite Room",
    short: "Our most spacious room category, with a separate lounge.",
    description: [
      "The Suite is the most generous of our rooms — a separate lounge, high ceilings and space for family to gather before dinner.",
      "It works equally well for a celebration weekend or a quiet escape where space itself is the luxury.",
    ],
    image: suite,
    gallery: [suite, pool, dining],
    capacity: "Guest capacity on request",
    beds: "Bed configuration on request",
    size: "Room size on request",
    amenities: [...baseAmenities, "Separate lounge"],
    tariffs: standardTariffs,
    unverified: ["capacity", "beds", "size", "amenities"],
  },
  {
    slug: "wooden-cottage",
    name: "Wooden Cottage",
    short: "A timber cottage tucked into the greenery, with its own porch.",
    description: [
      "Our Wooden Cottages sit closest to the trees. Timber walls, a private porch and the sound of leaves make this the most characterful way to stay at Rehcruz.",
      "Morning coffee on the steps is, quite simply, the point.",
    ],
    image: cottage,
    gallery: [cottage, nature, pool],
    capacity: "Guest capacity on request",
    beds: "Bed configuration on request",
    size: "Cottage size on request",
    amenities: [...baseAmenities, "Private porch"],
    tariffs: standardTariffs,
    unverified: ["capacity", "beds", "size", "amenities"],
  },
  {
    slug: "dormitory-room",
    name: "Dormitory Room",
    short: "Clean, comfortable shared accommodation for larger groups.",
    description: [
      "Built for groups — school trips, corporate offsites, friends travelling together — the Dormitory keeps everyone under one roof without compromising on cleanliness or comfort.",
      "Pair it with our day-picnic and dining packages for a complete group stay.",
    ],
    image: dormitory,
    gallery: [dormitory, pool, dining],
    capacity: "Group capacity on request",
    beds: "Multiple single beds",
    size: "Room size on request",
    amenities: ["Shared bathrooms", "Daily housekeeping", "Wi-Fi", "Swimming pool access", "Group dining packages"],
    tariffs: onRequestTariffs,
    unverified: ["capacity", "beds", "size", "amenities", "tariffs"],
  },
  {
    slug: "villa",
    name: "Private Villa",
    short: "An exclusive villa for families and private celebrations.",
    description: [
      "Take the whole villa. Private, self-contained and set apart from the main resort, it suits families, small celebrations and groups who would rather have the place to themselves.",
      "Speak with our team to plan dining, décor and arrival timings around your occasion.",
    ],
    image: villa,
    gallery: [villa, pool, dining],
    capacity: "Villa capacity on request",
    beds: "Bed configuration on request",
    size: "Villa size on request",
    amenities: ["Private outdoor area", "Air conditioning", "Housekeeping", "Wi-Fi", "In-villa dining on request"],
    tariffs: onRequestTariffs,
    unverified: ["capacity", "beds", "size", "amenities", "tariffs"],
  },
];

export const getRoom = (slug: string) => rooms.find((r) => r.slug === slug);

export const roomPolicies = [
  {
    title: "Check-in & check-out",
    body: "Day use runs 10:00 AM – 6:00 PM, night use 7:00 PM – 9:00 AM, and overnight stays 10:00 AM – 9:00 AM or 7:00 PM – 6:00 PM.",
  },
  {
    title: "Tariffs",
    body: "Published tariffs are inclusive of taxes. Rates for festive dates, group bookings and exclusive villa stays are quoted on request.",
  },
  {
    title: "Cancellation",
    body: "Cancellation and refund terms are confirmed at the time of booking. For any question about an existing booking, call the resort directly.",
  },
];
