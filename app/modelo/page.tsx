import type { Metadata } from "next";
import Image from "next/image";
import PortadaInterna from "@/components/PortadaInterna";
import CierrePagina from "@/components/CierrePagina";
import MapaRuta from "@/components/modelo/MapaRuta";
import { portada, proposito, mision, vision, valores, propuesta } from "@/content/modelo";
import { fotos } from "@/lib/imagenes";

export const metadata: Metadata = { title: "El Modelo", description: portada.bajada };

export default function Modelo() {
  return (
    <>
      <PortadaInterna antetitulo={portada.antetitulo} titulo={portada.titulo} bajada={portada.bajada} foto={fotos.corredorArcos} alt={portada.alt} />

      {/* Propósito */}
      <section className="escena claro py-[clamp(5rem,12vw,10rem)]" data-luz="lino" aria-labelledby="proposito">
        <div className="contenedor grid grid-cols-12 gap-x-6 gap-y-10">
          <p className="antetitulo col-span-12" data-revelar>
            {proposito.antetitulo}
          </p>
          <h2 id="proposito" className="col-span-12 text-[length:var(--text-h1)] lg:col-span-9" data-revelar="lineas">
            {proposito.titulo}
          </h2>
          <div className="col-span-12 space-y-5 text-noche/80 md:col-span-7 md:col-start-6 lg:col-span-5 lg:col-start-8">
            {proposito.texto.map((t) => (
              <p key={t} data-revelar>
                {t}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Misión */}
      <section className="escena claro pb-[clamp(5rem,12vw,10rem)]" data-luz="lino" aria-labelledby="mision">
        <div className="contenedor">
          <h2 id="mision" className="antetitulo" data-revelar>
            {mision.antetitulo}
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {mision.items.map((m) => (
              <article key={m.para} className="rounded-[1.25rem] bg-lino-hondo p-7 sm:p-10" data-revelar>
                <h3 className="text-[length:var(--text-h2)]">{m.para}</h3>
                <p className="mt-5 text-noche/80">{m.texto}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Visión y hoja de ruta */}
      <section className="escena relative py-[clamp(5rem,12vw,10rem)]" data-luz="noche" aria-labelledby="vision">
        <div className="contenedor">
          <p className="antetitulo" data-revelar>
            {vision.antetitulo}
          </p>
          <h2 id="vision" className="mt-5 max-w-4xl text-[length:var(--text-h1)]" data-revelar="lineas">
            {vision.titulo}
          </h2>
          <p className="mt-6 max-w-xl text-hueso/80" data-revelar>
            {vision.bajada}
          </p>
          <div className="mt-[clamp(3rem,6vw,5rem)]">
            <MapaRuta etapas={vision.etapas} />
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="escena py-[clamp(5rem,12vw,10rem)]" data-luz="corteza" aria-labelledby="valores">
        <div className="contenedor">
          <h2 id="valores" className="antetitulo" data-revelar>
            {valores.antetitulo}
          </h2>
          <ol className="mt-10">
            {valores.items.map((v, i) => (
              <li key={v.titulo} className="pilar grid gap-4 border-t border-hueso/12 py-10 md:grid-cols-12 md:gap-6" data-encender>
                <span className="pilar-numero cifra text-[clamp(2.5rem,1.5rem+3vw,4.5rem)] md:col-span-2" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="md:col-span-4">
                  <h3 className="text-[length:var(--text-h2)]">{v.titulo}</h3>
                  {v.subtitulo && <p className="mt-2 text-luz">{v.subtitulo}</p>}
                </div>
                <p className="max-w-xl text-hueso/80 md:col-span-6">{v.texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Propuesta de valor */}
      <section className="escena claro py-[clamp(5rem,12vw,10rem)]" data-luz="lino" aria-labelledby="propuesta">
        <div className="contenedor">
          <p className="antetitulo" data-revelar>
            {propuesta.antetitulo}
          </p>
          <h2 id="propuesta" className="mt-5 text-[length:var(--text-h1)]" data-revelar="lineas">
            {propuesta.titulo}
          </h2>

          <div className="mt-12 grid grid-cols-12 gap-x-6 gap-y-10">
            <div className="col-span-12 lg:col-span-5">
              <h3 className="text-[length:var(--text-h3)]">{propuesta.disponibilidad.titulo}</h3>
              <p className="mt-3 text-noche/80">{propuesta.disponibilidad.texto}</p>
              <p className="mt-10 text-noche/80">{propuesta.nivelesIntro}</p>
            </div>
            <ol className="col-span-12 grid gap-3 sm:grid-cols-2 lg:col-span-7">
              {propuesta.niveles.map((n) => (
                <li key={n.n} className="relative overflow-hidden rounded-[1.25rem] bg-noche p-6 text-hueso" data-revelar data-retraso={n.n * 0.06}>
                  {/* La luz crece con el nivel */}
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-1/2 -right-1/4 size-[120%] rounded-full bg-[radial-gradient(circle,rgb(255_195_122/0.55)_0%,transparent_60%)]"
                    style={{ opacity: 0.2 + n.n * 0.2 }}
                  />
                  <p className="relative text-[length:var(--text-dato)] font-semibold uppercase tracking-[0.18em] text-ambar">Nivel {n.n}</p>
                  <h4 className="titulo relative mt-3 text-[length:var(--text-h3)]">{n.nombre}</h4>
                  <p className="relative mt-3 text-hueso/80">{n.texto}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-[clamp(4rem,8vw,7rem)] grid gap-10 md:grid-cols-2">
            {[
              { ...propuesta.inclusivas, foto: fotos.kids },
              { ...propuesta.hospitality, foto: fotos.lounge },
            ].map((b) => (
              <article key={b.titulo} data-revelar>
                <div className="relative aspect-[16/10] overflow-hidden rounded-[1.25rem]">
                  <Image src={b.foto} alt={b.alt} fill placeholder="blur" sizes="(min-width: 768px) 45vw, 100vw" className="object-cover" />
                </div>
                <h3 className="mt-6 text-[length:var(--text-h3)]">{b.titulo}</h3>
                <p className="mt-3 max-w-lg text-noche/80">{b.texto}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CierrePagina />
    </>
  );
}
