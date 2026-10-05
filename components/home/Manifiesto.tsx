"use client";

// Manifiesto "Nuevo Ciclo": tres estrofas que se encienden palabra por palabra mientras la luz
// pasa de fría a 2700K. Al final aparece el sol de la sala (clip sol-loop del B2C).
//
// Cómo funciona: la sección mide 340vh y adentro hay un escenario `sticky` de 100vh (no se usa
// pin de GSAP: así los marcadores del arco de luz quedan en el flujo y el Motor cambia el fondo
// solo). Un timeline con scrub recorre las estrofas. Sin JS o con reduced-motion no se agrega
// `.manifiesto-vivo` y las estrofas se leen una debajo de la otra, ya en luz cálida.

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { manifiesto } from "@/content/home";
import { movimientoReducido } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, SplitText);

const KELVIN = [6500, 2700];

export default function Manifiesto() {
  const raiz = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const kelvin = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (movimientoReducido()) return;
    const sec = raiz.current!;
    sec.classList.add("manifiesto-vivo");
    const splits: SplitText[] = [];

    const ctx = gsap.context(() => {
      // Las palabras se apagan recién cuando el manifiesto se acerca: así nadie ve (ni mide)
      // texto atenuado fuera de contexto, y el timeline se arma una sola vez.
      ScrollTrigger.create({ trigger: sec, start: "top bottom", once: true, onEnter: () => ctx.add(armar) });
    }, sec);

    function armar() {
      const estrofas = gsap.utils.toArray<HTMLElement>("[data-estrofa]", sec);
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: sec, start: "top top", end: "bottom bottom", scrub: 0.6 },
      });
      const k = { v: KELVIN[0] };
      estrofas.forEach((estrofa, i) => {
        // aria "none": sin aria-label en el <p> (prohibido en un párrafo); el lector lee las palabras como texto normal
        const split = SplitText.create(estrofa.querySelectorAll("p"), { type: "words", aria: "none" });
        splits.push(split);
        gsap.set(split.words, { opacity: 0.14 });
        if (i > 0) gsap.set(estrofa, { opacity: 0, y: 60 });
        const t = i * 10;
        if (i > 0) tl.to(estrofa, { opacity: 1, y: 0, duration: 1.2 }, t - 0.6);
        tl.to(split.words, { opacity: 1, duration: 0.6, stagger: 6.5 / split.words.length }, t);
        if (i < estrofas.length - 1) tl.to(estrofa, { opacity: 0, y: -60, duration: 1.2 }, t + 8);
      });
      // La temperatura de color baja de 6500K a 2700K en todo el recorrido
      tl.to(k, { v: KELVIN[1], duration: tl.duration(), onUpdate: () => kelvin.current && (kelvin.current.textContent = `${Math.round(k.v / 100) * 100}K`) }, 0);
      // El sol aparece con la última estrofa
      tl.fromTo(sec.querySelector("[data-sol]"), { opacity: 0, scale: 1.15 }, { opacity: 1, scale: 1, duration: 6 }, 18.5);
      tl.to({}, { duration: 2 }); // aire al final antes de soltar

      // El clip sólo baja y corre cuando el manifiesto está en pantalla
      const v = video.current!;
      ScrollTrigger.create({
        trigger: sec,
        start: "top bottom",
        end: "bottom top",
        onToggle: (s) => {
          if (s.isActive) {
            if (!v.src) {
              const mobile = window.matchMedia("(max-width: 767px)").matches;
              v.poster = mobile ? "/video/sol-loop-mobile-poster.webp" : "/video/sol-loop-poster.webp";
              v.src = mobile ? "/video/sol-loop-mobile.mp4" : "/video/sol-loop.mp4";
            }
            v.play().catch(() => {});
          } else v.pause();
        },
      });
      ScrollTrigger.refresh();
    }

    return () => {
      splits.forEach((s) => s.revert());
      ctx.revert();
      sec.classList.remove("manifiesto-vivo");
    };
  }, []);

  return (
    <section ref={raiz} className="manifiesto escena relative" data-luz="frio" aria-labelledby="manifiesto-titulo">
      {/* Marcadores del arco de luz: el fondo pasa de frío a tibio y a 2700K mientras se lee */}
      <div aria-hidden="true" className="manifiesto-marca escena" data-luz="neutro" style={{ top: "30%" }} />
      <div aria-hidden="true" className="manifiesto-marca escena" data-luz="k2700" style={{ top: "58%" }} />

      <div className="manifiesto-escenario">
        <div data-sol aria-hidden="true" className="manifiesto-sol">
          <video ref={video} muted loop playsInline preload="none" className="h-full w-full object-cover" />
        </div>

        <div className="contenedor relative">
          <div className="flex items-center justify-between">
            <h2 id="manifiesto-titulo" className="antetitulo">
              {manifiesto.antetitulo}
            </h2>
            <p className="manifiesto-kelvin text-[length:var(--text-dato)] font-semibold uppercase tracking-[0.18em] text-hueso/60" aria-hidden="true">
              Luz <span ref={kelvin} className="cifra text-luz">6500K</span>
            </p>
          </div>
          <div className="manifiesto-estrofas mt-10">
            {manifiesto.estrofas.map((estrofa, i) => (
              <div key={i} data-estrofa className="manifiesto-estrofa">
                {estrofa.map((linea, j) => (
                  <p key={j} className={`titulo text-[length:var(--text-manifiesto)] leading-[1.12] ${j > 0 ? "mt-[0.45em]" : ""} ${i === 2 && j === estrofa.length - 1 ? "text-luz" : ""}`}>
                    {linea}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
