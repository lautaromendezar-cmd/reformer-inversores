"use client";

// Bloque 2: el motor de rentabilidad, como relato con scroll.
// Escritorio: la sección queda fija a pantalla completa mientras se scrollea. A la izquierda el
// título arriba y, abajo, el paso actual (la introducción y los tres impactos); a la derecha la
// foto, que cambia con cada paso descubriéndose de abajo hacia arriba. El fondo de la sección
// cambia de tono con cada paso.
// Es `position: sticky`, no pin de GSAP: sobrevive a los refresh y no hay saltos de layout.
// Mobile: los pasos van uno debajo del otro, cada uno con su foto.

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { metodo } from "@/content/landing";
import { fotos } from "@/lib/imagenes";
import { duracion, ease, movimientoReducido } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

type Paso = { numero?: string; titulo?: string; textos: string[]; foto: StaticImageData; alt: string; encuadre: string };

const fotosPaso = [fotos.metodoClase, fotos.metodoSalaLlena, fotos.metodoInstructores, fotos.metodoComunidad];

// El paso 0 es la introducción (los dos párrafos); después, un paso por impacto.
const pasos: Paso[] = [
  { textos: metodo.parrafos, foto: fotosPaso[0], alt: metodo.alts[0], encuadre: "object-center" },
  ...metodo.impactos.map((imp, i) => ({
    numero: String(i + 1).padStart(2, "0"),
    titulo: imp.titulo,
    textos: [imp.texto],
    foto: fotosPaso[i + 1],
    alt: metodo.alts[i + 1],
    encuadre: "object-center",
  })),
];

// El fondo cambia de tono con cada paso (y vuelve al de base al salir del relato): acompaña a la
// foto de cada uno. Todos claros, para que el texto no pierda contraste.
const BASE = "#e9e0d4"; // lino-hondo
const TONOS = ["#f2e5cb", "#ecd7b6", "#dde2cd", "#edd9cd"]; // dorado · ámbar · salvia · arcilla

const OCULTA = "inset(100% 0% 0% 0%)";
const VISIBLE = "inset(0% 0% 0% 0%)";

export default function Metodo() {
  const pista = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = pista.current;
    if (!el) return;
    // Sólo escritorio (en mobile los pasos van apilados y esta pista no se dibuja)
    if (!window.matchMedia("(min-width: 1024px)").matches) return;
    {
      const textos = gsap.utils.toArray<HTMLElement>("[data-paso-texto]", el);
      const imagenes = gsap.utils.toArray<HTMLElement>("[data-paso-foto]", el);
      const barras = gsap.utils.toArray<HTMLElement>("[data-paso-barra]", el);
      const contador = el.querySelector<HTMLElement>("[data-paso-contador]");
      const reducido = movimientoReducido();
      let actual = 0;
      let tl: gsap.core.Timeline | null = null;
      const seccion = el.closest("section");
      const teñir = (color: string) => gsap.to(seccion, { backgroundColor: color, duration: reducido ? 0 : 0.9, ease: "power2.out", overwrite: "auto" });

      const ir = (n: number) => {
        if (n === actual) return;
        const desde = actual;
        actual = n;
        tl?.progress(1); // si venía una transición a medias, se termina de golpe
        teñir(TONOS[n]);
        if (contador) contador.textContent = String(n + 1).padStart(2, "0");
        if (reducido) {
          gsap.set(textos, { autoAlpha: 0 });
          gsap.set(textos[n], { autoAlpha: 1 });
          gsap.set(imagenes, { clipPath: OCULTA, zIndex: 0 });
          gsap.set(imagenes[n], { clipPath: VISIBLE, zIndex: 1 });
          return;
        }
        const baja = n > desde; // scrolleando hacia abajo, la foto nueva entra desde abajo
        tl = gsap.timeline();
        // Texto: sale el anterior, entra el nuevo con sus líneas escalonadas
        tl.to(textos[desde], { autoAlpha: 0, y: baja ? -24 : 24, duration: 0.3, ease: "power2.in" }, 0)
          .set(textos[n], { autoAlpha: 1, y: 0 }, 0.25)
          .fromTo(textos[n].children, { y: baja ? 34 : -34, opacity: 0 }, { y: 0, opacity: 1, duration: duracion.media, ease: ease.salida, stagger: 0.07 }, 0.25);
        // Foto: la nueva se descubre por encima; la anterior se corre apenas y queda debajo
        gsap.set(imagenes, { zIndex: 0 });
        gsap.set(imagenes[desde], { zIndex: 1 });
        gsap.set(imagenes[n], { zIndex: 2 });
        tl.fromTo(imagenes[n], { clipPath: baja ? OCULTA : "inset(0% 0% 100% 0%)" }, { clipPath: VISIBLE, duration: 1.1, ease: "power4.inOut" }, 0)
          .fromTo(imagenes[n].querySelector("img"), { scale: 1.22, filter: "blur(16px)" }, { scale: 1, filter: "blur(0px)", duration: 1.5, ease: ease.salida }, 0)
          .fromTo(imagenes[desde].querySelector("img"), { yPercent: 0 }, { yPercent: baja ? -6 : 6, duration: 1.1, ease: "power4.inOut" }, 0)
          .set(imagenes[desde], { clipPath: OCULTA })
          .set(imagenes[desde].querySelector("img"), { yPercent: 0 });
      };

      const st = ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: "bottom bottom",
        // Al quedar fija la sección el fondo toma el tono del paso; al soltarse, vuelve al de base
        onToggle: (s) => teñir(s.isActive ? TONOS[actual] : BASE),
        onUpdate: (s) => {
          const p = s.progress * pasos.length;
          ir(Math.min(pasos.length - 1, Math.floor(p)));
          // Las barras muestran cuánto falta para el cambio
          barras.forEach((b, i) => gsap.set(b, { scaleX: gsap.utils.clamp(0, 1, p - i) }));
        },
      });
      return () => {
        st.kill();
        tl?.kill();
        gsap.killTweensOf(seccion);
        gsap.set(seccion, { clearProps: "backgroundColor" });
      };
    }
  }, []);

  return (
    <section id="metodo" className="bg-lino-hondo" aria-label={metodo.antetitulo}>
      {/* ---------- Escritorio: relato fijo ---------- */}
      <div ref={pista} className="relative hidden lg:block" style={{ height: `${pasos.length * 80 + 100}svh` }}>
        <div className="sticky top-0 h-[100svh]">
          <div className="contenedor grid h-full grid-cols-12 gap-x-[clamp(2rem,4vw,4.5rem)] pb-[clamp(2rem,4.5vh,3.5rem)] pt-[calc(var(--alto-header)+clamp(1.5rem,4vh,3rem))]">
            <div className="col-span-5 flex min-h-0 flex-col justify-between">
              <div>
                <p className="antetitulo" data-revelar>
                  {metodo.antetitulo}
                </p>
                <h2 className="mt-[2vh] text-[clamp(1.5rem,4.5vh,2.875rem)]" data-revelar="palabras">
                  {metodo.titulo}
                </h2>
              </div>

              <div>
                {/* Todos los pasos apilados en la misma celda: el alto es el del más largo */}
                <div className="grid items-end">
                  {pasos.map((p, i) => (
                    <div key={i} data-paso-texto className="col-start-1 row-start-1" style={i > 0 ? { visibility: "hidden", opacity: 0 } : undefined}>
                      {p.numero && <p className="cifra acento text-[length:var(--text-chico)]">{p.numero}</p>}
                      {p.titulo && <h3 className="mt-[1.2vh] text-[clamp(1.375rem,3.6vh,2.25rem)]">{p.titulo}</h3>}
                      {p.textos.map((t, j) => (
                        <p
                          key={j}
                          className={`mt-[1.6vh] ${
                            p.titulo
                              ? "suave text-[clamp(0.9375rem,2.05vh,1.25rem)]"
                              : j === 0
                                ? "text-[clamp(0.9375rem,2.15vh,1.3125rem)] leading-snug"
                                : "suave text-[clamp(0.8125rem,1.75vh,1.0625rem)] leading-normal"
                          }`}
                        >
                          {t}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>

                <div className="mt-[3vh] flex items-center gap-4" aria-hidden="true">
                  <span className="cifra text-[length:var(--text-dato)]">
                    <span data-paso-contador>01</span>
                    <span className="suave"> / {String(pasos.length).padStart(2, "0")}</span>
                  </span>
                  <div className="flex flex-1 gap-1.5">
                    {pasos.map((_, i) => (
                      <span key={i} className="h-px flex-1 bg-noche/15">
                        <span data-paso-barra className="block h-full origin-left bg-ambar-hondo" style={{ transform: `scaleX(${i === 0 ? 0.02 : 0})` }} />
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="relative col-span-7 min-h-0 overflow-hidden rounded-[1.75rem] bg-noche/10">
              {pasos.map((p, i) => (
                <div key={i} data-paso-foto className="absolute inset-0 overflow-hidden" style={i > 0 ? { clipPath: OCULTA } : { zIndex: 1 }}>
                  <Image src={p.foto} alt={p.alt} fill placeholder="blur" sizes="(min-width: 1500px) 800px, 56vw" className={`object-cover ${p.encuadre}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Mobile y tablet: los pasos en fila ---------- */}
      <div className="contenedor pt-[clamp(4.5rem,10vw,8.5rem)] lg:hidden">
        <p className="antetitulo" data-revelar>
          {metodo.antetitulo}
        </p>
        <h2 className="mt-5 text-[length:var(--text-h2)]" data-revelar="palabras">
          {metodo.titulo}
        </h2>
        <ol className="mt-10 space-y-14">
          {pasos.map((p, i) => (
            <li key={i}>
              <div className="overflow-hidden rounded-[1.5rem]" data-foto>
                <div className="relative aspect-[4/5]">
                  <Image src={p.foto} alt={p.alt} fill placeholder="blur" sizes="94vw" className={`object-cover ${p.encuadre}`} />
                </div>
              </div>
              <div className="mt-6" data-escalonar>
                {p.numero && <p className="cifra acento text-[length:var(--text-chico)]">{p.numero}</p>}
                {p.titulo && <h3 className="mt-2 text-[length:var(--text-h3)]">{p.titulo}</h3>}
                {p.textos.map((t, j) => (
                  <p key={j} className={`mt-3 ${!p.titulo && j === 0 ? "text-[length:var(--text-h3)] leading-snug" : "suave"}`}>
                    {t}
                  </p>
                ))}
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="h-[clamp(3rem,7vw,6rem)] lg:hidden" />
    </section>
  );
}
