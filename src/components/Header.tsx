"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { Menu, X } from "lucide-react";
import { navItems } from "@/config/site";
import { Logo } from "@/components/Logo";
import { ProjectCta } from "@/components/ui/ProjectCta";

function subscribeScroll(cb: () => void) {
  window.addEventListener("scroll", cb, { passive: true });
  return () => window.removeEventListener("scroll", cb);
}
const getScrolled = () => window.scrollY > 16;
const getFalse = () => false;

export function Header() {
  const scrolled = useSyncExternalStore(subscribeScroll, getScrolled, getFalse);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("inicio");

  // Resalta en el menú la sección visible.
  useEffect(() => {
    const navIds = new Set<string>(navItems.map((n) => n.id));
    // Todas las secciones (en orden del documento) más las tarjetas de servicio.
    const elements = [...document.querySelectorAll<HTMLElement>("main section[id], #paginas-web, #software")];
    const order = elements.map((el) => el.id);
    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        if (visible.size === 0) return;
        // El elemento visible más específico (el último en el documento).
        // Si ambas tarjetas de servicio se ven a la vez (escritorio), se marca "Servicios".
        const bothServices = visible.has("paginas-web") && visible.has("software");
        const current = bothServices ? "servicios" : [...order].reverse().find((id) => visible.has(id));
        // Secciones fuera del menú (beneficios, nosotros, FAQ) no marcan ningún enlace.
        setActive(current && navIds.has(current) ? current : "");
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.01] },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Cerrar el menú móvil con Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300 ${
        solid
          ? "border-b border-navy-100 bg-white/90 shadow-[0_6px_24px_-16px_rgb(8_19_43/0.35)] backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-navy-900"
      >
        Saltar al contenido
      </a>
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <a href="#inicio" aria-label="CumbresDev, ir al inicio" onClick={() => setOpen(false)}>
          <Logo tone={solid ? "light" : "dark"} />
        </a>

        <nav aria-label="Principal" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={isActive ? "location" : undefined}
                    className={`relative rounded-lg px-3 py-2 text-[0.92rem] font-medium transition-colors ${
                      solid
                        ? isActive
                          ? "text-brand-700"
                          : "text-navy-700 hover:text-brand-700"
                        : isActive
                          ? "text-white"
                          : "text-navy-200 hover:text-white"
                    }`}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full transition-opacity ${
                        solid ? "bg-brand-600" : "bg-brand-300"
                      } ${isActive ? "opacity-100" : "opacity-0"}`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <ProjectCta>Cotizar proyecto</ProjectCta>
          </div>
          <button
            type="button"
            className={`flex h-11 w-11 items-center justify-center rounded-lg xl:hidden ${
              solid ? "text-navy-900 hover:bg-navy-50" : "text-white hover:bg-white/10"
            }`}
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X aria-hidden="true" className="h-6 w-6" /> : <Menu aria-hidden="true" className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      <div
        id="menu-movil"
        hidden={!open}
        className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-navy-100 bg-white xl:hidden"
      >
        <nav aria-label="Menú móvil" className="container-page py-4">
          <ul className="flex flex-col">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={active === item.id ? "location" : undefined}
                  className={`flex min-h-12 items-center rounded-lg px-3 text-base font-medium ${
                    active === item.id ? "bg-brand-50 text-brand-700" : "text-navy-800 hover:bg-navy-50"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 border-t border-navy-100 pt-4" onClick={() => setOpen(false)}>
            <ProjectCta className="w-full" size="lg">
              Cotizar proyecto
            </ProjectCta>
          </div>
        </nav>
      </div>
    </header>
  );
}
