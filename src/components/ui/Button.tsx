import { ButtonHTMLAttributes, forwardRef } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const variants = {
      primary: "bg-brand-charcoal text-brand-pearl hover:bg-brand-stone",
      secondary: "bg-brand-gold text-brand-charcoal hover:bg-brand-accent",
      outline: "border border-brand-charcoal text-brand-charcoal hover:bg-brand-charcoal hover:text-brand-pearl",
      ghost: "text-brand-charcoal hover:bg-brand-champagne/30",
    };

    const sizes = {
      sm: "px-5 py-2 text-xs tracking-widest uppercase font-semibold",
      md: "px-8 py-4 text-sm tracking-[0.2em] uppercase font-bold",
      lg: "px-10 py-5 text-base tracking-[0.3em] uppercase font-bold",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, cn };
