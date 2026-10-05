"use client";

// "¿Fosque Reformer es para vos?": cuatro afirmaciones para marcar. Cada una enciende un punto
// y la respuesta cambia según cuántas marcaste. Lleva al test completo (/candidato).

import Link from "next/link";
import { useState } from "react";
import { quiz } from "@/content/home";
import { accesos } from "@/content/sitio";

export default function Quiz() {
  const [marcadas, setMarcadas] = useState<boolean[]>(() => quiz.afirmaciones.map(() => false));
  const total = marcadas.filter(Boolean).length;

  return (
    <section className="escena claro relative py-[clamp(5rem,12vw,10rem)]" data-luz="arena" aria-labelledby="quiz-titulo">
      <div className="contenedor grid grid-cols-12 gap-x-6 gap-y-10">
        <div className="col-span-12 lg:col-span-5">
          <p className="antetitulo" data-revelar>
            {quiz.antetitulo}
          </p>
          <h2 id="quiz-titulo" className="mt-5 text-[length:var(--text-h1)]" data-revelar="lineas">
            {quiz.titulo}
          </h2>
          <div className="mt-10 flex items-center gap-3" aria-hidden="true">
            {marcadas.map((m, i) => (
              <span
                key={i}
                className={`size-3 rounded-full transition-all duration-500 ${m ? "bg-ambar shadow-[0_0_16px_4px_rgb(244_169_80/0.6)]" : "bg-noche/15"}`}
              />
            ))}
          </div>
          <p className="mt-5 min-h-[3.2em] max-w-sm text-noche/80" aria-live="polite">
            {quiz.respuestas[total]}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href={accesos.candidato.href} className="boton boton-linea">
              {quiz.cta}
            </Link>
            {total >= 3 && (
              <Link href={accesos.aplicar.href} className="boton bg-noche text-luz hover:bg-corteza">
                Aplicar ahora
              </Link>
            )}
          </div>
        </div>

        <fieldset className="col-span-12 lg:col-span-6 lg:col-start-7">
          <legend className="sr-only">Afirmaciones para marcar</legend>
          <ul className="space-y-3">
            {quiz.afirmaciones.map((a, i) => (
              <li key={i}>
                <label
                  className={`flex cursor-pointer items-start gap-5 rounded-[1rem] border p-5 transition-colors duration-300 sm:p-6 ${
                    marcadas[i] ? "border-noche bg-noche text-hueso" : "border-noche/15 bg-lino hover:border-noche/40"
                  }`}
                >
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    checked={marcadas[i]}
                    onChange={() => setMarcadas((prev) => prev.map((v, j) => (j === i ? !v : v)))}
                  />
                  <span
                    aria-hidden="true"
                    className={`mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border transition-colors peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ambar-hondo ${
                      marcadas[i] ? "border-ambar bg-ambar text-noche" : "border-noche/30"
                    }`}
                  >
                    {marcadas[i] && (
                      <svg viewBox="0 0 12 12" className="size-3" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M2.5 6.5 5 9l4.5-6" />
                      </svg>
                    )}
                  </span>
                  <span className="text-[length:var(--text-cuerpo)] leading-snug">{a}</span>
                </label>
              </li>
            ))}
          </ul>
        </fieldset>
      </div>
    </section>
  );
}
