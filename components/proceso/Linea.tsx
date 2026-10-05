"use client";

// Los siete pasos. Escritorio: la sección se fija y los pasos corren en horizontal con el
// scroll; una línea de luz marca el avance. Mobile y reduced-motion: lista vertical, cada paso
// se enciende al cruzar el centro.

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { consultaEscritorio } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

type Paso = { titulo: string; texto?: string };

export default function Linea({ pasos }: { pasos: Paso[] }) {
  const raiz = useRef<HTMLElement>(null);
  const pista = useRef<HTMLOListElement>(null);
  const avance = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(`${consultaEscritorio} and (prefers-reduced-motion: no-preference)`, () => {
      const p = pista.current!;
      raiz.current!.classList.add("proceso-horizontal");
      const distancia = () => p.scrollWidth - window.innerWidth + 64;
      const items = gsap.utils.toArray<HTMLElement>("[data-paso]", p);
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: raiz.current,
          start: "top top",
          end: () => `+=${distancia()}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: (s) => {
            const activo = Math.min(items.length - 1, Math.floor(s.progress * items.length));
            items.forEach((el, i) => el.classList.toggle("encendido", i <= activo));
          },
        },
      });
      tl.to(p, { x: () => -distancia() }, 0).fromTo(avance.current, { scaleX: 0 }, { scaleX: 1 }, 0);
      return () => {
        items.forEach((el) => el.classList.remove("encendido"));
        raiz.current?.classList.remove("proceso-horizontal");
      };
    });
    // Mobile: vertical, cada paso se enciende al cruzar el centro
    mm.add(`not ${consultaEscritorio}`, () => {
      gsap.utils.toArray<HTMLElement>("[data-paso]", pista.current).forEach((el) =>
        ScrollTrigger.create({ trigger: el, start: "top 62%", end: "bottom 38%", toggleClass: { targets: el, className: "encendido" } }),
      );
    });
    // Reduced-motion en escritorio: todo encendido, sin pin
    mm.add(`${consultaEscritorio} and (prefers-reduced-motion: reduce)`, () => {
      const items = gsap.utils.toArray<HTMLElement>("[data-paso]", pista.current);
      items.forEach((el) => el.classList.add("encendido"));
      return () => items.forEach((el) => el.classList.remove("encendido"));
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={raiz} className="proceso escena relative overflow-hidden py-[clamp(4rem,10vw,8rem)]" data-luz="corteza" aria-label="Los siete pasos">
      <div className="contenedor">
        <div className="proceso-barra relative hidden h-px bg-hueso/12" aria-hidden="true">
          <div ref={avance} className="absolute inset-0 origin-left bg-luz shadow-[0_0_12px_rgb(255_195_122/0.8)]" style={{ transform: "scaleX(0)" }} />
        </div>
      </div>
      <ol ref={pista} className="proceso-pista contenedor flex flex-col gap-4">
        {pasos.map((p, i) => (
          <li
            key={p.titulo}
            data-paso
            className="pilar flex shrink-0 flex-col rounded-[1.25rem] border border-hueso/12 p-7"
          >
            <span className="pilar-numero cifra block text-[clamp(3.5rem,2rem+5vw,6.5rem)]" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h2 className="mt-auto pt-8 text-[length:var(--text-h2)]">
              <span className="sr-only">Paso {i + 1}: </span>
              {p.titulo}
            </h2>
            {p.texto && <p className="mt-4 text-hueso/80">{p.texto}</p>}
          </li>
        ))}
      </ol>
    </section>
  );
}
