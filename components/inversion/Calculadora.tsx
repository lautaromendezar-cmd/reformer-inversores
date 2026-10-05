"use client";

// Calculadora: de 10 a 25 Reformers. El formato se ajusta solo (10-14 Compacta, 15-19
// Standard, 20-25 Flagship) y el indicador salta entre formatos con Flip; canon, CAPEX y total
// interpolan con GSAP. Sólo números del documento (content/economia.ts), todos estimados.

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import Planta from "@/components/Planta";
import { formatos, formatoPara, canon, usd } from "@/content/economia";
import { calculadora as t } from "@/content/inversion";
import { duracion, ease, movimientoReducido } from "@/lib/motion";

gsap.registerPlugin(Flip);

const MIN = 10;
const MAX = 25;
// Valores del primer render. Los <span> de los números muestran SIEMPRE estos (React nunca los
// cambia) y GSAP escribe encima: así React y GSAP no se pisan el mismo nodo de texto.
const INICIAL = {
  canon: canon(15),
  capexMin: formatos[1].capex[0],
  capexMax: formatos[1].capex[1],
  totMin: canon(15) + formatos[1].capex[0],
  totMax: canon(15) + formatos[1].capex[1],
};
const fmt = (v: number) => v.toLocaleString("es-AR");

export default function Calculadora() {
  const [n, setN] = useState(15);
  const formato = formatoPara(n);
  const idx = formatos.indexOf(formato);

  const chips = useRef<(HTMLLIElement | null)[]>([]);
  const indicador = useRef<HTMLSpanElement | null>(null);
  const panel = useRef<HTMLDivElement>(null);
  const valores = useRef({ ...INICIAL });

  // El indicador lo crea y lo mueve GSAP (no React): así Flip puede cambiarlo de padre.
  useLayoutEffect(() => {
    const el = document.createElement("span");
    el.className = "calc-indicador";
    el.setAttribute("aria-hidden", "true");
    indicador.current = el;
    chips.current[idx]?.prepend(el);
    return () => el.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    const el = indicador.current;
    const destino = chips.current[idx];
    if (!el || !destino || el.parentElement === destino) return;
    const estado = Flip.getState(el);
    destino.prepend(el);
    if (!movimientoReducido()) Flip.from(estado, { duration: duracion.corta, ease: ease.cambio });
  }, [idx]);

  useEffect(() => {
    const destino = {
      canon: canon(n),
      capexMin: formato.capex[0],
      capexMax: formato.capex[1],
      totMin: canon(n) + formato.capex[0],
      totMax: canon(n) + formato.capex[1],
    };
    const pintar = () => {
      panel.current?.querySelectorAll<HTMLElement>("[data-num]").forEach((el) => {
        const v = valores.current[el.dataset.num as keyof typeof INICIAL];
        el.textContent = fmt(Math.round(v));
      });
    };
    if (movimientoReducido()) {
      Object.assign(valores.current, destino);
      pintar();
      return;
    }
    const tw = gsap.to(valores.current, { ...destino, duration: duracion.corta, ease: ease.salida, onUpdate: pintar });
    return () => {
      tw.kill();
    };
  }, [n, formato]);

  const totMin = canon(n) + formato.capex[0];
  const totMax = canon(n) + formato.capex[1];

  return (
    <div className="grid grid-cols-12 gap-x-6 gap-y-10">
      <div className="col-span-12 lg:col-span-7">
        <label htmlFor="calc-reformers" className="text-[length:var(--text-chico)] font-semibold text-hueso/85">
          {t.etiqueta}
        </label>
        <div className="mt-2 flex items-baseline gap-3">
          <output htmlFor="calc-reformers" className="cifra text-[clamp(4rem,2.5rem+5vw,7rem)] text-luz">
            {n}
          </output>
          <span className="text-hueso/70">Reformers de Autor</span>
        </div>
        <input
          id="calc-reformers"
          type="range"
          min={MIN}
          max={MAX}
          step={1}
          value={n}
          onChange={(e) => setN(Number(e.target.value))}
          aria-valuetext={`${n} Reformers, formato ${formato.nombre}`}
          className="rango mt-4 w-full"
          style={{ "--lleno": `${((n - MIN) / (MAX - MIN)) * 100}%` } as React.CSSProperties}
        />
        <div className="mt-1 flex justify-between text-[length:var(--text-dato)] text-hueso/60" aria-hidden="true">
          <span>{MIN}</span>
          <span>{MAX}</span>
        </div>

        <p className="mt-8 text-[length:var(--text-dato)] font-semibold uppercase tracking-[0.18em] text-hueso/70">{t.formato}</p>
        <ul className="mt-3 grid grid-cols-3 gap-2">
          {formatos.map((f, i) => (
            <li
              key={f.id}
              ref={(el) => {
                chips.current[i] = el;
              }}
              className="relative isolate"
            >
              <button
                type="button"
                onClick={() => setN(f.reformers[0])}
                aria-pressed={i === idx}
                className={`relative z-10 flex h-full w-full flex-col items-start rounded-[1rem] border px-3 py-3 text-left transition-colors duration-300 sm:px-4 ${
                  i === idx ? "border-transparent text-noche" : "border-hueso/15 text-hueso/80 hover:border-hueso/40"
                }`}
              >
                <span className="titulo text-[clamp(0.95rem,0.85rem+0.4vw,1.15rem)] leading-tight">{f.nombre}</span>
                <span className="mt-1 text-[length:var(--text-dato)] opacity-80">
                  {f.reformers[0]}–{f.reformers[1]} · {f.m2[0]}–{f.m2[1]} m²
                </span>
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-10 rounded-[1.25rem] border border-hueso/12 p-5">
          <Planta
            reformers={formato.reformers[1]}
            encendidos={n}
            m2={formato.m2[1]}
            m2Max={formato.m2[1]}
            titulo={`Planta ${formato.nombre}: ${n} de ${formato.reformers[1]} Reformers`}
            className="h-auto max-h-[10rem] w-full text-hueso"
          />
          <p className="mt-4 text-hueso/75">{formato.enfoque}</p>
        </div>
      </div>

      <div className="col-span-12 lg:col-span-5">
        <div ref={panel} className="grid gap-4 lg:sticky lg:top-28">
        <dl className="grid gap-4">
          <div className="rounded-[1.25rem] bg-hueso/[0.06] p-6">
            <dt className="text-[length:var(--text-chico)] text-hueso/75">{t.canon}</dt>
            <dd className="cifra mt-2 text-[clamp(2rem,1.4rem+2vw,3rem)]">
              USD <span data-num="canon">{fmt(INICIAL.canon)}</span>
            </dd>
            <dd className="mt-1 text-[length:var(--text-dato)] text-hueso/60">
              {n} × {usd(1500)}
            </dd>
          </div>
          <div className="rounded-[1.25rem] bg-hueso/[0.06] p-6">
            <dt className="text-[length:var(--text-chico)] text-hueso/75">{t.capex}</dt>
            <dd className="cifra mt-2 text-[clamp(1.6rem,1.2rem+1.5vw,2.25rem)]">
              USD <span data-num="capexMin">{fmt(INICIAL.capexMin)}</span> – <span data-num="capexMax">{fmt(INICIAL.capexMax)}</span>
            </dd>
          </div>
          <div className="rounded-[1.25rem] bg-ambar p-6 text-noche">
            <dt className="text-[length:var(--text-chico)] font-semibold">{t.total}</dt>
            <dd className="cifra mt-2 text-[clamp(1.75rem,1.3rem+1.7vw,2.6rem)]">
              USD <span data-num="totMin">{fmt(INICIAL.totMin)}</span> – <span data-num="totMax">{fmt(INICIAL.totMax)}</span>
            </dd>
            <dd className="mt-3 text-[length:var(--text-dato)] font-semibold uppercase tracking-[0.14em]">Estimado</dd>
          </div>
        </dl>
          <p className="text-[length:var(--text-dato)] text-hueso/65">
            {t.pie}{" "}
            <Link href="#aviso-inversion" className="underline underline-offset-4 hover:text-luz">
              Ver aviso legal
            </Link>
          </p>
          <p className="sr-only" aria-live="polite">
            {`${n} Reformers, ${formato.nombre}. Canon ${usd(canon(n))}. Total estimado entre ${usd(totMin)} y ${usd(totMax)}.`}
          </p>
        </div>
      </div>
    </div>
  );
}
