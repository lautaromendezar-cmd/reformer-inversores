"use client";

// Header fijo y liviano: a la izquierda la marca sola (isotipo + nombre); a la derecha una
// cápsula translúcida con los cinco ítems numerados y el botón del dossier adentro.
// Sobre el hero no tiene fondo; al scrollear la barra toma lino translúcido para que la marca
// se lea sobre cualquier bloque, y aparece la línea de progreso.
// En mobile: marca + Menú, y la barra inferior fija (BarraMovil).

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Isotipo from "./Isotipo";
import { navegacion, accesos, marca } from "@/content/sitio";
import { scroll } from "./Motor";
import { duracion, ease } from "@/lib/motion";

export default function Header() {
  const ruta = usePathname();
  const [solido, setSolido] = useState(false);
  const [abierto, setAbierto] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const boton = useRef<HTMLButtonElement>(null);
  const fueAbierto = useRef(false);

  useEffect(() => {
    const alScrollear = () => setSolido(window.scrollY > 24);
    alScrollear();
    window.addEventListener("scroll", alScrollear, { passive: true });
    return () => window.removeEventListener("scroll", alScrollear);
  }, []);

  // Cerrar el menú al navegar (ajuste durante el render: sin efecto en cascada)
  const [rutaPrevia, setRutaPrevia] = useState(ruta);
  if (ruta !== rutaPrevia) {
    setRutaPrevia(ruta);
    setAbierto(false);
  }

  useEffect(() => {
    const el = panel.current;
    if (!el) return;
    if (abierto) {
      fueAbierto.current = true;
      scroll()?.stop();
      gsap.set(el, { display: "flex" });
      gsap.fromTo(el, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: duracion.corta, ease: ease.cambio });
      gsap.fromTo(el.querySelectorAll("li"), { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: duracion.corta, ease: ease.salida, stagger: 0.05, delay: 0.12 });
      el.querySelector<HTMLAnchorElement>("a")?.focus();
      const esc = (e: KeyboardEvent) => e.key === "Escape" && setAbierto(false);
      window.addEventListener("keydown", esc);
      return () => window.removeEventListener("keydown", esc);
    }
    if (!fueAbierto.current) return;
    scroll()?.start();
    boton.current?.focus();
    gsap.to(el, { clipPath: "inset(0 0 100% 0)", duration: 0.35, ease: ease.cambio, onComplete: () => gsap.set(el, { display: "none" }) });
  }, [abierto]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500 ${
          solido || abierto ? "border-b border-noche/10 bg-lino/80 backdrop-blur-md" : "border-b border-transparent"
        }`}
      >
        <div className="contenedor contenedor-ancho flex h-[var(--alto-header)] items-center justify-between gap-6 text-noche">
          <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label={`${marca.corto}, inicio`}>
            <Isotipo className="h-6 w-auto" />
            <span className="titulo text-[1.125rem] tracking-tight">{marca.corto}</span>
          </Link>

          {/* La cápsula: navegación + botón */}
          <nav aria-label="Principal" className="hidden items-center gap-1 rounded-full bg-noche/[0.06] p-1.5 pl-3 backdrop-blur-md lg:flex">
            <ul className="flex items-center">
              {navegacion.map((n, i) => (
                <li key={n.href}>
                  <Link href={n.href} className="group flex items-start gap-1 rounded-full px-3.5 py-2 text-[0.9375rem] text-noche/75 transition-colors duration-300 hover:bg-noche/[0.07] hover:text-noche">
                    {n.etiqueta}
                    <sup className="cifra mt-0.5 text-[0.5625rem] tracking-normal text-noche/40 transition-colors duration-300 group-hover:text-ambar-hondo" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </sup>
                  </Link>
                </li>
              ))}
            </ul>
            <Link href={accesos.dossier.href} data-magnetico className="boton boton-noche ml-2 !min-h-[2.5rem] !py-2">
              {accesos.dossier.etiqueta}
            </Link>
          </nav>

          <div className="flex items-center gap-2 lg:hidden">
            <Link href={accesos.dossier.href} className="boton boton-noche hidden !min-h-[2.5rem] !py-2 md:inline-flex">
              {accesos.dossier.etiqueta}
            </Link>
            <button
              ref={boton}
              type="button"
              className="boton !min-h-[2.75rem] bg-noche/[0.06] !px-5 backdrop-blur-md"
              aria-expanded={abierto}
              aria-controls="menu-movil"
              onClick={() => setAbierto((v) => !v)}
            >
              {abierto ? "Cerrar" : "Menú"}
            </button>
          </div>
        </div>
        <span className="progreso" data-progreso aria-hidden="true" />
      </header>

      {/* Fuera del <header>: su backdrop-filter haría de contenedor de los fixed y recortaría el panel */}
      <div
        id="menu-movil"
        ref={panel}
        style={{ display: "none" }}
        className="fixed inset-x-0 bottom-0 top-[var(--alto-header)] z-40 flex-col justify-between overflow-y-auto bg-lino px-[clamp(1rem,2.6vw,3rem)] pb-28 pt-8 text-noche lg:!hidden"
      >
        <nav aria-label="Menú">
          <ul className="flex flex-col gap-1">
            {navegacion.map((n, i) => (
              <li key={n.href}>
                <Link href={n.href} onClick={() => setAbierto(false)} className="titulo flex items-start gap-2 py-2 text-[clamp(2rem,8vw,3rem)]">
                  {n.etiqueta}
                  <sup className="cifra mt-2 text-[0.75rem] tracking-normal text-ambar-hondo" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </sup>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <p className="mt-10 max-w-xs text-[length:var(--text-chico)] text-noche/65">{marca.bajada}</p>
      </div>
    </>
  );
}
