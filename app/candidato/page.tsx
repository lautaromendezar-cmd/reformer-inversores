import type { Metadata } from "next";
import Test from "@/components/conversion/Test";
import { test } from "@/content/conversion";

export const metadata: Metadata = { title: "¿Es para vos?", description: test.portada.bajada };

export default function Candidato() {
  return (
    <section className="escena relative min-h-[100svh] pb-28 pt-36" data-luz="corteza" aria-labelledby="test-titulo">
      <div className="contenedor">
        <div className="mx-auto max-w-3xl">
          <p className="antetitulo">{test.portada.antetitulo}</p>
          <h1 id="test-titulo" className="mt-4 text-[length:var(--text-h2)]">
            {test.portada.titulo}
          </h1>
          <p className="mt-3 max-w-xl text-hueso/75">{test.portada.bajada}</p>
        </div>
        <div className="mt-12">
          <Test />
        </div>
      </div>
    </section>
  );
}
