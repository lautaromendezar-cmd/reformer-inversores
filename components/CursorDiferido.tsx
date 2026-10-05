"use client";

// El cursor sólo sirve en escritorio con puntero fino: se baja después de hidratar, fuera del
// camino crítico de mobile.
import dynamic from "next/dynamic";

const Cursor = dynamic(() => import("./Cursor"), { ssr: false });

export default function CursorDiferido() {
  return <Cursor />;
}
