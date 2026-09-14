import { createServerFn } from "@tanstack/react-start";
import type { Room, Tariff } from "@/data/rooms";

/**
 * Public content reads. Rooms, offers, gallery images and availability are
 * managed by the resort team in the admin panel and stored in the database.
 */

export type OfferItem = {
  id: string;
  title: string;
  body: string;
  validity: string;
  terms: string;
  image: string;
  placeholder: boolean;
};

export type GalleryItem = { id: string; src: string; alt: string; category: string };

type RoomRow = {
  id: string;
  slug: string;
  name: string;
  short: string;
  description: string[];
  image_url: string;
  gallery: string[];
  capacity: string;
  beds: string;
  size: string;
  amenities: string[];
  price_day: number | null;
  price_night: number | null;
  price_overnight: number | null;
};

const windows = {
  day: "10:00 AM – 6:00 PM",
  night: "7:00 PM – 9:00 AM",
  overnight: "10:00 AM – 9:00 AM / 7:00 PM – 6:00 PM",
};

export function mapRoom(row: RoomRow): Room & { id: string } {
  const tariffs: Tariff[] = [
    { label: "Day Use", window: windows.day, price: row.price_day },
    { label: "Night Use", window: windows.night, price: row.price_night },
    { label: "Overnight Stay", window: windows.overnight, price: row.price_overnight },
  ];
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    short: row.short,
    description: row.description ?? [],
    image: row.image_url,
    gallery: row.gallery?.length ? row.gallery : [row.image_url],
    capacity: row.capacity,
    beds: row.beds,
    size: row.size,
    amenities: row.amenities ?? [],
    tariffs,
    unverified: tariffs.every((t) => t.price === null) ? ["tariffs"] : [],
  };
}

const roomColumns =
  "id, slug, name, short, description, image_url, gallery, capacity, beds, size, amenities, price_day, price_night, price_overnight";

export const listRooms = createServerFn({ method: "GET" }).handler(async () => {
  const { publicDb } = await import("./public-db.server");
  const { data, error } = await publicDb()
    .from("rooms")
    .select(roomColumns)
    .eq("is_published", true)
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return (data ?? []).map((r) => mapRoom(r as RoomRow));
});

export const getRoomBySlug = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    const { publicDb } = await import("./public-db.server");
    const { data: row, error } = await publicDb()
      .from("rooms")
      .select(roomColumns)
      .eq("slug", data.slug)
      .eq("is_published", true)
      .maybeSingle();
    if (error) throw error;
    return row ? mapRoom(row as RoomRow) : null;
  });

export const listOffers = createServerFn({ method: "GET" }).handler(async (): Promise<OfferItem[]> => {
  const { publicDb } = await import("./public-db.server");
  const { data, error } = await publicDb()
    .from("offers")
    .select("id, title, body, validity, terms, image_url, is_placeholder")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return (data ?? []).map((o) => ({
    id: o.id,
    title: o.title,
    body: o.body,
    validity: o.validity,
    terms: o.terms,
    image: o.image_url,
    placeholder: o.is_placeholder,
  }));
});

export const listGallery = createServerFn({ method: "GET" }).handler(async (): Promise<GalleryItem[]> => {
  const { publicDb } = await import("./public-db.server");
  const { data, error } = await publicDb()
    .from("gallery_images")
    .select("id, image_url, alt, category")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return (data ?? []).map((g) => ({ id: g.id, src: g.image_url, alt: g.alt, category: g.category }));
});

/** Dates a room is marked closed, within the given range. */
export const listBlockedDates = createServerFn({ method: "GET" })
  .inputValidator((data: { roomSlug: string; from: string; to: string }) => data)
  .handler(async ({ data }): Promise<string[]> => {
    const { publicDb } = await import("./public-db.server");
    const db = publicDb();
    const { data: room } = await db.from("rooms").select("id").eq("slug", data.roomSlug).maybeSingle();
    if (!room) return [];
    const { data: rows, error } = await db
      .from("room_availability")
      .select("date, is_available")
      .eq("room_id", room.id)
      .gte("date", data.from)
      .lte("date", data.to);
    if (error) throw error;
    return (rows ?? []).filter((r) => !r.is_available).map((r) => r.date);
  });
