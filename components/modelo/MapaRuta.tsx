"use client";

// Hoja de ruta: el mapa de Latinoamérica como grilla de Puntos de Luz (lib/mapa.generado.ts).
// El mapa queda fijo mientras pasan las tres etapas; cada etapa enciende sus países y la luz
// se propaga desde Buenos Aires hacia afuera (retardo por distancia, en CSS).
// Reduced-motion o sin JS: se ve la última etapa encendida y las tres etapas en texto.

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { mapa, puntos } from "@/lib/mapa.generado";
import { movimientoReducido } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

type Etapa = { anio: string; nombre: string; sucursales: number; texto: string; paises: string[] };

// Buenos Aires en coordenadas del mapa (grados desde la esquina noroeste)
const ORIGEN = { x: -58.4 + 118, y: 33 + 34.6 };

// Los 1.334 puntos agrupados por país y por banda de distancia a Buenos Aires: un <path> por
// grupo (~100 nodos en vez de 1.334). Cada banda se enciende con su retardo: la luz se propaga.
const RADIO = mapa.paso * 0.36;
const GRUPOS = (() => {
  const grupos = new Map<string, { clave: string; pais: string; banda: number; d: string }>();
  for (const [x, y, pais] of puntos) {
    const banda = Math.floor(Math.hypot(x - ORIGEN.x, y - ORIGEN.y) / 6);
    const clave = `${pais}-${banda}`;
    const g = grupos.get(clave) ?? { clave, pais, banda, d: "" };
    g.d += `M${(x - RADIO).toFixed(2)} ${y}a${RADIO} ${RADIO} 0 1 0 ${2 * RADIO} 0a${RADIO} ${RADIO} 0 1 0 ${-2 * RADIO} 0`;
    grupos.set(clave, g);
  }
  return [...grupos.values()];
})();

export default function MapaRuta({ etapas }: { etapas: Etapa[] }) {
  const [activa, setActiva] = useState(etapas.length - 1);
  const raiz = useRef<HTMLDivElement>(null);
  const contador = useRef<HTMLSpanElement>(null);
  const valor = useRef({ n: etapas[etapas.length - 1].sucursales });

  useEffect(() => {
    if (movimientoReducido()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-etapa]").forEach((el, i) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 60%",
          end: "bottom 60%",
          onToggle: (s) => s.isActive && setActiva(i),
          onLeaveBack: () => i === 0 && setActiva(-1),
        });
      });
    }, raiz);
    // Arranca apagado hasta llegar a la primera etapa (sólo con JS y movimiento)
    const t = requestAnimationFrame(() => setActiva(-1));
    return () => {
      cancelAnimationFrame(t);
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    const fin = activa >= 0 ? etapas[activa].sucursales : 0;
    if (movimientoReducido()) {
      if (contador.current) contador.current.textContent = String(fin);
      return;
    }
    const tw = gsap.to(valor.current, {
      n: fin,
      duration: 1.2,
      ease: "power2.out",
      onUpdate: () => contador.current && (contador.current.textContent = String(Math.round(valor.current.n))),
    });
    return () => {
      tw.kill();
    };
  }, [activa, etapas]);

  const encendidos = new Set(activa >= 0 ? etapas[activa].paises : []);

  return (
    // Mobile: bloque simple, el mapa es sticky dentro del contenedor que también tiene las etapas.
    // Escritorio: grilla; la columna del mapa se estira y el sticky va adentro.
    <div ref={raiz} className="relative lg:grid lg:grid-cols-12 lg:gap-x-6">
      <div className="sticky top-[var(--alto-header)] z-10 -mx-4 bg-[var(--luz-fondo)] px-4 pb-4 pt-2 lg:static lg:col-span-6 lg:mx-0 lg:bg-transparent lg:p-0">
        <div className="lg:sticky lg:top-[calc(var(--alto-header)+1rem)]">
          <svg viewBox={`-1 -1 ${mapa.ancho + 2} ${mapa.alto + 2}`} className="mx-auto h-[38svh] w-auto lg:h-[min(78svh,46rem)]" role="img" aria-label={`Mapa de Latinoamérica con los países de la hoja de ruta encendidos: ${activa >= 0 ? etapas[activa].anio : "antes del año 1"}`}>
            {GRUPOS.map((g) => {
              const on = encendidos.has(g.pais);
              return (
                <path
                  key={g.clave}
                  d={g.d}
                  className={on ? (g.pais === "LA" ? "punto punto-tenue" : "punto punto-on") : "punto"}
                  style={{ transitionDelay: on ? `${g.banda * 70}ms` : "0ms" }}
                />
              );
            })}
          </svg>
          <p className="mt-2 text-center lg:mt-4">
            <span ref={contador} className="cifra text-[clamp(2.5rem,1.5rem+3vw,4rem)] text-luz">
              {etapas[etapas.length - 1].sucursales}
            </span>{" "}
            <span className="text-hueso/75">sucursales</span>
          </p>
        </div>
      </div>

      <ol className="lg:col-span-5 lg:col-start-8">
        {etapas.map((e, i) => (
          <li
            key={e.anio}
            data-etapa
            className={`flex min-h-[46svh] flex-col justify-center border-t py-12 transition-colors duration-500 lg:min-h-[70svh] ${
              activa === i ? "border-ambar" : "border-hueso/12"
            }`}
          >
            <p className="cifra text-[clamp(2.25rem,1.5rem+2.5vw,3.5rem)] text-luz">{e.anio}</p>
            <h3 className="mt-2 text-[length:var(--text-h2)]">{e.nombre}</h3>
            <p className="mt-4 max-w-md text-hueso/80">{e.texto}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
