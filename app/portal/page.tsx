import type { Metadata } from "next";
import PortadaInterna from "@/components/PortadaInterna";
import EnPreparacion from "@/components/EnPreparacion";
import { fotos } from "@/lib/imagenes";

export const metadata: Metadata = { title: "Portal Socios", description: "El espacio privado de la red: manuales, métricas de tu sucursal y la comunidad de socios." };

// TODO: fase —. Por ahora, portada y cuerpo provisorio.
export default function Portal() {
  return (
    <>
      <PortadaInterna
        antetitulo="Portal Socios"
        titulo="Próximamente"
        bajada="El espacio privado de la red: manuales, métricas de tu sucursal y la comunidad de socios."
        foto={fotos.recepcion}
        alt="Recepción Fosque con barra de café y alumnas entrando por los molinetes"
      />
      <EnPreparacion texto="El Portal Socios está en desarrollo. Si ya sos socio, tu coordinador te va a avisar cuando se habilite." />
    </>
  );
}
