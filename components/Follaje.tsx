"use client";

// Follaje: el fondo vivo del sitio. Sombras de palmas desenfocadas, como el mural retroiluminado
// que hay detrás de los Reformers en la sala, llevado a los tonos tierra de la web.
//
// - Las hojas se dibujan por código (no hay imágenes): cada una es un SVG con desenfoque.
// - Se mecen solas, despacio, pivotando desde la base del tallo (como una sombra real).
// - Reaccionan al mouse: cada hoja se corre según su profundidad (las cercanas más, las lejanas
//   menos) y una luz tibia sigue al cursor, como si hubiera alguien del otro lado del vidrio.
// - Es fondo: opacidades bajas, sin contraste. Nunca compite con el texto.
// - Se pausa cuando no está en pantalla. Con "reducir movimiento" queda quieto. En táctil se
//   mece y además se corre con el scroll.
//
// Uso: ponerlo como primer hijo de una sección `relative isolate overflow-clip` (clip y no
// hidden: con hidden se rompen los `sticky` de adentro):
//   <Follaje composicion="hero" />                 sobre fondo claro
//   <Follaje composicion="esquina" tono="oscuro" /> sobre fondo oscuro

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { movimientoReducido } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

// ---------- Geometría de una fronda de palma (determinista: igual en servidor y cliente) ----------

const L = 1000; // largo del tallo en unidades del SVG
const CAJA = { x: -120, y: -620, w: 1300, h: 1240 }; // viewBox que contiene cualquier fronda

function azar(semilla: number) {
  let s = semilla * 9301 + 49297;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

/** Devuelve el `d` de una fronda: tallo curvo con folíolos a ambos lados. */
function fronda(semilla: number, hojas = 24, curva = 0.16, apertura = 1): string {
  const r = azar(semilla);
  const n = (v: number) => v.toFixed(1);
  const punto = (t: number) => ({ x: L * t, y: -curva * L * Math.sin(Math.PI * t * 0.85) });
  const tangente = (t: number) => Math.atan2(-curva * Math.PI * 0.85 * Math.cos(Math.PI * t * 0.85), 1);
  let d = "";
  // El tallo: una lámina fina que se afina hacia la punta
  const pasos = 14;
  const arriba: string[] = [];
  const abajo: string[] = [];
  for (let i = 0; i <= pasos; i++) {
    const t = i / pasos;
    const p = punto(t);
    const a = tangente(t) + Math.PI / 2;
    const g = 7 * (1 - t) + 1;
    arriba.push(`${n(p.x + Math.cos(a) * g)} ${n(p.y + Math.sin(a) * g)}`);
    abajo.unshift(`${n(p.x - Math.cos(a) * g)} ${n(p.y - Math.sin(a) * g)}`);
  }
  d += `M${arriba.join("L")}L${abajo.join("L")}Z`;
  // Los folíolos
  for (let i = 0; i < hojas; i++) {
    const t = 0.1 + (0.88 * i) / (hojas - 1);
    const p = punto(t);
    const dir = tangente(t);
    for (const lado of [-1, 1]) {
      const largo = L * (0.1 + 0.36 * Math.sin(Math.PI * Math.pow(t, 0.75))) * (0.82 + r() * 0.36);
      const ang = dir + lado * ((1.28 - 0.72 * t) * apertura + (r() - 0.5) * 0.22);
      const caida = lado * 0.12 * (r() + 0.4); // el folíolo se arquea apenas
      const punta = { x: p.x + Math.cos(ang + caida) * largo, y: p.y + Math.sin(ang + caida) * largo };
      const medio = { x: p.x + Math.cos(ang) * largo * 0.5, y: p.y + Math.sin(ang) * largo * 0.5 };
      const nx = Math.cos(ang + Math.PI / 2);
      const ny = Math.sin(ang + Math.PI / 2);
      const w = largo * (0.07 + r() * 0.035);
      d += `M${n(p.x)} ${n(p.y)}Q${n(medio.x + nx * w)} ${n(medio.y + ny * w)} ${n(punta.x)} ${n(punta.y)}Q${n(medio.x - nx * w)} ${n(medio.y - ny * w)} ${n(p.x)} ${n(p.y)}Z`;
    }
  }
  return d;
}

const FRONDAS = [fronda(3, 26, 0.18, 1), fronda(11, 22, 0.1, 0.9), fronda(27, 30, 0.24, 1.08), fronda(41, 20, 0.14, 0.82)];

// ---------- Composiciones ----------

type Hoja = {
  /** Base del tallo, en % del contenedor (puede quedar afuera) */
  x: number;
  y: number;
  /** Hacia dónde apunta, en grados (0 = derecha, 90 = abajo) */
  giro: number;
  /** Largo en vmin */
  largo: number;
  desenfoque: number;
  opacidad: number;
  /** Cuánto se corre con el mouse, en px. Más = más cerca */
  profundidad: number;
  forma: number;
  /** Sólo escritorio */
  extra?: boolean;
};

const COMPOSICIONES = {
  // Hero: el follaje cae desde arriba a la derecha (el texto vive a la izquierda)
  hero: [
    { x: 103, y: -10, giro: 148, largo: 112, desenfoque: 15, opacidad: 0.17, profundidad: 26, forma: 0 },
    { x: 108, y: 34, giro: 196, largo: 88, desenfoque: 9, opacidad: 0.11, profundidad: 58, forma: 2 },
    { x: 74, y: -16, giro: 104, largo: 84, desenfoque: 30, opacidad: 0.13, profundidad: 14, forma: 1 },
    { x: 101, y: 86, giro: 222, largo: 70, desenfoque: 14, opacidad: 0.1, profundidad: 44, forma: 3, extra: true },
    { x: -8, y: 108, giro: -54, largo: 82, desenfoque: 34, opacidad: 0.08, profundidad: 18, forma: 1, extra: true },
  ],
  // Esquina: dos o tres hojas que asoman desde arriba a la derecha. Para secciones con mucho texto.
  esquina: [
    { x: 104, y: -14, giro: 152, largo: 86, desenfoque: 24, opacidad: 0.14, profundidad: 22, forma: 2 },
    { x: 110, y: 30, giro: 200, largo: 64, desenfoque: 12, opacidad: 0.09, profundidad: 46, forma: 0 },
    { x: 80, y: -18, giro: 100, largo: 60, desenfoque: 32, opacidad: 0.1, profundidad: 12, forma: 3, extra: true },
  ],
  // Pie: suben desde abajo a la izquierda y desde la derecha. Para cierres.
  pie: [
    { x: -6, y: 112, giro: -48, largo: 96, desenfoque: 22, opacidad: 0.14, profundidad: 24, forma: 0 },
    { x: -10, y: 62, giro: -12, largo: 70, desenfoque: 12, opacidad: 0.09, profundidad: 50, forma: 3 },
    { x: 106, y: 110, giro: 232, largo: 78, desenfoque: 30, opacidad: 0.1, profundidad: 14, forma: 1, extra: true },
  ],
} satisfies Record<string, Hoja[]>;

type Props = {
  composicion?: keyof typeof COMPOSICIONES;
  /** "claro": sombras tierra sobre lino. "oscuro": hojas de luz ámbar sobre noche. */
  tono?: "claro" | "oscuro";
  /** Multiplica la presencia de las hojas (1 = normal). Para fondos donde hay poco texto. */
  intensidad?: number;
  /** La luz tibia que sigue al cursor */
  luz?: boolean;
  className?: string;
};

export default function Follaje({ composicion = "hero", tono = "claro", intensidad = 1, luz = true, className = "" }: Props) {
  const raiz = useRef<HTMLDivElement>(null);
  const hojas: Hoja[] = COMPOSICIONES[composicion];
  const color = tono === "claro" ? ["#71564b", "#9a5a14"] : ["#ffc37a", "#f4a950"];

  useEffect(() => {
    const el = raiz.current;
    if (!el || movimientoReducido()) return;
    const quitar: (() => void)[] = [];
    const ctx = gsap.context(() => {
      // 1) Se mecen solas: cada hoja con su ritmo, pivotando desde la base
      const vaivenes = gsap.utils.toArray<HTMLElement>("[data-hoja-mece]").map((h, i) =>
        gsap.fromTo(
          h,
          { rotation: -1.6 - (i % 3) * 0.5 },
          { rotation: 1.8 + (i % 2) * 0.9, duration: 7.5 + i * 1.9, ease: "sine.inOut", repeat: -1, yoyo: true, delay: -i * 2.3 },
        ),
      );
      // La retroiluminación respira
      const respira = gsap.fromTo("[data-follaje-fondo]", { opacity: 0.75 }, { opacity: 1, duration: 9, ease: "sine.inOut", repeat: -1, yoyo: true });

      // 2) Pausa fuera de pantalla
      let enPantalla = true;
      const io = new IntersectionObserver(([e]) => {
        enPantalla = e.isIntersecting;
        [...vaivenes, respira].forEach((t) => (enPantalla ? t.resume() : t.pause()));
      });
      io.observe(el);
      quitar.push(() => io.disconnect());

      // 3) El mouse: sólo con puntero fino
      if (!window.matchMedia("(pointer: fine)").matches) {
        // Táctil: no hay cursor. Las hojas se corren con el scroll, las cercanas más que las lejanas.
        const hojas = gsap.utils.toArray<HTMLElement>("[data-hoja-mueve]").map((h) => ({
          p: Number(h.dataset.hojaMueve),
          y: gsap.quickTo(h, "y", { duration: 0.9, ease: "power3.out" }),
          r: gsap.quickTo(h, "rotation", { duration: 1.2, ease: "power3.out" }),
        }));
        ScrollTrigger.create({
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (s) =>
            hojas.forEach((c) => {
              c.y((0.5 - s.progress) * c.p * 3);
              c.r((s.progress - 0.5) * c.p * 0.14);
            }),
        });
        return;
      }
      const capas = gsap.utils.toArray<HTMLElement>("[data-hoja-mueve]").map((h) => {
        const p = Number(h.dataset.hojaMueve);
        return {
          p,
          x: gsap.quickTo(h, "x", { duration: 1.6 + p / 60, ease: "power3.out" }),
          y: gsap.quickTo(h, "y", { duration: 1.6 + p / 60, ease: "power3.out" }),
          r: gsap.quickTo(h, "rotation", { duration: 2.2, ease: "power3.out" }),
        };
      });
      const foco = el.querySelector<HTMLElement>("[data-follaje-luz]");
      const fx = foco && gsap.quickTo(foco, "x", { duration: 1.1, ease: "power3.out" });
      const fy = foco && gsap.quickTo(foco, "y", { duration: 1.1, ease: "power3.out" });
      let encendida = false;
      const mover = (e: PointerEvent) => {
        if (!enPantalla) return;
        const r = el.getBoundingClientRect();
        if (e.clientY < r.top - 80 || e.clientY > r.bottom + 80) return;
        const nx = ((e.clientX - r.left) / r.width - 0.5) * 2;
        const ny = ((e.clientY - r.top) / r.height - 0.5) * 2;
        // Las hojas se corren en contra del cursor: las cercanas más
        capas.forEach((c) => {
          c.x(-nx * c.p);
          c.y(-ny * c.p * 0.6);
          c.r(nx * c.p * 0.035);
        });
        if (foco && fx && fy) {
          fx(e.clientX - r.left);
          fy(e.clientY - r.top);
          if (!encendida) {
            encendida = true;
            gsap.to(foco, { opacity: 1, duration: 1.4, ease: "power2.out" });
          }
        }
      };
      const salir = () => {
        capas.forEach((c) => {
          c.x(0);
          c.y(0);
          c.r(0);
        });
        if (foco) {
          encendida = false;
          gsap.to(foco, { opacity: 0, duration: 1.2, ease: "power2.out" });
        }
      };
      window.addEventListener("pointermove", mover, { passive: true });
      document.documentElement.addEventListener("pointerleave", salir);
      quitar.push(() => {
        window.removeEventListener("pointermove", mover);
        document.documentElement.removeEventListener("pointerleave", salir);
      });
    }, el);
    return () => {
      quitar.forEach((f) => f());
      ctx.revert();
    };
  }, []);

  return (
    <div ref={raiz} aria-hidden="true" className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}>
      {/* La retroiluminación: un vidrio tibio detrás de las hojas */}
      <div
        data-follaje-fondo
        className="absolute inset-0"
        style={{
          background:
            tono === "claro"
              ? "radial-gradient(60% 70% at 84% 18%, rgb(255 205 140 / 0.42) 0%, transparent 70%), radial-gradient(45% 55% at 8% 92%, rgb(255 195 122 / 0.22) 0%, transparent 70%)"
              : "radial-gradient(60% 70% at 84% 18%, rgb(244 169 80 / 0.16) 0%, transparent 70%), radial-gradient(45% 55% at 8% 92%, rgb(244 169 80 / 0.08) 0%, transparent 70%)",
        }}
      />

      {hojas.map((h, i) => (
        // Cuatro niveles: posición → mouse (sin girar, para que el corrimiento sea en pantalla) →
        // giro fijo → vaivén. Cada animación toca un elemento distinto: no se pisan.
        <div key={i} className={`absolute size-0 ${h.extra ? "hidden lg:block" : ""}`} style={{ left: `${h.x}%`, top: `${h.y}%` }}>
          <div data-hoja-mueve={h.profundidad} className="absolute left-0 top-0 size-0 will-change-transform">
            <div className="absolute left-0 top-0 size-0" style={{ transform: `rotate(${h.giro}deg)` }}>
            <div data-hoja-mece className="absolute left-0 top-0 size-0 will-change-transform">
              <svg
                viewBox={`${CAJA.x} ${CAJA.y} ${CAJA.w} ${CAJA.h}`}
                className="absolute max-w-none"
                style={{
                  width: `${(h.largo * CAJA.w) / L}vmin`,
                  height: `${(h.largo * CAJA.h) / L}vmin`,
                  left: `${(h.largo * CAJA.x) / L}vmin`,
                  top: `${(h.largo * CAJA.y) / L}vmin`,
                  filter: `blur(${h.desenfoque}px)`,
                  opacity: Math.min(1, (tono === "claro" ? h.opacidad : h.opacidad * 0.75) * intensidad),
                  mixBlendMode: tono === "claro" ? "multiply" : "screen",
                }}
              >
                <path d={FRONDAS[h.forma]} fill={color[i % 2]} />
              </svg>
            </div>
            </div>
          </div>
        </div>
      ))}

      {/* La luz que sigue al cursor */}
      {luz && (
        <div
          data-follaje-luz
          className="absolute left-0 top-0 -ml-[26vmin] -mt-[26vmin] size-[52vmin] opacity-0 will-change-transform"
          style={{
            background: tono === "claro" ? "radial-gradient(circle, rgb(255 226 178 / 0.6) 0%, rgb(255 214 150 / 0.2) 38%, transparent 68%)" : "radial-gradient(circle, rgb(255 195 122 / 0.16) 0%, transparent 66%)",
            mixBlendMode: tono === "claro" ? "soft-light" : "screen",
          }}
        />
      )}
    </div>
  );
}
