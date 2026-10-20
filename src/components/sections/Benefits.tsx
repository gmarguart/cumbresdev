import { Code2, ListChecks, MessagesSquare, Target, type LucideIcon } from "lucide-react";
import { benefits } from "@/config/content";
import { SectionHeading } from "@/components/ui/SectionHeading";

const icons: Record<string, LucideIcon> = {
  target: Target,
  list: ListChecks,
  message: MessagesSquare,
  code: Code2,
};

export function Benefits() {
  return (
    <section id="beneficios" aria-labelledby="beneficios-titulo" className="relative bg-navy-50 py-20 sm:py-28">
      <div aria-hidden="true" className="bg-grid-light pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="container-page relative grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading id="beneficios-titulo" eyebrow="Nuestra forma de trabajar" title={benefits.title} text={benefits.text} />
        </div>
        <ul className="grid gap-5 sm:grid-cols-2">
          {benefits.items.map((item, i) => {
            const Icon = icons[item.icon] ?? Target;
            return (
              <li
                key={item.title}
                className={`rounded-2xl border border-navy-100 bg-white p-6 transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-24px_rgb(14_29_60/0.35)] sm:p-7 ${
                  i % 2 === 1 ? "sm:translate-y-8 sm:hover:translate-y-7" : ""
                }`}
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700 ring-1 ring-brand-100">
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-navy-600">{item.text}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
