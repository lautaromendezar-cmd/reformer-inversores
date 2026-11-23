"use client";

// Bloque 4 (claro): el salón.
// 1) Apertura: título y bajada centrados, con fotos flotando alrededor que se mueven a distinta
//    velocidad con el scroll. En escritorio van a los costados; en celular, arriba y abajo.
// 2) La foto de la coreografía, que se abre con el scroll.
// 3) Las cuatro ventajas: el Reformer queda fijo detrás y las tarjetas, escalonadas en dos
//    columnas, le pasan por encima.
// 4) Los dos formatos con su planta a escala y el simulador (tarjeta oscura).

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Planta from "@/components/Planta";
import Simulador from "./Simulador";
import { salon, ventajas, formatos, formatosTabla } from "@/content/landing";
import { fotos } from "@/lib/imagenes";
import { movimientoReducido } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

// Fotos de la apertura: posición, tamaño y cuánto se desplazan (px) con el scroll.
const flotantes = [
  { foto: fotos.metodoSalaLlena, clase: "left-[-6vw] top-[1%] z-[1] aspect-[3/4] w-[36vw] lg:left-[-2vw] lg:top-[2%] lg:w-[17vw]", v: 70 },
  { foto: fotos.lounge, clase: "left-[5vw] top-[80%] z-[2] aspect-[4/3] w-[44vw] lg:left-[6vw] lg:top-[54%] lg:w-[19vw]", v: 200 },
  { foto: fotos.salonDomo, clase: "right-[-5vw] top-[5%] z-[2] aspect-[4/3] w-[46vw] lg:right-[-3vw] lg:top-[8%] lg:w-[21vw]", v: 160 },
  { foto: fotos.metodoInstructores, clase: "right-[4vw] top-[77%] z-[1] aspect-[3/4] w-[30vw] lg:right-[6vw] lg:top-[50%] lg:w-[15vw]", v: 60 },
];

export default function Salon() {
  const raiz = useRef<HTMLElement>(null);

  useEffect(() => {
    if (movimientoReducido()) return;
    const ctx = gsap.context(() => {
      // Las fotos de la apertura: cada una a su velocidad
      gsap.utils.toArray<HTMLElement>("[data-flotante]").forEach((f) => {
        // En celular las fotos son más chicas y están más cerca del texto: se mueven menos
        const v = Number(f.dataset.flotante) * (window.innerWidth < 1024 ? 0.35 : 1);
        gsap.fromTo(f, { y: v }, { y: -v, ease: "none", scrollTrigger: { trigger: "[data-salon-apertura]", start: "top bottom", end: "bottom top", scrub: 0.5 } });
      });
      // La foto se abre: recorte → cuadro completo
      gsap
        .timeline({ scrollTrigger: { trigger: "[data-salon-foto]", start: "top 92%", end: "top 18%", scrub: 0.6 } })
        .fromTo("[data-salon-foto]", { clipPath: "inset(12% 14% 12% 14% round 1.5rem)" }, { clipPath: "inset(0% 0% 0% 0% round 1.5rem)", ease: "none" })
        .fromTo("[data-salon-foto] img", { scale: 1.3 }, { scale: 1, ease: "none" }, 0);
      // Las etiquetas aparecen cuando la foto terminó de abrirse
      gsap.fromTo(
        "[data-salon-etiqueta]",
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.12, scrollTrigger: { trigger: "[data-salon-foto]", start: "top 30%", once: true } },
      );
      // El Reformer fijo se acerca despacio mientras pasan las ventajas
      gsap.fromTo("[data-ventajas-foto] img", { scale: 1 }, { scale: 1.14, ease: "none", scrollTrigger: { trigger: "[data-ventajas]", start: "top bottom", end: "bottom top", scrub: true } });
      // Los Reformers de cada planta se encienden de a uno
      gsap.utils.toArray<HTMLElement>("[data-formato]").forEach((f) => {
        gsap.fromTo(
          f.querySelectorAll("[data-reformer]"),
          { opacity: 0.12 },
          { opacity: 1, duration: 0.35, ease: "power1.out", stagger: 0.045, scrollTrigger: { trigger: f, start: "top 80%", once: true } },
        );
      });
    }, raiz);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={raiz} id="formatos" className="claro relative overflow-clip bg-lino pb-[clamp(4.5rem,10vw,8.5rem)]" aria-labelledby="salon-titulo">
      {/* 1 · Apertura */}
      <div className="relative py-[62vw] lg:py-[clamp(5rem,20vh,13rem)]" data-salon-apertura>
        <div aria-hidden="true">
          {flotantes.map((f, i) => (
            <div key={i} data-flotante={f.v} className={`absolute overflow-hidden rounded-[1.5rem] shadow-[0_2.5rem_4rem_-2.5rem_rgb(23_17_14/0.5)] will-change-transform ${f.clase}`}>
              <Image src={f.foto} alt="" fill placeholder="blur" sizes="(min-width: 1024px) 22vw, 46vw" className="object-cover" />
            </div>
          ))}
        </div>
        <div className="contenedor relative z-[3]">
          <div className="mx-auto text-center lg:max-w-[min(42rem,44vw)]">
            <p className="antetitulo" data-revelar>
              {salon.antetitulo}
            </p>
            <h2 id="salon-titulo" className="mt-5 text-[length:var(--text-h2)]" data-revelar="palabras">
              {salon.titulo}
            </h2>
            <p className="suave mt-6" data-revelar>
              {salon.bajada}
            </p>
          </div>
        </div>
      </div>

      <div className="contenedor">
        {/* 2 · La foto del salón */}
        <figure className="relative">
          <div className="oscuro relative overflow-hidden rounded-[1.5rem]" data-salon-foto>
            <div className="relative aspect-[4/5] sm:aspect-[16/9] xl:aspect-[2/1]">
              <Image src={fotos.claseSalonSol} alt={salon.alt} fill placeholder="blur" sizes="96vw" className="object-cover" />
            </div>
            <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgb(23_17_14/0.35)_0%,transparent_26%,transparent_55%,rgb(23_17_14/0.88)_100%)]" />
            <ul className="absolute inset-x-4 top-4 flex flex-wrap justify-between gap-2 sm:inset-x-6 sm:top-6">
              {salon.etiquetas.map((e) => (
                <li key={e} className="rounded-full border border-hueso/25 bg-noche/55 px-4 py-2 text-[length:var(--text-dato)] font-semibold backdrop-blur-md" data-salon-etiqueta>
                  {e}
                </li>
              ))}
            </ul>
            <figcaption className="absolute inset-x-4 bottom-4 flex flex-wrap items-end justify-between gap-3 sm:inset-x-6 sm:bottom-6">
              <p className="max-w-xl text-[length:var(--text-chico)]" data-salon-etiqueta>
                {salon.pieFoto}
              </p>
              <span className="cifra rounded-full bg-ambar px-4 py-2 text-[length:var(--text-dato)] text-noche" data-salon-etiqueta>
                {salon.sello}
              </span>
            </figcaption>
          </div>
        </figure>

        {/* 3 · Las cuatro ventajas: el Reformer fijo y las tarjetas pasándole por encima */}
        <div className="mt-[clamp(4rem,8vw,7rem)] grid grid-cols-12 gap-x-6" data-ventajas>
          <div className="sticky top-[calc(var(--alto-header)+0.75rem)] col-span-12 self-start lg:top-[13vh] lg:col-start-1 lg:col-end-9 lg:row-start-1">
            <div className="overflow-hidden rounded-[1.75rem]">
              <div className="relative aspect-[3/2]" data-ventajas-foto>
                <Image src={fotos.reformerTresCuartos} alt={salon.altReformer} fill placeholder="blur" sizes="(min-width: 1024px) 62vw, 94vw" className="object-cover" />
              </div>
            </div>
          </div>
          <ol className="relative z-10 col-span-12 -mt-[14vw] grid items-start gap-5 px-3 sm:grid-cols-2 sm:px-6 lg:px-0 lg:col-start-6 lg:col-end-13 lg:row-start-1 lg:mt-0 lg:gap-x-6 lg:gap-y-[10vh] lg:pb-[6vh] lg:pt-[38vh]">
            {ventajas.map((v, i) => (
              <li key={v.titulo} className={`ventaja ${i % 2 ? "lg:mt-[16vh]" : ""}`} data-revelar>
                <span className="antetitulo">Ventaja {String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 text-[length:var(--text-h3)]">{v.titulo}</h3>
                <p className="suave mt-3 text-[length:var(--text-chico)]">{v.texto}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* 4 · Los dos formatos: planta a escala + ficha.
            Dos columnas iguales, alineadas arriba. Las plantas comparten el alto y la escala (250 m²
            = ancho completo), así la Compacta se ve más angosta que la Flagship, a escala real. */}
        <div className="mt-[clamp(4rem,8vw,7rem)] grid items-start gap-x-[clamp(2rem,5vw,5rem)] gap-y-14 lg:grid-cols-2">
          {formatos.map((f) => (
            <article key={f.id} data-formato>
              <div className="aspect-[400/150] w-full">
                <Planta
                  reformers={f.reformers[1]}
                  m2={f.m2[1]}
                  m2Max={250}
                  titulo={`Planta del formato ${f.nombre}: hasta ${f.reformers[1]} Reformers en ${f.m2[1]} m²`}
                  className="h-full w-auto max-w-full text-noche"
                />
              </div>
              <h3 className="mt-7 text-[clamp(1.5rem,1.2rem+1.2vw,2rem)]" data-revelar>
                {f.nombre}
              </h3>
              <dl className="mt-4 text-[length:var(--text-chico)]" data-escalonar="0.06">
                {[
                  [formatosTabla.columnas[1], `${f.m2[0]} – ${f.m2[1]} m²`],
                  [formatosTabla.columnas[2], `${f.reformers[0]} a ${f.reformers[1]} Reformers`],
                  [formatosTabla.columnas[3], f.canon],
                  [formatosTabla.columnas[4], f.inversion],
                ].map(([k, v], i) => (
                  <div key={k} className="regla grid min-h-[4.25rem] grid-cols-[1fr_auto] items-center gap-4 border-t py-3">
                    <dt className="suave">{k}</dt>
                    <dd className={`cifra text-right !leading-snug ${i === 3 ? "text-[1.125rem] text-ambar-hondo" : ""}`}>{v}</dd>
                  </div>
                ))}
                <div className="regla border-t py-3">
                  <dt className="suave">{formatosTabla.columnas[5]}</dt>
                  <dd className="mt-1">{f.perfil}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
        <p className="suave mt-8 max-w-4xl text-[length:var(--text-dato)]">{formatosTabla.nota}</p>

        <div className="mt-[clamp(4rem,8vw,6rem)]" data-revelar>
          <Simulador />
        </div>
      </div>
    </section>
  );
}
