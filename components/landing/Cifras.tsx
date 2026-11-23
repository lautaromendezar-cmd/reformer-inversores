"use client";

// Las cuatro cifras, sobre fondo oscuro (continúan la foto del hero).
// Se cargan con el scroll: a medida que la banda sube por la pantalla, la regla de cada columna
// se dibuja, el número avanza desde cero y el texto aparece. Hacia atrás, se descargan.
//
// Nada se mueve mientras cuentan:
//   - las cuatro columnas miden lo mismo (grilla fija),
//   - cada número ocupa siempre el ancho de su valor final (se mide al montar) y usa cifras tabulares,
//   - "USD", "Hasta" y "meses" van chicos, fuera del número.

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cifras } from "@/content/landing";
import { movimientoReducido } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

/** "USD 125K – 250K" → prefijo "USD", cuerpo "125K – 250K", sufijo "". "18 – 24 meses" → sufijo "meses". */
function partir(valor: string) {
  const m = valor.match(/^([^\d]*?)\s*(\d.*?\d[K%]?)\s*([^\d%K]*)$/);
  return m ? { prefijo: m[1].trim(), cuerpo: m[2], sufijo: m[3].trim() } : { prefijo: "", cuerpo: valor, sufijo: "" };
}

export default function Cifras() {
  const raiz = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = raiz.current;
    if (!el || movimientoReducido()) return;
    const ctx = gsap.context(() => {
      const columnas = gsap.utils.toArray<HTMLElement>("[data-cifra]");
      // Cada número queda con el ancho exacto de su valor final (en em, así acompaña al tamaño
      // de letra): mientras cuenta no empuja nada.
      gsap.utils.toArray<HTMLElement>("[data-n]").forEach((n) => {
        n.style.width = `${n.getBoundingClientRect().width / parseFloat(getComputedStyle(n).fontSize)}em`;
      });
      const tl = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: el, start: "top 88%", end: "top 28%", scrub: 0.5 } });
      columnas.forEach((col, i) => {
        const inicio = i * 0.14; // cada columna arranca un poco después que la anterior
        const nums = Array.from(col.querySelectorAll<HTMLElement>("[data-n]"));
        tl.fromTo(col.querySelector("[data-cifra-regla]"), { scaleX: 0 }, { scaleX: 1, duration: 0.5 }, inicio)
          .fromTo(col.querySelector("[data-cifra-valor]"), { opacity: 0.25 }, { opacity: 1, duration: 0.3 }, inicio)
          .fromTo(col.querySelectorAll("[data-cifra-texto]"), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.3, stagger: 0.06 }, inicio + 0.2);
        nums.forEach((n) => {
          const v = { n: 0 };
          const fin = Number(n.dataset.n);
          tl.fromTo(v, { n: 0 }, { n: fin, duration: 0.5, ease: "power1.out", onUpdate: () => (n.textContent = String(Math.round(v.n))) }, inicio);
        });
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={raiz} className="oscuro bg-noche py-[clamp(4rem,8vw,7rem)]" aria-label="Cifras clave">
      <div className="contenedor">
        <dl className="grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {cifras.map((c) => {
            const { prefijo, cuerpo, sufijo } = partir(c.valor);
            return (
              <div key={c.etiqueta} data-cifra className="relative flex min-w-0 flex-col pt-7">
                <span className="regla absolute inset-x-0 top-0 border-t" aria-hidden="true" />
                <span data-cifra-regla className="absolute inset-x-0 top-0 h-px origin-left bg-ambar" aria-hidden="true" />

                <dt className="antetitulo order-2 mt-5" data-cifra-texto>
                  {c.etiqueta}
                </dt>
                <dd className="order-1" data-cifra-valor>
                  <span className="suave block h-[1.5em] text-[length:var(--text-chico)]">{prefijo}</span>
                  <span className="cifra flex items-baseline gap-[0.35em] whitespace-nowrap text-[clamp(2rem,1.2rem+1.5vw,2.875rem)]">
                    <span>
                      {cuerpo.split(/(\d+)/).map((parte, i) =>
                        /^\d+$/.test(parte) ? (
                          // Ancho fijo = el del valor final: el número no empuja nada mientras cuenta
                          <span key={i} data-n={parte} className="inline-block text-right">
                            {parte}
                          </span>
                        ) : (
                          <span key={i} className="whitespace-pre">
                            {parte}
                          </span>
                        ),
                      )}
                    </span>
                    {sufijo && <span className="suave text-[0.4em] font-normal tracking-normal">{sufijo}</span>}
                  </span>
                </dd>
                <dd className="suave order-3 mt-3 max-w-[30ch] text-[length:var(--text-chico)]" data-cifra-texto>
                  {c.texto}
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
