/**
 * Validación del formulario de contacto en el navegador.
 * public/enviar-contacto.php repite estas reglas en el servidor: si cambias una, actualiza ambas.
 */

export const PROJECT_TYPES = {
  web: "Página web",
  software: "Software a medida",
} as const;

export const BUDGET_OPTIONS = [
  "Menos de $500.000",
  "Entre $500.000 y $1.500.000",
  "Entre $1.500.000 y $5.000.000",
  "Más de $5.000.000",
  "Aún no lo sé",
] as const;

export const TIMELINE_OPTIONS = [
  "Lo antes posible",
  "Dentro de 1 a 3 meses",
  "Dentro de 3 a 6 meses",
  "Sin fecha definida",
] as const;

export type ContactData = {
  nombre: string;
  empresa: string;
  email: string;
  telefono: string;
  tipo: keyof typeof PROJECT_TYPES | "";
  descripcion: string;
  presupuesto: string;
  plazo: string;
  consentimiento: boolean;
};

export type ContactField = keyof ContactData;
export type ContactErrors = Partial<Record<ContactField, string>>;

export const emptyContact: ContactData = {
  nombre: "",
  empresa: "",
  email: "",
  telefono: "",
  tipo: "",
  descripcion: "",
  presupuesto: "",
  plazo: "",
  consentimiento: false,
};

export const LIMITS = {
  nombre: 80,
  empresa: 100,
  email: 120,
  telefono: 20,
  descripcionMin: 20,
  descripcionMax: 3000,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[\d\s()-]{8,20}$/;

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

/** Normaliza y valida datos de origen desconocido. */
export function validateContact(input: unknown): { ok: true; data: ContactData } | { ok: false; errors: ContactErrors } {
  const raw = (typeof input === "object" && input !== null ? input : {}) as Record<string, unknown>;
  const data: ContactData = {
    nombre: str(raw.nombre),
    empresa: str(raw.empresa),
    email: str(raw.email).toLowerCase(),
    telefono: str(raw.telefono),
    tipo: (str(raw.tipo) as ContactData["tipo"]) || "",
    descripcion: str(raw.descripcion),
    presupuesto: str(raw.presupuesto),
    plazo: str(raw.plazo),
    consentimiento: raw.consentimiento === true,
  };

  const errors: ContactErrors = {};

  if (data.nombre.length < 2) errors.nombre = "Ingresa tu nombre.";
  else if (data.nombre.length > LIMITS.nombre) errors.nombre = `Máximo ${LIMITS.nombre} caracteres.`;

  if (data.empresa.length > LIMITS.empresa) errors.empresa = `Máximo ${LIMITS.empresa} caracteres.`;

  if (!data.email) errors.email = "Ingresa tu correo electrónico.";
  else if (!EMAIL_RE.test(data.email) || data.email.length > LIMITS.email)
    errors.email = "Ingresa un correo válido, por ejemplo nombre@empresa.cl.";

  if (data.telefono && !PHONE_RE.test(data.telefono))
    errors.telefono = "Ingresa un teléfono válido, por ejemplo +56 9 1234 5678.";

  if (!data.tipo || !(data.tipo in PROJECT_TYPES)) errors.tipo = "Selecciona el tipo de proyecto.";

  if (data.descripcion.length < LIMITS.descripcionMin)
    errors.descripcion = `Cuéntanos un poco más (mínimo ${LIMITS.descripcionMin} caracteres).`;
  else if (data.descripcion.length > LIMITS.descripcionMax)
    errors.descripcion = `Máximo ${LIMITS.descripcionMax} caracteres.`;

  if (data.presupuesto && !(BUDGET_OPTIONS as readonly string[]).includes(data.presupuesto))
    errors.presupuesto = "Selecciona una opción válida.";

  if (data.plazo && !(TIMELINE_OPTIONS as readonly string[]).includes(data.plazo))
    errors.plazo = "Selecciona una opción válida.";

  if (!data.consentimiento) errors.consentimiento = "Debes aceptar la política de privacidad para enviar el formulario.";

  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, data };
}
