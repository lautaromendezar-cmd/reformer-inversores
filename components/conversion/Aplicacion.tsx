"use client";

// Formulario de calificación multi-step: una pregunta por pantalla, con progreso. Los campos son
// los del Documento Maestro (nombre, WhatsApp, ciudad/país, perfil, capital) más email, formato
// y comentario. Lee perfil/capital/formato de la URL (los manda el test). Valida cada paso con
// el mismo Zod del servidor. Si el envío falla, ofrece WhatsApp con todo escrito.

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import gsap from "gsap";
import { esquemaLead, perfiles, capitales, formatosInteres } from "@/lib/lead";
import { aplicar as textos } from "@/content/conversion";
import { enlaceWhatsApp, enlaceReunion } from "@/content/sitio";
import { duracion, ease, movimientoReducido } from "@/lib/motion";

type Campo = "nombre" | "email" | "whatsapp" | "ubicacion" | "perfil" | "capital" | "formato" | "comentario";
type Paso =
  | { campo: Campo; etiqueta: string; tipo: "texto"; input: "text" | "email" | "tel"; autoComplete?: string; placeholder?: string }
  | { campo: Campo; etiqueta: string; tipo: "opciones"; opciones: readonly string[] }
  | { campo: Campo; etiqueta: string; tipo: "area" };

const PASOS: Paso[] = [
  { campo: "nombre", etiqueta: "Nombre", tipo: "texto", input: "text", autoComplete: "name" },
  { campo: "email", etiqueta: "Email", tipo: "texto", input: "email", autoComplete: "email" },
  { campo: "whatsapp", etiqueta: "WhatsApp", tipo: "texto", input: "tel", autoComplete: "tel", placeholder: "+54 9 11 …" },
  { campo: "ubicacion", etiqueta: "Ciudad / país de interés", tipo: "texto", input: "text", autoComplete: "address-level2" },
  { campo: "perfil", etiqueta: "Perfil", tipo: "opciones", opciones: perfiles },
  { campo: "capital", etiqueta: "Capital estimado disponible", tipo: "opciones", opciones: capitales },
  { campo: "formato", etiqueta: "Formato de interés", tipo: "opciones", opciones: formatosInteres },
  { campo: "comentario", etiqueta: "Comentario (opcional)", tipo: "area" },
];
const OBLIGATORIOS: Campo[] = ["nombre", "email", "whatsapp", "ubicacion", "perfil", "capital"];

type Estado = "llenando" | "enviando" | "enviado" | "sinEnvio";

export default function Aplicacion() {
  const params = useSearchParams();
  const [datos, setDatos] = useState<Record<Campo, string>>(() => ({
    nombre: "",
    email: "",
    whatsapp: "",
    ubicacion: "",
    perfil: valida(params.get("perfil"), perfiles),
    capital: valida(params.get("capital"), capitales),
    formato: valida(params.get("formato"), formatosInteres),
    comentario: "",
  }));
  const [paso, setPaso] = useState(0);
  const [error, setError] = useState("");
  const [estado, setEstado] = useState<Estado>("llenando");
  const empresa = useRef<HTMLInputElement>(null);
  const caja = useRef<HTMLDivElement>(null);
  const barra = useRef<HTMLDivElement>(null);
  const total = PASOS.length;
  const actual = PASOS[paso];

  useEffect(() => {
    const p = (estado === "enviado" ? total : paso) / total;
    if (barra.current) {
      if (movimientoReducido()) gsap.set(barra.current, { scaleX: p });
      else gsap.to(barra.current, { scaleX: p, duration: duracion.corta, ease: ease.salida });
    }
    if (caja.current && !movimientoReducido()) gsap.fromTo(caja.current, { opacity: 0, x: 24 }, { opacity: 1, x: 0, duration: duracion.corta, ease: ease.salida });
    caja.current?.querySelector<HTMLElement>("[data-foco]")?.focus();
  }, [paso, estado, total]);

  function validar(campo: Campo, valor: string): string {
    if (OBLIGATORIOS.includes(campo) && !valor.trim()) return campo === "perfil" || campo === "capital" ? "Elegí una opción." : "Completá este dato.";
    if (!valor.trim()) return "";
    const r = esquemaLead.shape[campo].safeParse(valor);
    if (!r.success) return r.error.issues[0]?.message ?? "Revisá este dato.";
    if (campo === "ubicacion" && valor.trim().length < 2) return "Completá este dato.";
    return "";
  }

  function avanzar(valor = datos[actual.campo]) {
    const e = validar(actual.campo, valor);
    setError(e);
    if (e) {
      caja.current?.querySelector<HTMLElement>("[data-foco]")?.focus();
      return;
    }
    if (paso < total - 1) setPaso(paso + 1);
    else enviar();
  }

  async function enviar() {
    const cuerpo = {
      nombre: datos.nombre,
      email: datos.email,
      whatsapp: datos.whatsapp,
      ubicacion: datos.ubicacion || undefined,
      perfil: datos.perfil || undefined,
      capital: datos.capital || undefined,
      formato: datos.formato || undefined,
      comentario: datos.comentario || undefined,
      origen: "aplicar",
      empresa: empresa.current?.value ?? "",
    };
    setEstado("enviando");
    try {
      const res = await fetch("/api/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(cuerpo) });
      const j = await res.json().catch(() => ({}));
      setEstado(res.ok && j.ok ? "enviado" : "sinEnvio");
    } catch {
      setEstado("sinEnvio");
    }
  }

  const resumen = `Hola, quiero aplicar a una franquicia Fosque Reformer. ${PASOS.filter((p) => datos[p.campo])
    .map((p) => `${p.etiqueta}: ${datos[p.campo]}`)
    .join(". ")}.`;

  if (estado === "enviado") {
    return (
      <div ref={caja} className="mx-auto max-w-2xl text-center">
        <h2 tabIndex={-1} data-foco className="text-[length:var(--text-h1)] text-luz focus:outline-none">
          {textos.gracias.titulo}
        </h2>
        <p className="mt-5 text-hueso/80">{textos.gracias.texto}</p>
        <a href={enlaceReunion()} target="_blank" rel="noopener noreferrer" className="boton boton-luz mt-8" data-magnetico>
          {textos.gracias.agendar}
        </a>
      </div>
    );
  }

  return (
    <form
      noValidate
      className="mx-auto max-w-3xl"
      onSubmit={(e) => {
        e.preventDefault();
        avanzar();
      }}
    >
      <div className="flex items-center justify-between text-[length:var(--text-dato)] font-semibold uppercase tracking-[0.18em] text-hueso/70">
        <span>
          Paso {paso + 1} de {total}
        </span>
        {paso > 0 && (
          <button
            type="button"
            onClick={() => {
              setError("");
              setPaso(paso - 1);
            }}
            className="underline underline-offset-4 hover:text-luz"
          >
            Volver
          </button>
        )}
      </div>
      <div className="mt-3 h-1 overflow-hidden rounded-full bg-hueso/12" aria-hidden="true">
        <div ref={barra} className="h-full origin-left bg-luz shadow-[0_0_12px_rgb(255_195_122/0.8)]" style={{ transform: "scaleX(0)" }} />
      </div>

      {/* Honeypot */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Empresa
          <input ref={empresa} type="text" name="empresa" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div ref={caja} key={paso} className="mt-12">
        {actual.tipo === "opciones" ? (
          <fieldset aria-describedby={error ? "ap-error" : undefined}>
            <legend tabIndex={-1} data-foco className="titulo text-[length:var(--text-h1)] leading-tight focus:outline-none">
              {actual.etiqueta}
            </legend>
            <ul className="mt-10 grid gap-3">
              {actual.opciones.map((o) => (
                <li key={o}>
                  <button
                    type="button"
                    aria-pressed={datos[actual.campo] === o}
                    onClick={() => {
                      setDatos((d) => ({ ...d, [actual.campo]: o }));
                      setError("");
                      window.setTimeout(() => avanzar(o), movimientoReducido() ? 0 : 200);
                    }}
                    className={`flex w-full items-center justify-between gap-4 rounded-[1rem] border p-5 text-left transition-colors duration-300 sm:p-6 ${
                      datos[actual.campo] === o ? "border-ambar bg-ambar text-noche" : "border-hueso/15 hover:border-luz"
                    }`}
                  >
                    <span>{o}</span>
                    <span aria-hidden="true">→</span>
                  </button>
                </li>
              ))}
            </ul>
          </fieldset>
        ) : (
          <div>
            <label htmlFor={`ap-${actual.campo}`} className="titulo block text-[length:var(--text-h1)] leading-tight">
              {actual.etiqueta}
            </label>
            {actual.tipo === "area" ? (
              <textarea
                id={`ap-${actual.campo}`}
                data-foco
                rows={4}
                value={datos[actual.campo]}
                onChange={(e) => setDatos((d) => ({ ...d, [actual.campo]: e.target.value }))}
                className="campo-grande mt-8 resize-y"
              />
            ) : (
              <input
                id={`ap-${actual.campo}`}
                data-foco
                type={actual.input}
                autoComplete={actual.autoComplete}
                placeholder={actual.placeholder}
                value={datos[actual.campo]}
                aria-invalid={!!error}
                aria-describedby={error ? "ap-error" : undefined}
                onChange={(e) => setDatos((d) => ({ ...d, [actual.campo]: e.target.value }))}
                className="campo-grande mt-8"
              />
            )}
          </div>
        )}

        {error && (
          <p id="ap-error" role="alert" className="mt-4 text-[#ffb3ad]">
            {error}
          </p>
        )}

        {actual.tipo !== "opciones" && (
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <button type="submit" className="boton boton-luz" data-magnetico disabled={estado === "enviando"}>
              {paso === total - 1 ? (estado === "enviando" ? "Enviando…" : "Enviar aplicación") : "Siguiente"}
            </button>
            <span className="text-[length:var(--text-dato)] text-hueso/60">o presioná Enter</span>
          </div>
        )}
        {actual.tipo === "opciones" && datos[actual.campo] && (
          <button type="button" onClick={() => avanzar()} className="boton boton-linea mt-8 text-hueso">
            Siguiente
          </button>
        )}

        {estado === "sinEnvio" && (
          <div role="alert" className="mt-8 rounded-[0.75rem] border border-ambar/40 p-4 text-[length:var(--text-chico)] text-hueso/85">
            No pudimos enviar la aplicación. Mandanos los mismos datos por WhatsApp:{" "}
            <a href={enlaceWhatsApp(resumen)} target="_blank" rel="noopener noreferrer" className="font-semibold text-luz underline underline-offset-4">
              enviar por WhatsApp
            </a>
            .
          </div>
        )}
      </div>
    </form>
  );
}

function valida(v: string | null, lista: readonly string[]): string {
  return v && lista.includes(v) ? v : "";
}
