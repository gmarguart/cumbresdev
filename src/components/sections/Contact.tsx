import { Clock, FileText, Mail, MessageCircle, Search } from "lucide-react";
import { contact } from "@/config/content";
import { siteConfig, whatsappHref } from "@/config/site";
import { ContactForm } from "@/components/ContactForm";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Pending } from "@/components/ui/Pending";

const nextSteps = [
  { icon: Search, text: "Revisamos tu solicitud y, si es necesario, te pedimos más detalles." },
  { icon: Clock, text: "Coordinamos una conversación inicial para entender tu necesidad." },
  { icon: FileText, text: "Te enviamos una propuesta con alcance, plazos y presupuesto." },
];

export function Contact() {
  const wa = whatsappHref();
  const email = siteConfig.contact.email;

  return (
    <section id="contacto" aria-labelledby="contacto-titulo" className="relative overflow-hidden bg-navy-50 py-20 sm:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-brand-200/40 blur-3xl" />
      <div className="container-page relative grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <SectionHeading id="contacto-titulo" eyebrow="Contacto y cotización" title={contact.title} text={contact.text} />

          <ol className="mt-10 space-y-5">
            {nextSteps.map(({ icon: Icon, text }, i) => (
              <li key={text} className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-brand-700 shadow-sm ring-1 ring-navy-100">
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <p className="pt-2 text-navy-700">
                  <span className="sr-only">Paso {i + 1}: </span>
                  {text}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-10 rounded-2xl border border-navy-100 bg-white p-6">
            <p className="font-semibold text-navy-950">¿Prefieres conversar directamente?</p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              {wa && (
                <ButtonLink
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#15803d] shadow-none hover:bg-[#166534]"
                >
                  <MessageCircle aria-hidden="true" className="h-5 w-5" />
                  Escríbenos por WhatsApp
                  <span className="sr-only">(se abre en una pestaña nueva)</span>
                </ButtonLink>
              )}
              {email && (
                <ButtonLink href={`mailto:${email}`} variant="secondary">
                  <Mail aria-hidden="true" className="h-5 w-5" />
                  {email}
                </ButtonLink>
              )}
            </div>
            {!wa && !email && (
              <p className="mt-2 text-sm text-navy-600">Usa el formulario y te responderemos a la brevedad.</p>
            )}
            <div className="mt-3 flex flex-wrap gap-2">
              {!wa && <Pending>número de WhatsApp (NEXT_PUBLIC_WHATSAPP_NUMBER)</Pending>}
              {!email && <Pending>correo de contacto (NEXT_PUBLIC_CONTACT_EMAIL)</Pending>}
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-navy-100 bg-white p-6 shadow-[0_30px_70px_-40px_rgb(14_29_60/0.45)] sm:p-9">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
