"use client";

// Mobile: el CTA de aplicación vive fijo abajo, siempre a mano del pulgar.
// En /aplicar no aparece (ya estás ahí).

import Link from "next/link";
import { usePathname } from "next/navigation";
import { accesos, enlaceReunion } from "@/content/sitio";

export default function BarraMovil() {
  const ruta = usePathname();
  if (ruta.startsWith("/aplicar")) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-hueso/10 bg-noche/90 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 backdrop-blur-md md:hidden">
      <div className="flex gap-3">
        <a href={enlaceReunion()} target="_blank" rel="noopener noreferrer" className="boton boton-linea flex-1 text-hueso">
          Reunión
        </a>
        <Link href={accesos.aplicar.href} className="boton boton-luz flex-[1.4] uppercase tracking-[0.12em]">
          Aplicar
        </Link>
      </div>
    </div>
  );
}
