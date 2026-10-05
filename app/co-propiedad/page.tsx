import type { Metadata } from "next";
import Link from "next/link";
import PortadaInterna from "@/components/PortadaInterna";
import CierrePagina from "@/components/CierrePagina";
import Comparativa from "@/components/Comparativa";
import Simulador from "@/components/copropiedad/Simulador";
import { FotoEquipo } from "@/components/home/CoPropiedad";
import { portada, vesting, comparativa, roles } from "@/content/copropiedad";
import { fotos } from "@/lib/imagenes";

export const metadata: Metadata = { title: "Co-Propiedad", description: portada.bajada };

export default function CoPropiedadPagina() {
  return (
    <>
      <PortadaInterna antetitulo={portada.antetitulo} titulo={portada.titulo} bajada={portada.bajada} foto={fotos.equipo} alt={portada.alt} posicion="50% 62%" />

      {/* Programa de vesting */}
      <section className="escena claro py-[clamp(5rem,12vw,10rem)]" data-luz="lino" aria-labelledby="vesting">
        <div className="contenedor grid grid-cols-12 gap-x-6 gap-y-12">
          <div className="col-span-12 lg:col-span-6">
            <p className="antetitulo" data-revelar>
              {vesting.antetitulo}
            </p>
            <h2 id="vesting" className="mt-5 text-[length:var(--text-h1)]" data-revelar="lineas">
              {vesting.titulo}
            </h2>
            <div className="mt-6 max-w-xl space-y-5 text-noche/80">
              {vesting.texto.map((t) => (
                <p key={t} data-revelar>
                  {t}
                </p>
              ))}
            </div>
            <blockquote className="titulo mt-10 max-w-lg text-[length:var(--text-h2)] leading-tight text-ambar-hondo" data-revelar>
              «{vesting.cita}»
            </blockquote>
          </div>
          <div className="col-span-12 lg:col-span-6" data-revelar>
            <Simulador textos={vesting.simulador} />
          </div>
        </div>
      </section>

      {/* Comparativa */}
      <section className="escena claro py-[clamp(5rem,12vw,10rem)]" data-luz="arena" aria-labelledby="comparativa">
        <div className="contenedor grid grid-cols-12 gap-x-6 gap-y-12">
          <div className="col-span-12 lg:col-span-4">
            <FotoEquipo alt="El equipo de una sucursal Fosque, socios de su sala" />
          </div>
          <div className="col-span-12 lg:col-span-8 lg:pl-6">
            <p className="antetitulo" data-revelar>
              {comparativa.antetitulo}
            </p>
            <h2 id="comparativa" className="mt-5 text-[length:var(--text-h1)]" data-revelar="lineas">
              {comparativa.titulo}
            </h2>
            <div className="mt-10">
              <Comparativa columnas={comparativa.columnas} filas={comparativa.filas} />
            </div>
          </div>
        </div>
      </section>

      {/* Quién es quién */}
      <section className="escena py-[clamp(5rem,12vw,10rem)]" data-luz="corteza" aria-labelledby="roles">
        <div className="contenedor">
          <p className="antetitulo" data-revelar>
            {roles.antetitulo}
          </p>
          <h2 id="roles" className="mt-5 text-[length:var(--text-h1)]" data-revelar="lineas">
            {roles.titulo}
          </h2>
          <ol className="mt-12 grid gap-4 md:grid-cols-3">
            {roles.items.map((r, i) => (
              <li key={r.nombre} className="pilar rounded-[1.25rem] border border-hueso/12 p-7" data-encender>
                <span className="pilar-numero cifra block text-[clamp(2.5rem,1.5rem+3vw,4rem)]" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-[length:var(--text-h3)]">{r.nombre}</h3>
                <p className="mt-3 text-hueso/80">{r.texto}</p>
              </li>
            ))}
          </ol>
          <div className="mt-14 flex flex-wrap items-center gap-3">
            <p className="mr-2 text-hueso/75">{roles.perfilesTitulo}:</p>
            {roles.perfiles.map((p) => (
              <Link key={p} href={`/aplicar?perfil=${encodeURIComponent(p)}`} className="boton boton-linea text-hueso">
                {p}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CierrePagina />
    </>
  );
}
