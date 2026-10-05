"use client";

// Formulario corto (home): nombre, email, WhatsApp, perfil y si quiere el dossier. Valida con
// el mismo Zod que el servidor. Si el envío por email no está configurado o falla, ofrece
// mandar lo mismo por WhatsApp: el lead nunca se pierde.

import { useState } from "react";
import { esquemaLead, erroresPorCampo, perfiles } from "@/lib/lead";
import { enlaceWhatsApp } from "@/content/sitio";

type Estado = "listo" | "enviando" | "enviado" | "sinEnvio";

const campoBase =
  "mt-2 w-full rounded-[0.75rem] border border-hueso/20 bg-noche/40 px-4 py-3.5 text-hueso placeholder:text-hueso/40 transition-colors focus:border-ambar focus:outline-none";

export default function FormularioCorto({ origen = "home" }: { origen?: string }) {
  const [estado, setEstado] = useState<Estado>("listo");
  const [errores, setErrores] = useState<Record<string, string>>({});
  const [resumen, setResumen] = useState("");

  async function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const datos = {
      nombre: String(fd.get("nombre") ?? ""),
      email: String(fd.get("email") ?? ""),
      whatsapp: String(fd.get("whatsapp") ?? ""),
      perfil: (fd.get("perfil") as string) || undefined,
      dossier: fd.get("dossier") === "on",
      origen,
      empresa: String(fd.get("empresa") ?? ""),
    };
    const r = esquemaLead.safeParse(datos);
    if (!r.success) {
      const errs = erroresPorCampo(r.error);
      setErrores(errs);
      const primero = Object.keys(errs)[0];
      if (primero) document.getElementById(`fc-${primero}`)?.focus();
      return;
    }
    setErrores({});
    setEstado("enviando");
    setResumen(
      `Hola, soy ${r.data.nombre}. ${r.data.perfil ? `Perfil: ${r.data.perfil}. ` : ""}${r.data.dossier ? "Quiero recibir el Dossier Maestro. " : ""}Mi email: ${r.data.email}. Mi WhatsApp: ${r.data.whatsapp}.`,
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

  if (estado === "enviado") {
    return (
      <div role="status" className="rounded-[1.25rem] border border-ambar/40 bg-noche/50 p-8 backdrop-blur">
        <p className="titulo text-[length:var(--text-h2)] text-luz">Gracias. Ya tenemos tus datos.</p>
        <p className="mt-4 text-hueso/80">Te vamos a escribir para coordinar la reunión estratégica.</p>
      </div>
    );
  }

  return (
    <form onSubmit={enviar} noValidate className="rounded-[1.25rem] border border-hueso/15 bg-noche/55 p-6 backdrop-blur-md sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Campo id="nombre" etiqueta="Nombre y apellido" error={errores.nombre} autoComplete="name" className="sm:col-span-2" />
        <Campo id="email" etiqueta="Email" tipo="email" error={errores.email} autoComplete="email" />
        <Campo id="whatsapp" etiqueta="WhatsApp" tipo="tel" error={errores.whatsapp} autoComplete="tel" placeholder="+54 9 11 …" />
        <div className="sm:col-span-2">
          <label htmlFor="fc-perfil" className="text-[length:var(--text-chico)] font-semibold text-hueso/85">
            Perfil
          </label>
          <select id="fc-perfil" name="perfil" defaultValue="" className={`${campoBase} appearance-none`}>
            <option value="">Elegí una opción (opcional)</option>
            {perfiles.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Honeypot: invisible para personas, tentador para bots */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Empresa
          <input type="text" name="empresa" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label className="mt-6 flex cursor-pointer items-center gap-3 text-hueso/85">
        <input type="checkbox" name="dossier" defaultChecked className="size-5 accent-[#f4a950]" />
        Quiero recibir el Dossier Maestro
      </label>

      <div className="mt-7 flex flex-wrap items-center gap-4">
        <button type="submit" className="boton boton-luz" data-magnetico disabled={estado === "enviando"}>
          {estado === "enviando" ? "Enviando…" : "Enviar mis datos"}
        </button>
        <a href={enlaceWhatsApp()} target="_blank" rel="noopener noreferrer" className="text-[length:var(--text-chico)] text-hueso/70 underline underline-offset-4 hover:text-luz">
          Prefiero WhatsApp
        </a>
      </div>

      {estado === "sinEnvio" && (
        <div role="alert" className="mt-6 rounded-[0.75rem] border border-ambar/40 p-4 text-[length:var(--text-chico)] text-hueso/85">
          No pudimos enviar el formulario. Mandanos los mismos datos por WhatsApp y te respondemos igual:{" "}
          <a href={enlaceWhatsApp(resumen)} target="_blank" rel="noopener noreferrer" className="font-semibold text-luz underline underline-offset-4">
            enviar por WhatsApp
          </a>
          .
        </div>
      )}
    </form>
  );
}

function Campo({
  id,
  etiqueta,
  tipo = "text",
  error,
  autoComplete,
  placeholder,
  className = "",
}: {
  id: string;
  etiqueta: string;
  tipo?: string;
  error?: string;
  autoComplete?: string;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={`fc-${id}`} className="text-[length:var(--text-chico)] font-semibold text-hueso/85">
        {etiqueta}
      </label>
      <input
        id={`fc-${id}`}
        name={id}
        type={tipo}
        autoComplete={autoComplete}
        placeholder={placeholder}
        aria-invalid={!!error}
        aria-describedby={error ? `fc-${id}-error` : undefined}
        className={`${campoBase} ${error ? "border-coral" : ""}`}
      />
      {error && (
        <p id={`fc-${id}-error`} className="mt-2 text-[length:var(--text-chico)] text-[#ffb3ad]">
          {error}
        </p>
      )}
    </div>
  );
}
