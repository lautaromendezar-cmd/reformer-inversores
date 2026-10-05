import type { Metadata } from "next";
import PortadaInterna from "@/components/PortadaInterna";
import EnPreparacion from "@/components/EnPreparacion";
import { fotos } from "@/lib/imagenes";

export const metadata: Metadata = { title: "¿Es para vos?", description: "Seis preguntas y te sugerimos el perfil y el formato de sala que van con vos." };

// TODO: fase 5. Por ahora, portada y cuerpo provisorio.
export default function Candidato() {
  return (
    <>
      <PortadaInterna
        antetitulo="¿Fosque Reformer es para vos?"
        titulo="Descubrí tu perfil en dos minutos"
        bajada="Seis preguntas y te sugerimos el perfil y el formato de sala que van con vos."
        foto={fotos.kids}
        alt="Dos chicos juegan en la sala de Fosque Niños con una instructora"
      />
      <EnPreparacion texto="El test completo llega en la próxima entrega." />
    </>
  );
}
