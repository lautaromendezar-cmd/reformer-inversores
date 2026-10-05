import type { Metadata } from "next";
import Link from "next/link";
import PortadaInterna from "@/components/PortadaInterna";
import { fotos } from "@/lib/imagenes";

export const metadata: Metadata = { title: "Portal Socios", description: "Portal Socios de Fosque Reformer: próximamente." };

// El Portal Socios no existe todavía (el brief lo pide como "Próximamente").
export default function Portal() {
  return (
    <PortadaInterna antetitulo="Portal Socios" titulo="Próximamente" foto={fotos.recepcion} alt="Recepción Fosque con barra de café y alumnas entrando por los molinetes">
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className="boton boton-luz">
          Volver al inicio
        </Link>
        <Link href="/aplicar" className="boton boton-linea text-hueso">
          Aplicar
        </Link>
      </div>
    </PortadaInterna>
  );
}
