import { showPending } from "@/config/site";

/** Aviso de dato pendiente. Solo visible fuera de producción. */
export function Pending({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  if (!showPending) return null;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border border-dashed border-amber-400 bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-800 ${className}`}
    >
      <span aria-hidden="true">●</span> Pendiente: {children}
    </span>
  );
}
