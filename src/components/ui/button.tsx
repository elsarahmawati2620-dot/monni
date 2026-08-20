import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 min-h-12 px-5 py-2.5 border-pixel border-ink font-display font-bold text-base no-underline transition-[transform,box-shadow] duration-150 ease-out focus-visible:outline-none focus-visible:-translate-x-0.5 focus-visible:-translate-y-0.5 focus-visible:shadow-pixel disabled:opacity-50 disabled:pointer-events-none hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-pixel active:not-disabled:scale-[0.96]",
  {
    variants: {
      variant: {
        ink: "bg-ink text-bg",
        ghost: "bg-bg text-ink",
        paper: "bg-paper text-ink",
      },
    },
    defaultVariants: {
      variant: "ink",
    },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export function Button({
  className,
  variant,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp className={cn(buttonVariants({ variant }), className)} {...props} />
  );
}
