import type { Metadata } from "next";
import PortadaInterna from "@/components/PortadaInterna";
import EnPreparacion from "@/components/EnPreparacion";
import { fotos } from "@/lib/imagenes";

export const metadata: Metadata = { title: "Proceso", description: "Un recorrido acompañado: de la primera reunión a la inauguración de tu sala." };

// TODO: fase 4. Por ahora, portada y cuerpo provisorio.
export default function Proceso() {
  return (
    <>
      <PortadaInterna
        antetitulo="Cómo convertirte en socio"
        titulo="Siete pasos de la aplicación a la apertura"
        bajada="Un recorrido acompañado: de la primera reunión a la inauguración de tu sala."
        foto={fotos.fachadaNoche}
        alt="Fachada de una sucursal Fosque encendida de noche en una calle comercial"
      />
      <EnPreparacion texto="El paso a paso completo, de la aplicación al lanzamiento. Esta página se completa en la próxima entrega." />
    </>
  );
}
