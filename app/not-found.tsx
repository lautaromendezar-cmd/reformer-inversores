import Link from "next/link";
import Isotipo from "@/components/Isotipo";

export default function NoEncontrada() {
  return (
    <section className="escena relative isolate grid min-h-[100svh] place-items-center overflow-hidden" data-luz="noche">
      {/* Un punto de luz apagado en medio de la sala vacía */}
      <div aria-hidden="true" className="absolute left-1/2 top-1/2 -z-10 size-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(255_195_122/0.18)_0%,transparent_65%)]" />
      <div className="contenedor text-center">
        <Isotipo className="mx-auto h-10 w-auto text-ambar" />
        <p className="cifra mt-8 text-[length:var(--text-cifra)] text-hueso">404</p>
        <h1 className="mt-4 text-[length:var(--text-h2)]">Este portal todavía no se abrió.</h1>
        <p className="mx-auto mt-4 max-w-md text-hueso/70">La página que buscás no existe o cambió de lugar.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="boton boton-luz">
            Volver al inicio
          </Link>
          <Link href="/aplicar" className="boton boton-linea">
            Aplicar
          </Link>
        </div>
      </div>
    </section>
  );
}
