// Bloque 6 (oscuro): el manifiesto, sobre el mural de la marca (components/Mural.tsx).
// El texto va a la izquierda; la silueta sobre el Reformer, abajo a la derecha, apoyada en el
// piso del paisaje. La cita se enciende palabra por palabra con el scroll (Motor, data-leer).
// En mobile el texto va arriba y la figura debajo.

import Mural from "@/components/Mural";
import { manifiesto } from "@/content/landing";
import { fotos } from "@/lib/imagenes";

export default function Manifiesto() {
  return (
    <section className="oscuro relative isolate flex overflow-clip bg-noche lg:min-h-[100svh]" aria-labelledby="manifiesto-titulo">
      <Mural paisaje={fotos.muralMontana} figura={fotos.muralFigura} alt={manifiesto.alt} />

      <div className="contenedor flex flex-col justify-center pb-[78vw] pt-[clamp(5rem,12vw,9rem)] lg:pb-[clamp(5rem,12vw,9rem)]">
        <div className="max-w-[42rem]">
          <p className="antetitulo" data-revelar>
            {manifiesto.antetitulo}
          </p>
          <h2 id="manifiesto-titulo" className="mt-5 text-[length:var(--text-h3)]" data-revelar>
            {manifiesto.titulo}
          </h2>
          <blockquote className="mt-8">
            <p className="titulo text-[clamp(1.5rem,1rem+1.7vw,2.5rem)] !leading-[1.16]" data-leer>
              “{manifiesto.cita}”
            </p>
          </blockquote>
          <p className="suave mt-10 max-w-xl" data-revelar>
            {manifiesto.texto}
          </p>
          <p className="regla mt-8 max-w-xl border-t pt-6 text-[length:var(--text-chico)] font-semibold text-luz" data-revelar>
            {manifiesto.cupo}
          </p>
        </div>
      </div>
    </section>
  );
}
