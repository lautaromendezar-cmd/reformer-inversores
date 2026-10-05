import type { Metadata } from "next";
import PortadaInterna from "@/components/PortadaInterna";
import EnPreparacion from "@/components/EnPreparacion";
import { fotos } from "@/lib/imagenes";

export const metadata: Metadata = { title: "Aplicar", description: "Un formulario corto, una pregunta por pantalla. Te respondemos para agendar la reunión estratégica." };

// TODO: fase 5. Por ahora, portada y cuerpo provisorio.
export default function Aplicar() {
  return (
    <>
      <PortadaInterna
        antetitulo="Aplicación"
        titulo="Aplicá a tu franquicia Fosque"
        bajada="Un formulario corto, una pregunta por pantalla. Te respondemos para agendar la reunión estratégica."
        foto={fotos.sociaOperadora}
        alt="Socia operadora de una sucursal Fosque apoyada en la barra de la recepción, sonriendo"
      />
      <EnPreparacion texto="El formulario de calificación paso a paso llega en la próxima entrega. Mientras tanto, podés dejar tus datos en el formulario del inicio o escribirnos por WhatsApp." />
    </>
  );
}
