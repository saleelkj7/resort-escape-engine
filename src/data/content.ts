import nature from "@/assets/nature.jpg";
import pool from "@/assets/pool.jpg";
import dining from "@/assets/dining.jpg";
import weddings from "@/assets/weddings.jpg";
import villa from "@/assets/villa.jpg";
import cottage from "@/assets/room-cottage.jpg";
import suite from "@/assets/room-suite.jpg";
import deluxe from "@/assets/room-deluxe.jpg";
import executive from "@/assets/room-executive.jpg";
import superDeluxe from "@/assets/room-super-deluxe.jpg";
import dormitory from "@/assets/room-dormitory.jpg";

/**
 * Editorial content. Experiences, amenities and offers below reflect the
 * facilities listed on the current rehcruz.in website. Items marked
 * `placeholder` are development copy pending confirmation by the property.
 */

export const experiences = [
  {
    title: "The Pool",
    kicker: "Leisure",
    body: "Long, unhurried afternoons by the water — the centre of the resort and the easiest place to lose track of time.",
    image: pool,
  },
  {
    title: "Green Surroundings",
    kicker: "Nature",
    body: "Palms, garden paths and open lawns. Walk them early, when the light is still soft and the property is quiet.",
    image: nature,
  },
  {
    title: "One Day Picnic",
    kicker: "Day Escape",
    body: "A full day at the retreat with pool access and a food package — designed for families and groups from the city.",
    image: cottage,
  },
  {
    title: "Dining Together",
    kicker: "Food",
    body: "Meals served in the open air, with food packages arranged around your group and the occasion.",
    image: dining,
  },
  {
    title: "Celebrations",
    kicker: "Events",
    body: "Lawns and indoor spaces that adapt to weddings, birthdays, corporate days and family gatherings.",
    image: weddings,
  },
  {
    title: "Gorai & Manori",
    kicker: "Nearby",
    body: "The retreat sits on the Gorai–Manori road in Borivali West, close to the beaches and ferry points of the Gorai belt.",
    image: villa,
  },
];

export const amenities = [
  { name: "Swimming Pool", note: "Open to all in-house guests" },
  { name: "Restaurant & Dining", note: "Food packages available" },
  { name: "Wi-Fi", note: "Across guest areas" },
  { name: "Parking", note: "On-property" },
  { name: "Room Service", note: "During service hours" },
  { name: "Daily Housekeeping", note: "Rooms cleaned and sanitised" },
  { name: "Event & Wedding Facilities", note: "Indoor and outdoor spaces" },
  { name: "Family Facilities", note: "Family and group accommodation" },
  { name: "Outdoor Lawns", note: "For gatherings and picnics" },
  { name: "Group & Dormitory Stays", note: "For larger parties" },
];

export const highlights = [
  { value: "7", label: "Stay categories" },
  { value: "Gorai", label: "Borivali West, Mumbai" },
  { value: "Day & Night", label: "Flexible stay windows" },
  { value: "Weddings", label: "Events & group stays" },
];

export const diningHighlights = [
  {
    title: "Food Packages",
    body: "Room, dormitory and one-day-picnic packages can each be paired with a meal plan arranged for your group.",
  },
  {
    title: "Open-Air Dining",
    body: "Meals served under the trees and string lights, with the garden as the dining room.",
  },
  {
    title: "Breakfast",
    body: "A warm start to the morning before the pool and the gardens fill up.",
  },
  {
    title: "Celebration Menus",
    body: "Menus for weddings, birthdays and corporate days are planned with our team in advance.",
  },
];

export const eventTypes = [
  { title: "Weddings", body: "Ceremonies and receptions on the lawns, with accommodation for the wedding party on site." },
  { title: "Pre-Wedding Events", body: "Mehendi, haldi and sangeet across indoor and outdoor spaces." },
  { title: "Corporate Events", body: "Offsites, team days and conferences with dining and stay packages." },
  { title: "Private Celebrations", body: "Birthdays, anniversaries and milestone dinners." },
  { title: "Family Gatherings", body: "Reunions and get-togethers with rooms, cottages and the villa." },
  { title: "Group Stays", body: "Dormitory and multi-room bookings for larger parties." },
];

/** PLACEHOLDER — replace with the property's live offers before launch. */
export const offers = [
  {
    title: "Weekend Escape",
    body: "A two-night weekend stay with breakfast, planned around the pool and the gardens.",
    validity: "Validity to be confirmed by the property",
    terms: "Subject to availability. Tariff quoted at the time of enquiry.",
    image: pool,
    placeholder: true,
  },
  {
    title: "Family Getaway",
    body: "Room or cottage accommodation with a family food package and full-day pool access.",
    validity: "Validity to be confirmed by the property",
    terms: "Subject to availability. Tariff quoted at the time of enquiry.",
    image: deluxe,
    placeholder: true,
  },
  {
    title: "Romantic Retreat",
    body: "A cottage or suite stay for two with a private dinner arranged in the garden.",
    validity: "Validity to be confirmed by the property",
    terms: "Subject to availability. Tariff quoted at the time of enquiry.",
    image: suite,
    placeholder: true,
  },
  {
    title: "Group & Long Stay",
    body: "Dormitory or multi-room bookings with dining, for groups staying two nights or more.",
    validity: "Validity to be confirmed by the property",
    terms: "Subject to availability. Tariff quoted at the time of enquiry.",
    image: dormitory,
    placeholder: true,
  },
];

/**
 * PLACEHOLDER REVIEWS — development content only.
 * No guest reviews have been verified for this build. Replace with real
 * reviews (or a Google Reviews feed) before the site goes live.
 */
export const testimonials = [
  {
    name: "Guest review placeholder",
    rating: 5,
    stay: "Stay date to be confirmed",
    body: "Replace this card with a verified guest review from Google or the resort's own feedback records.",
  },
  {
    name: "Guest review placeholder",
    rating: 5,
    stay: "Stay date to be confirmed",
    body: "Replace this card with a verified guest review from Google or the resort's own feedback records.",
  },
  {
    name: "Guest review placeholder",
    rating: 5,
    stay: "Stay date to be confirmed",
    body: "Replace this card with a verified guest review from Google or the resort's own feedback records.",
  },
];

export const galleryImages = [
  { src: pool, alt: "Swimming pool surrounded by palms at Rehcruz D Retreat", category: "Pool" },
  { src: nature, alt: "Garden path lined with palm trees in morning light", category: "Nature" },
  { src: dining, alt: "Open-air dining tables set under string lights", category: "Dining" },
  { src: weddings, alt: "Wedding mandap set up on the resort lawn at dusk", category: "Weddings" },
  { src: villa, alt: "Private villa exterior with terrace and plunge pool", category: "Property" },
  { src: cottage, alt: "Wooden cottage with a porch surrounded by greenery", category: "Rooms" },
  { src: suite, alt: "Suite lounge with high timber ceiling and ivory sofa", category: "Rooms" },
  { src: deluxe, alt: "Deluxe room with white linen bed and garden view", category: "Rooms" },
  { src: executive, alt: "Executive room with seating area and warm lighting", category: "Rooms" },
  { src: superDeluxe, alt: "Super deluxe room with balcony and palm view", category: "Rooms" },
  { src: dormitory, alt: "Dormitory room with neatly made single beds", category: "Rooms" },
];

export const galleryCategories = ["All", "Property", "Rooms", "Dining", "Pool", "Nature", "Weddings"];
