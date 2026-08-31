import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "dark",
  className,
  as = "h2",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
  as?: "h1" | "h2";
}) {
  const Title = as;
  return (
    <Reveal className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? (
        <p className={cn("eyebrow", tone === "light" && "text-ivory/70")}>{eyebrow}</p>
      ) : null}
      <Title
        className={cn(
          "mt-4 text-4xl leading-[1.08] sm:text-5xl lg:text-[3.4rem]",
          tone === "light" ? "text-ivory" : "text-foreground",
        )}
      >
        {title}
      </Title>
      <span
        className={cn(
          "mt-6 block h-px w-14 bg-gold",
          align === "center" && "mx-auto",
        )}
        aria-hidden="true"
      />
      {intro ? (
        <p
          className={cn(
            "mt-6 text-base leading-relaxed",
            tone === "light" ? "text-ivory/80" : "text-muted-foreground",
          )}
        >
          {intro}
        </p>
      ) : null}
    </Reveal>
  );
}
