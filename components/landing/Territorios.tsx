"use client";

// Bloque 7, columna izquierda: los territorios de la Etapa 1 con filtro por país. Al filtrar,
// las filas que quedan se reacomodan con Flip y las que salen se desvanecen.

import { useRef, useState } from "react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { territorios as t } from "@/content/landing";
import { duracion, ease, movimientoReducido } from "@/lib/motion";

gsap.registerPlugin(Flip);

const tono: Record<string, string> = {
  Disponible: "text-[#2c6a3f]",
  "Cupos Limitados": "text-ambar-hondo",
  "En Evaluación": "text-noche/55",
};

export default function Territorios() {
  const [filtro, setFiltro] = useState("todos");
  const lista = useRef<HTMLUListElement>(null);

  const filtrar = (id: string) => {
    if (id === filtro) return;
    setFiltro(id);
    const items = Array.from(lista.current?.children ?? []) as HTMLElement[];
    const visible = (el: HTMLElement) => id === "todos" || el.dataset.pais === id;
    if (movimientoReducido()) {
      items.forEach((el) => (el.style.display = visible(el) ? "" : "none"));
      return;
    }
    const estado = Flip.getState(items);
    items.forEach((el) => (el.style.display = visible(el) ? "" : "none"));
    Flip.from(estado, {
      duration: duracion.corta,
      ease: ease.cambio,
      absolute: true,
      stagger: 0.03,
      onEnter: (els) => gsap.fromTo(els, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: duracion.corta, ease: ease.salida, stagger: 0.05 }),
      onLeave: (els) => gsap.to(els, { opacity: 0, duration: 0.2 }),
    });
  };

  return (
    <div>
      <p className="antetitulo" data-revelar>
        {t.antetitulo}
      </p>
      <h2 id="territorios-titulo" className="mt-5 text-[length:var(--text-h2)]" data-revelar="palabras">
        {t.titulo}
      </h2>
      <p className="suave mt-5 max-w-lg" data-revelar>
        {t.bajada}
      </p>

      <div role="group" aria-label="Filtrar por país" className="mt-8 flex flex-wrap gap-2" data-revelar>
        {t.filtros.map((f) => (
          <button
            key={f.id}
            type="button"
            aria-pressed={filtro === f.id}
            onClick={() => filtrar(f.id)}
            className={`min-h-[2.75rem] rounded-full px-5 text-[length:var(--text-chico)] font-semibold transition-colors duration-300 ${
              filtro === f.id ? "bg-noche text-hueso" : "bg-noche/[0.07] text-noche/80 hover:bg-noche/[0.12]"
            }`}
          >
            {f.etiqueta}
          </button>
        ))}
      </div>

      <ul ref={lista} className="relative mt-6" data-escalonar="0.06">
        {t.lista.map((z) => (
          <li key={z.nombre} data-pais={z.pais} className="regla grid grid-cols-[2.25rem_1fr_auto] items-baseline gap-x-3 border-t py-4">
            <span className="cifra text-[length:var(--text-dato)] text-noche/55">{z.pais}</span>
            <span>
              <span className="block font-semibold leading-snug">{z.nombre}</span>
              <span className="suave mt-1 block text-[length:var(--text-chico)]">{z.formato}</span>
            </span>
            <span className={`text-right text-[length:var(--text-dato)] font-semibold uppercase tracking-[0.1em] ${tono[z.estado] ?? ""}`}>{z.estado}</span>
          </li>
        ))}
      </ul>

      <p className="regla suave border-t pt-5 text-[length:var(--text-chico)]">
        <strong className="font-semibold text-noche">{t.etapa2[0]}</strong>
        {t.etapa2[1]}
      </p>
    </div>
  );
}
