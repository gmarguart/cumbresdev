import Image from "next/image";
import { Cpu, GitBranch, KanbanSquare } from "lucide-react";
import { about } from "@/config/content";
import { siteConfig, showPending } from "@/config/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LogoMark } from "@/components/Logo";

const pillarIcons = [Cpu, GitBranch, KanbanSquare];

export function About() {
  const { founder } = siteConfig;
  const hasFounder = Boolean(founder.name && founder.bio);

  return (
    <section id="nosotros" aria-labelledby="nosotros-titulo" className="relative overflow-hidden bg-navy-950 py-20 text-navy-100 sm:py-28">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_20%_30%,black,transparent_70%)]" />
      <div className="container-page relative grid gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeading id="nosotros-titulo" eyebrow="Sobre CumbresDev" title={about.title} tone="dark" />
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-navy-200">
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-3">
            {about.pillars.map((pillar, i) => {
              const Icon = pillarIcons[i] ?? Cpu;
              return (
                <li key={pillar.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                  <Icon aria-hidden="true" className="h-5 w-5 text-brand-300" />
                  <h3 className="mt-3 text-base font-semibold text-white">{pillar.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-navy-300">{pillar.text}</p>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex flex-col justify-center">
          {hasFounder ? (
            <figure className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">
              <div className="flex items-center gap-4">
                {founder.photo ? (
                  <Image
                    src={founder.photo}
                    alt={`Fotografía de ${founder.name}`}
                    width={72}
                    height={72}
                    className="h-18 w-18 rounded-2xl object-cover"
                  />
                ) : (
                  <LogoMark className="h-12 w-auto" />
                )}
                <figcaption>
                  <p className="font-display text-lg font-semibold text-white">{founder.name}</p>
                  {founder.role && <p className="text-sm text-navy-300">{founder.role}</p>}
                </figcaption>
              </div>
              <p className="mt-6 leading-relaxed text-navy-200">{founder.bio}</p>
              {founder.experience.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-300">Experiencia</h3>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-navy-200">
                    {founder.experience.map((e) => (
                      <li key={e}>{e}</li>
                    ))}
                  </ul>
                </div>
              )}
              {founder.education.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-300">Formación</h3>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-navy-200">
                    {founder.education.map((e) => (
                      <li key={e}>{e}</li>
                    ))}
                  </ul>
                </div>
              )}
            </figure>
          ) : showPending ? (
            <div className="rounded-3xl border-2 border-dashed border-amber-400/60 bg-amber-400/5 p-8 text-amber-100">
              <p className="text-sm font-semibold uppercase tracking-wider text-amber-300">Espacio reservado · pendiente</p>
              <p className="mt-3 leading-relaxed">
                Aquí se mostrará la biografía, experiencia y formación <strong>verificadas</strong> del responsable de
                CumbresDev. Completa <code className="rounded bg-white/10 px-1">founder</code> en{" "}
                <code className="rounded bg-white/10 px-1">src/config/site.ts</code>.
              </p>
              <p className="mt-3 text-sm text-amber-200/80">Este aviso no aparece en producción.</p>
            </div>
          ) : (
            <div aria-hidden="true" className="relative mx-auto hidden aspect-square w-full max-w-md lg:block">
              <LogoMark className="absolute left-1/2 top-1/2 h-auto w-[68%] -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute inset-0 rounded-full border border-white/10" />
              <div className="absolute inset-[9%] rounded-full border border-white/5" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
