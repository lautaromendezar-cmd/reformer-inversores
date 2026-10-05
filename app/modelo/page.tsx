import type { Metadata } from "next";
import PortadaInterna from "@/components/PortadaInterna";
import EnPreparacion from "@/components/EnPreparacion";
import { fotos } from "@/lib/imagenes";

export const metadata: Metadata = { title: "El Modelo", description: "Existimos para activar la conciencia en acción y redefinir el bienestar humano: un modelo de negocio de la Nueva Era." };

// TODO: fase 4. Por ahora, portada y cuerpo provisorio.
export default function Modelo() {
  return (
    <>
      <PortadaInterna
        antetitulo="El Modelo Nueva Era"
        titulo="Una plataforma de negocios con propósito"
        bajada="Existimos para activar la conciencia en acción y redefinir el bienestar humano: un modelo de negocio de la Nueva Era."
        foto={fotos.corredorArcos}
        alt="Corredor de arcos iluminados con luz cálida en una sucursal Fosque"
      />
      <EnPreparacion texto="Propósito, misión, visión con la hoja de ruta a 1.000 Puntos de Luz, valores y la propuesta de valor en cuatro niveles. Esta página se completa en la próxima entrega." />
    </>
  );
}
