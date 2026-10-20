import { Plus } from "lucide-react";
import { faqs } from "@/config/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Pending } from "@/components/ui/Pending";
import { ButtonLink } from "@/components/ui/Button";

/** Acordeón con <details>/<summary>: accesible por teclado y funcional sin JavaScript. */
export function Faq() {
  return (
    <section id="preguntas-frecuentes" aria-labelledby="faq-titulo" className="bg-white py-20 sm:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            id="faq-titulo"
            eyebrow="Preguntas frecuentes"
            title="Resolvemos tus dudas antes de comenzar."
            text="El costo y los plazos de cada proyecto dependen de su alcance. Si tu pregunta no está aquí, escríbenos."
          />
          <ButtonLink href="#contacto" variant="secondary" className="mt-8">
            Hacer una consulta
          </ButtonLink>
        </div>

        <div className="divide-y divide-navy-100 border-y border-navy-100">
          {faqs.map((faq) => (
            <details key={faq.question} name="preguntas-frecuentes" className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-lg font-semibold text-navy-950 transition-colors hover:text-brand-700 [&::-webkit-details-marker]:hidden">
                <h3 className="font-sans text-[1.05rem] font-semibold tracking-normal text-inherit sm:text-lg">
                  {faq.question}
                </h3>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-navy-200 text-navy-700 transition-[transform,background-color,color,border-color] duration-300 group-open:rotate-45 group-open:border-brand-600 group-open:bg-brand-600 group-open:text-white">
                  <Plus aria-hidden="true" className="h-4 w-4" />
                </span>
              </summary>
              <div className="pb-6 pr-12">
                <p className="leading-relaxed text-navy-600">{faq.answer}</p>
                {faq.needsValidation && <Pending className="mt-3">validar respuesta con el propietario</Pending>}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
