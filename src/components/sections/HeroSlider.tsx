"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type CSSProperties } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { slides, type Slide } from "@/config/content";
import { siteConfig } from "@/config/site";
import { ProjectCta } from "@/components/ui/ProjectCta";
import { SoftwareVisual, SummitVisual, WebVisual } from "@/components/visuals/HeroVisuals";

const INTERVAL = siteConfig.sliderIntervalMs;
const SWIPE_THRESHOLD = 48;

// --- Suscripciones a preferencias del navegador (sin setState en efectos) ---
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
function subscribeReducedMotion(cb: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
const getReducedMotion = () => window.matchMedia(REDUCED_MOTION).matches;

function subscribeVisibility(cb: () => void) {
  document.addEventListener("visibilitychange", cb);
  return () => document.removeEventListener("visibilitychange", cb);
}
const getHidden = () => document.hidden;
const getFalse = () => false;

function SlideVisual({ kind }: { kind: Slide["visual"] }) {
  if (kind === "web") return <WebVisual />;
  if (kind === "software") return <SoftwareVisual />;
  return <SummitVisual />;
}

type PlayPreference = "auto" | "playing" | "paused";

export function HeroSlider() {
  const count = slides.length;
  const [index, setIndex] = useState(0);
  const [playPref, setPlayPref] = useState<PlayPreference>("auto");
  const [hovered, setHovered] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const reducedMotion = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, getFalse);
  const pageHidden = useSyncExternalStore(subscribeVisibility, getHidden, getFalse);

  // Con "reducir movimiento" no hay rotación automática salvo que el usuario la active.
  const autoplay = playPref === "playing" || (playPref === "auto" && !reducedMotion);
  const running = autoplay && !hovered && !focusWithin && !pageHidden;

  // Un único temporizador; se reinicia al cambiar de lámina y se limpia al desmontar o pausar.
  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(() => setIndex((i) => (i + 1) % count), INTERVAL);
    return () => window.clearTimeout(timer);
  }, [running, index, count]);

  const goTo = useCallback((i: number) => setIndex(((i % count) + count) % count), [count]);
  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + count) % count), [count]);

  return (
    <section
      id="inicio"
      aria-roledescription="carrusel"
      aria-label="Servicios destacados de CumbresDev"
      className="relative isolate overflow-hidden bg-navy-950 pt-16 text-white"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocusWithin(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocusWithin(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          next();
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          prev();
        }
      }}
      onTouchStart={(e) => {
        const t = e.touches[0];
        touchStart.current = { x: t.clientX, y: t.clientY };
      }}
      onTouchEnd={(e) => {
        const start = touchStart.current;
        touchStart.current = null;
        if (!start) return;
        const t = e.changedTouches[0];
        const dx = t.clientX - start.x;
        const dy = t.clientY - start.y;
        if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy) * 1.2) {
          if (dx < 0) next();
          else prev();
        }
      }}
    >
      {/* Fondo decorativo */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_70%_40%,black_20%,transparent_75%)]" />
        <div className="absolute -right-40 -top-40 h-[36rem] w-[36rem] rounded-full bg-brand-600/25 blur-3xl" />
        <div className="absolute -bottom-48 -left-32 h-[28rem] w-[28rem] rounded-full bg-brand-800/30 blur-3xl" />
        <svg viewBox="0 0 1440 160" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-24 w-full sm:h-32">
          <path d="M0 160 220 70 360 120 560 30 760 110 920 60 1120 120 1300 50 1440 100V160Z" fill="#0e1d3c" />
          <path d="M0 160 180 110 380 140 600 90 820 140 1040 100 1260 140 1440 120V160Z" fill="#172a50" opacity="0.7" />
        </svg>
      </div>

      <h1 className="sr-only">CumbresDev: desarrollo de páginas web y software a medida en Chile</h1>

      <div className="container-page pb-28 pt-10 sm:pb-36 lg:pt-16">
        {/* Todas las láminas comparten la misma celda: la altura es constante y no hay saltos de diseño. */}
        <div className="grid">
          {slides.map((slide, i) => {
            const active = i === index;
            return (
              <div
                key={slide.id}
                id={slide.id}
                role="group"
                aria-roledescription="lámina"
                aria-label={`${i + 1} de ${count}: ${slide.label}`}
                aria-hidden={!active}
                inert={!active}
                data-active={active}
                className={`group/slide grid items-center gap-10 transition-opacity duration-700 ease-out [grid-area:1/1] lg:grid-cols-[1.05fr_1fr] lg:gap-12 ${
                  active ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
              >
                <div className="max-w-xl">
                  <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-sm font-medium text-brand-200 group-data-[active=true]/slide:animate-rise">
                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-brand-400" />
                    {slide.eyebrow}
                  </p>
                  <h2 className="text-[2.1rem] font-bold leading-[1.1] text-white group-data-[active=true]/slide:animate-rise sm:text-5xl lg:text-[3.35rem]">
                    {slide.title}
                  </h2>
                  <p className="mt-5 text-lg leading-relaxed text-navy-200 [animation-delay:80ms] group-data-[active=true]/slide:animate-rise">
                    {slide.text}
                  </p>
                  <div className="mt-8 flex flex-col gap-3 [animation-delay:160ms] group-data-[active=true]/slide:animate-rise sm:flex-row">
                    <ProjectCta href={slide.primary.href} projectType={slide.primary.projectType} size="lg">
                      {slide.primary.label}
                      <ChevronRight aria-hidden="true" className="h-4 w-4" />
                    </ProjectCta>
                    {slide.secondary && (
                      <ProjectCta
                        href={slide.secondary.href}
                        projectType={slide.secondary.projectType}
                        variant="outline-dark"
                        size="lg"
                      >
                        {slide.secondary.label}
                      </ProjectCta>
                    )}
                  </div>
                </div>
                <div className="w-full max-w-md justify-self-center sm:max-w-lg lg:max-w-none">
                  <SlideVisual kind={slide.visual} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Controles */}
        <div className="mt-10 flex flex-wrap items-center gap-3 lg:mt-12">
          <button
            type="button"
            onClick={prev}
            aria-label="Lámina anterior"
            aria-controls={slides.map((s) => s.id).join(" ")}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-white/60 hover:bg-white/10"
          >
            <ChevronLeft aria-hidden="true" className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-1" role="group" aria-label="Seleccionar lámina">
            {slides.map((slide, i) => {
              const active = i === index;
              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Mostrar lámina ${i + 1}: ${slide.label}`}
                  aria-current={active ? "true" : undefined}
                  aria-controls={slide.id}
                  className="group flex h-11 items-center px-1.5"
                >
                  <span
                    className={`relative block h-1.5 overflow-hidden rounded-full transition-[width,background-color] duration-300 ${
                      active ? "w-12 bg-white/25" : "w-6 bg-white/25 group-hover:bg-white/50"
                    }`}
                  >
                    {active && (
                      <span
                        key={`${index}-${running}`}
                        style={{ "--slider-interval": `${INTERVAL}ms` } as CSSProperties}
                        className={`absolute inset-0 origin-left rounded-full bg-brand-400 ${
                          running ? "animate-progress" : ""
                        }`}
                      />
                    )}
                  </span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={next}
            aria-label="Lámina siguiente"
            aria-controls={slides.map((s) => s.id).join(" ")}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-white/60 hover:bg-white/10"
          >
            <ChevronRight aria-hidden="true" className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={() => setPlayPref(autoplay ? "paused" : "playing")}
            className="ml-1 inline-flex h-11 items-center gap-2 rounded-full px-3 text-sm font-medium text-navy-200 transition-colors hover:bg-white/10 hover:text-white"
          >
            {autoplay ? (
              <Pause aria-hidden="true" className="h-4 w-4" />
            ) : (
              <Play aria-hidden="true" className="h-4 w-4" />
            )}
            <span>{autoplay ? "Pausar rotación" : "Reanudar rotación"}</span>
          </button>

          {/* Anuncia el cambio solo cuando no hay rotación automática, para no interrumpir a lectores de pantalla. */}
          <p className="sr-only" aria-live={running ? "off" : "polite"}>
            {`Lámina ${index + 1} de ${count}: ${slides[index].label}`}
          </p>
        </div>
      </div>
    </section>
  );
}
