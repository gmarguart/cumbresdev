"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Pending } from "@/components/ui/Pending";

export const PRIVACY_HASH = "#politica-de-privacidad";
const OPEN_EVENT = "cumbres:open-privacy";

/** Enlace que abre la política de privacidad dentro de la misma página. */
export function PrivacyLink({ className = "", label = "política de privacidad" }: { className?: string; label?: string }) {
  return (
    <a
      href={PRIVACY_HASH}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        window.dispatchEvent(new Event(OPEN_EVENT));
      }}
    >
      {label}
    </a>
  );
}

/** Política de privacidad como diálogo modal nativo (<dialog>), sin página independiente. */
export function PrivacyDialog() {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const open = () => {
      const dialog = ref.current;
      if (dialog && !dialog.open) dialog.showModal();
    };
    window.addEventListener(OPEN_EVENT, open);
    if (window.location.hash === PRIVACY_HASH) open();
    const onHash = () => window.location.hash === PRIVACY_HASH && open();
    window.addEventListener("hashchange", onHash);
    return () => {
      window.removeEventListener(OPEN_EVENT, open);
      window.removeEventListener("hashchange", onHash);
    };
  }, []);

  const email = siteConfig.contact.email;

  return (
    <dialog
      ref={ref}
      aria-labelledby="privacidad-titulo"
      className="m-auto max-h-[85dvh] w-[calc(100%-2rem)] max-w-2xl overflow-hidden rounded-3xl border border-navy-100 p-0 shadow-2xl backdrop:bg-navy-950/60 backdrop:backdrop-blur-sm"
      onClick={(e) => {
        // Cerrar al hacer clic en el fondo.
        if (e.target === e.currentTarget) e.currentTarget.close();
      }}
      onClose={() => {
        if (window.location.hash === PRIVACY_HASH) history.replaceState(null, "", window.location.pathname);
      }}
    >
      <div className="flex max-h-[85dvh] flex-col">
        <div className="flex items-center justify-between gap-4 border-b border-navy-100 px-6 py-4 sm:px-8">
          <h2 id="privacidad-titulo" className="text-xl font-bold">
            Política de privacidad
          </h2>
          <form method="dialog">
            <button
              type="submit"
              aria-label="Cerrar política de privacidad"
              className="flex h-10 w-10 items-center justify-center rounded-full text-navy-700 hover:bg-navy-50"
            >
              <X aria-hidden="true" className="h-5 w-5" />
            </button>
          </form>
        </div>
        <div className="space-y-4 overflow-y-auto px-6 py-6 text-[0.95rem] leading-relaxed text-navy-700 sm:px-8">
          <Pending>texto base; requiere revisión legal antes de publicar</Pending>
          <p>
            En {siteConfig.name} ({siteConfig.domain}) respetamos la privacidad de las personas que nos contactan. Esta
            política explica qué datos recopilamos a través del formulario de contacto y cómo los usamos, conforme a la
            normativa chilena sobre protección de datos personales (Ley N° 19.628 y sus modificaciones).
          </p>
          <h3 className="pt-2 text-base font-semibold">Datos que recopilamos</h3>
          <p>
            Nombre, correo electrónico y descripción de tu necesidad. De forma opcional: empresa, teléfono, presupuesto
            estimado y plazo deseado.
          </p>
          <h3 className="pt-2 text-base font-semibold">Finalidad</h3>
          <p>
            Usamos estos datos exclusivamente para responder tu solicitud, evaluar tu proyecto y preparar una propuesta.
            No los vendemos ni los cedemos a terceros con fines comerciales.
          </p>
          <h3 className="pt-2 text-base font-semibold">Proveedores</h3>
          <p>
            Para recibir los mensajes del formulario utilizamos un servicio de envío de correo electrónico que procesa
            los datos solo para ese fin.
          </p>
          <h3 className="pt-2 text-base font-semibold">Conservación</h3>
          <p>
            Conservamos los datos durante el tiempo necesario para gestionar tu solicitud y la eventual relación
            comercial.
          </p>
          <h3 className="pt-2 text-base font-semibold">Tus derechos</h3>
          <p>
            Puedes solicitar el acceso, la rectificación, la eliminación o la oposición al tratamiento de tus datos
            {email ? (
              <>
                {" "}
                escribiendo a{" "}
                <a href={`mailto:${email}`} className="font-semibold text-brand-700 underline">
                  {email}
                </a>
                .
              </>
            ) : (
              <> a través del formulario de contacto de este sitio.</>
            )}
          </p>
        </div>
      </div>
    </dialog>
  );
}
