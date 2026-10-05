"use client";

// Cadena de importación directa: fábrica → importación → sala. Un punto de luz recorre el
// trazo con el scroll y cada tramo se enciende cuando llega. Reduced-motion: todo encendido.

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { movimientoReducido } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const NODOS = [80, 500, 920];
const TRAZO = "M80 100 C 220 20, 360 180, 500 100 S 780 20, 920 100";

export default function Cadena({ tramos }: { tramos: string[] }) {
  const raiz = useRef<HTMLDivElement>(null);
  const linea = useRef<SVGPathElement>(null);
  const luz = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const path = linea.current!;
    const largo = path.getTotalLength();
    const nodos = raiz.current!.querySelectorAll<SVGGElement>("[data-nodo]");
    const textos = raiz.current!.querySelectorAll<HTMLElement>("[data-tramo]");
    const encender = (p: number) => {
      const x = 80 + p * 840;
      nodos.forEach((n, i) => n.classList.toggle("nodo-on", x >= NODOS[i] - 2));
      textos.forEach((t, i) => t.classList.toggle("tramo-on", x >= NODOS[i] - 2));
    };
    if (movimientoReducido()) {
      path.style.strokeDashoffset = "0";
      encender(1);
      return;
    }
    path.style.strokeDasharray = `${largo}`;
    const ctx = gsap.context(() => {
      const estado = { p: 0 };
      gsap.to(estado, {
        p: 1,
        ease: "none",
        scrollTrigger: { trigger: raiz.current, start: "top 70%", end: "bottom 45%", scrub: 0.5 },
        onUpdate: () => {
          path.style.strokeDashoffset = String(largo * (1 - estado.p));
          const pt = path.getPointAtLength(largo * estado.p);
          luz.current?.setAttribute("cx", String(pt.x));
          luz.current?.setAttribute("cy", String(pt.y));
          encender(estado.p);
        },
      });
    }, raiz);
    encender(0);
    path.style.strokeDashoffset = String(largo);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={raiz}>
      <svg viewBox="0 0 1000 200" className="w-full" aria-hidden="true">
        <path d={TRAZO} fill="none" stroke="rgb(239 231 221 / 0.14)" strokeWidth="2" strokeDasharray="3 9" />
        <path ref={linea} d={TRAZO} fill="none" stroke="var(--color-luz)" strokeWidth="3" style={{ filter: "drop-shadow(0 0 6px rgb(255 195 122 / 0.7))" }} />
        {NODOS.map((x) => (
          <g key={x} data-nodo className="nodo">
            <circle cx={x} cy="100" r="26" className="nodo-halo" />
            <circle cx={x} cy="100" r="9" className="nodo-centro" />
          </g>
        ))}
        <circle ref={luz} cx="80" cy="100" r="7" fill="#fff4e0" style={{ filter: "drop-shadow(0 0 10px #ffc37a)" }} />
      </svg>
      <ol className="mt-4 grid grid-cols-3 gap-4 text-center">
        {tramos.map((t, i) => (
          <li key={t} data-tramo className="tramo">
            <span className="cifra block text-[length:var(--text-dato)] tracking-[0.18em] text-ambar">0{i + 1}</span>
            <span className="titulo mt-1 block text-[clamp(1rem,0.8rem+1vw,1.5rem)]">{t}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
