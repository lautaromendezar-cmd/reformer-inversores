"use client";

// El motor: Lenis + GSAP (ScrollTrigger, SplitText) registrados UNA vez, y las convenciones
// que se leen del DOM en cada ruta:
//   .escena[data-luz="nombre"]   → al llegar, el fondo pasa a lib/luz.ts[nombre] (arco de luz)
//   [data-revelar]               → fade + subida al entrar
//   [data-revelar="lineas"]      → SplitText por líneas con máscara
//   [data-revelar="palabras"]    → cada palabra sube flotando y se enfoca (titulares)
//   [data-escalonar]             → los hijos directos entran uno detrás del otro
//   [data-foto]                  → la foto se descubre de abajo hacia arriba, se asienta y enfoca
//   [data-leer]                  → el texto se enciende palabra por palabra con el scroll
//   [data-progreso]              → línea de progreso de lectura (header)
//   [data-mezclar]               → las letras se mezclan y se rearman al pasar el mouse (por su
//                                  [data-mezclar-zona] más cercana, si la hay). Los antetítulos
//                                  con data-revelar también se mezclan al aparecer.
//   [data-parallax="12"]         → parallax vertical con scrub
//   [data-contar]                → los <span data-n="24"> de adentro cuentan desde 0
//   [data-magnetico]             → se acerca un poco al puntero (sólo escritorio)
// Mismo esquema que el B2C: vive en el layout, Lenis se crea una vez y lo demás se rearma por
// ruta dentro de un gsap.context que al revertir mata sólo lo suyo.

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import Lenis from "lenis";
import { luces, type Luz, type NombreLuz } from "@/lib/luz";
import { duracion, ease, escalonado, consultaEscritorio } from "@/lib/motion";
import { precargaLista } from "@/lib/precarga";

gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin);
// Flip se registra donde se usa (niveles y territorios).

let lenis: Lenis | null = null;
/** Para frenar el scroll con el menú abierto. */
export function scroll() {
  return lenis;
}

export default function Motor() {
  const ruta = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 0.95, anchors: { offset: -80, duration: 1.2 } });
    lenis.on("scroll", ScrollTrigger.update);
    if (document.documentElement.classList.contains("precargando")) {
      lenis.stop();
      precargaLista.then(() => lenis?.start());
    }
    const tick = (t: number) => lenis?.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    const reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const destino = window.location.hash && document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
    if (destino) requestAnimationFrame(() => (lenis ? lenis.scrollTo(destino, { immediate: true, force: true }) : destino.scrollIntoView()));
    else if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
    else window.scrollTo(0, 0);

    const splits: SplitText[] = [];
    const quitar: (() => void)[] = [];
    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      // ---- Arco de luz: UNA función pinta :root con el progreso de cada escena ----
      const cadena = Array.from(document.querySelectorAll<HTMLElement>(".escena[data-luz]"))
        .map((el) => ({ el, luz: luces[el.dataset.luz as NombreLuz] as Luz }))
        .filter((x) => x.luz);
      const progresos = new Array(cadena.length).fill(0);
      const mezclar = (a: string, b: string, p: number) => gsap.utils.interpolate(a, b, p) as string;
      const pintar = () => {
        if (!cadena.length) return;
        let fondo = cadena[0].luz.fondo,
          tinta = cadena[0].luz.tinta;
        for (let i = 1; i < cadena.length; i++) {
          const p = progresos[i];
          if (p <= 0) continue;
          fondo = mezclar(fondo, cadena[i].luz.fondo, p);
          tinta = mezclar(tinta, cadena[i].luz.tinta, p);
        }
        html.style.setProperty("--luz-fondo", fondo);
        html.style.setProperty("--luz-tinta", tinta);
      };
      cadena.forEach((x, i) => {
        if (i === 0) return;
        const desdeClara = !!cadena[i - 1].luz.clara,
          haciaClara = !!x.luz.clara;
        const [start, end] = haciaClara ? ["top 12%", "top top"] : desdeClara ? ["top bottom", "top 85%"] : ["top 85%", "top 35%"];
        ScrollTrigger.create({
          trigger: x.el,
          start,
          end,
          onUpdate: (s) => {
            progresos[i] = s.progress;
            pintar();
          },
          onRefresh: (s) => {
            progresos[i] = s.progress;
            pintar();
          },
        });
      });
      pintar();

      // Lo que no se está dibujando (p. ej. la versión mobile de un bloque, oculta en escritorio)
      // no se anima: un ScrollTrigger `once` sobre algo con display:none nace "ya pasado", se mata
      // a sí mismo mientras se crea y GSAP revienta ("reading 'end'"). Queda visible y listo.
      const oculto = (el: Element) => el.getClientRects().length === 0;

      // ---- Reveals ----
      html.classList.add("motor-listo");
      document.querySelectorAll<HTMLElement>("[data-revelar]").forEach((el) => {
        if (reducido || oculto(el)) {
          el.classList.add("revelado");
          return;
        }
        const modo = el.dataset.revelar;
        const lineas = modo === "lineas";
        const palabras = modo === "palabras";
        let objetivos: Element[] = [el];
        if (lineas) {
          const split = SplitText.create(el, { type: "lines", linesClass: "linea", autoSplit: true, mask: "lines" });
          splits.push(split);
          objetivos = split.lines;
        } else if (palabras) {
          // Titulares: cada palabra sube flotando y se enfoca (sin máscara: nada se corta en seco)
          const split = SplitText.create(el, { type: "words" });
          splits.push(split);
          gsap.fromTo(
            split.words,
            { yPercent: 55, opacity: 0, filter: "blur(14px)" },
            {
              yPercent: 0,
              opacity: 1,
              filter: "blur(0px)",
              duration: 1.5,
              ease: "expo.out",
              stagger: 0.055,
              delay: Number(el.dataset.retraso || 0),
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
              onStart: () => el.classList.add("revelado"),
              clearProps: "filter",
            },
          );
          return;
        }
        gsap.fromTo(
          objetivos,
          { yPercent: lineas ? 115 : 30, opacity: lineas ? 1 : 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: lineas ? duracion.larga : duracion.media,
            ease: ease.salida,
            stagger: escalonado.lineas,
            delay: Number(el.dataset.retraso || 0),
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
            onStart: () => el.classList.add("revelado"),
          },
        );
      });

      // ---- Escalonado: los hijos directos entran uno detrás del otro ----
      document.querySelectorAll<HTMLElement>("[data-escalonar]").forEach((el) => {
        if (reducido || oculto(el)) {
          el.classList.add("revelado");
          return;
        }
        gsap.fromTo(
          el.children,
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: duracion.media,
            ease: ease.salida,
            stagger: Number(el.dataset.escalonar || escalonado.items),
            scrollTrigger: { trigger: el, start: "top 86%", once: true },
            onStart: () => el.classList.add("revelado"),
            clearProps: "transform",
          },
        );
      });

      // ---- Fotos: se descubren de abajo hacia arriba mientras la imagen se asienta ----
      document.querySelectorAll<HTMLElement>("[data-foto]").forEach((el) => {
        if (reducido || oculto(el)) {
          el.classList.add("revelado");
          return;
        }
        const interior = el.firstElementChild;
        const tl = gsap.timeline({
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
          delay: Number(el.dataset.retraso || 0),
          onStart: () => el.classList.add("revelado"),
        });
        tl.fromTo(el, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "power4.inOut", clearProps: "clipPath" });
        if (interior) tl.fromTo(interior, { scale: 1.25, filter: "blur(18px)" }, { scale: 1, filter: "blur(0px)", duration: 1.7, ease: ease.salida, clearProps: "filter" }, 0);
      });

      // ---- Lectura: el texto se va encendiendo palabra por palabra con el scroll ----
      document.querySelectorAll<HTMLElement>("[data-leer]").forEach((el) => {
        if (reducido || oculto(el)) return;
        const split = SplitText.create(el, { type: "words" });
        splits.push(split);
        gsap.fromTo(
          split.words,
          { opacity: 0.16 },
          { opacity: 1, ease: "none", stagger: 0.1, scrollTrigger: { trigger: el, start: "top 78%", end: "bottom 45%", scrub: 0.6 } },
        );
      });

      // ---- Antetítulos: las letras se mezclan y se arman al aparecer ----
      if (!reducido) {
        document.querySelectorAll<HTMLElement>(".antetitulo[data-revelar]").forEach((el) => {
          if (oculto(el) || el.children.length) return;
          const texto = el.textContent ?? "";
          ScrollTrigger.create({
            trigger: el,
            start: "top 88%",
            once: true,
            onEnter: () => gsap.to(el, { duration: 1, ease: "none", scrambleText: { text: texto, chars: "lowerCase", speed: 0.45 } }),
          });
        });
      }

      // ---- Progreso de lectura (la línea del header) ----
      const progreso = document.querySelector<HTMLElement>("[data-progreso]");
      if (progreso && !reducido) {
        gsap.fromTo(progreso, { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.3 } });
      }

      // ---- Counters ----
      document.querySelectorAll<HTMLElement>("[data-contar]").forEach((bloque) => {
        if (reducido) return;
        const nums = Array.from(bloque.querySelectorAll<HTMLElement>("[data-n]"));
        const estados = nums.map((el) => ({ el, fin: Number(el.dataset.n), v: { n: 0 } }));
        estados.forEach(({ el }) => (el.textContent = "0"));
        ScrollTrigger.create({
          trigger: bloque,
          start: "top 85%",
          once: true,
          onEnter: () =>
            estados.forEach(({ el, fin, v }, i) =>
              gsap.to(v, {
                n: fin,
                duration: duracion.conteo,
                delay: i * 0.12,
                ease: "power2.out",
                onUpdate: () => (el.textContent = Math.round(v.n).toLocaleString("es-AR")),
              }),
            ),
        });
      });

      // ---- Encendido: el ítem se ilumina mientras cruza el centro de la pantalla ----
      document.querySelectorAll<HTMLElement>("[data-encender]").forEach((el) => {
        if (reducido || oculto(el)) {
          el.classList.add("encendido");
          return;
        }
        ScrollTrigger.create({ trigger: el, start: "top 62%", end: "bottom 38%", toggleClass: { targets: el, className: "encendido" } });
      });

      // ---- Parallax ----
      if (!reducido) {
        document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
          const fuerza = Number(el.dataset.parallax || 12);
          gsap.fromTo(
            el,
            { yPercent: -fuerza / 2 },
            {
              yPercent: fuerza / 2,
              ease: ease.lineal,
              scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });
      }
    });

    // ---- Mezcla al pasar el mouse: sólo con puntero fino ----
    if (!reducido && window.matchMedia("(pointer: fine)").matches) {
      document.querySelectorAll<HTMLElement>("[data-mezclar]").forEach((el) => {
        const texto = el.textContent ?? "";
        const zona = el.closest<HTMLElement>("[data-mezclar-zona]") ?? el;
        let medido = false;
        const jugar = () => {
          if (!medido) {
            // Ancho fijo: mientras se mezclan, las letras no empujan lo de al lado
            medido = true;
            el.style.display = "inline-block";
            el.style.width = `${el.getBoundingClientRect().width}px`;
            el.style.whiteSpace = "nowrap";
            el.style.overflow = "hidden";
            el.style.verticalAlign = "bottom";
          }
          gsap.to(el, { duration: 0.55, ease: "none", overwrite: true, scrambleText: { text: texto, chars: "lowerCase", speed: 0.6 } });
        };
        zona.addEventListener("pointerenter", jugar);
        quitar.push(() => {
          zona.removeEventListener("pointerenter", jugar);
          gsap.killTweensOf(el);
          el.textContent = texto;
          el.style.cssText = "";
        });
      });
    }

    // ---- Magnetismo de los CTA: sólo escritorio ----
    if (!reducido) {
      mm.add(consultaEscritorio, () => {
        document.querySelectorAll<HTMLElement>("[data-magnetico]").forEach((el) => {
          const x = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
          const y = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });
          const mover = (e: PointerEvent) => {
            const r = el.getBoundingClientRect();
            x((e.clientX - (r.left + r.width / 2)) * 0.25);
            y((e.clientY - (r.top + r.height / 2)) * 0.35);
          };
          const soltar = () => {
            x(0);
            y(0);
          };
          el.addEventListener("pointermove", mover);
          el.addEventListener("pointerleave", soltar);
          quitar.push(() => {
            el.removeEventListener("pointermove", mover);
            el.removeEventListener("pointerleave", soltar);
            gsap.set(el, { x: 0, y: 0 });
          });
        });
      });
    }

    ScrollTrigger.refresh();
    let timer = 0;
    const ro = new ResizeObserver(() => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => ScrollTrigger.refresh(), 150);
    });
    ro.observe(document.body);

    return () => {
      ro.disconnect();
      window.clearTimeout(timer);
      quitar.forEach((f) => f());
      mm.revert();
      splits.forEach((s) => s.revert());
      ctx.revert();
      html.classList.remove("motor-listo");
    };
  }, [ruta]);

  return null;
}
