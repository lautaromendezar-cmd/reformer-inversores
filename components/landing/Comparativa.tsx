"use client";

// Bloque 3: la comparativa global, sobre fondo oscuro. Tabla real (accesible) con filas
// alternadas; al pasar el mouse por una columna, la columna entera se ilumina. La de Fosque va
// destacada en ámbar desde el principio. En mobile se desliza de costado y la primera columna
// queda fija. Los estilos de .comparativa están en globals.css.

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

        <p className="suave mt-8 text-[length:var(--text-dato)] lg:hidden" aria-hidden="true">
          {t.ayudaMovil} →
        </p>

        {/* El margen negativo deja que la tabla llegue al borde de la pantalla al deslizar */}
        <div className="-mx-[clamp(1rem,2.6vw,3rem)] mt-4 overflow-x-auto px-[clamp(1rem,2.6vw,3rem)] pb-4 lg:mt-14" tabIndex={0} role="region" aria-labelledby="comparativa-titulo">
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
