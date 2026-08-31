import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const btnVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-sans text-[0.7rem] uppercase tracking-[0.22em] transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        solid: "bg-forest text-primary-foreground hover:bg-forest-deep",
        gold: "bg-gold text-accent-foreground hover:brightness-[1.06]",
        outline: "border border-foreground/25 text-foreground hover:border-gold hover:text-forest",
        light: "border border-ivory/60 text-ivory hover:bg-ivory hover:text-charcoal",
        ghost: "text-foreground hover:text-forest",
        link: "text-forest underline-offset-8 hover:underline p-0 h-auto",
      },
      size: {
        sm: "h-10 px-5",
        md: "h-12 px-7",
        lg: "h-14 px-9",
        icon: "h-11 w-11 px-0",
      },
    },
    defaultVariants: { variant: "solid", size: "md" },
  },
);

export function Btn({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ComponentProps<"button"> & VariantProps<typeof btnVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(btnVariants({ variant, size }), className)} {...props} />;
}
