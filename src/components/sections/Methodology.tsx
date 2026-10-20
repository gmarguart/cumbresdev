import { methodology } from "@/config/content";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Cinco etapas. En escritorio las tarjetas ascienden como una trayectoria hacia la cumbre;
 * en móvil se muestran como una línea de tiempo vertical.
 */
export function Methodology() {
  const steps = methodology.steps;
  // Desplazamiento vertical progresivo (solo escritorio).
  const offsets = ["lg:mt-32", "lg:mt-24", "lg:mt-16", "lg:mt-8", "lg:mt-0"];

  return (
    <section id="metodologia" aria-labelledby="metodologia-titulo" className="bg-white py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          id="metodologia-titulo"
          eyebrow="Metodología"
          title={methodology.title}
          text={methodology.text}
          align="center"
        />

        <div className="relative mt-16">
          {/* Trayectoria ascendente decorativa (escritorio) */}
          <svg
            aria-hidden="true"
            viewBox="0 0 1000 200"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-x-0 top-0 hidden h-40 w-full lg:block"
          >
            <path
              d="M18 187.5 L 221 147.5 L 424 107.5 L 627 67.5 L 830 27.5"
              fill="none"
              stroke="#bfd5fe"
              strokeWidth="2"
              strokeDasharray="6 8"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          <ol className="relative grid gap-0 lg:grid-cols-5 lg:gap-5">
            {steps.map((step, i) => (
              <li key={step.title} className={`relative flex gap-5 pb-10 last:pb-0 lg:block lg:pb-0 ${offsets[i]}`}>
                {/* Línea vertical (móvil) */}
                {i < steps.length - 1 && (
                  <span aria-hidden="true" className="absolute left-[1.375rem] top-12 h-[calc(100%-3rem)] w-px bg-navy-100 lg:hidden" />
                )}
                <span
                  className={`relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-display text-base font-bold ${
                    i === steps.length - 1
                      ? "bg-brand-600 text-white shadow-[0_8px_20px_-8px_rgb(37_99_235/0.8)]"
                      : "border-2 border-brand-200 bg-white text-brand-700"
                  }`}
                >
                  {i + 1}
                </span>
                <div className="lg:mt-5 lg:rounded-2xl lg:border lg:border-navy-100 lg:bg-white lg:p-5 lg:shadow-[0_14px_40px_-30px_rgb(14_29_60/0.5)]">
                  <h3 className="text-lg font-semibold leading-snug">{step.title}</h3>
                  <p className="mt-1.5 leading-relaxed text-navy-600">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
