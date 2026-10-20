import Image from "next/image";
import { ExternalLink, Info } from "lucide-react";
import { projects } from "@/config/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectVisual } from "@/components/visuals/ProjectVisuals";
import { Pending } from "@/components/ui/Pending";

export function Projects() {
  const hasDemos = projects.some((p) => p.isDemo);

  return (
    <section id="proyectos" aria-labelledby="proyectos-titulo" className="bg-navy-50 py-20 sm:py-28">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            id="proyectos-titulo"
            eyebrow="Proyectos"
            title="Soluciones que convierten ideas en productos digitales."
            text="Algunos ejemplos del tipo de soluciones que desarrollamos, tanto páginas web como software a medida."
          />
          {hasDemos && (
            <p className="flex max-w-sm items-start gap-2 rounded-xl border border-navy-200 bg-white px-4 py-3 text-sm text-navy-600">
              <Info aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
              Los proyectos marcados como «Demostración» son ejemplos ilustrativos y no corresponden a clientes reales.
            </p>
          )}
        </div>
        {hasDemos && (
          <div className="mt-4">
            <Pending>reemplazar demostraciones por proyectos reales autorizados (src/config/content.ts)</Pending>
          </div>
        )}

        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <li key={project.id}>
              <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-navy-100 bg-white transition-shadow duration-300 hover:shadow-[0_22px_50px_-30px_rgb(14_29_60/0.5)]">
                <div className="relative aspect-[16/10] bg-gradient-to-br from-navy-100 to-brand-100 p-5">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={`Captura del proyecto ${project.name}`}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                    />
                  ) : project.visual ? (
                    <div
                      role="img"
                      aria-label={`Ilustración demostrativa: ${project.name}`}
                      className="h-full"
                    >
                      <ProjectVisual kind={project.visual} />
                    </div>
                  ) : null}
                  {project.isDemo && (
                    <span className="absolute left-3 top-3 rounded-full bg-navy-950/85 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur">
                      Demostración
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-sm font-semibold text-brand-700">{project.category}</p>
                  <h3 className="mt-1 text-xl font-semibold">{project.name}</h3>
                  <p className="mt-2 leading-relaxed text-navy-600">{project.description}</p>
                  <dl className="mt-5 space-y-3 text-[0.95rem]">
                    <div>
                      <dt className="font-semibold text-navy-900">Problema</dt>
                      <dd className="text-navy-600">{project.problem}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-navy-900">Solución</dt>
                      <dd className="text-navy-600">{project.solution}</dd>
                    </div>
                  </dl>
                  {project.technologies.length > 0 && (
                    <ul className="mt-auto flex flex-wrap gap-2 pt-6" aria-label="Tecnologías">
                      {project.technologies.map((tech) => (
                        <li key={tech} className="rounded-md bg-navy-50 px-2.5 py-1 text-xs font-medium text-navy-700">
                          {tech}
                        </li>
                      ))}
                    </ul>
                  )}
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:underline"
                    >
                      Ver proyecto <ExternalLink aria-hidden="true" className="h-4 w-4" />
                      <span className="sr-only">(se abre en una pestaña nueva)</span>
                    </a>
                  )}
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
