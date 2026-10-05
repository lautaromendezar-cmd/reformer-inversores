import type { Metadata } from "next";
import PortadaInterna from "@/components/PortadaInterna";
import EnPreparacion from "@/components/EnPreparacion";
import { fotos } from "@/lib/imagenes";

export const metadata: Metadata = { title: "Co-Propiedad", description: "Hasta el 50% de la participación de la sucursal, asignable a la coordinadora y las instructoras clave mediante un programa de vesting." };

// TODO: fase 4. Por ahora, portada y cuerpo provisorio.
export default function CoPropiedad() {
  return (
    <>
      <PortadaInterna
        antetitulo="Revolución asociativa"
        titulo="Quien enseña y gestiona, también es dueño"
        bajada="Hasta el 50% de la participación de la sucursal, asignable a la coordinadora y las instructoras clave mediante un programa de vesting."
        foto={fotos.equipo}
        alt="El equipo de una sucursal Fosque abrazado en la sala, sonriendo a cámara"
      />
      <EnPreparacion texto="El programa de vesting, la comparativa interactiva y quién es quién: Inversor Pasivo, Inversor Operador y Operador Técnico. Esta página se completa en la próxima entrega." />
    </>
  );
}
