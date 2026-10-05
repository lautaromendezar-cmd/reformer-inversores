import Link from "next/link";
import Lockup from "./Lockup";
import { navegacion, accesos, avisoLegal, enlaceWhatsApp, enlaceReunion, marca } from "@/content/sitio";

export default function Footer() {
  return (
    <footer className="relative border-t border-hueso/10 bg-noche pb-28 pt-20 text-hueso md:pb-12">
      <div className="contenedor grid gap-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <Lockup className="h-14 w-auto text-hueso" />
          <p className="mt-3 text-[0.625rem] font-semibold uppercase tracking-[0.32em] text-ambar">Partners</p>
          <p className="mt-6 max-w-sm text-hueso/70">{marca.descripcion}</p>
        </div>

        <nav aria-label="Pie" className="md:col-span-3">
          <h2 className="antetitulo">El sistema</h2>
          <ul className="mt-5 space-y-2.5">
            {navegacion.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="text-hueso/80 transition-colors hover:text-luz">
                  {n.etiqueta}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          <h2 className="antetitulo">Hablemos</h2>
          <ul className="mt-5 space-y-2.5">
            <li>
              <Link href={accesos.aplicar.href} className="text-hueso/80 transition-colors hover:text-luz">
                Aplicar a una franquicia
              </Link>
            </li>
            <li>
              <Link href={accesos.candidato.href} className="text-hueso/80 transition-colors hover:text-luz">
                ¿Fosque Reformer es para vos?
              </Link>
            </li>
            <li>
              <a href={enlaceReunion()} target="_blank" rel="noopener noreferrer" className="text-hueso/80 transition-colors hover:text-luz">
                Agendar reunión estratégica
              </a>
            </li>
            <li>
              <a href={enlaceWhatsApp()} target="_blank" rel="noopener noreferrer" className="text-hueso/80 transition-colors hover:text-luz">
                WhatsApp comercial
              </a>
            </li>
            <li>
              <a href={marca.sitioB2C} target="_blank" rel="noopener noreferrer" className="text-hueso/80 transition-colors hover:text-luz">
                Conocé Fosque Reformer
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="contenedor mt-16">
        <div id="aviso-legal" className="scroll-mt-28 border-t border-hueso/10 pt-8">
          <h2 className="antetitulo !text-hueso/60">{avisoLegal.titulo}</h2>
          <p className="mt-3 max-w-4xl text-[var(--text-dato)] leading-relaxed text-hueso/60">{avisoLegal.texto}</p>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 text-[var(--text-dato)] text-hueso/60">
            <p>© {new Date().getFullYear()} Fosque Reformer. Todos los derechos reservados.</p>
            <ul className="flex gap-6">
              <li>
                <Link href="/legal" className="hover:text-luz">
                  Términos y aviso legal
                </Link>
              </li>
              <li>
                <Link href={accesos.portal.href} className="hover:text-luz">
                  {accesos.portal.etiqueta}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
