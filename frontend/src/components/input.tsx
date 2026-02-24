import { cn } from "tailwind-variants";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "py-3.5 px-3 leading-4! file:text-gray-800 placeholder:text-gray-400 selection:bg-brand-base selection:text-white rounded-lg font-['Inter'] border border-gray-300 w-full min-w-0 bg-transparent text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-base file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:border-brand-base focus-visible:ring-brand-base/50 focus-visible:ring-[3px] aria-invalid:ring-danger/20 aria-invalid:border-danger",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
