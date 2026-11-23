"use client";

// Bloque 7, columna derecha: el formulario de calificación (los seis campos del Documento
// Maestro). Valida con el mismo Zod que el servidor. Si el envío por email no está configurado
// o falla, ofrece mandar lo mismo por WhatsApp: el lead nunca se pierde.
// Escucha "fr:configuracion" (el simulador) para precargar el rango de capital.

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { esquemaLead, erroresPorCampo, zonas, perfiles, capitales, type Lead } from "@/lib/lead";
import { postulacion as t } from "@/content/landing";
import { enlaceWhatsApp } from "@/content/sitio";
import { duracion, ease, movimientoReducido } from "@/lib/motion";

type Estado = "listo" | "enviando" | "enviado" | "sinEnvio";

export default function Postulacion() {
  const [estado, setEstado] = useState<Estado>("listo");
  const [errores, setErrores] = useState<Record<string, string>>({});
  const [enviado, setEnviado] = useState<Lead | null>(null);
  const [resumen, setResumen] = useState("");
  const [capital, setCapital] = useState("");
  const camas = useRef<number | undefined>(undefined);
  const caja = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const alConfigurar = (e: Event) => {
      const d = (e as CustomEvent<{ capital: string; camas: number }>).detail;
      setCapital(d.capital);
      camas.current = d.camas;
      // Un destello en el campo para que se note que vino cargado del simulador
      const campo = document.getElementById("fp-capital");
      if (campo && !movimientoReducido()) gsap.fromTo(campo, { boxShadow: "0 0 0 4px rgb(244 169 80 / 0.55)" }, { boxShadow: "0 0 0 0px rgb(244 169 80 / 0)", duration: 1.6, delay: 0.9, ease: "power2.out" });
    };
    window.addEventListener("fr:configuracion", alConfigurar);
    return () => window.removeEventListener("fr:configuracion", alConfigurar);
  }, []);

  // La confirmación entra con un escalonado
  useEffect(() => {
    if (estado !== "enviado" || movimientoReducido() || !caja.current) return;
    gsap.fromTo(caja.current.querySelectorAll("[data-entra]"), { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: duracion.media, ease: ease.salida, stagger: 0.08 });
  }, [estado]);

  async function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const datos = {
      nombre: String(fd.get("nombre") ?? ""),
      whatsapp: String(fd.get("whatsapp") ?? ""),
      email: String(fd.get("email") ?? ""),
      zona: String(fd.get("zona") ?? ""),
      perfil: String(fd.get("perfil") ?? ""),
      capital: String(fd.get("capital") ?? ""),
      camas: camas.current,
      origen: "landing",
      empresa: String(fd.get("empresa") ?? ""),
    };
    const r = esquemaLead.safeParse(datos);
    if (!r.success) {
      const errs = erroresPorCampo(r.error);
      setErrores(errs);
      const primero = Object.keys(errs)[0];
      if (primero) document.getElementById(`fp-${primero}`)?.focus();
      return;
    }
    setErrores({});
    setEstado("enviando");
    setEnviado(r.data);
    setResumen(
      `Hola, soy ${r.data.nombre}. Quiero recibir el Dossier Financiero de Fosque Reformer. Zona: ${r.data.zona}. Perfil: ${r.data.perfil}. Capital: ${r.data.capital}. Email: ${r.data.email}. WhatsApp: ${r.data.whatsapp}.`,
    );
    try {
      const res = await fetch("/api/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(r.data) });
      const j = await res.json().catch(() => ({}));
      if (res.ok && j.ok) setEstado("enviado");
      else if (j.errores) {
        setErrores(j.errores);
        setEstado("listo");
      } else setEstado("sinEnvio");
    } catch {
      setEstado("sinEnvio");
    }
  }

  return (
    <div ref={caja} id="postular" className="claro rounded-[1.75rem] bg-papel p-6 shadow-[0_2.5rem_5rem_-3rem_rgb(23_17_14/0.35)] sm:p-10">
      {estado === "enviado" && enviado ? (
        <div role="status">
          <p className="antetitulo" data-entra>
            {t.antetitulo}
          </p>
          <h2 className="mt-4 text-[length:var(--text-h2)]" data-entra>
            {t.gracias}, {enviado.nombre.split(" ")[0]}!
          </h2>
          <p className="suave mt-4 max-w-lg" data-entra>
            {t.confirmacion}
          </p>
          <dl className="mt-8 text-[length:var(--text-chico)]" data-entra>
            {[
              [t.campos.zona.etiqueta, enviado.zona],
              [t.campos.perfil.etiqueta, enviado.perfil],
              [t.campos.capital.etiqueta, enviado.capital],
            ].map(([k, v]) => (
              <div key={k} className="regla border-t py-3">
                <dt className="suave">{k}</dt>
                <dd className="mt-0.5 font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
          <button
            type="button"
            className="boton boton-linea mt-8"
            data-entra
            onClick={() => {
              setEstado("listo");
              setEnviado(null);
            }}
          >
            {t.otra}
          </button>
        </div>
      ) : (
        <>
          <p className="antetitulo">
            {t.antetitulo}
          </p>
          <h2 className="mt-4 text-[clamp(1.75rem,1.3rem+1.8vw,2.5rem)]">
            {t.titulo}
          </h2>
          <p className="suave mt-4 max-w-xl text-[length:var(--text-chico)]">
            {t.bajada}
          </p>

          <form onSubmit={enviar} noValidate className="regla relative mt-8 border-t pt-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <Campo id="nombre" etiqueta={t.campos.nombre.etiqueta} ejemplo={t.campos.nombre.ejemplo} error={errores.nombre} autoComplete="name" />
              <Campo id="whatsapp" etiqueta={t.campos.whatsapp.etiqueta} ejemplo={t.campos.whatsapp.ejemplo} tipo="tel" error={errores.whatsapp} autoComplete="tel" />
              <Campo id="email" etiqueta={t.campos.email.etiqueta} ejemplo={t.campos.email.ejemplo} tipo="email" error={errores.email} autoComplete="email" />
              <Selector id="zona" etiqueta={t.campos.zona.etiqueta} vacio={t.campos.zona.vacio} opciones={zonas} error={errores.zona} />
              <Selector id="perfil" etiqueta={t.campos.perfil.etiqueta} vacio={t.campos.perfil.vacio} opciones={perfiles} error={errores.perfil} className="sm:col-span-2" />
              <Selector
                id="capital"
                etiqueta={t.campos.capital.etiqueta}
                vacio={t.campos.capital.vacio}
                opciones={capitales}
                error={errores.capital}
                className="sm:col-span-2"
                valor={capital}
                alCambiar={setCapital}
              />
            </div>

            {/* Honeypot: invisible para personas, tentador para bots */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label>
                Empresa
                <input type="text" name="empresa" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <button type="submit" className="boton boton-noche mt-8 w-full !min-h-[3.5rem]" disabled={estado === "enviando"}>
              {estado === "enviando" ? t.enviando : t.enviar} <span aria-hidden="true">→</span>
            </button>

            {estado === "sinEnvio" && (
              <div role="alert" className="mt-6 rounded-[0.75rem] border border-ambar-hondo/40 p-4 text-[length:var(--text-chico)]">
                No pudimos enviar el formulario. Envíanos los mismos datos por WhatsApp y te respondemos igual:{" "}
                <a href={enlaceWhatsApp(resumen)} target="_blank" rel="noopener noreferrer" className="font-semibold text-ambar-hondo underline underline-offset-4">
                  enviar por WhatsApp
                </a>
                .
              </div>
            )}
          </form>
        </>
      )}
    </div>
  );
}

function Etiqueta({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <label htmlFor={`fp-${id}`} className="text-[length:var(--text-dato)] font-semibold uppercase tracking-[0.12em]">
      {children} <span aria-hidden="true">*</span>
    </label>
  );
}

function Error({ id, texto }: { id: string; texto?: string }) {
  if (!texto) return null;
  return (
    <p id={`fp-${id}-error`} className="mt-2 text-[length:var(--text-chico)] text-[#b3261e]">
      {texto}
    </p>
  );
}

function Campo({ id, etiqueta, ejemplo, tipo = "text", error, autoComplete }: { id: string; etiqueta: string; ejemplo: string; tipo?: string; error?: string; autoComplete?: string }) {
  return (
    <div>
      <Etiqueta id={id}>{etiqueta}</Etiqueta>
      <input
        id={`fp-${id}`}
        name={id}
        type={tipo}
        required
        autoComplete={autoComplete}
        placeholder={ejemplo}
        aria-invalid={!!error}
        aria-describedby={error ? `fp-${id}-error` : undefined}
        className="campo"
      />
      <Error id={id} texto={error} />
    </div>
  );
}

function Selector({
  id,
  etiqueta,
  vacio,
  opciones,
  error,
  className = "",
  valor,
  alCambiar,
}: {
  id: string;
  etiqueta: string;
  vacio: string;
  opciones: readonly string[];
  error?: string;
  className?: string;
  valor?: string;
  alCambiar?: (v: string) => void;
}) {
  const control = alCambiar ? { value: valor, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => alCambiar(e.target.value) } : { defaultValue: "" };
  return (
    <div className={className}>
      <Etiqueta id={id}>{etiqueta}</Etiqueta>
      <select id={`fp-${id}`} name={id} required aria-invalid={!!error} aria-describedby={error ? `fp-${id}-error` : undefined} className="campo" {...control}>
        <option value="">{vacio}</option>
        {opciones.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <Error id={id} texto={error} />
    </div>
  );
}
