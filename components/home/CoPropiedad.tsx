// Adelanto de la co-propiedad: la foto del equipo y la comparativa del pasado vs. Fosque.
import Image from "next/image";
import Link from "next/link";
import Comparativa from "@/components/Comparativa";
import { coPropiedad } from "@/content/home";
import { fotos } from "@/lib/imagenes";

export default function CoPropiedad() {
  return (
    <section className="escena claro relative overflow-hidden py-[clamp(5rem,12vw,10rem)]" data-luz="lino" aria-labelledby="copro-titulo">
      <div className="contenedor grid grid-cols-12 gap-x-6 gap-y-12">
        <div className="col-span-12 lg:col-span-5">
          <FotoEquipo alt={coPropiedad.alt} />
        </div>

        <div className="col-span-12 lg:col-span-7 lg:pl-6">
          <p className="antetitulo" data-revelar>
            {coPropiedad.antetitulo}
          </p>
          <h2 id="copro-titulo" className="mt-5 text-[length:var(--text-h1)]" data-revelar="lineas">
            {coPropiedad.titulo}
          </h2>
          <p className="mt-6 max-w-xl text-noche/75" data-revelar>
            {coPropiedad.bajada}
          </p>
          <div className="mt-10">
            <Comparativa columnas={coPropiedad.columnas} filas={coPropiedad.filas} />
          </div>
          <Link href="/co-propiedad" className="enlace-flecha mt-10 text-ambar-hondo">
            {coPropiedad.cta} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export function FotoEquipo({ alt }: { alt: string }) {
  return (
    <div className="relative aspect-[3/4] overflow-hidden rounded-[1.25rem]">
      <div className="absolute inset-[-8%_0]" data-parallax="10">
        <Image src={fotos.equipo} alt={alt} fill placeholder="blur" sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover object-[50%_60%]" />
      </div>
      {/* Velo cálido: la sala de palmeras es verdosa y el resto del sitio vive en 2700K */}
      <div aria-hidden="true" className="absolute inset-0 bg-[#f4a950] opacity-50 mix-blend-soft-light" />
      <p className="absolute bottom-0 left-0 m-4 rounded-full bg-noche/80 px-4 py-2 text-[length:var(--text-dato)] font-semibold uppercase tracking-[0.14em] text-hueso backdrop-blur">
        Vesting 50%
      </p>
    </div>
  );
}
