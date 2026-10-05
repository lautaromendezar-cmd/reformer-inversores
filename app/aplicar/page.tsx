import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import Aplicacion from "@/components/conversion/Aplicacion";
import { aplicar } from "@/content/conversion";
import { fotos } from "@/lib/imagenes";

export const metadata: Metadata = { title: "Aplicar", description: aplicar.intro };

export default function Aplicar() {
  return (
    <section className="escena relative isolate min-h-[100svh] overflow-hidden pb-28 pt-36" data-luz="noche" aria-labelledby="aplicar-titulo">
      {/* La socia operadora, apenas, de fondo: el foco es el formulario */}
      <div aria-hidden="true" className="absolute inset-y-0 right-0 -z-10 hidden w-[38%] lg:block">
        <Image src={fotos.sociaOperadora} alt="" fill sizes="38vw" className="object-cover opacity-45" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--color-noche)_0%,rgb(23_17_14/0.2)_60%)]" />
      </div>
      <div className="contenedor lg:pr-[40%]">
        <div className="mx-auto max-w-3xl">
          <p className="antetitulo">{aplicar.portada.antetitulo}</p>
          <h1 id="aplicar-titulo" className="mt-4 text-[length:var(--text-h2)]">
            {aplicar.portada.titulo}
          </h1>
          <p className="mt-3 text-hueso/75">{aplicar.intro}</p>
        </div>
        <div className="mt-12">
          <Suspense fallback={null}>
            <Aplicacion />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
