import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  text,
  align = "left",
  tone = "light",
  id,
}: {
  eyebrow: string;
  title: string;
  text?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  id?: string;
}) {
  const centered = align === "center";
  return (
    <div className={`max-w-3xl ${centered ? "mx-auto text-center" : ""}`}>
      <p
        className={`mb-3 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] ${
          tone === "light" ? "text-brand-600" : "text-brand-300"
        }`}
      >
        <span aria-hidden="true" className="h-px w-6 bg-current" />
        {eyebrow}
      </p>
      <h2
        id={id}
        className={`text-3xl font-bold leading-tight sm:text-4xl ${tone === "dark" ? "text-white" : ""}`}
      >
        {title}
      </h2>
      {text && (
        <p className={`mt-4 text-lg leading-relaxed ${tone === "light" ? "text-navy-600" : "text-navy-200"}`}>
          {text}
        </p>
      )}
    </div>
  );
}
