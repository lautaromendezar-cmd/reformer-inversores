import type { Metadata } from "next";
import PortadaInterna from "@/components/PortadaInterna";
import EnPreparacion from "@/components/EnPreparacion";
import { fotos } from "@/lib/imagenes";

export const metadata: Metadata = { title: "Preguntas frecuentes", description: "Canon, superficie, vesting, plazos, soporte y países disponibles." };

// TODO: fase 4. Por ahora, portada y cuerpo provisorio.
export default function Faq() {
  return (
    <>
      <PortadaInterna
        antetitulo="Preguntas frecuentes"
        titulo="Lo que todo inversor pregunta primero"
        bajada="Canon, superficie, vesting, plazos, soporte y países disponibles."
        foto={fotos.lounge}
        alt="Tres alumnas charlan y se ríen en los sillones del lounge después de clase"
      />
      <EnPreparacion texto="Las respuestas a las preguntas de cada inversor. Esta página se completa en la próxima entrega." />
    </>
  );
}
