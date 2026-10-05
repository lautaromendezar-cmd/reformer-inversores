// Cierre de la home: el dossier (la guía descargable, como en las grandes redes de franquicia)
// y la aplicación corta sobre la foto de la instructora con la alumna.
import Image from "next/image";
import Lockup from "@/components/Lockup";
import FormularioCorto from "@/components/FormularioCorto";
import { dossier, cierre } from "@/content/home";
import { fotos } from "@/lib/imagenes";

export default function Cierre() {
  return (
    <>
      <section id="dossier" className="escena relative scroll-mt-20 py-[clamp(5rem,12vw,10rem)]" data-luz="corteza" aria-labelledby="dossier-titulo">
        <div className="contenedor grid grid-cols-12 items-center gap-x-6 gap-y-14">
          <div className="col-span-12 md:col-span-6 lg:col-span-5">
            <p className="antetitulo" data-revelar>
              {dossier.antetitulo}
            </p>
            <h2 id="dossier-titulo" className="mt-5 text-[length:var(--text-h1)]" data-revelar="lineas">
              {dossier.titulo}
            </h2>
            <p className="mt-6 max-w-md text-hueso/75" data-revelar>
              {dossier.texto}
            </p>
            <a href="#aplicar-corto" className="boton boton-luz mt-8" data-magnetico>
              Pedir el dossier
            </a>
          </div>

          {/* La tapa del dossier, dibujada (no hay PDF todavía) */}
          <div className="col-span-12 flex justify-center md:col-span-6 lg:col-span-6 lg:col-start-7">
            <div className="tapa-escena" data-revelar>
              <div className="tapa">
                <div className="flex items-center justify-between">
                  <Lockup className="h-7 w-auto text-hueso" />
                  <span className="text-[0.55rem] font-semibold uppercase tracking-[0.3em] text-ambar">Partners</span>
                </div>
                <div>
                  <p className="titulo text-[clamp(2.75rem,1.5rem+4vw,4.5rem)] leading-[0.92] text-hueso">
                    {dossier.tapa.linea1}
                    <br />
                    <span className="text-luz">{dossier.tapa.linea2}</span>
                  </p>
                  <p className="mt-5 text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-hueso/55">{dossier.tapa.pie}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="aplicar-corto" className="escena relative isolate scroll-mt-16 overflow-hidden py-[clamp(5rem,12vw,10rem)]" data-luz="noche" aria-labelledby="cierre-titulo">
        <div className="absolute inset-0 -z-10">
          <Image src={fotos.salaInstructora} alt={cierre.alt} fill placeholder="blur" sizes="100vw" className="object-cover object-[35%_50%]" />
          <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgb(23_17_14/0.25)_0%,rgb(23_17_14/0.7)_55%,rgb(23_17_14/0.9)_100%)] max-lg:bg-[linear-gradient(180deg,rgb(23_17_14/0.35)_0%,rgb(23_17_14/0.92)_45%)]" />
        </div>
        <div className="contenedor grid grid-cols-12 gap-x-6 gap-y-10 max-lg:pt-[28vh]">
          <div className="col-span-12 lg:col-span-5 lg:col-start-7">
            <p className="antetitulo" data-revelar>
              {cierre.antetitulo}
            </p>
            <h2 id="cierre-titulo" className="mt-5 text-[length:var(--text-h1)] text-hueso" data-revelar="lineas">
              {cierre.titulo}
            </h2>
            <p className="mt-5 max-w-md text-hueso/80" data-revelar>
              {cierre.bajada}
            </p>
            <div className="mt-8">
              <FormularioCorto origen="home" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
