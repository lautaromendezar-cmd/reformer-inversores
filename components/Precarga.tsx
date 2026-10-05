"use client";

// Preloader breve (≤ 1,5 s): isotipo y una línea de luz que se completa. Sólo en la primera
// visita de la sesión: el script inline del <head> decide si se muestra (clase `precargando`)
// y tiene su propio respaldo por si este componente no llega a correr.

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Isotipo from "./Isotipo";
import { avisarPrecargaLista } from "@/lib/precarga";
import { movimientoReducido } from "@/lib/motion";

export default function Precarga() {
  const capa = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    if (!html.classList.contains("precargando")) {
      avisarPrecargaLista();
      return;
    }
    window.clearTimeout((window as unknown as { __precargaRespaldo?: number }).__precargaRespaldo);
    try {
      sessionStorage.setItem("frp-visto", "1");
    } catch {}

    const terminar = () => {
      html.classList.remove("precargando");
      avisarPrecargaLista();
    };
    if (movimientoReducido()) {
      const t = window.setTimeout(terminar, 300);
      return () => window.clearTimeout(t);
    }
    const el = capa.current!;
    const tl = gsap.timeline({ onComplete: terminar });
    tl.fromTo(el.querySelector(".precarga-marca"), { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" })
      .to(el.querySelector(".precarga-linea"), { scaleX: 1, duration: 0.7, ease: "power2.inOut" }, 0.15)
      .to(el, { yPercent: -100, duration: 0.55, ease: "power3.inOut" }, 0.9);
    return () => {
      tl.kill();
      terminar();
    };
  }, []);

  return (
    <div ref={capa} className="precarga" aria-hidden="true">
      <div className="precarga-marca flex flex-col items-center gap-6">
        <Isotipo className="h-10 w-auto text-hueso" />
        <div className="precarga-linea" />
      </div>
    </div>
  );
}
