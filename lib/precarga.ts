// Aviso compartido: se resuelve cuando el preloader se levanta (o enseguida si no hubo).
// Lo esperan el hero (para arrancar su entrada) y Lenis (para no scrollear debajo del telón).

let resolver: () => void = () => {};
export const precargaLista: Promise<void> =
  typeof window === "undefined" ? Promise.resolve() : new Promise<void>((r) => (resolver = r));

export function avisarPrecargaLista() {
  resolver();
}
