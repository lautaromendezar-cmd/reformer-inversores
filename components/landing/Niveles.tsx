"use client";

// Los 4 niveles: sección oscura a todo el ancho, con el encabezado centrado y el follaje de fondo.
// Escritorio: cuatro paneles en fila. Al pasar el mouse (o con foco / flechas) el panel se abre
// y los otros se angostan; el número crece, el medidor de intensidad se enciende, el contenido
// entra escalonado y una luz ámbar sigue al cursor dentro del panel.
// Mobile: acordeón vertical, se abre al tocar.
// Los estilos de .nivel están en globals.css.

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Follaje from "@/components/Follaje";
import { niveles } from "@/content/landing";
import { duracion, ease, movimientoReducido } from "@/lib/motion";

/** "Inicia — Adaptación & Biomecánica Base" → ["Inicia", "Adaptación & Biomecánica Base"] */
const partir = (t: string) => t.split(" — ");

export default function Niveles() {
  const [activo, setActivo] = useState(0);
  const lista = useRef<HTMLOListElement>(null);
  const primera = useRef(true);

  // El contenido tiene el ancho del panel ya abierto: así el texto no se reacomoda mientras abre
  useEffect(() => {
    const ul = lista.current;
    if (!ul) return;
    const medir = () => {
      const hueco = parseFloat(getComputedStyle(ul).columnGap) || 12;
      const n = niveles.lista.length;
      const abierto = ((ul.clientWidth - hueco * (n - 1)) * 4.2) / (4.2 + n - 1);
      ul.style.setProperty("--abierto", `${Math.floor(abierto)}px`);
    };
    medir();
    const ro = new ResizeObserver(medir);
    ro.observe(ul);
    return () => ro.disconnect();
  }, []);

  // El contenido del panel que se abre entra escalonado
  useEffect(() => {
    if (primera.current) {
      primera.current = false;
      return;
    }
    const interior = lista.current?.querySelectorAll(".nivel")[activo]?.querySelector(".nivel-interior");
    if (!interior || movimientoReducido()) return;
    const tw = gsap.fromTo(interior.children, { y: 26, opacity: 0 }, { y: 0, opacity: 1, duration: duracion.media, ease: ease.salida, stagger: 0.07, delay: 0.22 });
    return () => {
      tw.progress(1).kill();
    };
  }, [activo]);

  // La luz sigue al cursor dentro del panel
  const iluminar = (e: React.PointerEvent<HTMLLIElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  const conTeclado = (e: React.KeyboardEvent) => {
    const paso = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    if (!paso) return;
    e.preventDefault();
    const sig = (activo + paso + niveles.lista.length) % niveles.lista.length;
    setActivo(sig);
    lista.current?.querySelectorAll<HTMLButtonElement>(".nivel-cabeza")[sig]?.focus();
  };

  return (
    <section className="oscuro bloque relative isolate overflow-clip bg-noche" aria-labelledby="niveles-titulo">
      <Follaje composicion="esquina" tono="oscuro" />

      <div className="contenedor text-center">
        <p className="antetitulo" data-revelar>
          {niveles.antetitulo}
        </p>
        <h2 id="niveles-titulo" className="mx-auto mt-5 max-w-4xl text-[length:var(--text-h2)]" data-revelar="palabras">
          {niveles.titulo}
        </h2>
        <p className="suave mt-5" data-revelar>
          {niveles.ayuda}
        </p>
      </div>

      <div className="contenedor mt-[clamp(2.5rem,5vw,4.5rem)]">
        <ol ref={lista} onKeyDown={conTeclado} className="flex flex-col gap-3 lg:h-[clamp(30rem,62vh,36rem)] lg:flex-row" data-escalonar="0.09">
          {niveles.lista.map((n, i) => {
            const [nombre, resto] = partir(n.titulo);
            const abierto = i === activo;
            return (
              <li
                key={n.boton}
                className={`nivel ${abierto ? "abierto" : ""}`}
                onPointerMove={iluminar}
                onPointerEnter={(e) => e.pointerType === "mouse" && setActivo(i)}
              >
                <button type="button" className="nivel-cabeza" aria-expanded={abierto} aria-controls={`nivel-${i}`} onClick={() => setActivo(i)} onFocus={() => setActivo(i)}>
                  <span className="cifra nivel-numero">{String(i + 1).padStart(2, "0")}</span>
                  <span className="titulo nivel-nombre">{nombre}</span>
                  {/* Medidor de intensidad: una barra más por nivel */}
                  <span className="nivel-medidor" aria-hidden="true">
                    {niveles.lista.map((_, k) => (
                      <i key={k} className={k <= i ? "on" : ""} style={{ height: `${40 + k * 20}%` }} />
                    ))}
                  </span>
                </button>

                <div id={`nivel-${i}`} className="nivel-cuerpo" role="region" aria-label={n.titulo}>
                  <div className="nivel-interior">
                    <p className="antetitulo">{n.etiqueta}</p>
                    <h3 className="mt-3 text-[clamp(1.5rem,1.1rem+1.5vw,2.5rem)]">
                      {nombre}
                      {resto && <span className="mt-1 block text-[0.62em] text-hueso/75">{resto}</span>}
                    </h3>
                    <p className="suave mt-4 max-w-2xl text-left">{n.texto}</p>
                    <div className="regla mt-5 border-t pt-4">
                      <p className="antetitulo">Impacto comercial</p>
                      <p className="mt-2 max-w-2xl text-[length:var(--text-chico)]">{n.impacto}</p>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        <p className="suave mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center text-[length:var(--text-chico)]" data-revelar>
          <span>{niveles.pie[0]}</span>
          <span className="acento font-semibold">{niveles.pie[1]}</span>
        </p>
      </div>
    </section>
  );
}
