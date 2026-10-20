# Datos pendientes antes de publicar

Ningún dato de esta lista fue inventado: el sitio oculta lo que falta o lo marca como pendiente (solo en desarrollo).

## Imprescindibles

- [x] **Correos del formulario**: crear la casilla en cPanel y completar `CONTACT_TO` y `CONTACT_FROM` en `public/enviar-contacto.php`. Sin esto, el formulario informa que el mensaje *no* se envió.
- [ ] **Probar el formulario en el hosting**: el PHP no pudo ejecutarse en el equipo de desarrollo. Envía una solicitud real y confirma que llega (revisa también la carpeta de spam).
- [ ] **Entregabilidad**: en cPanel → *Email Deliverability*, SPF y DKIM en verde; certificado SSL activo (*AutoSSL*).
- [ ] **Política de privacidad**: el texto base está en `src/components/PrivacyDialog.tsx` y debe pasar por revisión legal (Ley 19.628 y sus modificaciones; considera la Ley 21.719 sobre protección de datos personales).

## Contacto y redes (`.env.local` o `src/config/site.ts`, luego volver a compilar)

- [ ] Número de WhatsApp → `NEXT_PUBLIC_WHATSAPP_NUMBER` (activa el botón flotante y los enlaces).
- [ ] Correo público de contacto → `NEXT_PUBLIC_CONTACT_EMAIL`.
- [ ] Perfil de LinkedIn → `NEXT_PUBLIC_LINKEDIN_URL`.
- [ ] GitHub u otras redes (opcional).

## Contenido (`src/config/`)

- [ ] **Responsable de CumbresDev** (`site.ts → founder`): nombre, cargo, biografía, experiencia y formación **verificadas**, y foto opcional en `/public`.
- [ ] **Proyectos** — sección **oculta** por ahora (`site.ts → sections.projects: false`). Para mostrarla: carga proyectos reales autorizados en `content.ts → projects` (`isDemo: false`, captura en `/public/proyectos/…`, URL opcional), cambia el valor a `true` y vuelve a compilar. El menú y el pie de página se ajustan solos.
- [ ] **Respuestas de la FAQ marcadas con `needsValidation`** (`content.ts → faqs`): costo web, cambios posteriores, mantenimiento y propiedad del código. Confirma que reflejan tus condiciones comerciales.
- [ ] **Rangos de presupuesto del formulario** (`src/lib/contact.ts → BUDGET_OPTIONS`): ajústalos a tus rangos reales.
- [ ] **Precios** (opcional, `site.ts → pricing`): hoy no se publican; el sitio indica que el valor depende del alcance.

## Recomendado

- [ ] Revisar con un dispositivo real con «Reducir movimiento» activado.
- [ ] Registrar el sitio en Google Search Console y enviar `https://cumbresdev.cl/sitemap.xml`.
- [ ] Agregar analítica respetuosa de la privacidad (por ejemplo, Vercel Analytics o Plausible), si se desea.
