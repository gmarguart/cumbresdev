# CumbresDev — Landing page

Landing page de una sola página para **https://cumbresdev.cl**, enfocada en dos líneas de servicio:

1. Desarrollo de páginas web profesionales.
2. Desarrollo de software a medida.

Todo el contenido vive en `index.html` y se navega mediante anclas (`#inicio`, `#servicios`, `#paginas-web`, `#software`, `#metodologia`, `#proyectos`, `#nosotros`, `#preguntas-frecuentes`, `#contacto`). No existen páginas independientes por servicio.

El sitio se **desarrolla** con Next.js y se **publica** como archivos estáticos (`index.html` + CSS/JS) con un script PHP para el formulario. Así puede alojarse en cualquier hosting **cPanel** (Apache + PHP), sin Node.js en el servidor.

## Tecnología

- **Next.js 16** en modo exportación estática (`output: "export"`) + **React 19** + **TypeScript**
- **Tailwind CSS 4** (colores de marca en `src/app/globals.css`)
- **lucide-react** para íconos
- Ilustraciones en HTML/CSS/SVG (sin imágenes pesadas en la portada)
- **PHP** (`mail()`) para el formulario de contacto: `public/enviar-contacto.php`

Sin base de datos ni autenticación.

## Estructura

```
public/                       Se copia tal cual a out/
├─ enviar-contacto.php        ★ Procesa el formulario y envía el correo (configurar correos)
├─ .htaccess                  HTTPS, redirección www, caché, cabeceras de seguridad, página 404
├─ og-image.png               Imagen para compartir en redes (1200×630)
└─ brand/                     Logo: símbolo transparente (.webp/.png) y logo completo con texto
src/
├─ app/
│  ├─ layout.tsx              Metadatos SEO, Open Graph, fuentes, datos estructurados (JSON-LD)
│  ├─ page.tsx                Landing page (composición de secciones)
│  ├─ globals.css             Colores de marca, tipografía, utilidades
│  └─ sitemap.ts · robots.ts · icon.svg
├─ config/
│  ├─ site.ts                 ★ Datos comerciales: contacto, redes, responsable, precios
│  └─ content.ts              ★ Textos: láminas, servicios, beneficios, etapas, proyectos, FAQ
├─ lib/contact.ts             Validación del formulario en el navegador
└─ components/
   ├─ Header.tsx              Encabezado fijo, menú móvil, sección activa
   ├─ ContactForm.tsx         Formulario (envía a enviar-contacto.php)
   ├─ Footer.tsx · Logo.tsx · PrivacyDialog.tsx · WhatsAppButton.tsx · CurrentYear.tsx
   ├─ sections/               HeroSlider, Services, Benefits, Methodology, Projects, About, Faq, Contact
   ├─ visuals/                Mockups ilustrativos (portada y proyectos)
   └─ ui/                     Button, ProjectCta, SectionHeading, Pending
```

Los textos y datos comerciales se editan en `src/config/`, sin tocar los componentes.

## Instalación y desarrollo local

Requisitos: Node.js 20.9 o superior (probado con Node 24) y npm. Node solo se usa en tu computador, no en el hosting.

```bash
npm install
```

```bash
npm run dev
```

Abrir http://localhost:3000. En desarrollo, los datos pendientes se marcan con avisos amarillos («Pendiente: …»). Esos avisos **no** aparecen en el sitio compilado.

> En `npm run dev` el formulario no puede ejecutar PHP, así que mostrará un error de envío. Es lo esperado: el PHP se prueba en el hosting.

## Variables de entorno (opcionales)

Se leen **al compilar** y quedan incrustadas en el `index.html`. Copia `.env.example` como `.env.local`, complétalas y vuelve a compilar.

| Variable | Uso |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL canónica (por defecto `https://cumbresdev.cl`) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Número de WhatsApp, ej. `569XXXXXXXX`. Vacío = botón oculto |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Correo visible en el sitio. Vacío = no se muestra |
| `NEXT_PUBLIC_LINKEDIN_URL` / `NEXT_PUBLIC_GITHUB_URL` | Redes profesionales (opcional) |

También puedes escribir esos valores directamente en `src/config/site.ts`. El sitio publicado no contiene claves secretas.

## Formulario de contacto (PHP)

`public/enviar-contacto.php` recibe el formulario por POST y lo envía con `mail()` desde el servidor cPanel.

**Configuración pendiente**, al inicio del archivo:

```php
const CONTACT_TO = '';    // casilla que recibe las solicitudes
const CONTACT_FROM = '';  // casilla del MISMO dominio creada en cPanel, ej. contacto@cumbresdev.cl
```

Mientras estén vacías, el formulario responde que el envío **no está habilitado** y nunca muestra éxito.

Funcionamiento:

- Validación en el navegador (`src/lib/contact.ts`) **y** en el PHP, con mensajes por campo y foco en el primer error. Si cambias una regla, actualiza ambos archivos.
- Antispam: campo trampa oculto, tiempo mínimo de llenado (3 s) y límite de 5 envíos cada 10 minutos por IP.
- Cabeceras protegidas contra inyección; asunto codificado en UTF-8; `Reply-To` con el correo del cliente.
- **Solo se muestra «¡Mensaje enviado!» si `mail()` confirma el envío.**
- Los botones «Quiero una página web» y «Cotizar software a medida» preseleccionan el tipo de proyecto.

## Compilación

```bash
npm run build
```

Genera la carpeta **`out/`**, que contiene el sitio listo para publicar:

```
out/
├─ index.html            ← la landing page
├─ enviar-contacto.php   ← formulario
├─ .htaccess
├─ 404.html · robots.txt · sitemap.xml · icon.svg · og-image.png
└─ _next/                ← CSS, JavaScript y fuentes
```

Después de `next build`, el script `scripts/relative-paths.mjs` convierte las rutas a relativas (`./_next/...`) y le indica al runtime de JavaScript dónde están sus archivos. Gracias a eso, `out/index.html` funciona:

- al abrirlo directamente con doble clic, aunque el formulario no puede enviarse porque PHP necesita un servidor;
- en la raíz del dominio (`public_html`);
- dentro de una subcarpeta del hosting.

Para previsualizar con un servidor local:

```bash
npx serve out
```

`npm run lint` ejecuta ESLint.

## Publicación en cPanel (cumbresdev.cl)

1. **Crear el correo**: en cPanel → *Cuentas de correo electrónico*, crea por ejemplo `contacto@cumbresdev.cl`.
2. **Configurar el PHP**: completa `CONTACT_TO` y `CONTACT_FROM` en `public/enviar-contacto.php`.
3. (Opcional) Completa WhatsApp, correo y LinkedIn en `.env.local` o en `src/config/site.ts`.
4. **Compilar**: `npm run build`.
5. **Subir**: en cPanel → *Administrador de archivos* → `public_html`, sube **todo el contenido** de `out/` (no la carpeta `out` en sí). Lo más simple es comprimir el contenido de `out/` en un `.zip`, subirlo y usar *Extraer*.
   - Activa *Mostrar archivos ocultos* para confirmar que `.htaccess` quedó subido.
   - Lo normal es dejarlo en la raíz (`public_html`). Si lo pones en una subcarpeta, funciona igual, pero ajusta `ErrorDocument` en `.htaccess`.
6. **HTTPS**: en cPanel → *SSL/TLS Status*, ejecuta *AutoSSL* si el certificado no está activo. El `.htaccess` redirige a HTTPS y de `www` al dominio sin `www`.
7. **Correo entregable**: en cPanel → *Email Deliverability*, verifica que SPF y DKIM estén en verde.
8. **Probar**: envía una solicitud desde https://cumbresdev.cl/#contacto y confirma que llega.

Para actualizar el sitio, repite los pasos 4 y 5 y reemplaza los archivos. Ten cuidado de no sobrescribir un `enviar-contacto.php` ya configurado con uno vacío.

## Pruebas realizadas

| Prueba | Resultado |
|---|---|
| `npm run build` → `out/index.html` (incluye TypeScript) | ✅ Sin errores; todo estático |
| `npm run lint` | ✅ Sin errores ni advertencias |
| `out/` servido como sitio estático: estilos, fuentes y JavaScript cargan | ✅ |
| `out/` servido desde una subcarpeta (rutas relativas): carga sin errores, JavaScript activo y slider girando | ✅ |
| Tres láminas; las inactivas con `inert` | ✅ |
| Cambio automático cada 5 s | ✅ Medido ~5,0 s entre láminas, ciclo completo |
| Botones anterior y siguiente, indicadores, flechas del teclado, gesto táctil | ✅ |
| Pausa al pasar el puntero y botón pausar/reanudar | ✅ |
| CTA de cada lámina apuntan a la sección correcta | ✅ |
| Todos los enlaces son anclas; ninguna ancla rota; el título no queda tapado por el encabezado | ✅ |
| Menú hamburguesa y resaltado de la sección activa | ✅ |
| Preselección «Página web» / «Software a medida» | ✅ |
| Validación de campos y foco en el primer error | ✅ |
| El formulario envía `POST` a `enviar-contacto.php`; una respuesta no válida muestra error, nunca éxito | ✅ |
| Sin desbordamiento horizontal en 375 px y 768 px; escritorio 1280 px | ✅ |
| Política de privacidad como diálogo dentro de la misma página | ✅ |

**No probado:**

- Apertura con doble clic (`file://`): el navegador de pruebas no abre archivos locales. La prueba equivalente en subcarpeta pasó, pero conviene confirmarla abriendo `out/index.html`.
- **Ejecución del PHP**: no hay PHP en el equipo de desarrollo. El script se revisó manualmente, pero debe probarse en el hosting (paso 8).
- `prefers-reduced-motion`: el navegador de pruebas no permite emularlo. Verifícalo activando «Reducir movimiento» en el sistema operativo.

## Accesibilidad y SEO

- Un único `h1` y un `h2` por sección; landmarks `header`, `nav`, `main` y `footer`; enlace «Saltar al contenido».
- Carrusel con `aria-roledescription`, controles etiquetados, región *live* que solo anuncia cuando no hay rotación automática, y pausa con foco o puntero.
- FAQ con `<details>/<summary>` nativos.
- Título, descripción, canonical, Open Graph con imagen, Twitter card, `sitemap.xml`, `robots.txt` y JSON-LD `ProfessionalService` sin datos inventados.

## Datos pendientes

Ver [PENDIENTES.md](PENDIENTES.md).
