import { Slot } from "@radix-ui/react-slot";
import { cn, tv, type VariantProps } from "tailwind-variants";

const buttonVariants = tv({
  base: "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-base font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4.5 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-brand-base focus-visible:ring-brand-base/50 focus-visible:ring-[3px] aria-invalid:ring-danger/20 aria-invalid:border-danger cursor-pointer ",
  variants: {
    variant: {
      default:
        "bg-brand-base text-white hover:bg-brand-base/90 font-medium font-['Inter']",
      destructive:
        "bg-danger text-white hover:bg-danger/90 focus-visible:ring-danger/20",
      outline:
        "border border-gray-300 bg-transparent shadow-xs hover:bg-gray-50 text-gray-700",
      secondary: "bg-gray-100 text-gray-800 hover:bg-gray-100/80",
      ghost: "hover:bg-gray-100 hover:underline hover:bg-transparent text-sm",
      link: "text-brand-base underline-offset-4 hover:underline",
    },
    size: {
      default: "h-9 px-4 py-2 has-[>svg]:px-3",
      sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
      lg: "h-12 rounded-lg px-6 has-[>svg]:px-4",
      icon: "size-9",
      "icon-sm": "size-8",
      "icon-lg": "size-10",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

function Button({
  className,
  variant,
  size,
  asChild = false,
  type = "button",
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      type={type}
      {...props}
    />
  );
}

export { Button, buttonVariants };
