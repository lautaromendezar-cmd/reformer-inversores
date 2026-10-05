import type { Metadata } from "next";
import PortadaInterna from "@/components/PortadaInterna";
import CierrePagina from "@/components/CierrePagina";
import Linea from "@/components/proceso/Linea";
import { portada, pasos } from "@/content/proceso";
import { fotos } from "@/lib/imagenes";

export const metadata: Metadata = { title: "Proceso", description: pasos.map((p) => p.titulo).join(" · ") };

export default function Proceso() {
  return (
    <>
      <PortadaInterna antetitulo={portada.antetitulo} titulo={portada.titulo} foto={fotos.fachadaNoche} alt={portada.alt} posicion="50% 60%" />
      <Linea pasos={pasos} />
      <CierrePagina />
    </>
  );
}
