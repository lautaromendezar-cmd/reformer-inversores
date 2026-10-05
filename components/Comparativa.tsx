"use client";

// Comparativa "franquicia del pasado" vs "ecosistema Fosque" (home y /co-propiedad).
// En escritorio se ven las dos columnas y el selector apaga una; en mobile se ve una sola
// columna por vez, así cada fila entra entera en pantalla.

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { duracion, ease, movimientoReducido } from "@/lib/motion";

type Fila = { tema: string; antes: string; ahora: string };

export default function Comparativa({ columnas, filas }: { columnas: string[]; filas: Fila[] }) {
  const [vista, setVista] = useState<0 | 1>(1);
  const tabla = useRef<HTMLDivElement>(null);
  const primera = useRef(true);

  useEffect(() => {
    if (primera.current) {
      primera.current = false;
      return;
    }
    if (movimientoReducido()) return;
    const celdas = tabla.current?.querySelectorAll(`[data-col="${vista}"]`);
    if (celdas?.length) gsap.fromTo(celdas, { opacity: 0.2, y: 10 }, { opacity: 1, y: 0, duration: duracion.corta, ease: ease.salida, stagger: 0.05 });
  }, [vista]);

  return (
    <div>
      <div role="group" aria-label="Comparar modelos" className="inline-flex rounded-full border border-noche/20 p-1">
        {columnas.map((c, i) => (
          <button
            key={c}
            type="button"
            aria-pressed={vista === i}
            onClick={() => setVista(i as 0 | 1)}
            className={`rounded-full px-4 py-2.5 text-[length:var(--text-chico)] font-semibold transition-colors duration-300 sm:px-5 ${
              vista === i ? (i === 1 ? "bg-noche text-luz" : "bg-noche/80 text-hueso") : "text-noche/70 hover:text-noche"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div ref={tabla} className="mt-8">
        <div className="hidden grid-cols-[9rem_1fr_1.4fr] gap-x-6 pb-3 text-[length:var(--text-dato)] font-semibold uppercase tracking-[0.14em] text-noche/70 md:grid">
          <span />
          {columnas.map((c) => (
            <span key={c}>{c}</span>
          ))}
        </div>
        <dl>
          {filas.map((f) => (
            <div key={f.tema} className="grid gap-x-6 gap-y-1 border-t border-noche/15 py-5 md:grid-cols-[9rem_1fr_1.4fr]">
              <dt className="font-semibold">{f.tema}</dt>
              <dd data-col="0" className={vista === 0 ? "block text-noche" : "hidden text-noche/65 line-through decoration-noche/40 md:block"}>
                {f.antes}
              </dd>
              <dd data-col="1" className={vista === 1 ? "block font-semibold text-noche" : "hidden text-noche/65 md:block"}>
                {vista === 1 && <span aria-hidden="true" className="mr-2 inline-block size-1.5 -translate-y-0.5 rounded-full bg-ambar shadow-[0_0_10px_2px_rgb(244_169_80/0.7)]" />}
                {f.ahora}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
