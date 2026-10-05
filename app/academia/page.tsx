import type { Metadata } from "next";
import PortadaInterna from "@/components/PortadaInterna";
import EnPreparacion from "@/components/EnPreparacion";
import { fotos } from "@/lib/imagenes";

export const metadata: Metadata = { title: "Academia", description: "Cuatro manuales de operación y el programa CANE: Capacitación, Actualización, Nivelación y Entrenamiento." };

// TODO: fase 4. Por ahora, portada y cuerpo provisorio.
export default function Academia() {
  return (
    <>
      <PortadaInterna
        antetitulo="Soporte y Fosque Academy"
        titulo="Un sistema que te sostiene"
        bajada="Cuatro manuales de operación y el programa CANE: Capacitación, Actualización, Nivelación y Entrenamiento."
        foto={fotos.detalleManos}
        alt="Las manos de una instructora guían los pies de una alumna sobre la barra del Reformer"
      />
      <EnPreparacion texto="Los manuales A, B, C y D: arquitectura, metodología, operaciones y marketing. Esta página se completa en la próxima entrega." />
    </>
  );
}
