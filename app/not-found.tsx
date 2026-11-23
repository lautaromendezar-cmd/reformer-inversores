import Link from "next/link";
import Isotipo from "@/components/Isotipo";
import { accesos } from "@/content/sitio";

export default function NoEncontrada() {
  return (
    <section className="grid min-h-[100svh] place-items-center bg-lino">
      <div className="contenedor text-center">
        <Isotipo className="acento mx-auto h-10 w-auto" />
        <p className="cifra mt-8 text-[clamp(4rem,2rem+8vw,8rem)]">404</p>
        <h1 className="mt-4 text-[length:var(--text-h2)]">Esta página no existe.</h1>
        <p className="suave mx-auto mt-4 max-w-md">La dirección que buscas no existe o cambió de lugar.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="boton boton-noche">
            Volver al inicio
          </Link>
          <Link href={accesos.dossier.href} className="boton boton-linea">
            {accesos.dossier.etiqueta}
          </Link>
        </div>
      </div>
    </section>
  );
}
