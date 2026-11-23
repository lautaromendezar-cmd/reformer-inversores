"use client";

// Bloque 3: la comparativa global, sobre fondo oscuro. Tabla real (accesible) con filas
// alternadas; al pasar el mouse por una columna, la columna entera se ilumina. La de Fosque va
// destacada en ámbar desde el principio. En tablet se desliza de costado; en celular la tabla se
// reemplaza por una tarjeta por variable. Los estilos de .comparativa están en globals.css.

import { useState } from "react";
import { comparativa as t } from "@/content/landing";

const FOSQUE = t.columnas.length; // índice de la columna propia

export default function Comparativa() {
  const [col, setCol] = useState<number | null>(null);
  const sobre = (e: React.MouseEvent) => {
    const celda = (e.target as HTMLElement).closest<HTMLElement>("[data-col]");
    setCol(celda ? Number(celda.dataset.col) : null);
  };
  const activa = (i: number) => (col === i ? "activa" : "");

  return (
    <section id="comparativa" className="oscuro bloque bg-corteza" aria-labelledby="comparativa-titulo">
      <div className="contenedor">
        <div className="grid grid-cols-12 gap-x-6 gap-y-5">
          <div className="col-span-12 lg:col-span-8">
            <p className="antetitulo" data-revelar>
              {t.antetitulo}
            </p>
            <h2 id="comparativa-titulo" className="mt-5 text-[length:var(--text-h2)]" data-revelar="palabras">
              {t.titulo}
            </h2>
          </div>
          <p className="suave col-span-12 max-w-md self-end lg:col-span-4" data-revelar>
            {t.bajada}
          </p>
        </div>

        {/* Celular: una tarjeta por variable, con Fosque destacado arriba y los tres competidores
            abajo. Se lee de arriba abajo, sin deslizar. */}
        <ol className="mt-10 space-y-4 md:hidden" data-escalonar="0.06">
          {t.filas.map((f, i) => (
            <li key={f.variable} className="overflow-hidden rounded-[1.25rem] bg-hueso/[0.05]">
              <p className="flex items-baseline gap-2 px-5 pt-5 font-semibold">
                <span className="cifra text-ambar">{i + 1}</span>
                {f.variable}
              </p>
              <div className="mx-3 mt-4 rounded-[0.875rem] bg-ambar/[0.16] px-4 py-3.5">
                <p className="text-[length:var(--text-dato)] font-semibold uppercase tracking-[0.16em] text-ambar">{t.propia.nombre}</p>
                <p className="mt-1.5 text-[length:var(--text-chico)]">
                  <strong className="font-semibold text-luz">{f.fosque[0]}</strong>
                  {f.fosque[1]}
                </p>
              </div>
              <dl className="px-5 pb-4 pt-2 text-[length:var(--text-chico)]">
                {t.columnas.map((c, j) => (
                  <div key={c.nombre} className="regla grid grid-cols-[6.5rem_1fr] gap-3 border-t py-2.5 first:border-t-0">
                    <dt className="text-[length:var(--text-dato)] font-semibold uppercase tracking-[0.08em] text-hueso/60">{c.nombre}</dt>
                    <dd className="suave">{f.otras[j]}</dd>
                  </div>
                ))}
              </dl>
            </li>
          ))}
        </ol>

        {/* Tablet y escritorio: la tabla. El margen negativo deja que llegue al borde al deslizar */}
        <div className="-mx-[clamp(1rem,2.6vw,3rem)] mt-14 hidden overflow-x-auto px-[clamp(1rem,2.6vw,3rem)] pb-4 md:block" tabIndex={0} role="region" aria-labelledby="comparativa-titulo">
          <table className="comparativa text-[length:var(--text-chico)]" onMouseOver={sobre} onMouseLeave={() => setCol(null)}>
            <thead>
              <tr>
                <th scope="col" className="variable text-[length:var(--text-dato)] font-semibold uppercase tracking-[0.18em] text-hueso/55">
                  Variable clave
                </th>
                {t.columnas.map((c, j) => (
                  <th key={c.nombre} scope="col" data-col={j} className={activa(j)}>
                    <span className="block font-semibold uppercase tracking-[0.06em]">{c.nombre}</span>
                    <span className="mt-1 block text-[length:var(--text-dato)] font-normal uppercase tracking-[0.12em] text-hueso/55">{c.origen}</span>
                  </th>
                ))}
                <th scope="col" data-col={FOSQUE} className={`propia ${activa(FOSQUE)}`}>
                  <span className="block text-[length:var(--text-dato)] font-semibold uppercase tracking-[0.16em] text-ambar">{t.propia.origen}</span>
                  <span className="titulo mt-1 block text-[1.375rem]">{t.propia.nombre}</span>
                </th>
              </tr>
            </thead>
            <tbody data-escalonar="0.07">
              {t.filas.map((f, i) => (
                <tr key={f.variable}>
                  <th scope="row" className="variable font-semibold">
                    <span className="cifra mr-2 text-ambar">{i + 1}</span>
                    {f.variable}
                  </th>
                  {f.otras.map((o, j) => (
                    <td key={j} data-col={j} className={`suave ${activa(j)}`}>
                      {o}
                    </td>
                  ))}
                  <td data-col={FOSQUE} className={`propia ${activa(FOSQUE)}`}>
                    <strong className="font-semibold text-luz">{f.fosque[0]}</strong>
                    {f.fosque[1]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
