import { createServerFn } from "@tanstack/react-start";

/** Guest-facing submissions: booking requests and enquiries (anon insert policies). */

export type BookingRequestInput = {
  guestName: string;
  phone: string;
  email?: string;
  roomSlug?: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  roomsCount: number;
  notes?: string;
};

export type EnquiryInput = {
  name: string;
  phone: string;
  email?: string;
  enquiryType: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  message: string;
};

export const submitBookingRequest = createServerFn({ method: "POST" })
  .inputValidator((data: BookingRequestInput) => data)
  .handler(async ({ data }) => {
    const { publicDb } = await import("./public-db.server");
    const db = publicDb();

    let roomId: string | null = null;
    if (data.roomSlug) {
      const { data: room } = await db.from("rooms").select("id").eq("slug", data.roomSlug).maybeSingle();
      roomId = room?.id ?? null;
    }

    const { error } = await db.from("bookings").insert({
      guest_name: data.guestName,
      phone: data.phone,
      email: data.email ?? null,
      room_id: roomId,
      room_slug: data.roomSlug ?? null,
      check_in: data.checkIn,
      check_out: data.checkOut,
      adults: data.adults,
      children: data.children,
      rooms_count: data.roomsCount,
      notes: data.notes ?? "",
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const submitEnquiry = createServerFn({ method: "POST" })
  .inputValidator((data: EnquiryInput) => data)
  .handler(async ({ data }) => {
    const { publicDb } = await import("./public-db.server");
    const { error } = await publicDb().from("enquiries").insert({
      name: data.name,
      phone: data.phone,
      email: data.email ?? null,
      enquiry_type: data.enquiryType,
      check_in: data.checkIn ?? null,
      check_out: data.checkOut ?? null,
      guests: data.guests ?? null,
      message: data.message,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });
