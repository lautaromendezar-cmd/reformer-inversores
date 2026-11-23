// Pie a todo el ancho, con el mismo fondo vivo del hero (components/Follaje.tsx) en versión
// oscura: hojas de luz ámbar que se mecen y siguen al cursor. Arriba, un cierre grande con el
// botón; abajo, la marca, la navegación y el aviso legal.

import Link from "next/link";
import Lockup from "./Lockup";
import Follaje from "./Follaje";
import { navegacion, accesos, avisoLegal } from "@/content/sitio";
import { pie, hero } from "@/content/landing";

export default function Footer() {
  return (
    <footer className="oscuro relative isolate overflow-clip bg-noche pb-28 md:pb-10">
      <Follaje composicion="hero" tono="oscuro" intensidad={2.2} />
      {/* Para que el aviso legal, abajo, se lea siempre */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-[linear-gradient(0deg,rgb(23_17_14/0.92)_0%,transparent_100%)]" />

      {/* Cierre */}
      <div className="contenedor contenedor-ancho grid grid-cols-12 items-end gap-x-6 gap-y-10 pb-[clamp(4rem,9vw,8rem)] pt-[clamp(5rem,11vw,10rem)]">
        <div className="col-span-12 lg:col-span-8">
          <Lockup className="h-[clamp(4.5rem,9vw,9rem)] w-auto" />
          <p className="titulo mt-8 max-w-3xl text-[length:var(--text-h3)] text-hueso/85">{pie.descripcion}</p>
        </div>
        <div className="col-span-12 lg:col-span-4 lg:justify-self-end">
          <Link href={accesos.dossier.href} className="boton boton-luz !min-h-[3.75rem] !px-8 text-[length:var(--text-cuerpo)]" data-magnetico>
            {hero.cta} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>

      <div className="contenedor contenedor-ancho">
        <nav aria-label="Pie" className="regla flex flex-wrap items-center justify-between gap-x-10 gap-y-4 border-t py-7">
          <ul className="flex flex-wrap gap-x-8 gap-y-2">
            {navegacion.map((n, i) => (
              <li key={n.href}>
                <Link href={n.href} className="enlace-menu flex items-start gap-1 text-hueso/85 transition-colors hover:text-luz">
                  {n.etiqueta}
                  <sup className="cifra mt-1 text-[0.5625rem] tracking-normal text-hueso/40" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </sup>
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/legal" className="enlace-menu text-[length:var(--text-chico)] text-hueso/70 transition-colors hover:text-luz">
            Términos y aviso legal
          </Link>
        </nav>

        <div id="aviso-legal" className="regla grid grid-cols-12 gap-x-6 gap-y-4 border-t pt-7 text-[length:var(--text-dato)] leading-relaxed text-hueso/60">
          <p className="col-span-12 lg:col-span-5">{pie.aviso}</p>
          <p className="col-span-12 lg:col-span-5">{avisoLegal.texto}</p>
          <p className="col-span-12 lg:col-span-2 lg:text-right">© {new Date().getFullYear()} Fosque Reformer. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
