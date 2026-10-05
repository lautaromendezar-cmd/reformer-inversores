import type { Metadata } from "next";
import Link from "next/link";
import PortadaInterna from "@/components/PortadaInterna";
import CierrePagina from "@/components/CierrePagina";
import Acordeon from "@/components/faq/Acordeon";
import { portada, preguntas } from "@/content/faq";
import { fotos } from "@/lib/imagenes";

export const metadata: Metadata = { title: "Preguntas frecuentes", description: preguntas.map((p) => p.p).slice(0, 5).join(" ") };

export default function Faq() {
  return (
    <>
      <PortadaInterna antetitulo={portada.antetitulo} titulo={portada.titulo} foto={fotos.lounge} alt={portada.alt} />
      <section className="escena claro py-[clamp(5rem,12vw,10rem)]" data-luz="lino" aria-label="Preguntas y respuestas">
        <div className="contenedor grid grid-cols-12 gap-x-6">
          <div className="col-span-12 lg:col-span-9">
            <Acordeon preguntas={preguntas} />
            <p className="mt-10 text-[length:var(--text-chico)] text-noche/75">
              Los valores económicos son estimados.{" "}
              <Link href="#aviso-legal" className="underline underline-offset-4 hover:text-ambar-hondo">
                Ver aviso legal
              </Link>
            </p>
          </div>
        </div>
      </section>
      <CierrePagina />
    </>
  );
}
