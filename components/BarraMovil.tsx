"use client";

// Mobile: el pedido del dossier vive fijo abajo, siempre a mano del pulgar. Aparece después del
// hero (que ya tiene su botón) y se retira cuando el formulario está en pantalla.

import Link from "next/link";
import { useEffect, useState } from "react";
import { accesos } from "@/content/sitio";

export default function BarraMovil() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const form = document.getElementById("postular");
    let enFormulario = false;
    const io = form
      ? new IntersectionObserver(([e]) => {
          enFormulario = e.isIntersecting;
          revisar();
        })
      : null;
    const revisar = () => setVisible(window.scrollY > window.innerHeight * 0.7 && !enFormulario);
    io?.observe(form!);
    window.addEventListener("scroll", revisar, { passive: true });
    revisar();
    return () => {
      io?.disconnect();
      window.removeEventListener("scroll", revisar);
    };
  }, []);

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-noche/10 bg-lino/90 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 backdrop-blur-md transition-transform duration-500 ease-[var(--ease-salida)] md:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <Link href={accesos.dossier.href} tabIndex={visible ? 0 : -1} className="boton boton-noche w-full">
        {accesos.dossier.etiqueta}
      </Link>
    </div>
  );
}
