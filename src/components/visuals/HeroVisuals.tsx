/**
 * Ilustraciones del carrusel principal construidas con HTML/CSS/SVG.
 * No usan imágenes rasterizadas, por lo que no afectan la carga inicial.
 */

function Line({ w, className = "bg-navy-200" }: { w: string; className?: string }) {
  return <span className={`block h-1.5 rounded-full ${className}`} style={{ width: w }} />;
}

/** Lámina 1: sitio web en computador y teléfono. */
export function WebVisual() {
  return (
    <div
      role="img"
      aria-label="Ilustración de una página web profesional vista en un computador y en un teléfono móvil"
      className="relative mx-auto aspect-[16/11] w-full max-w-[34rem]"
    >
      {/* Computador */}
      <div className="absolute left-0 top-[4%] w-[86%] rounded-2xl border border-white/15 bg-navy-800/90 p-2 shadow-[0_30px_80px_-20px_rgb(0_0_0/0.6)]">
        <div className="flex items-center gap-1.5 px-2 pb-2 pt-1">
          <span className="h-2 w-2 rounded-full bg-white/25" />
          <span className="h-2 w-2 rounded-full bg-white/25" />
          <span className="h-2 w-2 rounded-full bg-white/25" />
          <span className="ml-3 h-4 flex-1 rounded-md bg-white/10 px-2 text-[0.55rem] leading-4 text-navy-200">
            tuempresa.cl
          </span>
        </div>
        <div className="overflow-hidden rounded-lg bg-white">
          <div className="flex items-center justify-between border-b border-navy-100 px-4 py-2.5">
            <span className="h-3 w-14 rounded bg-navy-900" />
            <span className="hidden gap-3 sm:flex">
              <Line w="1.6rem" />
              <Line w="1.6rem" />
              <Line w="1.6rem" />
            </span>
            <span className="h-4 w-12 rounded-md bg-brand-600" />
          </div>
          <div className="grid grid-cols-5 gap-3 px-4 py-4">
            <div className="col-span-3 flex flex-col justify-center gap-2">
              <span className="h-3 w-[90%] rounded bg-navy-900" />
              <span className="h-3 w-[70%] rounded bg-navy-900" />
              <Line w="85%" className="mt-1 bg-navy-200" />
              <Line w="65%" className="bg-navy-200" />
              <span className="mt-2 h-5 w-20 rounded-md bg-brand-600" />
            </div>
            <div className="col-span-2 aspect-[4/3] rounded-lg bg-gradient-to-br from-brand-400 via-brand-600 to-navy-800 p-2">
              <svg viewBox="0 0 100 60" className="h-full w-full" aria-hidden="true">
                <path d="M0 60 30 24l18 20 16-14 36 30Z" fill="white" opacity="0.35" />
                <path d="M20 60 52 16l48 44Z" fill="white" opacity="0.6" />
              </svg>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 px-4 pb-4">
            {[0, 1, 2].map((i) => (
              <div key={i} className="rounded-md border border-navy-100 p-2">
                <span className="mb-1.5 block h-3 w-3 rounded bg-brand-100" />
                <Line w="80%" />
                <Line w="55%" className="mt-1 bg-navy-100" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Teléfono */}
      <div className="absolute bottom-0 right-0 w-[29%] rounded-[1.4rem] border-[5px] border-navy-700 bg-white p-1.5 shadow-[0_24px_60px_-16px_rgb(0_0_0/0.7)]">
        <div className="mx-auto mb-1.5 h-1 w-8 rounded-full bg-navy-200" />
        <div className="flex items-center justify-between px-1">
          <span className="h-2 w-8 rounded bg-navy-900" />
          <span className="flex flex-col gap-0.5">
            <span className="h-0.5 w-3 bg-navy-400" />
            <span className="h-0.5 w-3 bg-navy-400" />
          </span>
        </div>
        <div className="mt-2 aspect-[4/3] rounded-md bg-gradient-to-br from-brand-400 to-navy-800" />
        <div className="mt-2 space-y-1 px-1">
          <span className="block h-2 w-[90%] rounded bg-navy-900" />
          <Line w="75%" />
          <Line w="60%" />
          <span className="mt-1.5 block h-3.5 w-full rounded bg-brand-600" />
          <div className="mt-1.5 grid grid-cols-2 gap-1">
            <span className="h-6 rounded bg-navy-50" />
            <span className="h-6 rounded bg-navy-50" />
          </div>
        </div>
      </div>
    </div>
  );
}

/** Lámina 2: panel de gestión de una aplicación web. */
export function SoftwareVisual() {
  const bars = [40, 62, 48, 75, 58, 88, 70];
  return (
    <div
      role="img"
      aria-label="Ilustración de un panel de gestión de una aplicación web con indicadores, gráfico y tabla de registros"
      className="relative mx-auto aspect-[16/11] w-full max-w-[34rem]"
    >
      <div className="absolute inset-x-0 top-[2%] flex h-[88%] overflow-hidden rounded-2xl border border-white/15 bg-white shadow-[0_30px_80px_-20px_rgb(0_0_0/0.6)]">
        {/* Barra lateral */}
        <div className="flex w-[17%] flex-col items-center gap-3 bg-navy-900 py-4">
          <span className="h-6 w-6 rounded-lg bg-brand-500" />
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i} className={`h-2 w-[55%] rounded-full ${i === 1 ? "bg-white/80" : "bg-white/20"}`} />
          ))}
        </div>
        {/* Contenido */}
        <div className="flex flex-1 flex-col gap-3 p-3 sm:p-4">
          <div className="flex items-center justify-between">
            <span className="h-3 w-24 rounded bg-navy-900" />
            <span className="flex items-center gap-2">
              <span className="hidden h-5 w-24 rounded-md bg-navy-50 sm:block" />
              <span className="h-5 w-5 rounded-full bg-brand-200" />
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              ["Pedidos", "bg-brand-600"],
              ["En curso", "bg-sky-400"],
              ["Completados", "bg-emerald-500"],
            ].map(([label, color]) => (
              <div key={label} className="rounded-lg border border-navy-100 p-2">
                <span className="block text-[0.5rem] font-medium text-navy-400 sm:text-[0.6rem]">{label}</span>
                <span className="mt-1 block h-2.5 w-[60%] rounded bg-navy-800" />
                <span className={`mt-1.5 block h-1 w-full rounded-full ${color} opacity-80`} />
              </div>
            ))}
          </div>
          <div className="grid flex-1 grid-cols-5 gap-2">
            <div className="col-span-3 flex items-end gap-1.5 rounded-lg border border-navy-100 p-2 sm:gap-2">
              {bars.map((h, i) => (
                <span
                  key={i}
                  className={`flex-1 rounded-t ${i === 5 ? "bg-brand-600" : "bg-brand-200"}`}
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <div className="col-span-2 flex flex-col justify-between rounded-lg border border-navy-100 p-2">
              {[
                ["bg-emerald-100", "bg-emerald-500"],
                ["bg-amber-100", "bg-amber-500"],
                ["bg-brand-100", "bg-brand-600"],
                ["bg-emerald-100", "bg-emerald-500"],
              ].map(([pill, dot], i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <span className="h-1.5 flex-1 rounded-full bg-navy-100" />
                  <span className={`flex h-2.5 w-6 items-center justify-center rounded-full ${pill}`}>
                    <span className={`h-1 w-1 rounded-full ${dot}`} />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tarjeta flotante */}
      <div className="absolute -bottom-1 left-[6%] flex items-center gap-2 rounded-xl border border-white/20 bg-navy-800/95 px-3 py-2 text-white shadow-xl backdrop-blur">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300">
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true">
            <path d="m3.5 8.5 3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <span className="text-[0.65rem] font-semibold sm:text-xs">Proceso digitalizado</span>
      </div>
    </div>
  );
}

/** Lámina 3: cumbres geométricas con interfaces y trayectoria ascendente. */
export function SummitVisual() {
  return (
    <div
      role="img"
      aria-label="Ilustración de cumbres geométricas con una trayectoria ascendente que conecta una idea con una solución digital"
      className="relative mx-auto aspect-[16/11] w-full max-w-[34rem]"
    >
      <svg viewBox="0 0 480 330" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <linearGradient id="peak-a" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#6097fa" />
            <stop offset="1" stopColor="#1d4fd8" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="peak-b" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#93b9fd" stopOpacity="0.55" />
            <stop offset="1" stopColor="#243a66" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <path d="M0 330 120 150 210 260 300 120 480 330Z" fill="url(#peak-b)" />
        <path d="M70 330 260 50 450 330Z" fill="url(#peak-a)" />
        <path d="M222 106 260 50l38 56-20-12-18 18-18-18Z" fill="#ffffff" opacity="0.9" />
        {/* Trayectoria */}
        <path
          d="M40 300 C 110 290, 130 240, 170 220 S 230 150, 260 58"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2.5"
          strokeDasharray="6 8"
          strokeLinecap="round"
          opacity="0.75"
        />
        <circle cx="40" cy="300" r="7" fill="#08132b" stroke="#93b9fd" strokeWidth="3" />
        <circle cx="170" cy="220" r="6" fill="#08132b" stroke="#93b9fd" strokeWidth="3" />
        {/* Bandera */}
        <path d="M260 50V18" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
        <path d="M262 19h26l-7 8 7 8h-26Z" fill="#3b78f6" />
      </svg>

      <div className="absolute left-[2%] top-[14%] w-[38%] rounded-xl border border-white/15 bg-navy-800/90 p-3 shadow-xl backdrop-blur">
        <div className="mb-2 flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-300" />
          <span className="text-[0.6rem] font-semibold text-navy-100 sm:text-[0.7rem]">Tu idea</span>
        </div>
        <span className="block h-1.5 w-[90%] rounded-full bg-white/25" />
        <span className="mt-1.5 block h-1.5 w-[65%] rounded-full bg-white/15" />
      </div>

      <div className="absolute right-[1%] top-[30%] w-[36%] rounded-xl border border-white/15 bg-white p-3 shadow-xl">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-mono text-[0.65rem] font-semibold text-brand-700 sm:text-xs">&lt;/&gt;</span>
          <span className="h-1.5 w-8 rounded-full bg-navy-100" />
        </div>
        <span className="block h-1.5 w-[80%] rounded-full bg-navy-200" />
        <span className="mt-1.5 block h-1.5 w-[55%] rounded-full bg-brand-200" />
        <span className="mt-1.5 block h-1.5 w-[70%] rounded-full bg-navy-100" />
      </div>

      <div className="absolute bottom-[6%] right-[8%] flex items-center gap-2 rounded-xl border border-white/20 bg-navy-900/90 px-3 py-2 shadow-xl backdrop-blur">
        <span className="h-2 w-2 rounded-full bg-emerald-400" />
        <span className="text-[0.65rem] font-semibold text-white sm:text-xs">Solución en marcha</span>
      </div>
    </div>
  );
}
