import { siteConfig, whatsappHref } from "@/config/site";
import { Logo } from "@/components/Logo";
import { PrivacyLink } from "@/components/PrivacyDialog";
import { CurrentYear } from "@/components/CurrentYear";

const linkClass = "text-navy-300 transition-colors hover:text-white";

export function Footer() {
  const wa = whatsappHref();
  const { email } = siteConfig.contact;
  const { linkedin, github } = siteConfig.social;

  const columns = [
    {
      title: "Servicios",
      links: [
        { href: "#paginas-web", label: "Páginas web" },
        { href: "#software", label: "Software a medida" },
        { href: "#servicios", label: "Todos los servicios" },
      ],
    },
    {
      title: "CumbresDev",
      links: [
        { href: "#metodologia", label: "Metodología" },
        ...(siteConfig.sections.projects ? [{ href: "#proyectos", label: "Proyectos" }] : []),
        { href: "#nosotros", label: "Nosotros" },
        { href: "#preguntas-frecuentes", label: "Preguntas frecuentes" },
      ],
    },
  ];

  return (
    <footer className="bg-navy-950 text-sm">
      <div className="container-page grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="max-w-xs">
          <a href="#inicio" aria-label="CumbresDev, volver al inicio">
            <Logo tone="dark" />
          </a>
          <p className="mt-4 leading-relaxed text-navy-300">
            Desarrollo de páginas web profesionales y software a medida para empresas, emprendedores y profesionales en
            Chile.
          </p>
        </div>

        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-white">{col.title}</h2>
            <ul className="mt-4 space-y-3">
              {col.links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className={linkClass}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div>
          <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-white">Contacto</h2>
          <ul className="mt-4 space-y-3">
            <li>
              <a href="#contacto" className={linkClass}>
                Cotizar proyecto
              </a>
            </li>
            {email && (
              <li>
                <a href={`mailto:${email}`} className={linkClass}>
                  {email}
                </a>
              </li>
            )}
            {wa && (
              <li>
                <a href={wa} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  WhatsApp
                </a>
              </li>
            )}
            {linkedin && (
              <li>
                <a href={linkedin} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  LinkedIn
                </a>
              </li>
            )}
            {github && (
              <li>
                <a href={github} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  GitHub
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-3 py-6 text-navy-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CurrentYear /> {siteConfig.name}. Todos los derechos reservados.
          </p>
          <PrivacyLink label="Política de privacidad" className="text-navy-300 hover:text-white" />
        </div>
      </div>
    </footer>
  );
}
