import type { Metadata } from "next";
import PortadaInterna from "@/components/PortadaInterna";
import EnPreparacion from "@/components/EnPreparacion";
import { fotos } from "@/lib/imagenes";

export const metadata: Metadata = { title: "Inversión", description: "Canon de USD 1.500 por Reformer instalado, royalty del 6% y fondo de marketing del 2%. Todos los valores son estimados." };

// TODO: fase 4. Por ahora, portada y cuerpo provisorio.
export default function Inversion() {
  return (
    <>
      <PortadaInterna
        antetitulo="Números y retorno"
        titulo="Inversión proporcional a tu sala"
        bajada="Canon de USD 1.500 por Reformer instalado, royalty del 6% y fondo de marketing del 2%. Todos los valores son estimados."
        foto={fotos.salaInstructora}
        alt="Instructora y alumna riéndose sobre un Reformer en la sala del sol"
      />
      <EnPreparacion texto="La matriz de formatos, la calculadora interactiva y la cadena de importación directa. Esta página se completa en la próxima entrega." />
    </>
  );
}
