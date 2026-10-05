"use client";

// Hero: la clase llena a pantalla completa (la gente es el argumento), el H1 entra palabra por
// palabra con máscara cuando se levanta el preloader. La foto se acerca apenas con el scroll.

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { hero } from "@/content/home";
import { enlaceReunion } from "@/content/sitio";
import { fotos } from "@/lib/imagenes";
import { duracion, ease, escalonado, movimientoReducido } from "@/lib/motion";
import { precargaLista } from "@/lib/precarga";

gsap.registerPlugin(SplitText);

export default function Hero() {
  const raiz = useRef<HTMLElement>(null);
  const titulo = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    if (movimientoReducido()) return;
    let split: SplitText | null = null;
    const ctx = gsap.context(() => {
      const resto = raiz.current!.querySelectorAll("[data-hero-entra]");
      gsap.set(resto, { opacity: 0, y: 24 });
      gsap.set(titulo.current, { opacity: 0 });
      precargaLista.then(() => {
        split = SplitText.create(titulo.current!, { type: "words,lines", mask: "lines", linesClass: "linea" });
        gsap.set(titulo.current, { opacity: 1 });
        const tl = gsap.timeline();
        tl.from(split.words, { yPercent: 115, duration: duracion.larga, ease: ease.salida, stagger: escalonado.palabras * 2 })
          .to(resto, { opacity: 1, y: 0, duration: duracion.media, ease: ease.salida, stagger: escalonado.items }, 0.45);
      });
      // La foto: zoom leve que se retira al scrollear
      gsap.fromTo(
        "[data-hero-foto]",
        { scale: 1.08 },
        { scale: 1, ease: "none", scrollTrigger: { trigger: raiz.current, start: "top top", end: "bottom top", scrub: true } },
      );
    }, raiz);
    return () => {
      split?.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section ref={raiz} className="escena relative isolate flex min-h-[100svh] items-end overflow-hidden" data-luz="noche" aria-labelledby="hero-titulo">
      <div className="absolute inset-0 -z-10" data-hero-foto>
        <Image
          src={fotos.heroClase}
          alt={hero.alt}
          fill
          priority
          placeholder="blur"
          sizes="100vw"
          className="object-cover object-[50%_40%]"
        />
      </div>
      {/* Velos: abajo para el texto, y un halo cálido que sube desde el sol de la sala */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(23_17_14/0.55)_0%,rgb(23_17_14/0.05)_28%,rgb(23_17_14/0.35)_55%,rgb(23_17_14/0.94)_100%)]" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(23_17_14/0.7)_0%,rgb(23_17_14/0)_60%)]" />
      {/* En vertical el sol de la sala cae detrás del titular: velo parejo para que se lea */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-noche/45 md:hidden" />

      <div className="contenedor grid grid-cols-12 gap-x-6 pb-[clamp(6.5rem,12vh,9rem)] pt-40 md:pb-[clamp(4rem,10vh,7rem)]">
        <div className="col-span-12 lg:col-span-9">
          <p className="antetitulo" data-hero-entra>
            {hero.antetitulo}
          </p>
          <h1 id="hero-titulo" ref={titulo} className="mt-5 text-[length:var(--text-display)] text-hueso">
            {hero.titulo}
          </h1>
        </div>
        <div className="col-span-12 mt-8 md:col-span-8 lg:col-span-6 lg:col-start-1">
          <p className="max-w-xl text-hueso/85" data-hero-entra>
            {hero.bajada}
          </p>
          <div className="mt-8 flex flex-wrap gap-3" data-hero-entra>
            <a href="#dossier" className="boton boton-luz" data-magnetico>
              {hero.ctaDossier}
            </a>
            <a href={enlaceReunion()} target="_blank" rel="noopener noreferrer" className="boton boton-linea text-hueso">
              {hero.ctaReunion}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
