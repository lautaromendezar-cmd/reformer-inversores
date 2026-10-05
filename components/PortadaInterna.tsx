// Portada de las páginas internas: foto a sangre, antetítulo y titular grande.
import Image, { type StaticImageData } from "next/image";

type Props = {
  antetitulo: string;
  titulo: string;
  bajada?: string;
  foto: StaticImageData;
  alt: string;
  posicion?: string;
  children?: React.ReactNode;
};

export default function PortadaInterna({ antetitulo, titulo, bajada, foto, alt, posicion = "50% 50%", children }: Props) {
  return (
    <section className="escena relative isolate flex min-h-[78svh] items-end overflow-hidden" data-luz="noche">
      <div className="absolute inset-[-6%_0] -z-10" data-parallax="8">
        <Image src={foto} alt={alt} fill priority placeholder="blur" sizes="100vw" className="object-cover" style={{ objectPosition: posicion }} />
      </div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(23_17_14/0.6)_0%,rgb(23_17_14/0.2)_35%,rgb(23_17_14/0.92)_100%)]" />
      <div className="contenedor pb-[clamp(3.5rem,8vh,6rem)] pt-40">
        <p className="antetitulo" data-revelar>
          {antetitulo}
        </p>
        <h1 className="mt-5 max-w-5xl text-[length:var(--text-h1)] text-hueso" data-revelar="lineas">
          {titulo}
        </h1>
        {bajada && (
          <p className="mt-6 max-w-2xl text-hueso/85" data-revelar>
            {bajada}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
