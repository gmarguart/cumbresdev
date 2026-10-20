import { Check, Code2, MonitorSmartphone } from "lucide-react";
import { services } from "@/config/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCta } from "@/components/ui/ProjectCta";

export function Services() {
  return (
    <section id="servicios" aria-labelledby="servicios-titulo" className="relative bg-white py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading id="servicios-titulo" eyebrow="Servicios" title={services.title} text={services.text} />

        <div className="mt-14 grid gap-6 lg:grid-cols-2 lg:gap-8">
          {services.items.map((service) => {
            const isWeb = service.type === "web";
            const Icon = isWeb ? MonitorSmartphone : Code2;
            return (
              <article
                key={service.id}
                id={service.id}
                aria-labelledby={`${service.id}-titulo`}
                className={`group relative flex flex-col overflow-hidden rounded-3xl border p-7 transition-shadow duration-300 sm:p-10 ${
                  isWeb
                    ? "border-navy-100 bg-gradient-to-b from-brand-50/70 to-white hover:shadow-[0_24px_60px_-30px_rgb(29_79_216/0.45)]"
                    : "border-navy-800 bg-navy-950 text-navy-100 hover:shadow-[0_24px_60px_-24px_rgb(8_19_43/0.7)]"
                }`}
              >
                {!isWeb && (
                  <div
                    aria-hidden="true"
                    className="bg-grid pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]"
                  />
                )}
                <div className="relative flex items-start justify-between gap-4">
                  <span
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
                      isWeb ? "bg-brand-600 text-white" : "bg-white/10 text-brand-300 ring-1 ring-white/15"
                    }`}
                  >
                    <Icon aria-hidden="true" className="h-7 w-7" />
                  </span>
                  <span
                    className={`text-sm font-semibold tracking-wide ${isWeb ? "text-brand-600" : "text-brand-300"}`}
                  >
                    {service.kicker}
                  </span>
                </div>

                <h3
                  id={`${service.id}-titulo`}
                  className={`relative mt-6 text-2xl font-bold sm:text-[1.7rem] ${isWeb ? "" : "text-white"}`}
                >
                  {service.title}
                </h3>
                <p className={`relative mt-3 text-lg leading-relaxed ${isWeb ? "text-navy-600" : "text-navy-200"}`}>
                  {service.description}
                </p>
                <p className={`relative mt-3 text-sm font-medium ${isWeb ? "text-navy-500" : "text-navy-300"}`}>
                  {service.audience}
                </p>

                <ul className="relative mt-7 grid gap-3 sm:grid-cols-2">
                  {service.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                          isWeb ? "bg-brand-100 text-brand-700" : "bg-brand-500/20 text-brand-300"
                        }`}
                      >
                        <Check aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={3} />
                      </span>
                      <span className={isWeb ? "text-navy-800" : "text-navy-100"}>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="relative mt-auto pt-9">
                  <ProjectCta projectType={service.type} size="lg" className="w-full sm:w-auto">
                    {service.cta}
                  </ProjectCta>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
