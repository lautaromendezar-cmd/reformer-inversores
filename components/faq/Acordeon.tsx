"use client";

// Acordeón accesible: cada pregunta es un botón con aria-expanded que controla su región.
// La altura se anima con grid-template-rows (0fr → 1fr), sin medir nada en JS.

import { useId, useState } from "react";
import type { Pregunta } from "@/content/faq";

export default function Acordeon({ preguntas }: { preguntas: Pregunta[] }) {
  const [abierta, setAbierta] = useState<number | null>(0);
  const base = useId();

  return (
    <ul className="border-b border-noche/15">
      {preguntas.map((q, i) => {
        const on = abierta === i;
        const idBoton = `${base}-b${i}`;
        const idPanel = `${base}-p${i}`;
        return (
          <li key={q.p} className="border-t border-noche/15">
            <h3>
              <button
                id={idBoton}
                type="button"
                aria-expanded={on}
                aria-controls={idPanel}
                onClick={() => setAbierta(on ? null : i)}
                className="group flex w-full items-center justify-between gap-6 py-6 text-left"
              >
                <span className="titulo text-[length:var(--text-h3)] leading-snug">{q.p}</span>
                <span
                  aria-hidden="true"
                  className={`grid size-10 shrink-0 place-items-center rounded-full border transition-all duration-500 ${
                    on ? "rotate-45 border-ambar bg-ambar text-noche" : "border-noche/25 group-hover:border-noche/60"
                  }`}
                >
                  <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M8 2v12M2 8h12" />
                  </svg>
                </span>
              </button>
            </h3>
            <div
              id={idPanel}
              role="region"
              aria-labelledby={idBoton}
              className={`grid transition-[grid-template-rows] duration-500 ease-[var(--ease-salida)] ${on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
            >
              <div className="overflow-hidden" inert={!on}>
                <p className="max-w-3xl pb-7 text-noche/80">{q.r}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
