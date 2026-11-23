"use client";

// Hero en dos tiempos.
// 1) Primera pantalla: sólo el mensaje sobre el follaje, a pantalla completa. El titular entra
//    palabra por palabra; "15" y "25" cuentan; después las palabras reaccionan al cursor (se
//    despegan y se tiñen de ámbar cuando pasa cerca).
// 2) Al scrollear, el escenario queda fijo: el mensaje se va por renglones y la foto, que estaba
//    oculta, se abre desde abajo hasta ocupar toda la pantalla; recién ahí entra la tarjeta de la
//    Ecuación Financiera, fila por fila.
// Es `position: sticky` + un timeline con scrub (no pin de GSAP). Sin JS o con "reducir
// movimiento" queda en fila: mensaje, foto y tarjeta. Los estilos .hero-* están en globals.css.

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Follaje from "@/components/Follaje";
import { hero, ecuacion } from "@/content/landing";
import { fotos } from "@/lib/imagenes";
import { escalonado, movimientoReducido } from "@/lib/motion";
import { precargaLista } from "@/lib/precarga";

gsap.registerPlugin(ScrollTrigger, SplitText);

const RADIO = 190; // px: hasta dónde llega el efecto del cursor sobre las palabras
const AMBAR = "#9a5a14";

export default function Hero() {
  const raiz = useRef<HTMLElement>(null);
  const titulo = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const el = raiz.current;
    if (!el || movimientoReducido()) return;
    el.classList.add("hero-vivo");
    let split: SplitText | null = null;
    const quitar: (() => void)[] = [];

    const ctx = gsap.context(() => {
      const resto = gsap.utils.toArray<HTMLElement>("[data-hero-entra]");
      // Sólo desplazamiento en la bajada (es candidata a LCP y no puede esperar al preloader)
      gsap.set(resto, { y: 28 });
      gsap.set(titulo.current, { opacity: 0 });

      // ---------- 1) La entrada ----------
      precargaLista.then(() => {
        split = SplitText.create(titulo.current!, { type: "words" });
        gsap.set(titulo.current, { opacity: 1 });
        gsap
          .timeline({ onComplete: despertar })
          .from(split.words, { yPercent: 55, opacity: 0, filter: "blur(14px)", duration: 1.5, ease: "expo.out", stagger: 0.055 })
          .to(resto, { y: 0, duration: 1.3, ease: "expo.out", stagger: escalonado.items }, 0.5);
      });

      // Terminada la entrada: se sacan las máscaras (recortarían el movimiento) y las palabras
      // quedan sueltas para reaccionar al cursor.
      function despertar() {
        split?.revert();
        split = SplitText.create(titulo.current!, { type: "words", wordsClass: "hero-palabra" });
        const palabras = split.words as HTMLElement[];

        // Los números del titular cuentan
        palabras
          .filter((p) => /^\d+$/.test(p.textContent ?? ""))
          .forEach((p, i) => {
            const fin = Number(p.textContent);
            const v = { n: 0 };
            p.style.minWidth = `${p.offsetWidth}px`;
            gsap.to(v, { n: fin, duration: 1.4, delay: i * 0.15, ease: "power2.out", onUpdate: () => (p.textContent = String(Math.round(v.n))) });
          });

        if (!window.matchMedia("(pointer: fine)").matches) return;
        const estado = palabras.map((p) => ({
          p,
          base: getComputedStyle(p).color,
          destacada: !!p.closest("[data-hero-destacado]"),
          cerca: false,
          y: gsap.quickTo(p, "y", { duration: 0.6, ease: "power3.out" }),
          r: gsap.quickTo(p, "rotation", { duration: 0.6, ease: "power3.out" }),
        }));
        const mover = (e: PointerEvent) => {
          if (window.scrollY > window.innerHeight * 0.5) return;
          estado.forEach((s) => {
            const r = s.p.getBoundingClientRect();
            const dx = e.clientX - (r.left + r.width / 2);
            const dy = e.clientY - (r.top + r.height / 2);
            const f = Math.max(0, 1 - Math.hypot(dx, dy) / RADIO); // 0 lejos · 1 encima
            s.y(-10 * f);
            s.r((dx / RADIO) * -2.5 * f);
            const cerca = f > 0.35;
            if (cerca !== s.cerca) {
              s.cerca = cerca;
              gsap.to(s.p, { color: cerca ? (s.destacada ? "#17110e" : AMBAR) : s.base, duration: cerca ? 0.25 : 0.7, ease: "power2.out", overwrite: "auto" });
            }
          });
        };
        const soltar = () =>
          estado.forEach((s) => {
            s.y(0);
            s.r(0);
            if (s.cerca) {
              s.cerca = false;
              gsap.to(s.p, { color: s.base, duration: 0.7, overwrite: "auto" });
            }
          });
        el!.addEventListener("pointermove", mover, { passive: true });
        el!.addEventListener("pointerleave", soltar);
        quitar.push(() => {
          el!.removeEventListener("pointermove", mover);
          el!.removeEventListener("pointerleave", soltar);
        });
      }

      // ---------- 2) El scroll: del mensaje a la foto ----------
      const filas = gsap.utils.toArray<HTMLElement>("[data-hero-fila]");
      gsap
        .timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: "[data-hero-pista]", start: "top top", end: "bottom bottom", scrub: 0.6 } })
        // el mensaje se va por partes, cada una a su ritmo
        .to("[data-hero-sale='1']", { y: -70, opacity: 0, duration: 0.12 }, 0) // la etiqueta sale primero: no se cruza con el titular
        .to("[data-hero-sale='2']", { yPercent: -55, opacity: 0, duration: 0.34 }, 0.02)
        .to("[data-hero-sale='3']", { yPercent: -90, opacity: 0, duration: 0.3 }, 0.05)
        // la foto se abre: oculta → ventana → pantalla completa
        // (mismas unidades en los tres estados: si no, GSAP no puede interpolar el recorte)
        .fromTo("[data-hero-foto]", { clipPath: "inset(100% 22% 0% 22% round 32px)" }, { clipPath: "inset(12% 6% 12% 6% round 32px)", duration: 0.36, ease: "power1.out" }, 0.04)
        .to("[data-hero-foto]", { clipPath: "inset(0% 0% 0% 0% round 0px)", duration: 0.24, ease: "power1.inOut" }, 0.4)
        .fromTo("[data-hero-foto] img", { scale: 1.35 }, { scale: 1, duration: 0.64 }, 0)
        // y recién entonces, la Ecuación Financiera
        .fromTo("[data-hero-velo]", { opacity: 0 }, { opacity: 1, duration: 0.16 }, 0.58)
        .fromTo("[data-hero-tarjeta]", { xPercent: -14, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 0.18, ease: "power2.out" }, 0.62)
        .fromTo(filas, { x: 28, opacity: 0 }, { x: 0, opacity: 1, duration: 0.1, stagger: 0.035, ease: "power2.out" }, 0.7);
    }, el);

    return () => {
      quitar.forEach((f) => f());
      split?.revert();
      ctx.revert();
      el.classList.remove("hero-vivo");
    };
  }, []);

  return (
    <section ref={raiz} className="relative isolate bg-lino" aria-labelledby="hero-titulo">
      <div className="hero-pista" data-hero-pista>
        <div className="hero-escenario">
          {/* El fondo vivo: sombras de palmas, como el mural de la sala (components/Follaje.tsx) */}
          <Follaje composicion="hero" />

          {/* 1 · El mensaje, a pantalla completa */}
          <div className="contenedor contenedor-ancho flex min-h-[100svh] flex-col pb-[clamp(1.5rem,4.5vh,3rem)] pt-[calc(var(--alto-header)+clamp(1.5rem,4vh,3rem))]">
            {/* Etiqueta + titular: centrados en el espacio que queda arriba de la bajada */}
            <div className="my-auto py-[clamp(1rem,3vh,2rem)]">
            <div data-hero-sale="1" className="w-fit max-w-full">
              <p className="rounded-[1.25rem] bg-noche px-4 py-2 text-[length:var(--text-dato)] font-semibold leading-snug tracking-[0.04em] text-hueso" data-hero-entra>
                {hero.etiqueta}
              </p>
            </div>

            <div data-hero-sale="2">
              <h1 id="hero-titulo" ref={titulo} className="mt-[clamp(1.75rem,4vh,3rem)] max-w-[20ch] text-[length:var(--text-hero)] md:max-w-[28ch]">
                <span className="mb-[0.35em] block max-w-none font-[family-name:var(--font-cuerpo)] text-[0.5em] font-normal leading-tight tracking-[-0.02em] text-noche/55">{hero.titulo[0]}</span>
                <span className="text-ambar-hondo" data-hero-destacado>
                  {hero.titulo[1]}
                </span>
                {hero.titulo[2]}
              </h1>
            </div>

            </div>

            {/* Bajada y botones: apoyados en el margen inferior de la pantalla */}
            <div data-hero-sale="3" className="grid grid-cols-12 items-end gap-x-6 gap-y-6">
              <p className="suave col-span-12 max-w-xl lg:col-span-6" data-hero-entra>
                {hero.bajada}
              </p>
              <div className="col-span-12 flex flex-wrap gap-3 lg:col-span-6 lg:justify-end" data-hero-entra>
                <Link href="/#postular" className="boton boton-noche" data-magnetico>
                  {hero.cta} <span aria-hidden="true">→</span>
                </Link>
                <Link href="/#formatos" className="boton boton-linea">
                  {hero.ctaSecundario}
                </Link>
              </div>
            </div>
          </div>

          {/* 2 · La foto, que se abre al scrollear, con la Ecuación Financiera encima */}
          <div className="hero-foto" data-hero-foto>
            <Image src={fotos.heroNegocios} alt={hero.alt} fill priority placeholder="blur" sizes="(max-width: 1023px) 400vw, 100vw" className="object-cover object-[62%_50%]" />
            <div data-hero-velo aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgb(23_17_14/0.78)_0%,rgb(23_17_14/0.4)_38%,transparent_66%)] max-lg:bg-[linear-gradient(0deg,rgb(23_17_14/0.85)_0%,rgb(23_17_14/0.3)_55%,transparent_80%)]" />

            <div
              className="oscuro absolute inset-x-4 bottom-4 max-md:bottom-24 rounded-[1.5rem] bg-noche/90 p-6 shadow-[0_2.5rem_4rem_-2rem_rgb(23_17_14/0.7)] backdrop-blur-md sm:p-7 lg:inset-x-auto lg:bottom-auto lg:left-[clamp(1.5rem,5vw,6rem)] lg:top-1/2 lg:w-[min(30rem,38vw)] lg:-translate-y-1/2"
              data-hero-tarjeta
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="antetitulo">{ecuacion.antetitulo}</p>
                  <p className="titulo mt-2 text-[clamp(1.375rem,1.1rem+0.8vw,1.875rem)]">{ecuacion.titulo}</p>
                </div>
                <span className="cifra shrink-0 rounded-full bg-ambar px-3 py-1.5 text-[0.8125rem] text-noche">{ecuacion.sello}</span>
              </div>
              <dl className="mt-5">
                {ecuacion.filas.map((f) => (
                  <div key={f.nombre} className="regla flex items-baseline justify-between gap-4 border-t py-3" data-hero-fila>
                    <dt className="suave text-[length:var(--text-chico)]">{f.nombre}</dt>
                    <dd className="cifra shrink-0 text-right text-[length:var(--text-chico)] !leading-snug text-luz">{f.valor}</dd>
                  </div>
                ))}
              </dl>
              <div className="regla flex flex-wrap items-center justify-between gap-3 border-t pt-4 text-[length:var(--text-dato)]">
                <span className="suave">{ecuacion.pie}</span>
                <Link href="/#comparativa" className="enlace-flecha text-luz">
                  {ecuacion.enlace} <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
