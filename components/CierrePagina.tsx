// Banda final de las páginas internas: los dos CTA del documento (aplicar y reunión).
import Link from "next/link";
import { accesos, enlaceReunion } from "@/content/sitio";

export default function CierrePagina() {
  return (
    <section className="escena relative overflow-hidden py-[clamp(5rem,10vw,8rem)]" data-luz="noche" aria-labelledby="cierre-pagina">
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-full size-[90vmax] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[radial-gradient(circle,rgb(255_195_122/0.22)_0%,transparent_60%)]" />
      <div className="contenedor relative flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
        <h2 id="cierre-pagina" className="max-w-3xl text-[length:var(--text-h1)]" data-revelar="lineas">
          Aplicar a mi franquicia
        </h2>
        <div className="flex flex-wrap gap-3" data-revelar>
          <Link href={accesos.aplicar.href} className="boton boton-luz uppercase tracking-[0.12em]" data-magnetico>
            Aplicar
          </Link>
          <a href={enlaceReunion()} target="_blank" rel="noopener noreferrer" className="boton boton-linea text-hueso">
            Agendar reunión estratégica
          </a>
        </div>
      </div>
    </section>
  );
}
