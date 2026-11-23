"use client";

// Bloque 4 (oscuro): el salón. La foto de la clase se abre con el scroll (de un recorte
// redondeado a todo el ancho) mientras la imagen se asienta; después las cuatro ventajas con el
// Reformer, los dos formatos con su planta a escala y el simulador.

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

export default function Salon() {
  const raiz = useRef<HTMLElement>(null);

  useEffect(() => {
    if (movimientoReducido()) return;
    const ctx = gsap.context(() => {
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
    <section ref={raiz} id="formatos" className="oscuro bloque bg-noche" aria-labelledby="salon-titulo">
      <div className="contenedor">
        <div className="grid grid-cols-12 gap-x-6 gap-y-5">
          <div className="col-span-12 lg:col-span-8">
            <p className="antetitulo" data-revelar>
              {salon.antetitulo}
            </p>
            <h2 id="salon-titulo" className="mt-5 text-[length:var(--text-h2)]" data-revelar="palabras">
              {salon.titulo}
            </h2>
          </div>
          <p className="suave col-span-12 max-w-md self-end lg:col-span-4" data-revelar>
            {salon.bajada}
          </p>
        </div>

        {/* La foto del salón */}
        <figure className="relative mt-[clamp(2.5rem,6vw,4.5rem)]">
          <div className="relative overflow-hidden rounded-[1.5rem]" data-salon-foto>
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

        {/* Las cuatro ventajas, con el Reformer */}
        <div className="mt-[clamp(4rem,8vw,7rem)] grid grid-cols-12 items-center gap-x-6 gap-y-12 lg:gap-x-12">
          <ol className="col-span-12 grid gap-x-10 sm:grid-cols-2 lg:col-span-7" data-escalonar="0.1">
            {ventajas.map((v, i) => (
              <li key={v.titulo} className="pilar py-7" data-encender>
                <span className="antetitulo">Ventaja {String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-[length:var(--text-h3)]">{v.titulo}</h3>
                <p className="suave mt-2 text-[length:var(--text-chico)]">{v.texto}</p>
              </li>
            ))}
          </ol>
          <div className="col-span-12 overflow-hidden rounded-[1.5rem] lg:col-span-5" data-foto>
            <div className="relative aspect-[4/3]">
              <Image src={fotos.reformerTresCuartos} alt={salon.altReformer} fill placeholder="blur" sizes="(min-width: 1024px) 38vw, 94vw" className="object-cover" />
            </div>
          </div>
        </div>

        {/* Los dos formatos: planta a escala + ficha */}
        {/* Dos columnas iguales, alineadas arriba. Las plantas comparten el alto y la escala (250 m²
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
                  className="h-full w-auto max-w-full text-hueso"
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
                    <dd className={`cifra text-right !leading-snug ${i === 3 ? "text-[1.125rem] text-luz" : ""}`}>{v}</dd>
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
