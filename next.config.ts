import type { NextConfig } from "next";

/**
 * Exportación estática: `npm run build` genera la carpeta `out/` con `index.html`,
 * lista para subir a `public_html` en un hosting cPanel (Apache + PHP).
 * El formulario se procesa con `public/enviar-contacto.php`, que se copia a `out/`.
 */
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
