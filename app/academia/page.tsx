import type { Metadata } from "next";
import PortadaInterna from "@/components/PortadaInterna";
import CierrePagina from "@/components/CierrePagina";
import Volumenes from "@/components/academia/Volumenes";
import { portada, manuales, cane } from "@/content/academia";
import { fotos } from "@/lib/imagenes";

export const metadata: Metadata = { title: "Academia", description: portada.bajada };

export default function Academia() {
  return (
    <>
      <PortadaInterna antetitulo={portada.antetitulo} titulo={portada.titulo} bajada={portada.bajada} foto={fotos.detalleManos} alt={portada.alt} posicion="55% 50%" />

      <section className="escena py-[clamp(5rem,12vw,10rem)]" data-luz="corteza" aria-labelledby="manuales">
        <div className="contenedor">
          <p className="antetitulo" data-revelar>
            {manuales.antetitulo}
          </p>
          <h2 id="manuales" className="mt-5 text-[length:var(--text-h1)]" data-revelar="lineas">
            {manuales.titulo}
          </h2>
          <div className="mt-[clamp(3rem,6vw,5rem)]">
            <Volumenes items={manuales.items} />
          </div>
        </div>
      </section>

      <section className="escena claro py-[clamp(5rem,12vw,10rem)]" data-luz="lino" aria-labelledby="cane">
        <div className="contenedor">
          <p className="antetitulo" data-revelar>
            {cane.antetitulo}
          </p>
          <h2 id="cane" className="mt-5 text-[length:var(--text-h1)]" data-revelar="lineas">
            {cane.titulo}
          </h2>
          <ol className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
            {cane.letras.map((l, i) => (
              <li key={l.nombre} className="border-t border-noche/15 pt-6" data-revelar data-retraso={i * 0.08}>
                <span className="titulo block text-[clamp(4.5rem,3rem+5vw,8rem)] leading-none text-ambar-hondo" aria-hidden="true">
                  {l.letra}
                </span>
                <h3 className="mt-3 text-[length:var(--text-h3)]">{l.nombre}</h3>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CierrePagina />
    </>
  );
}
