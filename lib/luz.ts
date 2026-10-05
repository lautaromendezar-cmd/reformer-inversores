// El arco de luz: fondo y tinta de cada escena. components/Motor.tsx interpola entre escenas
// consecutivas al scrollear (mismo mecanismo que el sitio B2C). Las claras pintan su propio
// fondo; el arco sólo mezcla oscuras.
//
// La temperatura es el hilo del sitio: arranca fría (la prisa, el ruido) y llega a 2700K.

export type Luz = { fondo: string; tinta: string; clara?: boolean };

export const luces = {
  noche: { fondo: "#17110e", tinta: "#efe7dd" }, // hero, footer
  frio: { fondo: "#1d2a2e", tinta: "#e6ecea" }, // el comienzo del manifiesto
  neutro: { fondo: "#2b2420", tinta: "#efe7dd" },
  tibio: { fondo: "#3a2616", tinta: "#efe7dd" },
  k2700: { fondo: "#4a2c12", tinta: "#fff1dc" }, // luz cálida 2700K
  corteza: { fondo: "#2a1d17", tinta: "#efe7dd" }, // bloques de negocio oscuros
  lino: { fondo: "#f4eee6", tinta: "#17110e", clara: true },
  arena: { fondo: "#e9e0d4", tinta: "#17110e", clara: true },
} satisfies Record<string, Luz>;

export type NombreLuz = keyof typeof luces;
