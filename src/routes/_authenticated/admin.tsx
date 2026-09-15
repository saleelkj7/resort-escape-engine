import { createFileRoute, Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Btn } from "@/components/site/btn";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/admin")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: "Management Panel — Rehcruz D Retreat" },
      { name: "description", content: "Internal management panel for rooms, rates, availability, offers, gallery and guest requests." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminLayout,
});

const nav = [
  { to: "/admin", label: "Dashboard", exact: true },
  { to: "/admin/rooms", label: "Rooms & Rates" },
  { to: "/admin/availability", label: "Availability" },
  { to: "/admin/offers", label: "Offers" },
  { to: "/admin/gallery", label: "Gallery" },
  { to: "/admin/enquiries", label: "Enquiries" },
] as const;

function AdminLayout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const { data, isLoading } = useQuery({
    queryKey: ["admin-access"],
    queryFn: async () => {
      const { data: userData } = await supabase.auth.getUser();
      const uid = userData.user?.id;
      if (!uid) return { isAdmin: false, email: "" };
      const { data: isAdmin } = await supabase.rpc("has_role", { _user_id: uid, _role: "admin" });
      return { isAdmin: !!isAdmin, email: userData.user?.email ?? "" };
    },
  });

  const signOut = async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  };

  return (
    <div className="min-h-screen bg-sand/40 pb-24 pt-32">
      <div className="mx-auto max-w-[86rem] px-5 lg:px-10">
        <header className="flex flex-wrap items-end justify-between gap-6 border-b border-border pb-8">
          <div>
            <p className="eyebrow">Management panel</p>
            <h1 className="mt-3 text-3xl">Rehcruz D Retreat</h1>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            {data?.email ? <span className="text-xs text-muted-foreground">{data.email}</span> : null}
            <Btn variant="outline" size="sm" onClick={signOut}>
              Sign out
            </Btn>
          </div>
        </header>

        {isLoading ? (
          <p className="py-16 text-sm text-muted-foreground">Loading…</p>
        ) : !data?.isAdmin ? (
          <div className="mt-12 bg-card p-8 shadow-soft">
            <h2 className="text-2xl">No access yet</h2>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
              Your account is signed in but has not been given management access. Ask the resort
              owner to grant your email admin access, then reload this page.
            </p>
          </div>
        ) : (
          <>
            <nav className="mt-8 flex flex-wrap gap-x-7 gap-y-3">
              {nav.map((item) => {
                const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={cn(
                      "border-b-2 pb-2 text-[0.68rem] uppercase tracking-[0.2em] transition-colors",
                      active ? "border-gold text-foreground" : "border-transparent text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <main className="mt-12 grid gap-10">
              <Outlet />
            </main>
          </>
        )}
      </div>
    </div>
  );
}
