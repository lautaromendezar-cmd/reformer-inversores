"use client";

// Bloque 5: el sistema llave en mano, como scroll horizontal.
// Escritorio: el escenario queda fijo. El título va gigante de fondo y la fila de seis tarjetas
// (una por pilar, con su foto) cruza la pantalla de derecha a izquierda pasándole por encima;
// el título se apaga y se desenfoca a medida que lo tapan. Cada tarjeta está en foco sólo cuando
// pasa por el centro (las de los costados se desenfocan y se achican apenas) y su foto se corre
// por dentro del marco. Las tarjetas van a distintas alturas y tamaños: no es una grilla.
// Es `position: sticky` + scrub (no pin de GSAP). La altura de la pista se mide en cada refresh.
// Funciona igual en celular (tarjetas más angostas). Sin JS o con "reducir movimiento": título y
// grilla de tarjetas (estilos en globals.css).

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { sistema } from "@/content/landing";
import { fotos } from "@/lib/imagenes";
import { movimientoReducido } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const fotosPilar = [fotos.fachadaNoche, fotos.corredorArcos, fotos.pilarPreventa, fotos.detalleManos, fotos.pilarSocietario, fotos.pilarTablero];
const encuadres = ["object-[55%_50%]", "object-center", "object-[50%_35%]", "object-center", "object-[50%_40%]", "object-[60%_45%]"];

export default function Sistema() {
  const raiz = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = raiz.current;
    if (!el || movimientoReducido()) return;
    el.classList.add("sistema-vivo");
    const pista = el.querySelector<HTMLElement>("[data-sistema-pista]")!;
    const fila = el.querySelector<HTMLElement>("[data-sistema-fila]")!;
    const titular = el.querySelector<HTMLElement>("[data-sistema-titular]")!;
    const cartas = gsap.utils.toArray<HTMLElement>("[data-sistema-carta]", el);
    const barra = el.querySelector<HTMLElement>("[data-sistema-barra]");

    let distancia = 0;
    const medir = () => {
      distancia = Math.max(0, fila.scrollWidth - window.innerWidth);
      pista.style.height = `${window.innerHeight + distancia}px`;
    };
    medir();
    ScrollTrigger.addEventListener("refreshInit", medir);

    // Foco: nítida en el centro, desenfocada y un poco más chica hacia los costados
    const enfocar = () => {
      const centro = window.innerWidth / 2;
      cartas.forEach((c) => {
        const r = c.getBoundingClientRect();
        const d = (r.left + r.width / 2 - centro) / window.innerWidth; // -0.5 … 0.5 dentro de la pantalla
        const lejos = Math.max(0, Math.abs(d) - 0.3);
        const marco = c.firstElementChild as HTMLElement;
        const foto = c.querySelector<HTMLElement>("[data-sistema-foto]");
        gsap.set(marco, { filter: `blur(${Math.min(6, lejos * 30).toFixed(2)}px)`, scale: 1 - Math.min(0.07, lejos * 0.3) });
        if (foto) gsap.set(foto, { xPercent: gsap.utils.clamp(-9, 9, d * -16) });
      });
    };

    const ctx = gsap.context(() => {
      // El foco se recalcula cuando la fila se mueve de verdad (el scrub va con retraso respecto del
      // scroll): por eso cuelga del timeline y no del ScrollTrigger.
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        onUpdate: () => {
          enfocar();
          if (barra) gsap.set(barra, { scaleX: tl.progress() });
        },
        scrollTrigger: { trigger: pista, start: "top top", end: "bottom bottom", scrub: 0.7, invalidateOnRefresh: true, onRefresh: enfocar },
      });
      tl.to(fila, { x: () => -distancia, duration: 1 }, 0)
        // el título se apaga mientras las tarjetas lo van tapando
        .to(titular, { opacity: 0.1, filter: "blur(10px)", xPercent: -5, duration: 0.3 }, 0.04);
    }, el);
    enfocar();

    return () => {
      ScrollTrigger.removeEventListener("refreshInit", medir);
      ctx.revert();
      gsap.set(cartas.map((c) => c.firstElementChild), { clearProps: "filter,scale" });
      pista.style.height = "";
      el.classList.remove("sistema-vivo");
    };
  }, []);

  return (
    <section ref={raiz} id="sistema" className="bg-lino-hondo" aria-labelledby="sistema-titulo">
      <div data-sistema-pista>
        <div className="sistema-escenario pb-[clamp(4.5rem,10vw,8.5rem)] pt-[clamp(4.5rem,10vw,8.5rem)] [.sistema-vivo_&]:p-0">
          <div className="sistema-titular contenedor" data-sistema-titular>
            <p className="antetitulo" data-revelar>
              {sistema.antetitulo}
            </p>
            <h2 id="sistema-titulo" className="mt-5 max-w-5xl text-[length:var(--text-h2)]" data-revelar="palabras">
              {sistema.titulo}
            </h2>
            <p className="suave mt-6 max-w-xl" data-revelar>
              {sistema.bajada}
            </p>
          </div>

          <ol className="sistema-cartas contenedor mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" data-sistema-fila>
            {sistema.pilares.map((p, i) => (
              <li key={p.titulo} className="sistema-carta" data-sistema-carta>
                <div className="absolute inset-0 will-change-[filter,transform]">
                  <div className="absolute -inset-x-[10%] inset-y-0" data-sistema-foto>
                    <Image src={fotosPilar[i]} alt={sistema.alts[i]} fill placeholder="blur" sizes="(min-width: 1024px) 36vw, (min-width: 640px) 46vw, 94vw" className={`object-cover ${encuadres[i]}`} />
                  </div>
                  <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgb(23_17_14/0.35)_0%,transparent_30%,rgb(23_17_14/0.55)_58%,rgb(23_17_14/0.94)_100%)]" />
                  <div className="absolute inset-x-0 top-0 flex items-baseline justify-between p-5 text-[length:var(--text-dato)] font-semibold uppercase tracking-[0.18em] sm:p-6">
                    <span className="text-luz">Pilar</span>
                    <span className="cifra tracking-normal text-hueso/80">
                      {String(i + 1).padStart(2, "0")} / {String(sistema.pilares.length).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                    <h3 className="text-[clamp(1.375rem,1.1rem+0.9vw,2rem)]">{p.titulo}</h3>
                    <p className="mt-3 text-[length:var(--text-chico)] text-hueso/80">{p.texto}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>

          {/* Progreso del recorrido (sólo con el scroll horizontal activo) */}
          <div className="pointer-events-none absolute inset-x-[clamp(1rem,2.6vw,3rem)] bottom-5 z-[2] hidden h-px bg-noche/15 [.sistema-vivo_&]:block" aria-hidden="true">
            <span data-sistema-barra className="block h-full origin-left scale-x-0 bg-ambar-hondo" />
          </div>
        </div>
      </div>
    </section>
  );
}
