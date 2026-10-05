"use client";

// Adelanto de formatos: las tres plantas a escala; los Reformers se encienden uno por uno al
// entrar en pantalla. Lleva a la calculadora de /inversion.

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Planta from "@/components/Planta";
import { formatosTeaser } from "@/content/home";
import { formatos, canon, usd } from "@/content/economia";
import { movimientoReducido } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

export default function Formatos() {
  const raiz = useRef<HTMLElement>(null);

  useEffect(() => {
    if (movimientoReducido()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-formato]").forEach((f) => {
        const reformers = f.querySelectorAll("[data-reformer]");
        gsap.fromTo(
          reformers,
          { opacity: 0.15 },
          {
            opacity: 1,
            duration: 0.35,
            ease: "power1.out",
            stagger: { each: 0.045, from: "start" },
            scrollTrigger: { trigger: f, start: "top 80%", once: true },
          },
        );
      });
    }, raiz);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={raiz} className="escena relative py-[clamp(5rem,12vw,10rem)]" data-luz="noche" aria-labelledby="formatos-titulo">
      <div className="contenedor">
        <div className="grid grid-cols-12 gap-x-6 gap-y-4">
          <div className="col-span-12 md:col-span-8">
            <p className="antetitulo" data-revelar>
              {formatosTeaser.antetitulo}
            </p>
            <h2 id="formatos-titulo" className="mt-5 text-[length:var(--text-h1)]" data-revelar="lineas">
              {formatosTeaser.titulo}
            </h2>
          </div>
          <p className="col-span-12 max-w-sm self-end text-hueso/70 md:col-span-4" data-revelar>
            {formatosTeaser.bajada}
          </p>
        </div>

        <ul className="mt-[clamp(3rem,6vw,5rem)] grid items-end gap-x-8 gap-y-14 lg:grid-cols-[180fr_250fr_350fr]">
          {formatos.map((f) => (
            <li key={f.id} data-formato className="flex flex-col">
              <Planta
                reformers={f.reformers[1]}
                m2={f.m2[1]}
                titulo={`Planta del formato ${f.nombre}: hasta ${f.reformers[1]} Reformers en ${f.m2[1]} m²`}
                className="h-auto max-h-[7.5rem] w-full text-hueso sm:max-h-[9rem] lg:max-h-none"
              />
              <h3 className="mt-6 text-[length:var(--text-h3)]">{f.nombre}</h3>
              <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-[length:var(--text-chico)]">
                <dt className="text-hueso/55">Superficie</dt>
                <dd className="cifra text-hueso">
                  {f.m2[0]}–{f.m2[1]} m²
                </dd>
                <dt className="text-hueso/55">Reformers</dt>
                <dd className="cifra text-hueso">
                  {f.reformers[0]} a {f.reformers[1]}
                </dd>
                <dt className="text-hueso/55">Canon estimado</dt>
                <dd className="cifra text-luz">desde {usd(canon(f.reformers[0]))}</dd>
              </dl>
            </li>
          ))}
        </ul>

        <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Link href="/inversion#calculadora" className="boton boton-luz" data-magnetico>
            {formatosTeaser.cta}
          </Link>
          <Link href="#aviso-legal" className="text-[length:var(--text-dato)] text-hueso/55 underline-offset-4 hover:underline">
            Valores estimados. Ver aviso legal*
          </Link>
        </div>
      </div>
    </section>
  );
}
