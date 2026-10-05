"use client";

// Los cuatro manuales como volúmenes: la tapa se abre (hover o foco en escritorio, al tocar o
// al cruzar el centro de la pantalla en mobile) y deja ver el índice. El índice está siempre en
// el DOM: el lector de pantalla lo lee aunque la tapa esté cerrada.

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { consultaEscritorio } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

type Manual = { letra: string; titulo: string; bajada: string; contenido: string[]; color: string };

export default function Volumenes({ items }: { items: Manual[] }) {
  const [abiertos, setAbiertos] = useState<Set<number>>(new Set());
  const raiz = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(`not ${consultaEscritorio}`, () => {
      gsap.utils.toArray<HTMLElement>("[data-volumen]", raiz.current).forEach((el, i) =>
        ScrollTrigger.create({
          trigger: el,
          start: "top 60%",
          end: "bottom 30%",
          onToggle: (s) =>
            setAbiertos((prev) => {
              const sig = new Set(prev);
              if (s.isActive) sig.add(i);
              else sig.delete(i);
              return sig;
            }),
        }),
      );
    });
    return () => mm.revert();
  }, []);

  const alternar = (i: number) =>
    setAbiertos((prev) => {
      const sig = new Set(prev);
      if (sig.has(i)) sig.delete(i);
      else sig.add(i);
      return sig;
    });

  return (
    <ul ref={raiz} className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((m, i) => (
        <li key={m.letra} data-volumen className={`volumen ${abiertos.has(i) ? "abierto" : ""}`}>
          <div className="volumen-libro">
            <div id={`volumen-${m.letra}`} className="volumen-pagina">
              <p className="text-[length:var(--text-dato)] font-semibold uppercase tracking-[0.18em] text-ambar-hondo">Módulo {m.letra}</p>
              <ul className="mt-4 space-y-2.5 text-[length:var(--text-chico)] leading-snug">
                {m.contenido.map((c) => (
                  <li key={c} className="flex gap-2.5">
                    <span aria-hidden="true" className="mt-[0.5em] size-1.5 shrink-0 rounded-full bg-ambar" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            <button
              type="button"
              className="volumen-tapa"
              style={{ "--tapa": m.color } as React.CSSProperties}
              aria-expanded={abiertos.has(i)}
              aria-controls={`volumen-${m.letra}`}
              onClick={() => alternar(i)}
            >
              <span className="titulo text-[clamp(5rem,3rem+6vw,8rem)] leading-none text-luz">{m.letra}</span>
              <span className="mt-auto text-left">
                <span className="titulo block text-[length:var(--text-h3)] leading-tight text-hueso">{m.titulo}</span>
                <span className="mt-2 block text-[length:var(--text-dato)] font-semibold uppercase tracking-[0.16em] text-hueso/70">{m.bajada}</span>
              </span>
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
