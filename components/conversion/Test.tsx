"use client";

// Test "¿Es para vos?": seis preguntas, una por pantalla. Cada opción suma puntos a un perfil
// y/o a un formato; el resultado muestra el perfil y el formato con datos del documento, y
// lleva a /aplicar con todo precargado.

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Planta from "@/components/Planta";
import { test, type Perfil, type FormatoId, type Capital } from "@/content/conversion";
import { formatos, canon, usd } from "@/content/economia";
import { duracion, ease, movimientoReducido } from "@/lib/motion";

const PERFILES: Perfil[] = ["Inversor Pasivo", "Inversor Operador", "Operador Técnico"];
const FORMATOS: FormatoId[] = ["compacta", "standard", "flagship"];

export default function Test() {
  const [paso, setPaso] = useState(0);
  const [elegidas, setElegidas] = useState<(number | null)[]>(() => test.preguntas.map(() => null));
  const caja = useRef<HTMLDivElement>(null);
  const barra = useRef<HTMLDivElement>(null);
  const total = test.preguntas.length;
  const terminado = paso >= total;

  useEffect(() => {
    if (!barra.current) return;
    const p = Math.min(paso, total) / total;
    if (movimientoReducido()) gsap.set(barra.current, { scaleX: p });
    else gsap.to(barra.current, { scaleX: p, duration: duracion.corta, ease: ease.salida });
    if (!caja.current) return;
    if (!movimientoReducido()) gsap.fromTo(caja.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: duracion.corta, ease: ease.salida });
    caja.current.querySelector<HTMLElement>("[data-foco]")?.focus();
  }, [paso, total]);

  const elegir = (i: number) => {
    setElegidas((prev) => prev.map((v, j) => (j === paso ? i : v)));
    window.setTimeout(() => setPaso((p) => p + 1), movimientoReducido() ? 0 : 220);
  };

  // Resultado
  const puntos = { perfil: new Map<Perfil, number>(), formato: new Map<FormatoId, number>() };
  let capital: Capital | undefined;
  test.preguntas.forEach((q, qi) => {
    const o = elegidas[qi] != null ? q.opciones[elegidas[qi]!] : undefined;
    if (!o) return;
    const peso = o.peso ?? 1;
    if (o.perfil) puntos.perfil.set(o.perfil, (puntos.perfil.get(o.perfil) ?? 0) + peso);
    if (o.formato) puntos.formato.set(o.formato, (puntos.formato.get(o.formato) ?? 0) + peso);
    if (o.capital) capital = o.capital;
  });
  const mejor = <T,>(m: Map<T, number>, orden: T[]) => orden.reduce((a, b) => ((m.get(b) ?? 0) > (m.get(a) ?? 0) ? b : a), orden[0]);
  const perfil = mejor(puntos.perfil, PERFILES);
  const formato = formatos.find((f) => f.id === mejor(puntos.formato, FORMATOS))!;
  const params = new URLSearchParams({ perfil, formato: formato.nombre, ...(capital ? { capital } : {}) });

  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex items-center justify-between text-[length:var(--text-dato)] font-semibold uppercase tracking-[0.18em] text-hueso/70">
        <span>{terminado ? "Resultado" : `Pregunta ${paso + 1} de ${total}`}</span>
        {paso > 0 && !terminado && (
          <button type="button" onClick={() => setPaso((p) => p - 1)} className="underline underline-offset-4 hover:text-luz">
            Volver
          </button>
        )}
      </div>
      <div className="mt-3 h-1 overflow-hidden rounded-full bg-hueso/12" aria-hidden="true">
        <div ref={barra} className="h-full origin-left bg-luz shadow-[0_0_12px_rgb(255_195_122/0.8)]" style={{ transform: "scaleX(0)" }} />
      </div>

      <div ref={caja} className="mt-12">
        {!terminado ? (
          <fieldset key={paso}>
            <legend tabIndex={-1} data-foco className="titulo text-[length:var(--text-h1)] leading-tight focus:outline-none">
              {test.preguntas[paso].pregunta}
            </legend>
            <ul className="mt-10 grid gap-3">
              {test.preguntas[paso].opciones.map((o, i) => (
                <li key={o.texto}>
                  <button
                    type="button"
                    onClick={() => elegir(i)}
                    aria-pressed={elegidas[paso] === i}
                    className={`flex w-full items-center justify-between gap-4 rounded-[1rem] border p-5 text-left transition-colors duration-300 sm:p-6 ${
                      elegidas[paso] === i ? "border-ambar bg-ambar text-noche" : "border-hueso/15 hover:border-luz"
                    }`}
                  >
                    <span className="text-[length:var(--text-cuerpo)]">{o.texto}</span>
                    <span aria-hidden="true">→</span>
                  </button>
                </li>
              ))}
            </ul>
          </fieldset>
        ) : (
          <div>
            <h2 tabIndex={-1} data-foco className="text-[length:var(--text-h2)] focus:outline-none">
              Tu perfil sugerido
            </h2>
            <p className="titulo mt-3 text-[length:var(--text-display)] leading-none text-luz">{perfil}</p>
            <div className="mt-12 rounded-[1.25rem] border border-hueso/15 p-6 sm:p-8">
              <p className="text-[length:var(--text-dato)] font-semibold uppercase tracking-[0.18em] text-ambar">Formato sugerido</p>
              <h3 className="mt-3 text-[length:var(--text-h2)]">{formato.nombre}</h3>
              <Planta reformers={formato.reformers[1]} m2={formato.m2[1]} m2Max={formato.m2[1]} titulo={`Planta ${formato.nombre}`} className="mt-6 h-auto max-h-[8rem] w-full text-hueso" />
              <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2 text-[length:var(--text-chico)] sm:grid-cols-4">
                <div>
                  <dt className="text-hueso/65">Superficie</dt>
                  <dd className="cifra">
                    {formato.m2[0]}–{formato.m2[1]} m²
                  </dd>
                </div>
                <div>
                  <dt className="text-hueso/65">Reformers</dt>
                  <dd className="cifra">
                    {formato.reformers[0]} a {formato.reformers[1]}
                  </dd>
                </div>
                <div>
                  <dt className="text-hueso/65">Canon</dt>
                  <dd className="cifra">desde {usd(canon(formato.reformers[0]))}</dd>
                </div>
                <div>
                  <dt className="text-hueso/65">CAPEX estimado</dt>
                  <dd className="cifra">
                    {usd(formato.capex[0])} – {formato.capex[1].toLocaleString("es-AR")}
                  </dd>
                </div>
              </dl>
              <p className="mt-5 text-hueso/80">{formato.enfoque}</p>
              {capital === "+USD 250k (Master)" && <p className="mt-3 text-luz">{test.master}</p>}
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href={`/aplicar?${params.toString()}`} className="boton boton-luz" data-magnetico>
                Aplicar con estos datos
              </Link>
              <Link href="/inversion#calculadora" className="boton boton-linea text-hueso">
                Abrir la calculadora
              </Link>
              <button
                type="button"
                onClick={() => {
                  setElegidas(test.preguntas.map(() => null));
                  setPaso(0);
                }}
                className="boton text-hueso/80 underline underline-offset-4 hover:text-luz"
              >
                Empezar de nuevo
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
