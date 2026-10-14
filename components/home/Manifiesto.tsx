"use client";

// Manifiesto "Nuevo Ciclo": tres estrofas que se encienden palabra por palabra mientras la luz
// pasa de fría a 2700K. Cada estrofa tiene su foto de fondo, graduada con la luz del contador:
// la ciudad con ruido (fría), el encuentro en la sala (neutra) y la fachada como portal (2700K).
//
// Cómo funciona: la sección mide 340vh y adentro hay un escenario `sticky` de 100vh (no se usa
// pin de GSAP: así los marcadores del arco de luz quedan en el flujo y el Motor cambia el fondo
// solo). Un timeline con scrub recorre las estrofas. Sin JS o con reduced-motion no se agrega
// `.manifiesto-vivo` y las estrofas se leen una debajo de la otra, ya en luz cálida.

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { manifiesto } from "@/content/home";
import { fotos } from "@/lib/imagenes";
import { movimientoReducido } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, SplitText);

const KELVIN = [6500, 2700];

// Una foto por estrofa. Decorativas (alt vacío): el texto del manifiesto ya dice todo.
// `pos` es el encuadre en mobile, donde sólo entra una franja: la persona o la fachada.
const FONDOS = [
  { src: fotos.manifiestoRuido, pos: "object-[80%_50%]" },
  { src: fotos.manifiestoEncuentro, pos: "object-[76%_50%]" },
  { src: fotos.manifiestoPortal, pos: "object-[95%_50%]" },
];

export default function Manifiesto() {
  const raiz = useRef<HTMLElement>(null);
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
      const fondos = gsap.utils.toArray<HTMLElement>("[data-fondo]", sec);
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
        // La foto entra un poco antes que su estrofa y se acerca apenas mientras se lee
        if (i > 0) tl.fromTo(fondos[i], { opacity: 0 }, { opacity: 1, duration: 2 }, t - 1.6);
        tl.fromTo(fondos[i], { scale: 1.08 }, { scale: 1, duration: 11.6 }, Math.max(0, t - 1.6));
        if (i > 0) tl.to(estrofa, { opacity: 1, y: 0, duration: 1.2 }, t - 0.6);
        tl.to(split.words, { opacity: 1, duration: 0.6, stagger: 6.5 / split.words.length }, t);
        if (i < estrofas.length - 1) tl.to(estrofa, { opacity: 0, y: -60, duration: 1.2 }, t + 8);
      });
      // La temperatura de color baja de 6500K a 2700K en todo el recorrido
      tl.to(k, { v: KELVIN[1], duration: tl.duration(), onUpdate: () => kelvin.current && (kelvin.current.textContent = `${Math.round(k.v / 100) * 100}K`) }, 0);
      tl.to({}, { duration: 2 }); // aire al final antes de soltar

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
        <div aria-hidden="true" className="manifiesto-fondos">
          {FONDOS.map((f, i) => (
            <div key={i} data-fondo className="manifiesto-fondo">
              <Image src={f.src} alt="" fill sizes="100vw" placeholder="blur" className={`object-cover ${f.pos} md:object-center`} />
            </div>
          ))}
          {/* Velo: el texto vive a la izquierda; en mobile ocupa todo el ancho y el velo es parejo */}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(23_17_14/0.88)_0%,rgb(23_17_14/0.62)_45%,rgb(23_17_14/0.12)_80%)] max-md:bg-none max-md:bg-noche/65" />
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
