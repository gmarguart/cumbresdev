import { MessageCircle } from "lucide-react";
import { whatsappHref } from "@/config/site";

/** Botón flotante de WhatsApp. Solo se muestra si hay un número configurado. */
export function WhatsAppButton() {
  const href = whatsappHref();
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp (se abre en una pestaña nueva)"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#15803d] text-white shadow-[0_12px_30px_-8px_rgb(0_0_0/0.45)] transition-transform hover:scale-105 hover:bg-[#166534]"
    >
      <MessageCircle aria-hidden="true" className="h-7 w-7" />
    </a>
  );
}
