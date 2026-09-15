import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const adminField =
  "h-11 w-full border border-border bg-background px-3 text-sm outline-none transition-colors focus:border-gold";
export const adminArea =
  "w-full resize-y border border-border bg-background p-3 text-sm outline-none transition-colors focus:border-gold";
export const adminLabel = "eyebrow text-[0.58rem]";

export function Panel({
  title,
  action,
  children,
  className,
}: {
  title?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("bg-card p-6 shadow-soft sm:p-8", className)}>
      {title || action ? (
        <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
          {title ? <h2 className="text-2xl">{title}</h2> : <span />}
          {action}
        </header>
      ) : null}
      {children}
    </section>
  );
}

export function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className={adminLabel}>{label}</span>
      <span className="mt-2 block">{children}</span>
    </label>
  );
}

export function Empty({ children }: { children: ReactNode }) {
  return <p className="py-8 text-sm text-muted-foreground">{children}</p>;
}

export function StatusPill({ status }: { status: string }) {
  const tone =
    status === "new"
      ? "border-gold text-gold"
      : status === "closed"
        ? "border-border text-muted-foreground"
        : "border-forest-deep/40 text-forest-deep";
  return (
    <span className={cn("border px-2.5 py-1 text-[0.6rem] uppercase tracking-[0.18em]", tone)}>
      {status}
    </span>
  );
}

export function formatWhen(iso: string) {
  return new Date(iso).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
}

export function formatDay(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-IN", { dateStyle: "medium" });
}
