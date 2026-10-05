// Banda de cifras: grandes, escaneables, en dos filas de tres. Los números cuentan al entrar
// (Motor, [data-contar]); sin JS se ven con su valor final.
import Link from "next/link";
import { cifras, type Cifra } from "@/content/home";

function Numero({ c }: { c: Cifra }) {
  return (
    <span className="cifra cifra-grande block">
      {c.previo && <span className="text-[0.42em] tracking-normal">{c.previo}</span>}
      {c.numeros.map((n, i) => (
        <span key={i}>
          {i > 0 && <span className="text-[0.55em] tracking-normal text-ambar-hondo">{c.separador}</span>}
          <span data-n={n}>{n.toLocaleString("es-AR")}</span>
        </span>
      ))}
      {c.sufijo && <span className="text-[0.42em] tracking-normal">{c.sufijo}</span>}
    </span>
  );
}

export default function Cifras() {
  return (
    <section className="escena claro relative py-[clamp(5rem,12vw,10rem)]" data-luz="lino" aria-labelledby="cifras-titulo">
      <div className="contenedor">
        <div className="grid grid-cols-12 gap-x-6 gap-y-4">
          <h2 id="cifras-titulo" className="col-span-12 text-[length:var(--text-h1)] md:col-span-7" data-revelar="lineas">
            {cifras.titulo}
          </h2>
          <p className="col-span-12 max-w-md self-end text-noche/75 md:col-span-4 md:col-start-9" data-revelar>
            {cifras.bajada}
          </p>
        </div>

        <ul className="mt-[clamp(3rem,7vw,6rem)] grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3" data-contar>
          {cifras.items.map((c, i) => (
            <li key={i} className="cifra-caja border-t border-noche/15 pt-6" data-revelar data-retraso={(i % 3) * 0.08}>
              <Numero c={c} />
              <p className="mt-4 flex items-start gap-3 text-noche/80">
                <span aria-hidden="true" className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-ambar shadow-[0_0_10px_2px_rgb(244_169_80/0.7)]" />
                <span>
                  {c.texto}
                  {c.estimado && (
                    <>
                      {" "}
                      <Link href="#aviso-legal" className="whitespace-nowrap text-[length:var(--text-dato)] font-semibold uppercase tracking-[0.14em] text-ambar-hondo underline-offset-4 hover:underline">
                        Estimado*
                      </Link>
                    </>
                  )}
                </span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
