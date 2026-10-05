"use client";

// Header sticky: marca | navegación | Portal Socios | APLICAR (siempre visible).
// En mobile: marca + Menú, y la barra inferior fija con Aplicar (BarraMovil).
// Transparente sobre el hero; con el primer scroll toma fondo noche translúcido.

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Isotipo from "./Isotipo";
import { navegacion, accesos } from "@/content/sitio";
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
      gsap.fromTo(el.querySelectorAll("li"), { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: duracion.corta, ease: ease.salida, stagger: 0.04, delay: 0.12 });
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

  const activo = (href: string) => ruta === href || ruta.startsWith(href + "/");

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500 ${
        solido || abierto ? "border-b border-hueso/10 bg-noche/85 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <div className="contenedor flex h-[var(--alto-header)] items-center gap-6 text-hueso">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <Isotipo className="h-7 w-auto" />
          <span className="flex flex-col leading-none">
            <span className="titulo text-[1.05rem] tracking-tight">Fosque Reformer</span>{" "}
            <span className="mt-1 text-[0.625rem] font-semibold uppercase tracking-[0.32em] text-ambar">Partners</span>
          </span>
        </Link>

        <nav aria-label="Principal" className="ml-auto hidden xl:block">
          <ul className="flex items-center gap-7 text-[0.9375rem]">
            {navegacion.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  aria-current={activo(n.href) ? "page" : undefined}
                  className={`relative py-2 transition-colors hover:text-luz ${activo(n.href) ? "text-luz" : "text-hueso/85"}`}
                >
                  {n.etiqueta}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-ambar transition-transform duration-300 ${activo(n.href) ? "scale-x-100" : "scale-x-0"}`}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-3 xl:ml-4">
          <Link href={accesos.portal.href} className="boton boton-linea hidden !min-h-[2.5rem] !py-2 md:inline-flex">
            {accesos.portal.etiqueta}
          </Link>
          <Link href={accesos.aplicar.href} data-magnetico className="boton boton-luz hidden !min-h-[2.5rem] !py-2 uppercase tracking-[0.12em] md:inline-flex">
            {accesos.aplicar.etiqueta}
          </Link>
          <button
            ref={boton}
            type="button"
            className="boton boton-linea !min-h-[2.75rem] !px-4 xl:hidden"
            aria-expanded={abierto}
            aria-controls="menu-movil"
            onClick={() => setAbierto((v) => !v)}
          >
            {abierto ? "Cerrar" : "Menú"}
          </button>
        </div>
      </div>
    </header>

      {/* Fuera del <header>: su backdrop-filter haría de contenedor de los fixed y recortaría el panel */}
      <div
        id="menu-movil"
        ref={panel}
        style={{ display: "none" }}
        className="fixed inset-x-0 bottom-0 top-[var(--alto-header)] z-40 flex-col justify-between overflow-y-auto bg-noche px-[clamp(1rem,4vw,3.5rem)] pb-28 pt-8 text-hueso xl:!hidden"
      >
        <nav aria-label="Menú">
          <ul className="flex flex-col gap-1">
            {[...navegacion, accesos.candidato].map((n) => (
              <li key={n.href}>
                <Link href={n.href} className={`titulo block py-2 text-[clamp(2rem,8vw,3rem)] ${activo(n.href) ? "text-luz" : ""}`}>
                  {n.etiqueta}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <ul className="mt-10 flex flex-wrap gap-3">
          <li>
            <Link href={accesos.portal.href} className="boton boton-linea">
              {accesos.portal.etiqueta}
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
