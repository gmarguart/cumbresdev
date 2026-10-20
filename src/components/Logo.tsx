/* eslint-disable @next/next/no-img-element -- imagen estática ya optimizada en public/brand */

type Tone = "light" | "dark";

type LogoProps = {
  /** "light" para fondos claros, "dark" para fondos oscuros (cambia el color del texto). */
  tone?: Tone;
  className?: string;
  showWordmark?: boolean;
};

/** Proporción del símbolo (ancho / alto) en public/brand/cumbresdev-simbolo.webp (294×160). */
const SYMBOL_RATIO = 294 / 160;

/** Símbolo de CumbresDev: cumbres geométricas con red de nodos y código. Funciona en fondos claros y oscuros. */
export function LogoMark({ className = "h-9 w-auto" }: { tone?: Tone; className?: string }) {
  return (
    <img
      // Ruta relativa: la landing vive en la raíz, y así también funciona abriendo index.html directamente.
      src="./brand/cumbresdev-simbolo.webp"
      alt=""
      aria-hidden="true"
      width={Math.round(40 * SYMBOL_RATIO)}
      height={40}
      decoding="async"
      className={`shrink-0 ${className}`}
    />
  );
}

export function Logo({ tone = "light", className = "", showWordmark = true }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className="h-10 w-auto" />
      {showWordmark && (
        <span
          className={`font-display text-[1.2rem] font-bold tracking-tight ${
            tone === "light" ? "text-[#1559b8]" : "text-white"
          }`}
        >
          Cumbres
          <span className={tone === "light" ? "text-[#2f8ae6]" : "text-brand-300"}>Dev</span>
        </span>
      )}
    </span>
  );
}
