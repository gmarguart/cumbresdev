# CumbresDev — Landing page

Landing page de una sola página para **https://cumbresdev.cl**, enfocada en dos líneas de servicio:

1. Desarrollo de páginas web profesionales.
2. Desarrollo de software a medida.

Es un sitio **HTML, CSS y JavaScript puro**: no hay frameworks, dependencias ni paso de compilación. Lo que ves en `public_html/` es exactamente lo que se sube al hosting. El formulario de contacto usa un script PHP, así que funciona en cualquier hosting **cPanel** (Apache + PHP).

## Estructura

```
public_html/                  ← se sube tal cual a public_html en cPanel
├─ index.html                 ★ Toda la página: textos, secciones, formulario y política de privacidad
├─ css/styles.css             Estilos (colores de marca al inicio, en :root)
├─ js/main.js                 Carrusel, menú móvil, sección activa, formulario y diálogo de privacidad
├─ enviar-contacto.php        ★ Procesa el formulario y envía el correo
├─ 404.html                   Página de error
├─ .htaccess                  HTTPS, redirección www, caché, cabeceras de seguridad, página 404
├─ robots.txt · sitemap.xml
├─ icon.png · apple-icon.png · og-image.png
├─ brand/                     Logo: símbolo (.webp/.png) y logo completo con texto
└─ img/                       Fotografías (WebP en 800 y 1400 px de ancho)
```

### Fotografías

Las fotos de `img/` son de [Unsplash](https://unsplash.com) bajo la *Unsplash License* (uso comercial libre, sin atribución obligatoria). El tono azul de marca se aplica con CSS (`.photo-frame` y `.service-photo` en `css/styles.css`), así que una foto nueva queda con el mismo estilo sin editarla.

| Archivo | Sección | Fuente |
|---|---|---|
| `web-*.webp` | Servicio 01 | [Lilly Rum](https://unsplash.com/photos/15YTRXKuJ14) |
| `software-*.webp` | Servicio 02 | [Jakub Żerdzicki](https://unsplash.com/photos/2DkNX2wVVY4) |
| `planificacion-*.webp` | Forma de trabajar | [Scott Graham](https://unsplash.com/photos/5fNmWej4tAA) |
| `estudio-*.webp` | Nosotros | [Jakub Żerdzicki](https://unsplash.com/photos/v-jFS1AsHXo) |

Para cambiar una foto, reemplaza los dos archivos (`-800` y `-1400`) manteniendo el nombre, o cambia la ruta en `index.html`.

## Editar el sitio

Abre `public_html/index.html` en cualquier editor. Cada sección está marcada con un comentario grande (`<!-- ==== SERVICIOS ==== -->`, etc.), así que basta con buscar el texto y cambiarlo.

- **Textos**: directamente en `index.html`.
- **Colores**: variables al inicio de `css/styles.css` (`--brand-600`, `--navy-950`, …).
- **Velocidad del carrusel**: atributo `data-interval="5000"` (milisegundos) en `<section id="inicio">`.
- **Datos pendientes** (WhatsApp, correo, LinkedIn, ficha del responsable): están en `index.html` como bloques comentados con la palabra `PENDIENTE`. Busca esa palabra, descomenta el bloque y completa el dato.

## Ver el sitio en tu computador

Haz doble clic en `public_html/index.html`. Todo funciona salvo el envío del formulario, que necesita PHP.

Para probarlo con un servidor local (simula mejor el hosting):

```bash
python -m http.server 4000 -d public_html
```

Luego abre http://localhost:4000. Este servidor tampoco ejecuta PHP; el formulario se prueba en el hosting.

## Formulario de contacto (PHP)

`enviar-contacto.php` recibe el formulario por POST y lo envía con `mail()` desde el servidor. Los correos de destino y remitente se configuran al inicio del archivo (`CONTACT_TO`, `CONTACT_FROM`).

- Validación en el navegador (`js/main.js`) **y** en el PHP, con mensajes por campo y foco en el primer error. Si cambias una regla, actualiza ambos archivos.
- Antispam: campo trampa oculto, tiempo mínimo de llenado (3 s) y límite de 5 envíos cada 10 minutos por IP.
- **Solo se muestra «¡Mensaje enviado!» si el servidor confirma el envío.**
- Los botones «Quiero una página web» y «Cotizar software a medida» preseleccionan el tipo de proyecto (atributo `data-project-type`).

## Publicación en cPanel (cumbresdev.cl)

1. En cPanel → *Administrador de archivos* → `public_html`, sube **el contenido** de la carpeta `public_html/` (no la carpeta en sí). Lo más simple es comprimirlo en un `.zip`, subirlo y usar *Extraer*.
   - Activa *Mostrar archivos ocultos* para confirmar que `.htaccess` quedó subido.
2. **HTTPS**: en *SSL/TLS Status*, ejecuta *AutoSSL* si el certificado no está activo.
3. **Correo entregable**: en *Email Deliverability*, verifica que SPF y DKIM estén en verde.
4. **Probar**: envía una solicitud desde https://cumbresdev.cl/#contacto y confirma que llega.

Para actualizar el sitio, sube de nuevo los archivos que cambiaste.

## Accesibilidad y SEO

- Un único `h1` y un `h2` por sección; landmarks `header`, `nav`, `main` y `footer`; enlace «Saltar al contenido».
- Carrusel con `aria-roledescription`, controles etiquetados, láminas inactivas con `inert`, pausa con foco o puntero y sin rotación automática si el sistema pide «reducir movimiento».
- FAQ con `<details>/<summary>` nativos; política de privacidad en un `<dialog>` nativo.
- Título, descripción, canonical, Open Graph, Twitter card, `sitemap.xml`, `robots.txt` y JSON-LD `ProfessionalService` sin datos inventados.

## Datos pendientes

Ver [PENDIENTES.md](PENDIENTES.md).
