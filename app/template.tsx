"use client";

// Transición entre páginas: el template se vuelve a montar en cada navegación. Una cortina de
// luz cálida que estaba cubriendo la pantalla se retira hacia arriba y la página nueva entra
// con un desplazamiento corto. En la carga inicial no corre (para eso está el preloader).

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { duracion, ease, movimientoReducido } from "@/lib/motion";

let primeraCarga = true;

export default function Template({ children }: { children: React.ReactNode }) {
  const pagina = useRef<HTMLDivElement>(null);
  const cortina = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (primeraCarga) {
      primeraCarga = false;
      return;
    }
    if (movimientoReducido()) {
      gsap.fromTo(pagina.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
      return;
    }
    const tl = gsap.timeline();
    tl.set(cortina.current, { scaleY: 1, transformOrigin: "top" })
      .to(cortina.current, { scaleY: 0, duration: duracion.larga * 0.75, ease: ease.cambio })
      .fromTo(pagina.current, { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: duracion.media, ease: ease.salida, clearProps: "transform,opacity" }, 0.2);
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <>
      <div ref={cortina} className="cortina" aria-hidden="true" />
      <div ref={pagina}>{children}</div>
    </>
  );
}
