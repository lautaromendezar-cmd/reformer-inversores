"use client";

// Mural: la pieza "Propuesta Luxury" del manual de marca (silueta a contraluz sobre un paisaje),
// armada en capas para que esté viva sin ser un video:
//   1. el paisaje (se aleja apenas con el scroll)
//   2. la luz de fondo, que respira
//   3. dos bancos de niebla que derivan en sentidos opuestos
//   4. la figura, con su sombra
// El mouse corre las capas según su profundidad (paisaje poco, figura más) y mueve la luz.
// Se pausa fuera de pantalla. Con "reducir movimiento" queda quieto. En táctil sólo deriva.
//
// Uso: primer hijo de una sección `relative isolate overflow-clip`, con el contenido encima.
// La figura se apoya en el piso del paisaje: va abajo a la derecha.

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { movimientoReducido } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

type Props = { paisaje: StaticImageData; figura: StaticImageData; alt: string };

export default function Mural({ paisaje, figura, alt }: Props) {
  const raiz = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = raiz.current;
    if (!el || movimientoReducido()) return;
    const quitar: (() => void)[] = [];
    const ctx = gsap.context(() => {
      // Lo que se mueve solo
      const bucles = [
        gsap.fromTo("[data-mural-niebla='a']", { xPercent: -16 }, { xPercent: 4, duration: 46, ease: "sine.inOut", repeat: -1, yoyo: true }),
        gsap.fromTo("[data-mural-niebla='b']", { xPercent: 6 }, { xPercent: -14, duration: 61, ease: "sine.inOut", repeat: -1, yoyo: true }),
        gsap.fromTo("[data-mural-luz]", { opacity: 0.55, scale: 1 }, { opacity: 1, scale: 1.08, duration: 7, ease: "sine.inOut", repeat: -1, yoyo: true }),
      ];
      let enPantalla = true;
      const io = new IntersectionObserver(([e]) => {
        enPantalla = e.isIntersecting;
        bucles.forEach((t) => (enPantalla ? t.resume() : t.pause()));
      });
      io.observe(el);
      quitar.push(() => io.disconnect());

      // Con el scroll: el paisaje se aleja y la figura termina de apoyarse
      gsap.fromTo("[data-mural-zoom]", { scale: 1.16 }, { scale: 1.02, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
      gsap.fromTo(
        "[data-mural-entra]",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.6, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 55%", once: true } },
      );

      // El mouse: sólo con puntero fino
      if (!window.matchMedia("(pointer: fine)").matches) return;
      const capas = gsap.utils.toArray<HTMLElement>("[data-mural-capa]").map((c) => ({
        p: Number(c.dataset.muralCapa),
        x: gsap.quickTo(c, "x", { duration: 1.4, ease: "power3.out" }),
        y: gsap.quickTo(c, "y", { duration: 1.4, ease: "power3.out" }),
      }));
      const mover = (e: PointerEvent) => {
        if (!enPantalla) return;
        const r = el.getBoundingClientRect();
        if (e.clientY < r.top || e.clientY > r.bottom) return;
        const nx = ((e.clientX - r.left) / r.width - 0.5) * 2;
        const ny = ((e.clientY - r.top) / r.height - 0.5) * 2;
        capas.forEach((c) => {
          c.x(-nx * c.p);
          c.y(-ny * c.p * 0.5);
        });
      };
      window.addEventListener("pointermove", mover, { passive: true });
      quitar.push(() => window.removeEventListener("pointermove", mover));
    }, el);
    return () => {
      quitar.forEach((f) => f());
      ctx.revert();
    };
  }, []);

  return (
    <div ref={raiz} className="absolute inset-0 -z-10 overflow-hidden">
      {/* 1 · El paisaje. Anclado abajo: el piso siempre queda al pie de la sección */}
      <div data-mural-capa="10" className="absolute -inset-[3%] will-change-transform">
        <div data-mural-zoom className="absolute inset-0 origin-[50%_78%] will-change-transform">
          <Image src={paisaje} alt="" fill placeholder="blur" sizes="110vw" className="object-cover object-bottom" />
        </div>
      </div>

      {/* 2 · La luz de fondo */}
      <div
        data-mural-luz
        data-mural-capa="18"
        aria-hidden="true"
        className="absolute left-[38%] top-[-18%] h-[75%] w-[60%] mix-blend-screen will-change-transform"
        style={{ background: "radial-gradient(closest-side, rgb(255 226 190 / 0.5) 0%, rgb(255 205 150 / 0.14) 45%, transparent 75%)" }}
      />

      {/* 3 · La niebla: dos bancos que derivan */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-[16%] h-[46%] mix-blend-screen">
        <div
          data-mural-niebla="a"
          className="absolute inset-y-0 -left-[30%] w-[170%] opacity-70 blur-2xl will-change-transform"
          style={{
            background:
              "radial-gradient(22% 38% at 18% 62%, rgb(255 240 222 / 0.34), transparent 70%), radial-gradient(26% 30% at 47% 78%, rgb(255 240 222 / 0.3), transparent 70%), radial-gradient(20% 42% at 78% 58%, rgb(255 240 222 / 0.28), transparent 70%)",
          }}
        />
        <div
          data-mural-niebla="b"
          className="absolute inset-y-0 -left-[30%] w-[170%] opacity-60 blur-3xl will-change-transform"
          style={{
            background:
              "radial-gradient(30% 34% at 32% 82%, rgb(255 232 208 / 0.3), transparent 70%), radial-gradient(24% 40% at 64% 70%, rgb(255 232 208 / 0.26), transparent 70%), radial-gradient(18% 30% at 92% 84%, rgb(255 232 208 / 0.24), transparent 70%)",
          }}
        />
      </div>

      {/* Velo para el texto: oscurece la izquierda y los bordes, deja libre la zona de la figura */}
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgb(23_17_14/0.9)_0%,rgb(23_17_14/0.72)_34%,rgb(23_17_14/0.18)_62%,rgb(23_17_14/0.05)_100%)] max-lg:bg-[linear-gradient(180deg,rgb(23_17_14/0.9)_0%,rgb(23_17_14/0.8)_52%,rgb(23_17_14/0.1)_80%,rgb(23_17_14/0)_100%)]" />

      {/* 4 · La figura, apoyada en el piso */}
      <div data-mural-capa="34" className="absolute bottom-[clamp(1rem,4.6vw,5.5rem)] right-[clamp(0.5rem,5vw,7rem)] w-[min(92%,clamp(22rem,46vw,54rem))] will-change-transform max-lg:left-1/2 max-lg:right-auto max-lg:-ml-[46%]">
        <div data-mural-entra>
          <Image src={figura} alt={alt} sizes="(min-width: 1024px) 46vw, 92vw" className="h-auto w-full" />
        </div>
      </div>
    </div>
  );
}
