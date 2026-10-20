import type { AnchorHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "outline-dark" | "ghost";
export type ButtonSize = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-[background-color,border-color,color,box-shadow,transform] duration-200 active:translate-y-px disabled:pointer-events-none disabled:opacity-60 select-none text-center";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-600 text-white shadow-[0_8px_24px_-10px_rgb(37_99_235/0.8)] hover:bg-brand-700 hover:shadow-[0_10px_28px_-10px_rgb(37_99_235/0.9)]",
  secondary: "border border-navy-200 bg-white text-navy-900 hover:border-brand-400 hover:text-brand-700",
  "outline-dark": "border border-white/25 bg-white/5 text-white hover:border-white/60 hover:bg-white/10",
  ghost: "text-brand-700 hover:bg-brand-50",
};

const sizes: Record<ButtonSize, string> = {
  md: "min-h-11 px-5 text-[0.95rem]",
  lg: "min-h-12 px-6 text-base",
};

export function buttonClasses(variant: ButtonVariant = "primary", size: ButtonSize = "md", extra = "") {
  return `${base} ${variants[variant]} ${sizes[size]} ${extra}`.trim();
}

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
};

export function ButtonLink({ variant = "primary", size = "md", className = "", children, ...props }: ButtonLinkProps) {
  return (
    <a className={buttonClasses(variant, size, className)} {...props}>
      {children}
    </a>
  );
}
