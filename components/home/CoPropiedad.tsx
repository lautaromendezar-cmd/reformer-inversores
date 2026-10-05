"use client";

// Adelanto de la co-propiedad: comparativa "franquicia del pasado" vs "ecosistema Fosque".
// En escritorio se ven las dos columnas y el selector apaga una; en mobile se ve una sola
// columna por vez (la que elige el selector), así cada fila entra entera en pantalla.

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { coPropiedad } from "@/content/home";
import { fotos } from "@/lib/imagenes";
import { duracion, ease, movimientoReducido } from "@/lib/motion";

export default function CoPropiedad() {
  const [vista, setVista] = useState<0 | 1>(1);
  const tabla = useRef<HTMLDivElement>(null);
  const primera = useRef(true);

  useEffect(() => {
    if (primera.current) {
      primera.current = false;
      return;
    }
    if (movimientoReducido()) return;
    const celdas = tabla.current?.querySelectorAll(`[data-col="${vista}"]`);
    if (celdas?.length) gsap.fromTo(celdas, { opacity: 0.2, y: 10 }, { opacity: 1, y: 0, duration: duracion.corta, ease: ease.salida, stagger: 0.05 });
  }, [vista]);

  return (
    <section className="escena claro relative overflow-hidden py-[clamp(5rem,12vw,10rem)]" data-luz="lino" aria-labelledby="copro-titulo">
      <div className="contenedor grid grid-cols-12 gap-x-6 gap-y-12">
        <div className="col-span-12 lg:col-span-5">
          <div className="relative aspect-[3/4] overflow-hidden rounded-[1.25rem]">
            <div className="absolute inset-[-8%_0]" data-parallax="10">
              <Image src={fotos.equipo} alt={coPropiedad.alt} fill placeholder="blur" sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover object-[50%_60%]" />
            </div>
            {/* Velo cálido: la sala de palmeras es verdosa y el resto del sitio vive en 2700K */}
            <div aria-hidden="true" className="absolute inset-0 bg-[#f4a950] mix-blend-soft-light opacity-50" />
            <p className="absolute bottom-0 left-0 m-4 rounded-full bg-noche/80 px-4 py-2 text-[length:var(--text-dato)] font-semibold uppercase tracking-[0.14em] text-hueso backdrop-blur">
              Hasta 50% para el staff clave
            </p>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-7 lg:pl-6">
          <p className="antetitulo" data-revelar>
            {coPropiedad.antetitulo}
          </p>
          <h2 id="copro-titulo" className="mt-5 text-[length:var(--text-h1)]" data-revelar="lineas">
            {coPropiedad.titulo}
          </h2>
          <p className="mt-6 max-w-xl text-noche/75" data-revelar>
            {coPropiedad.bajada}
          </p>

          <div role="group" aria-label="Comparar modelos" className="mt-10 inline-flex rounded-full border border-noche/20 p-1">
            {coPropiedad.columnas.map((c, i) => (
              <button
                key={c}
                type="button"
                aria-pressed={vista === i}
                onClick={() => setVista(i as 0 | 1)}
                className={`rounded-full px-4 py-2.5 text-[length:var(--text-chico)] font-semibold transition-colors duration-300 sm:px-5 ${
                  vista === i ? (i === 1 ? "bg-noche text-luz" : "bg-noche/80 text-hueso") : "text-noche/70 hover:text-noche"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div ref={tabla} className="mt-8">
            <div className="hidden grid-cols-[9rem_1fr_1fr] gap-x-6 pb-3 text-[length:var(--text-dato)] font-semibold uppercase tracking-[0.14em] text-noche/55 md:grid">
              <span />
              {coPropiedad.columnas.map((c) => (
                <span key={c}>{c}</span>
              ))}
            </div>
            <dl>
              {coPropiedad.filas.map((f) => (
                <div key={f.tema} className="grid gap-x-6 gap-y-1 border-t border-noche/15 py-5 md:grid-cols-[9rem_1fr_1fr]">
                  <dt className="font-semibold">{f.tema}</dt>
                  <dd
                    data-col="0"
                    className={`transition-opacity duration-500 ${vista === 0 ? "block text-noche" : "hidden text-noche/40 line-through decoration-noche/25 md:block"}`}
                  >
                    {f.antes}
                  </dd>
                  <dd
                    data-col="1"
                    className={`transition-opacity duration-500 ${vista === 1 ? "block font-semibold text-noche" : "hidden text-noche/45 md:block"}`}
                  >
                    {vista === 1 && <span aria-hidden="true" className="mr-2 inline-block size-1.5 -translate-y-0.5 rounded-full bg-ambar shadow-[0_0_10px_2px_rgb(244_169_80/0.7)]" />}
                    {f.ahora}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <Link href="/co-propiedad" className="enlace-flecha mt-10 text-ambar-hondo">
            {coPropiedad.cta} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
