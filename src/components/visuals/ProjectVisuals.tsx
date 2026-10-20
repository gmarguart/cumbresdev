import type { Project } from "@/config/content";

/** Miniaturas ilustrativas para proyectos demostrativos. */
export function ProjectVisual({ kind }: { kind: NonNullable<Project["visual"]> }) {
  if (kind === "landing") {
    return (
      <div className="flex h-full flex-col gap-2 rounded-lg bg-white p-3 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="h-2 w-10 rounded bg-navy-900" />
          <span className="h-3 w-8 rounded bg-brand-600" />
        </div>
        <div className="grid flex-1 grid-cols-2 gap-2">
          <div className="flex flex-col justify-center gap-1.5">
            <span className="h-2 w-[95%] rounded bg-navy-900" />
            <span className="h-2 w-[70%] rounded bg-navy-900" />
            <span className="h-1 w-[85%] rounded bg-navy-200" />
            <span className="mt-1 h-3 w-12 rounded bg-brand-600" />
          </div>
          <div className="rounded-md bg-gradient-to-br from-brand-300 to-brand-700" />
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          <span className="h-5 rounded bg-navy-50" />
          <span className="h-5 rounded bg-navy-50" />
          <span className="h-5 rounded bg-navy-50" />
        </div>
      </div>
    );
  }
  if (kind === "inventory") {
    return (
      <div className="flex h-full overflow-hidden rounded-lg bg-white shadow-sm">
        <div className="flex w-[18%] flex-col items-center gap-2 bg-navy-900 py-3">
          <span className="h-3 w-3 rounded bg-brand-400" />
          <span className="h-1 w-[50%] rounded bg-white/40" />
          <span className="h-1 w-[50%] rounded bg-white/20" />
          <span className="h-1 w-[50%] rounded bg-white/20" />
        </div>
        <div className="flex flex-1 flex-col gap-1.5 p-2.5">
          <div className="grid grid-cols-3 gap-1.5">
            <span className="h-6 rounded border border-navy-100" />
            <span className="h-6 rounded border border-navy-100" />
            <span className="h-6 rounded border border-amber-200 bg-amber-50" />
          </div>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-1.5 border-b border-navy-50 pb-1">
              <span className="h-1.5 flex-1 rounded bg-navy-100" />
              <span className="h-1.5 w-6 rounded bg-navy-200" />
              <span className={`h-2 w-5 rounded-full ${i === 2 ? "bg-amber-300" : "bg-emerald-300"}`} />
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="flex h-full flex-col gap-2 rounded-lg bg-white p-3 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="h-2 w-14 rounded bg-navy-900" />
        <span className="flex gap-1">
          <span className="h-2 w-2 rounded-full bg-navy-200" />
          <span className="h-2 w-2 rounded-full bg-navy-200" />
        </span>
      </div>
      <div className="grid flex-1 grid-cols-7 gap-1">
        {Array.from({ length: 21 }, (_, i) => (
          <span
            key={i}
            className={`rounded-sm ${
              [3, 9, 10, 16].includes(i) ? "bg-brand-500" : i === 12 ? "bg-emerald-400" : "bg-navy-50"
            }`}
          />
        ))}
      </div>
      <span className="h-3 w-full rounded bg-brand-600" />
    </div>
  );
}
