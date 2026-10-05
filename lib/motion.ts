// La coreografía de la marca: TODA animación toma de acá sus tiempos y curvas.
// Regla: lo que entra, entra con `salida` (rápido al principio, se posa); lo que cambia de
// estado en pantalla usa `cambio`; la luz (fondos, brillos) usa `luz`, que no tiene acento.

export const duracion = {
  micro: 0.25, // hover, foco, toggles
  corta: 0.5, // cambios de estado, números de la calculadora
  media: 0.9, // reveals de bloque
  larga: 1.2, // titulares por líneas, cortina entre páginas
  conteo: 1.8, // counters de la banda de cifras
} as const;

export const ease = {
  salida: "power3.out",
  cambio: "power2.inOut",
  luz: "sine.inOut",
  lineal: "none",
} as const;

export const escalonado = {
  lineas: 0.09,
  palabras: 0.035,
  items: 0.08,
} as const;

/** true si el usuario pidió menos movimiento. Fuera del navegador, false. */
export function movimientoReducido(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Escritorio con puntero fino: pin, scroll horizontal, cursor y magnetismo sólo acá. */
export const consultaEscritorio = "(min-width: 1024px) and (pointer: fine)";
