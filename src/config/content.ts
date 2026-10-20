/**
 * Textos comerciales de la landing page.
 * Editar aquí para cambiar el contenido sin tocar los componentes.
 */

export type ProjectType = "web" | "software";

export type Slide = {
  id: string;
  label: string;
  eyebrow: string;
  title: string;
  text: string;
  primary: { label: string; href: string; projectType?: ProjectType };
  secondary?: { label: string; href: string; projectType?: ProjectType };
  visual: "web" | "software" | "summit";
};

export const slides: Slide[] = [
  {
    id: "slide-web",
    label: "Páginas web",
    eyebrow: "Desarrollo de páginas web",
    title: "Tu presencia digital comienza con una gran página web.",
    text: "Creamos sitios web profesionales, modernos y adaptables a todos los dispositivos para presentar tus servicios y generar nuevas oportunidades comerciales.",
    primary: { label: "Quiero una página web", href: "#paginas-web" },
    secondary: { label: "Cotizar proyecto", href: "#contacto", projectType: "web" },
    visual: "web",
  },
  {
    id: "slide-software",
    label: "Software a medida",
    eyebrow: "Desarrollo de software a medida",
    title: "Tu negocio es único. El software también puede serlo.",
    text: "Desarrollamos aplicaciones y sistemas personalizados para digitalizar procesos, resolver necesidades específicas y mejorar la forma en que trabaja tu empresa.",
    primary: { label: "Desarrollar mi solución", href: "#software" },
    secondary: { label: "Conversar sobre mi idea", href: "#contacto", projectType: "software" },
    visual: "software",
  },
  {
    id: "slide-resultados",
    label: "Tecnología orientada a resultados",
    eyebrow: "Tecnología orientada a resultados",
    title: "Transformamos tus ideas en soluciones digitales.",
    text: "Combinamos ingeniería informática, experiencia en proyectos tecnológicos y herramientas modernas de desarrollo para construir soluciones alineadas con tus objetivos.",
    primary: { label: "Conversemos sobre tu proyecto", href: "#contacto" },
    visual: "summit",
  },
];

export const services = {
  title: "Soluciones digitales para las necesidades de tu negocio.",
  text: "Desde una página web profesional hasta una aplicación desarrollada específicamente para tu empresa, en CumbresDev te ayudamos a convertir tus necesidades en soluciones tecnológicas.",
  items: [
    {
      id: "paginas-web",
      type: "web" as ProjectType,
      kicker: "Servicio 01",
      title: "Desarrollo de páginas web",
      description:
        "Creamos páginas web profesionales que fortalecen tu presencia digital, presentan tus servicios y facilitan que tus potenciales clientes se pongan en contacto contigo.",
      audience: "Para emprendedores, profesionales y pequeñas empresas.",
      includes: [
        "Sitios web corporativos",
        "Páginas para profesionales y emprendedores",
        "Landing pages comerciales",
        "Renovación de sitios existentes",
        "Diseño adaptable a móviles",
        "Optimización técnica básica para buscadores",
        "Mantenimiento y mejoras",
      ],
      cta: "Quiero una página web",
    },
    {
      id: "software",
      type: "software" as ProjectType,
      kicker: "Servicio 02",
      title: "Desarrollo de software a medida",
      description:
        "Desarrollamos aplicaciones y sistemas personalizados que responden a los procesos y necesidades específicas de cada empresa.",
      audience: "Para empresas que necesitan algo que las herramientas estándar no resuelven.",
      includes: [
        "Aplicaciones web",
        "Sistemas de gestión",
        "Digitalización de procesos",
        "Integraciones mediante API",
        "Automatización de tareas",
        "Desarrollo de funcionalidades personalizadas",
      ],
      cta: "Cotizar software a medida",
    },
  ],
};

export const benefits = {
  title: "Primero entendemos el problema. Después desarrollamos la solución.",
  text: "Cada proyecto comienza por comprender la necesidad real, definir el alcance y elegir una solución viable. Así evitamos desarrollar funcionalidades que no aportan y concentramos el esfuerzo en lo que tu negocio necesita.",
  items: [
    {
      icon: "target",
      title: "Comprensión del negocio",
      text: "Antes de proponer tecnología, conversamos sobre tus objetivos, tus clientes y la forma en que trabajas.",
    },
    {
      icon: "list",
      title: "Alcance y entregables definidos",
      text: "Acordamos por escrito qué se desarrollará, qué se entregará y en qué etapas, para que sepas qué esperar.",
    },
    {
      icon: "message",
      title: "Comunicación directa",
      text: "Conversas directamente con quien desarrolla tu proyecto, sin intermediarios y con avances visibles.",
    },
    {
      icon: "code",
      title: "Pensado para mantenerse y evolucionar",
      text: "Construimos con código ordenado y documentado, para que la solución pueda crecer junto con tu negocio.",
    },
  ],
};

export const methodology = {
  title: "Un proceso claro desde la idea hasta la implementación.",
  text: "Cinco etapas que ordenan el trabajo, reducen la incertidumbre y te mantienen informado en cada paso.",
  steps: [
    {
      title: "Conversación inicial",
      text: "Conocemos el problema, el contexto y los objetivos que quieres alcanzar.",
    },
    {
      title: "Análisis y propuesta",
      text: "Definimos alcance, solución, plazos y presupuesto en una propuesta concreta.",
    },
    {
      title: "Diseño y planificación",
      text: "Establecemos la estructura, las prioridades y la forma en que se verá y funcionará.",
    },
    {
      title: "Desarrollo y validación",
      text: "Implementamos la solución y la probamos contigo antes de publicarla.",
    },
    {
      title: "Entrega y acompañamiento",
      text: "Publicamos o desplegamos el producto y acordamos el soporte posterior.",
    },
  ],
};

export type Project = {
  id: string;
  name: string;
  category: string;
  description: string;
  problem: string;
  solution: string;
  technologies: string[];
  /** true = ejemplo demostrativo, no corresponde a un cliente real. */
  isDemo: boolean;
  /** Ilustración incluida en el sitio (para demos) */
  visual?: "landing" | "inventory" | "booking";
  /** Captura real del proyecto en /public (opcional). */
  image?: string;
  url?: string;
};

/**
 * Proyectos. Los actuales son DEMOSTRACIONES y se rotulan como tales.
 * Para agregar un proyecto real: isDemo: false, image: "/proyectos/xxx.webp" y url opcional,
 * solo con autorización del cliente para publicarlo.
 */
export const projects: Project[] = [
  {
    id: "demo-landing",
    name: "Landing page para estudio profesional",
    category: "Página web",
    description: "Ejemplo de landing page para un profesional independiente que ofrece servicios de asesoría.",
    problem: "Los potenciales clientes no encuentran información clara ni una forma simple de solicitar una reunión.",
    solution: "Una página de una sola vista con servicios, preguntas frecuentes y formulario de contacto adaptado a móviles.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    isDemo: true,
    visual: "landing",
  },
  {
    id: "demo-inventario",
    name: "Sistema de gestión de inventario",
    category: "Software a medida",
    description: "Ejemplo de aplicación web para controlar stock, movimientos y alertas de reposición.",
    problem: "El inventario se lleva en planillas dispersas, con errores y sin visibilidad del stock en tiempo real.",
    solution: "Una aplicación web con registro de movimientos, alertas de stock mínimo y reportes descargables.",
    technologies: ["React", "Node.js", "PostgreSQL"],
    isDemo: true,
    visual: "inventory",
  },
  {
    id: "demo-reservas",
    name: "Portal de reservas y agenda",
    category: "Software a medida",
    description: "Ejemplo de portal para que los clientes agenden horas y el equipo gestione su disponibilidad.",
    problem: "Las reservas se coordinan por mensajes y llamadas, lo que genera dobles agendamientos y tiempo perdido.",
    solution: "Un portal con calendario en línea, confirmaciones automáticas por correo y panel de administración.",
    technologies: ["Next.js", "API REST", "Integración de correo"],
    isDemo: true,
    visual: "booking",
  },
];

export const about = {
  title: "Experiencia en tecnología con visión de negocio.",
  paragraphs: [
    "CumbresDev nace para ayudar a empresas y profesionales a resolver necesidades concretas mediante páginas web y software a medida.",
    "Integramos conocimientos de ingeniería informática, desarrollo de software y gestión de proyectos tecnológicos para construir soluciones digitales alineadas con los objetivos de cada cliente.",
  ],
  pillars: [
    { title: "Ingeniería informática", text: "Bases sólidas para diseñar soluciones correctas y escalables." },
    { title: "Desarrollo de software", text: "Herramientas modernas y buenas prácticas en cada entrega." },
    { title: "Gestión de proyectos", text: "Alcance, etapas y comunicación ordenadas de principio a fin." },
  ],
};

export type Faq = { question: string; answer: string; needsValidation?: boolean };

export const faqs: Faq[] = [
  {
    question: "¿Cuánto cuesta desarrollar una página web?",
    answer:
      "Depende del alcance: la cantidad de secciones, las funcionalidades, si los contenidos ya están listos y las integraciones necesarias. Después de una conversación inicial te enviamos una propuesta con el valor detallado, sin compromiso.",
    needsValidation: true,
  },
  {
    question: "¿Cuánto tiempo demora un proyecto web?",
    answer:
      "El plazo depende del tamaño del sitio y de la disponibilidad de textos e imágenes. Una landing page sencilla requiere menos tiempo que un sitio corporativo con varias secciones. El plazo estimado queda definido en la propuesta antes de comenzar.",
  },
  {
    question: "¿Puedo solicitar cambios después de la entrega?",
    answer:
      "Sí. La propuesta incluye una etapa de revisión para ajustar detalles antes de publicar. Los cambios posteriores a la entrega se evalúan según su alcance y pueden incluirse en un plan de mantenimiento.",
    needsValidation: true,
  },
  {
    question: "¿Ofrecen mantenimiento?",
    answer:
      "Sí. Podemos acordar un servicio de mantenimiento y mejoras continuas. Las condiciones se definen según las necesidades de cada sitio o sistema.",
    needsValidation: true,
  },
  {
    question: "¿Cómo se calcula el costo de un software a medida?",
    answer:
      "Se estima a partir de las funcionalidades requeridas, su complejidad, las integraciones con otros sistemas y la cantidad de usuarios o perfiles. Cuando el proyecto es grande, puede dividirse en etapas para comenzar por lo más importante.",
  },
  {
    question: "¿Pueden desarrollar una solución desde cero?",
    answer:
      "Sí. Podemos acompañarte desde la idea inicial hasta la puesta en marcha. También podemos evaluar un sistema existente para mejorarlo o ampliarlo, si su estado técnico lo permite.",
  },
  {
    question: "¿Cómo se definen los requerimientos?",
    answer:
      "A través de conversaciones contigo y con las personas que usarán la solución. Documentamos lo acordado, priorizamos funcionalidades y validamos el diseño antes de desarrollar.",
  },
  {
    question: "¿Quién será propietario del código y de los entregables?",
    answer:
      "La propiedad del código y de los entregables queda establecida por escrito en la propuesta o contrato antes de comenzar el proyecto, para que no existan dudas.",
    needsValidation: true,
  },
];

export const contact = {
  title: "Cuéntanos qué necesitas desarrollar.",
  text: "Describe brevemente tu idea o necesidad. Revisaremos la información para evaluar el proyecto y definir los próximos pasos.",
};
