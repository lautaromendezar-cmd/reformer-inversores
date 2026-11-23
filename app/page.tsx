import Hero from "@/components/landing/Hero";
import Cifras from "@/components/landing/Cifras";
import Metodo from "@/components/landing/Metodo";
import Niveles from "@/components/landing/Niveles";
import Comparativa from "@/components/landing/Comparativa";
import Salon from "@/components/landing/Salon";
import Sistema from "@/components/landing/Sistema";
import Manifiesto from "@/components/landing/Manifiesto";
import Territorios from "@/components/landing/Territorios";
import Postulacion from "@/components/landing/Postulacion";
import Follaje from "@/components/Follaje";

// La landing B2B: los 7 bloques del Documento Maestro (18-nov-2026), en el orden del boceto de
// Gerardo. Base clara (lino); en oscuro van las cifras, los niveles, la comparativa y el manifiesto.
//   1 Hero + 4 cifras · 2 Método · 3 Comparativa · 4 Salón, formatos y simulador ·
//   5 Sistema llave en mano · 6 Manifiesto · 7 Territorios + formulario
export default function Landing() {
  return (
    <>
      <Hero />
      <Cifras />
      <Metodo />
      <Niveles />
      <Comparativa />
      <Salon />
      <Sistema />
      <Manifiesto />
      <section id="territorios" className="bloque relative isolate overflow-clip bg-lino" aria-labelledby="territorios-titulo">
        <Follaje composicion="pie" />
        <div className="contenedor grid grid-cols-12 items-start gap-x-6 gap-y-14 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-5">
            <Territorios />
          </div>
          <div className="col-span-12 lg:sticky lg:top-24 lg:col-span-7" data-revelar>
            <Postulacion />
          </div>
        </div>
      </section>
    </>
  );
}
