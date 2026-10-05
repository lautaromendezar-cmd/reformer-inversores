import type { Metadata } from "next";
import Link from "next/link";
import PortadaInterna from "@/components/PortadaInterna";
import CierrePagina from "@/components/CierrePagina";
import Calculadora from "@/components/inversion/Calculadora";
import Cadena from "@/components/inversion/Cadena";
import { portada, esquema, matriz, calculadora, importacion } from "@/content/inversion";
import { formatos, canon, canonPorReformer, canonIncluye, royaltyMensual, fondoMarketing, notaCapex, usd } from "@/content/economia";
import { afirmaciones } from "@/content/afirmaciones";
import { avisoLegal } from "@/content/sitio";
import { fotos } from "@/lib/imagenes";

export const metadata: Metadata = { title: "Inversión", description: portada.bajada };

const rango = (a: number, b: number) => `${usd(a)} – ${b.toLocaleString("es-AR")}`;

export default function Inversion() {
  const bloques = [
    { cifra: usd(canonPorReformer), texto: "Canon de ingreso por Reformer instalado", detalle: `Cubre ${canonIncluye.join(", ").toLowerCase()}.` },
    { cifra: `${royaltyMensual}%`, texto: "Royalty mensual operativo sobre la facturación bruta" },
    { cifra: `${fondoMarketing}%`, texto: "Fondo de marketing / Red de Embajadores", detalle: "Para posicionamiento global y generación de leads." },
    { cifra: `Mes ${afirmaciones.breakEven.desde} a ${afirmaciones.breakEven.hasta}`, texto: "Punto de equilibrio (break-even)", estimado: true },
    { cifra: `${afirmaciones.roi.desde} a ${afirmaciones.roi.hasta} meses`, texto: "Retorno de inversión (ROI)", estimado: true },
  ];

  return (
    <>
      <PortadaInterna antetitulo={portada.antetitulo} titulo={portada.titulo} bajada={portada.bajada} foto={fotos.salaInstructora} alt={portada.alt} posicion="40% 50%" />

      {/* Esquema económico */}
      <section className="escena claro py-[clamp(5rem,12vw,10rem)]" data-luz="lino" aria-labelledby="esquema">
        <div className="contenedor">
          <p className="antetitulo" data-revelar>
            {esquema.antetitulo}
          </p>
          <h2 id="esquema" className="mt-5 text-[length:var(--text-h1)]" data-revelar="lineas">
            {esquema.titulo}
          </h2>
          <ul className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {bloques.map((b) => (
              <li key={b.texto} className="cifra-caja border-t border-noche/15 pt-6" data-revelar>
                <p className="cifra text-[min(4.5rem,15cqi)] leading-none">{b.cifra}</p>
                <p className="mt-4 font-semibold">
                  {b.texto}
                  {b.estimado && <span className="ml-2 text-[length:var(--text-dato)] uppercase tracking-[0.14em] text-ambar-hondo">Estimado*</span>}
                </p>
                {b.detalle && <p className="mt-2 text-noche/75">{b.detalle}</p>}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Matriz */}
      <section className="escena claro pb-[clamp(5rem,12vw,10rem)]" data-luz="lino" aria-labelledby="matriz">
        <div className="contenedor">
          <p className="antetitulo" data-revelar>
            {matriz.antetitulo}
          </p>
          <h2 id="matriz" className="mt-5 text-[length:var(--text-h2)]" data-revelar>
            {matriz.titulo}
          </h2>
          {/* Escritorio: tabla. Mobile: una tarjeta por formato. */}
          <div className="mt-10 hidden overflow-hidden rounded-[1.25rem] border border-noche/15 lg:block">
            <table className="w-full border-collapse text-left">
              <thead className="bg-noche text-hueso">
                <tr>
                  {matriz.columnas.map((c) => (
                    <th key={c} scope="col" className="px-5 py-4 text-[length:var(--text-dato)] font-semibold uppercase tracking-[0.12em]">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {formatos.map((f) => (
                  <tr key={f.id} className="border-t border-noche/12 align-top">
                    <th scope="row" className="titulo px-5 py-5 text-[length:var(--text-h3)] font-[var(--peso-titulo)]">
                      {f.nombre}
                    </th>
                    <td className="cifra px-5 py-5">
                      {f.m2[0]} – {f.m2[1]} m²
                    </td>
                    <td className="cifra px-5 py-5">
                      {f.reformers[0]} a {f.reformers[1]}
                    </td>
                    <td className="cifra px-5 py-5">{rango(canon(f.reformers[0]), canon(f.reformers[1]))}</td>
                    <td className="cifra px-5 py-5">{rango(f.capex[0], f.capex[1])}</td>
                    <td className="px-5 py-5 text-noche/80">{f.enfoque}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ul className="mt-10 grid gap-4 md:grid-cols-3 lg:hidden">
            {formatos.map((f) => (
              <li key={f.id} className="rounded-[1.25rem] bg-lino-hondo p-6">
                <h3 className="text-[length:var(--text-h3)]">{f.nombre}</h3>
                <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-[length:var(--text-chico)]">
                  <dt className="text-noche/70">{matriz.columnas[1]}</dt>
                  <dd className="cifra">
                    {f.m2[0]} – {f.m2[1]} m²
                  </dd>
                  <dt className="text-noche/70">{matriz.columnas[2]}</dt>
                  <dd className="cifra">
                    {f.reformers[0]} a {f.reformers[1]}
                  </dd>
                  <dt className="text-noche/70">Canon</dt>
                  <dd className="cifra">{rango(canon(f.reformers[0]), canon(f.reformers[1]))}</dd>
                  <dt className="text-noche/70">CAPEX</dt>
                  <dd className="cifra">{rango(f.capex[0], f.capex[1])}</dd>
                </dl>
                <p className="mt-4 text-noche/80">{f.enfoque}</p>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-[length:var(--text-chico)] text-noche/70">*{notaCapex}</p>
        </div>
      </section>

      {/* Calculadora */}
      <section id="calculadora" className="escena scroll-mt-20 py-[clamp(5rem,12vw,10rem)]" data-luz="corteza" aria-labelledby="calc-titulo">
        <div className="contenedor">
          <p className="antetitulo" data-revelar>
            {calculadora.antetitulo}
          </p>
          <h2 id="calc-titulo" className="mt-5 text-[length:var(--text-h1)]" data-revelar="lineas">
            {calculadora.titulo}
          </h2>
          <div className="mt-12">
            <Calculadora />
          </div>
          <div id="aviso-inversion" className="mt-14 scroll-mt-28 rounded-[1.25rem] border border-hueso/15 p-6 sm:p-8">
            <h3 className="antetitulo">{avisoLegal.titulo}</h3>
            <p className="mt-3 max-w-4xl text-[length:var(--text-chico)] leading-relaxed text-hueso/75">{avisoLegal.texto}</p>
          </div>
        </div>
      </section>

      {/* Cadena de importación */}
      <section className="escena py-[clamp(5rem,12vw,10rem)]" data-luz="noche" aria-labelledby="importacion">
        <div className="contenedor">
          <div className="grid grid-cols-12 gap-x-6 gap-y-6">
            <div className="col-span-12 lg:col-span-6">
              <p className="antetitulo" data-revelar>
                {importacion.antetitulo}
              </p>
              <h2 id="importacion" className="mt-5 text-[length:var(--text-h1)]" data-revelar="lineas">
                {importacion.titulo}
              </h2>
            </div>
            <p className="col-span-12 max-w-xl self-end text-hueso/80 lg:col-span-5 lg:col-start-8" data-revelar>
              {importacion.bajada}
            </p>
          </div>
          <div className="mt-[clamp(3rem,6vw,5rem)]">
            <Cadena tramos={importacion.tramos} />
          </div>
          <Link href="/proceso" className="enlace-flecha mt-12 text-luz">
            Ver el proceso <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <CierrePagina />
    </>
  );
}
