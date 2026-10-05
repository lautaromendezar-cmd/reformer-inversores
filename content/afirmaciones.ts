// Afirmaciones del Documento Maestro B2B que aparecen en el sitio tal como las escribió el
// cliente. Están juntas para poder cambiarlas o sacarlas en un solo lugar.
// TODO: validar con Gerardo — cada una necesita respaldo antes del lanzamiento público.

export const afirmaciones = {
  // TODO: validar con Gerardo
  trayectoria: { valor: 24, sufijo: "+", texto: "años de trayectoria en Pilates" },
  // TODO: validar con Gerardo
  embajadores: { valor: 1000, texto: "Puntos de Luz: la meta global de embajadores" },
  // TODO: validar con Gerardo
  unicornio: "Consolidar el primer unicornio de Pilates Reformer a nivel global.",
  // TODO: validar con Gerardo
  redNumeroUno: "la red N° 1 de Pilates Moderno en Latinoamérica",
  // TODO: validar con Gerardo — estimados, siempre con la etiqueta y el aviso legal
  breakEven: { desde: 3, hasta: 5, texto: "mes estimado de punto de equilibrio" },
  // TODO: validar con Gerardo
  roi: { desde: 18, hasta: 24, texto: "meses de retorno estimado de la inversión" },
} as const;
