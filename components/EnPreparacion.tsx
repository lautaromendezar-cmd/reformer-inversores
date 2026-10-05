// Cuerpo provisorio de las páginas que se construyen en la fase 4/5: el resto del sistema ya
// funciona (navegación, aplicación), así el preview se recorre entero sin 404.
import Link from "next/link";
import { accesos } from "@/content/sitio";

export default function EnPreparacion({ texto }: { texto: string }) {
  return (
    <section className="escena claro py-[clamp(4rem,10vw,8rem)]" data-luz="lino">
      <div className="contenedor grid grid-cols-12 gap-6">
        <p className="col-span-12 max-w-2xl text-[length:var(--text-h3)] leading-snug md:col-span-8" data-revelar>
          {texto}
        </p>
        <div className="col-span-12 flex flex-wrap items-start gap-3 md:col-span-4 md:justify-end">
          <Link href={accesos.aplicar.href} className="boton bg-noche text-luz hover:bg-corteza">
            Aplicar
          </Link>
          <Link href="/" className="boton boton-linea">
            Volver al inicio
          </Link>
        </div>
      </div>
    </section>
  );
}
