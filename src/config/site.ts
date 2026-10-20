/**
 * Configuración comercial centralizada de CumbresDev.
 *
 * Todo dato vacío ("") se considera PENDIENTE: el sitio oculta el elemento
 * correspondiente en producción y muestra un aviso en desarrollo.
 * Revisa PENDIENTES.md para la lista completa de datos por completar.
 */

export const siteConfig = {
  name: "CumbresDev",
  domain: "cumbresdev.cl",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://cumbresdev.cl",
  locale: "es_CL",
  tagline: "Páginas web y software a medida",
  description:
    "Desarrollo de páginas web profesionales y software a medida en Chile. Sitios corporativos, landing pages, aplicaciones web y sistemas de gestión para empresas, emprendedores y profesionales.",
  keywords: [
    "desarrollo de páginas web",
    "creación de sitios web profesionales",
    "desarrollo web para empresas",
    "desarrollo de software a medida",
    "aplicaciones web personalizadas",
    "sistemas de gestión para empresas",
    "landing page Chile",
    "diseño web Chile",
  ],

  /** Datos de contacto. Pueden definirse aquí o mediante variables de entorno. */
  contact: {
    // PENDIENTE: correo público de contacto (ej. contacto@cumbresdev.cl).
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
    // PENDIENTE: número de WhatsApp en formato internacional sin "+" ni espacios (ej. 569XXXXXXXX).
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "",
    whatsappMessage: "Hola CumbresDev, me gustaría conversar sobre un proyecto.",
  },

  /** Redes profesionales. Se muestran solo si tienen valor. */
  social: {
    // PENDIENTE: URL del perfil o página de LinkedIn.
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || "",
    // PENDIENTE (opcional): URL de GitHub.
    github: process.env.NEXT_PUBLIC_GITHUB_URL || "",
  },

  /**
   * Información profesional verificada del responsable.
   * No completar con datos que no puedan respaldarse.
   */
  founder: {
    name: "", // PENDIENTE
    role: "", // PENDIENTE (ej. "Ingeniero informático y fundador")
    bio: "", // PENDIENTE: biografía breve verificada
    experience: [] as string[], // PENDIENTE: hitos de experiencia verificables
    education: [] as string[], // PENDIENTE: formación y títulos verificables
    photo: "", // PENDIENTE (opcional): ruta en /public, ej. "/equipo/foto.jpg"
  },

  /**
   * Precios. Solo se publican si `publish` es true y hay ítems definidos.
   * Actualmente la página indica que el valor depende del alcance.
   */
  pricing: {
    publish: false,
    items: [] as { service: string; from: string; note?: string }[],
  },

  /** Intervalo del carrusel principal en milisegundos. */
  sliderIntervalMs: 5000,

  /**
   * Secciones opcionales. Con `false` se ocultan la sección y sus enlaces en el menú y el pie de página.
   */
  sections: {
    // Oculta momentáneamente hasta contar con proyectos para mostrar. Cambiar a true para mostrarla.
    projects: false,
  },
} as const;

const allNavItems = [
  { href: "#inicio", label: "Inicio", id: "inicio" },
  { href: "#servicios", label: "Servicios", id: "servicios" },
  { href: "#paginas-web", label: "Páginas web", id: "paginas-web" },
  { href: "#software", label: "Software a medida", id: "software" },
  { href: "#metodologia", label: "Metodología", id: "metodologia" },
  { href: "#proyectos", label: "Proyectos", id: "proyectos" },
  { href: "#contacto", label: "Contacto", id: "contacto" },
];

export const navItems = allNavItems.filter((item) => item.id !== "proyectos" || siteConfig.sections.projects);

export function whatsappHref(message: string = siteConfig.contact.whatsappMessage) {
  if (!siteConfig.contact.whatsapp) return "";
  const number = siteConfig.contact.whatsapp.replace(/\D/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/** Los avisos de datos pendientes solo se muestran fuera de producción. */
export const showPending = process.env.NODE_ENV !== "production";
