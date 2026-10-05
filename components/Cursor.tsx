"use client";

// Cursor de luz: un aro que aparece SÓLO sobre lo interactivo. El cursor del sistema no se
// oculta nunca (es sutil, no un reemplazo). Sólo escritorio con puntero fino y sin
// reduced-motion.

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { consultaEscritorio, movimientoReducido } from "@/lib/motion";

const INTERACTIVO = "a, button, [role='button'], input[type='range'], label[for], summary, [data-cursor]";

export default function Cursor() {
  const aro = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (movimientoReducido() || !window.matchMedia(consultaEscritorio).matches) return;
    const el = aro.current!;
    const x = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3.out" });
    const y = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3.out" });
    let encima = false;

    const mover = (e: PointerEvent) => {
      x(e.clientX);
      y(e.clientY);
      const sobre = !!(e.target as Element | null)?.closest?.(INTERACTIVO);
      if (sobre !== encima) {
        encima = sobre;
        gsap.to(el, { opacity: sobre ? 1 : 0, scale: sobre ? 1 : 0.4, duration: 0.3, ease: "power2.out" });
      }
    };
    const salir = () => {
      encima = false;
      gsap.to(el, { opacity: 0, scale: 0.4, duration: 0.2 });
    };
    window.addEventListener("pointermove", mover, { passive: true });
    document.documentElement.addEventListener("pointerleave", salir);
    return () => {
      window.removeEventListener("pointermove", mover);
      document.documentElement.removeEventListener("pointerleave", salir);
    };
  }, []);

  return <div ref={aro} className="cursor" aria-hidden="true" />;
}
