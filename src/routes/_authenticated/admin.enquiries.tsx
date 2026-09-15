import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Btn } from "@/components/site/btn";
import { Empty, Panel, StatusPill, formatDay, formatWhen } from "@/components/admin/kit";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin/enquiries")({
  staticData: { sitemap: false },
  component: EnquiriesPage,
});

type Enquiry = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  enquiry_type: string;
  check_in: string | null;
  check_out: string | null;
  guests: number | null;
  message: string;
  status: string;
  created_at: string;
};

function EnquiriesPage() {
  const queryClient = useQueryClient();

  const enquiries = useQuery({
    queryKey: ["admin-enquiries"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("enquiries")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(200);
      if (error) throw error;
      return (data ?? []) as Enquiry[];
    },
  });

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["admin-enquiries"] });

  const setStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase.from("enquiries").update({ status }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Enquiry updated.");
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("enquiries").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Enquiry removed.");
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const list = enquiries.data ?? [];

  return (
    <Panel title="Guest enquiries">
      {enquiries.isLoading ? (
        <Empty>Loading enquiries…</Empty>
      ) : list.length === 0 ? (
        <Empty>No enquiries yet. Messages sent from the website appear here.</Empty>
      ) : (
        <ul className="divide-y divide-border">
          {list.map((q) => (
            <li key={q.id} className="grid gap-4 py-6 lg:grid-cols-[minmax(0,1fr)_auto]">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-xl">{q.name}</h3>
                  <StatusPill status={q.status} />
                  <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    {q.enquiry_type}
                  </span>
                  <span className="text-xs text-muted-foreground">{formatWhen(q.created_at)}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {q.check_in || q.check_out
                    ? `${formatDay(q.check_in)} → ${formatDay(q.check_out)}`
                    : "No dates given"}
                  {q.guests ? ` · ${q.guests} guests` : ""}
                </p>
                <p className="mt-2 text-sm">
                  <a className="hover:text-gold" href={`tel:${q.phone}`}>
                    {q.phone}
                  </a>
                  {q.email ? (
                    <>
                      {" · "}
                      <a className="hover:text-gold" href={`mailto:${q.email}`}>
                        {q.email}
                      </a>
                    </>
                  ) : null}
                </p>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed">{q.message}</p>
              </div>
              <div className="flex flex-wrap items-start gap-3">
                <Btn
                  variant="outline"
                  size="sm"
                  onClick={() => setStatus.mutate({ id: q.id, status: "replied" })}
                >
                  Replied
                </Btn>
                <Btn
                  variant="outline"
                  size="sm"
                  onClick={() => setStatus.mutate({ id: q.id, status: "closed" })}
                >
                  Close
                </Btn>
                <Btn variant="link" size="sm" onClick={() => remove.mutate(q.id)}>
                  Delete
                </Btn>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Panel>
  );
}
