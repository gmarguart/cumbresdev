# Datos pendientes antes de publicar

Ningún dato de esta lista fue inventado: el sitio oculta lo que falta. En `public_html/index.html` cada pendiente está marcado con un comentario que contiene la palabra **`PENDIENTE`**.

## Imprescindibles

- [x] **Correos del formulario**: `CONTACT_TO` y `CONTACT_FROM` configurados en `public_html/enviar-contacto.php`.
- [ ] **Probar el formulario en el hosting**: el PHP no pudo ejecutarse en el equipo de desarrollo. Envía una solicitud real y confirma que llega (revisa también la carpeta de spam).
- [ ] **Entregabilidad**: en cPanel → *Email Deliverability*, SPF y DKIM en verde; certificado SSL activo (*AutoSSL*).
- [ ] **Política de privacidad**: el texto base está al final de `index.html` (`<dialog id="privacy-dialog">`) y debe pasar por revisión legal (Ley 19.628 y sus modificaciones; considera la Ley 21.719 sobre protección de datos personales).

## Contacto y redes (`index.html`, bloques comentados)

- [x] **WhatsApp, botón flotante**: activo con el número +56 9 3717 1621 (`wa.me/56937171621`).
- [ ] **WhatsApp, resto del sitio**: botones en la sección Contacto y enlace en el pie de página. Reemplaza `569XXXXXXXX` por `56937171621` y descomenta.
- [ ] **Correo público de contacto**: sección Contacto y pie de página. Si lo agregas, súmalo también al texto de «Tus derechos» en la política de privacidad.
- [ ] **LinkedIn** y otras redes: pie de página.

## Contenido

- [ ] **Responsable de CumbresDev**: en la sección «Nosotros» hay una plantilla comentada para la ficha (nombre, cargo, biografía y foto **verificados**).
- [ ] **Proyectos**: la sección se quitó porque solo tenía ejemplos demostrativos. Cuando existan proyectos reales autorizados, se puede agregar como una sección nueva antes de «Nosotros» y sumar el enlace «Proyectos» al menú.
- [ ] **Sección «Consultoría»** (`<section id="consultoria">`, marcada con `<!-- validar -->`): confirma que los cuatro servicios y sus descripciones reflejan lo que ofreces.
- [ ] **Respuestas de la FAQ marcadas con `<!-- validar -->`**: costo web, cambios posteriores, mantenimiento y propiedad del código. Confirma que reflejan tus condiciones comerciales.
- [ ] **Rangos de presupuesto del formulario** (`<select id="cf-presupuesto">`): ajústalos a tus rangos reales.

## Recomendado

- [ ] Revisar con un dispositivo real con «Reducir movimiento» activado.
- [ ] Registrar el sitio en Google Search Console y enviar `https://cumbresdev.cl/sitemap.xml`.
- [ ] Agregar analítica respetuosa de la privacidad (por ejemplo, Plausible), si se desea.
