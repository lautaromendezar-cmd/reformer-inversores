"use client";

// Simulador: de 15 a 25 camas. La lógica es la del boceto (content/landing.ts, `simular`).
// Los números interpolan con GSAP y la planta enciende un Reformer por cada cama elegida.
// "Postular con esta configuración" le pasa el rango de capital al formulario y baja hasta él.

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Planta from "@/components/Planta";
import { simulador as t, simular } from "@/content/landing";
import { capitales } from "@/lib/lead";
import { duracion, ease, movimientoReducido } from "@/lib/motion";

// Los <span data-num> muestran SIEMPRE el valor inicial (React nunca los cambia) y GSAP escribe
// encima: así React y GSAP no se pisan el mismo nodo de texto.
const INICIAL = simular(t.inicial);
const fmt = (v: number) => Math.round(v).toLocaleString("es-AR");

export default function Simulador() {
  const [camas, setCamas] = useState(t.inicial);
  const r = simular(camas);
  const panel = useRef<HTMLDivElement>(null);
  const valores = useRef({ canon: INICIAL.canon, capex: INICIAL.capex, facturacion: INICIAL.facturacion, m2: INICIAL.m2 });

  useEffect(() => {
    const destino = simular(camas);
    const fin = { canon: destino.canon, capex: destino.capex, facturacion: destino.facturacion, m2: destino.m2 };
    const pintar = () => {
      panel.current?.querySelectorAll<HTMLElement>("[data-num]").forEach((el) => {
        el.textContent = fmt(valores.current[el.dataset.num as keyof typeof fin]);
      });
    };
    if (movimientoReducido()) {
      Object.assign(valores.current, fin);
      pintar();
      return;
    }
    const tw = gsap.to(valores.current, { ...fin, duration: duracion.corta, ease: ease.salida, onUpdate: pintar });
    return () => {
      tw.kill();
    };
  }, [camas]);

  const postular = () => {
    const capital = r.formato.id === "compacta" ? capitales[0] : capitales[1];
    window.dispatchEvent(new CustomEvent("fr:configuracion", { detail: { capital, camas } }));
  };

  return (
    <div ref={panel} id="simulador" className="oscuro rounded-[1.75rem] bg-noche p-6 sm:p-10 lg:p-12">
      <div className="grid grid-cols-12 gap-x-6 gap-y-10 lg:gap-x-12">
        <div className="col-span-12 lg:col-span-6">
          <p className="antetitulo">{t.etiqueta}</p>
          <h3 className="mt-4 text-[clamp(1.75rem,1.3rem+1.8vw,2.5rem)]">{t.titulo}</h3>
          <p className="suave mt-4 max-w-lg text-[length:var(--text-chico)]">{t.bajada}</p>

          <div className="mt-8 flex items-end justify-between gap-4">
            <label htmlFor="sim-camas" className="text-[length:var(--text-chico)] font-semibold">
              {t.control}
            </label>
            <output htmlFor="sim-camas" className="cifra whitespace-nowrap text-[clamp(2.25rem,1.6rem+2.4vw,3.5rem)] text-luz">
              {camas} <span className="text-[0.45em] tracking-normal">{t.unidad}</span>
            </output>
          </div>
          <input
            id="sim-camas"
            type="range"
            min={t.min}
            max={t.max}
            step={1}
            value={camas}
            onChange={(e) => setCamas(Number(e.target.value))}
            aria-valuetext={`${camas} camas, formato ${r.formato.nombre}`}
            className="rango mt-2 w-full"
            style={{ "--lleno": `${((camas - t.min) / (t.max - t.min)) * 100}%` } as React.CSSProperties}
          />
          <div className="suave mt-1 flex justify-between text-[length:var(--text-dato)]" aria-hidden="true">
            {t.marcas.map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>

          <div className="regla mt-8 border-t pt-6">
            <Planta reformers={t.max} encendidos={camas} m2={250} m2Max={250} titulo={`Planta de la sala: ${camas} de ${t.max} Reformers`} className="h-auto max-h-[8.5rem] w-full text-hueso" />
            <div className="mt-5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <p>
                <span className="suave block text-[length:var(--text-dato)]">{t.formato}</span>
                <span className="font-semibold">
                  {r.formato.nombre} ({r.formato.m2[0]} – {r.formato.m2[1]} m²)
                </span>
              </p>
              <p className="cifra text-[length:var(--text-chico)] !leading-snug">
                ~<span data-num="m2">{fmt(INICIAL.m2)}</span> {t.sugeridos}
              </p>
            </div>
          </div>
        </div>

        <dl className="col-span-12 grid content-start gap-4 sm:grid-cols-2 lg:col-span-6">
          <div className="rounded-[1.25rem] bg-hueso/[0.07] p-6">
            <dt className="antetitulo !text-hueso/65">{t.canon.titulo}</dt>
            <dd className="cifra mt-4 whitespace-nowrap text-[clamp(1.6rem,1.2rem+1.5vw,2.25rem)]">
              USD <span data-num="canon">{fmt(INICIAL.canon)}</span>
            </dd>
            <dd className="suave mt-2 text-[length:var(--text-dato)]">{t.canon.pie}</dd>
          </div>
          <div className="rounded-[1.25rem] bg-hueso/[0.07] p-6">
            <dt className="antetitulo !text-hueso/65">{t.capex.titulo}</dt>
            <dd className="cifra mt-4 whitespace-nowrap text-[clamp(1.6rem,1.2rem+1.5vw,2.25rem)] text-luz">
              USD <span data-num="capex">{fmt(INICIAL.capex)}</span>
            </dd>
            <dd className="suave mt-2 text-[length:var(--text-dato)]">{t.capex.pie}</dd>
          </div>
          <div className="rounded-[1.25rem] bg-hueso/[0.07] p-6">
            <dt className="antetitulo !text-hueso/65">{t.facturacion.titulo}</dt>
            <dd className="cifra mt-4 text-[clamp(1.6rem,1.2rem+1.5vw,2.25rem)]">
              +<span data-num="facturacion">{fmt(INICIAL.facturacion)}</span>%
            </dd>
            <dd className="suave mt-2 text-[length:var(--text-dato)]">{t.facturacion.pie}</dd>
          </div>
          <div className="claro flex flex-col rounded-[1.25rem] bg-ambar p-6">
            <dt className="antetitulo !text-noche/70">{t.retorno.titulo}</dt>
            <dd className="cifra mt-4 text-[clamp(1.6rem,1.2rem+1.5vw,2.25rem)]">{t.retorno.valor}</dd>
            <dd className="mt-auto pt-5">
              <a href="#postular" onClick={postular} className="enlace-flecha text-[length:var(--text-chico)] text-noche">
                {t.retorno.cta} <span aria-hidden="true">→</span>
              </a>
            </dd>
          </div>
          <p className="sr-only" aria-live="polite">
            {`${camas} camas, ${r.formato.nombre}. Canon USD ${fmt(r.canon)}. CAPEX total estimado USD ${fmt(r.capex)}.`}
          </p>
        </dl>
      </div>
    </div>
  );
}
