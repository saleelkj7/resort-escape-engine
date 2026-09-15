import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Btn } from "@/components/site/btn";
import { Empty, Panel, StatusPill, formatDay, formatWhen } from "@/components/admin/kit";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin/")({
  staticData: { sitemap: false },
  component: Dashboard,
});

type Booking = {
  id: string;
  guest_name: string;
  phone: string;
  email: string | null;
  room_slug: string | null;
  check_in: string;
  check_out: string;
  adults: number;
  children: number;
  rooms_count: number;
  notes: string;
  status: string;
  created_at: string;
};

function Dashboard() {
  const queryClient = useQueryClient();

  const bookings = useQuery({
    queryKey: ["admin-bookings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100);
      if (error) throw error;
      return (data ?? []) as Booking[];
    },
  });

  const enquiryCount = useQuery({
    queryKey: ["admin-enquiry-count"],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("enquiries")
        .select("id", { count: "exact", head: true })
        .eq("status", "new");
      if (error) throw error;
      return count ?? 0;
    },
  });

  const roomCount = useQuery({
    queryKey: ["admin-room-count"],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("rooms")
        .select("id", { count: "exact", head: true })
        .eq("is_published", true);
      if (error) throw error;
      return count ?? 0;
    },
  });

  const setStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase.from("bookings").update({ status }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Booking updated.");
      queryClient.invalidateQueries({ queryKey: ["admin-bookings"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("bookings").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Booking removed.");
      queryClient.invalidateQueries({ queryKey: ["admin-bookings"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const list = bookings.data ?? [];
  const newCount = list.filter((b) => b.status === "new").length;

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-3">
        <Stat label="New booking requests" value={newCount} />
        <Stat label="New enquiries" value={enquiryCount.data ?? 0} />
        <Stat label="Published rooms" value={roomCount.data ?? 0} />
      </div>

      <Panel title="Booking requests">
        {bookings.isLoading ? (
          <Empty>Loading booking requests…</Empty>
        ) : list.length === 0 ? (
          <Empty>No booking requests yet. New requests from the website appear here.</Empty>
        ) : (
          <ul className="divide-y divide-border">
            {list.map((b) => (
              <li key={b.id} className="grid gap-4 py-6 lg:grid-cols-[minmax(0,1fr)_auto]">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-xl">{b.guest_name}</h3>
                    <StatusPill status={b.status} />
                    <span className="text-xs text-muted-foreground">{formatWhen(b.created_at)}</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {formatDay(b.check_in)} → {formatDay(b.check_out)} · {b.rooms_count} room
                    {b.rooms_count > 1 ? "s" : ""} · {b.adults} adults
                    {b.children ? `, ${b.children} children` : ""}
                    {b.room_slug ? ` · ${b.room_slug.replace(/-/g, " ")}` : ""}
                  </p>
                  <p className="mt-2 text-sm">
                    <a className="hover:text-gold" href={`tel:${b.phone}`}>
                      {b.phone}
                    </a>
                    {b.email ? (
                      <>
                        {" · "}
                        <a className="hover:text-gold" href={`mailto:${b.email}`}>
                          {b.email}
                        </a>
                      </>
                    ) : null}
                  </p>
                  {b.notes ? (
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                      {b.notes}
                    </p>
                  ) : null}
                </div>
                <div className="flex flex-wrap items-start gap-3">
                  <Btn
                    variant="outline"
                    size="sm"
                    onClick={() => setStatus.mutate({ id: b.id, status: "confirmed" })}
                  >
                    Confirmed
                  </Btn>
                  <Btn
                    variant="outline"
                    size="sm"
                    onClick={() => setStatus.mutate({ id: b.id, status: "closed" })}
                  >
                    Close
                  </Btn>
                  <Btn variant="link" size="sm" onClick={() => remove.mutate(b.id)}>
                    Delete
                  </Btn>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-card p-7 shadow-soft">
      <p className="eyebrow text-[0.58rem]">{label}</p>
      <p className="mt-4 text-4xl">{value}</p>
    </div>
  );
}
