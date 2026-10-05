// Por qué Fosque: las cuatro claves del operador. La foto queda fija a la izquierda mientras
// los pilares pasan; cada uno se enciende al cruzar el centro (Motor, [data-encender]).
import Image from "next/image";
import { porQue } from "@/content/home";
import { fotos } from "@/lib/imagenes";

export default function PorQue() {
  return (
    <section className="escena relative py-[clamp(5rem,12vw,10rem)]" data-luz="corteza" aria-labelledby="porque-titulo">
      <div className="contenedor grid grid-cols-12 gap-x-6 gap-y-12">
        <div className="col-span-12 lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <p className="antetitulo" data-revelar>
              {porQue.antetitulo}
            </p>
            <h2 id="porque-titulo" className="mt-5 text-[length:var(--text-h1)]" data-revelar="lineas">
              {porQue.titulo}
            </h2>
            <p className="mt-6 max-w-md text-hueso/75" data-revelar>
              {porQue.bajada}
            </p>
            <div className="relative mt-10 aspect-[4/5] overflow-hidden rounded-[1.25rem] sm:aspect-[16/10] lg:aspect-auto lg:h-[min(46vh,30rem)]">
              <div className="absolute inset-[-8%_0]" data-parallax="10">
                <Image src={fotos.recepcion} alt={porQue.alt} fill placeholder="blur" sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover object-[62%_50%]" />
              </div>
            </div>
          </div>
        </div>

        <ol className="col-span-12 lg:col-span-6 lg:col-start-7 lg:pt-[22vh]">
          {porQue.pilares.map((p, i) => (
            <li key={p.titulo} className="pilar border-t border-hueso/12 py-[clamp(2.5rem,6vw,4.5rem)] lg:min-h-[52vh]" data-encender>
              <span className="pilar-numero cifra block text-[clamp(3.5rem,2rem+5vw,6.5rem)]" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-[length:var(--text-h2)]">{p.titulo}</h3>
              <p className="mt-4 max-w-lg text-hueso/75">{p.texto}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
