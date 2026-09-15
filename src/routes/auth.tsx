import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Btn } from "@/components/site/btn";
import { supabase } from "@/integrations/supabase/client";
import { siteConfig } from "@/config/site";

const title = `Team Sign In — ${siteConfig.name}`;
const description = "Sign in to the Rehcruz D Retreat management panel to manage rooms, rates, availability, offers and guest requests.";

export const Route = createFileRoute("/auth")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "https://resort-escape-engine.lovable.app/auth" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "https://resort-escape-engine.lovable.app/auth" }],
  }),
  component: AuthPage,
});

const field =
  "h-12 w-full border-0 border-b border-border bg-transparent px-0 text-sm outline-none transition-colors focus:border-gold";

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const email = (data["email"] ?? "").trim();
    const password = data["password"] ?? "";
    if (!email || password.length < 6) {
      toast.error("Enter your email and a password of at least 6 characters.");
      return;
    }
    setBusy(true);
    if (mode === "signin") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setBusy(false);
      if (error) {
        toast.error(error.message);
        return;
      }
      navigate({ to: "/admin" });
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/admin` },
      });
      setBusy(false);
      if (error) {
        toast.error(error.message);
        return;
      }
      toast.success("Account created. You can sign in now.");
      setMode("signin");
    }
  };

  return (
    <section className="mx-auto flex min-h-[80vh] max-w-md flex-col justify-center px-5 py-32">
      <p className="eyebrow">{siteConfig.name}</p>
      <h1 className="mt-4 text-4xl">{mode === "signin" ? "Team sign in" : "Create team account"}</h1>
      <p className="mt-4 text-sm text-muted-foreground">
        This area is for resort staff. Guests can book or enquire from the public pages.
      </p>

      <form onSubmit={onSubmit} noValidate className="mt-10 grid gap-7">
        <div>
          <label className="eyebrow text-[0.6rem]" htmlFor="au-email">
            Email
          </label>
          <input id="au-email" name="email" type="email" autoComplete="email" className={field} />
        </div>
        <div>
          <label className="eyebrow text-[0.6rem]" htmlFor="au-password">
            Password
          </label>
          <input
            id="au-password"
            name="password"
            type="password"
            autoComplete={mode === "signin" ? "current-password" : "new-password"}
            className={field}
          />
        </div>
        <Btn type="submit" variant="solid" size="lg" disabled={busy}>
          {busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
        </Btn>
      </form>

      <button
        type="button"
        className="mt-8 text-left text-xs uppercase tracking-[0.2em] text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
      >
        {mode === "signin" ? "Create a team account" : "I already have an account"}
      </button>
    </section>
  );
}
