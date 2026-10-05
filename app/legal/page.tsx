import type { Metadata } from "next";
import { avisoLegal } from "@/content/sitio";

export const metadata: Metadata = { title: "Términos y aviso legal", description: avisoLegal.texto };

// TODO: validar con Gerardo — los términos de uso y la política de privacidad los tiene que
// redactar o revisar su asesor legal. Acá va el aviso legal del sitio y el tratamiento de datos
// del formulario, que es lo mínimo para operar.
export default function Legal() {
  return (
    <section className="escena claro pb-24 pt-40" data-luz="lino">
      <div className="contenedor max-w-3xl">
        <p className="antetitulo">Legal</p>
        <h1 className="mt-5 text-[length:var(--text-h1)]">Términos y aviso legal</h1>

        <h2 className="mt-14 text-[length:var(--text-h3)]">{avisoLegal.titulo}</h2>
        <p className="mt-4 text-noche/80">{avisoLegal.texto}</p>

        <h2 className="mt-12 text-[length:var(--text-h3)]">Datos que nos dejás</h2>
        <p className="mt-4 text-noche/80">
          Los datos que cargás en los formularios (nombre, email, WhatsApp, ubicación, perfil y capital estimado) se usan sólo para
          evaluar tu aplicación y contactarte por el programa de franquicias de Fosque Reformer. No se venden ni se ceden a terceros.
          Podés pedir que los borremos en cualquier momento escribiéndonos por los canales del sitio.
        </p>

        <h2 className="mt-12 text-[length:var(--text-h3)]">Confidencialidad</h2>
        <p className="mt-4 text-noche/80">
          El contenido de este sitio es material de presentación del modelo de negocio de Fosque Reformer. Su reproducción total o
          parcial requiere autorización.
        </p>

        <p className="mt-12 rounded-[1rem] border border-noche/15 p-5 text-[length:var(--text-chico)] text-noche/70">
          Los términos y condiciones completos se publican antes del lanzamiento.
        </p>
      </div>
    </section>
  );
}
