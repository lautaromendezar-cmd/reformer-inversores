// Estructura económica del Documento Maestro B2B (§3). Todos los valores son ESTIMADOS y se
// muestran con la etiqueta y el aviso legal. La calculadora de /inversion y el adelanto de la
// home leen de acá: no repetir números en los componentes.

export const canonPorReformer = 1500; // USD por Reformer instalado
export const royaltyMensual = 6; // % sobre la facturación bruta
export const fondoMarketing = 2; // % — Red de Embajadores y posicionamiento global

export const canonIncluye = ["Derecho de marca", "Know-how", "Onboarding del ecosistema", "Setup del software"];

export type Formato = {
  id: "compacta" | "standard" | "flagship";
  nombre: string;
  m2: [number, number];
  reformers: [number, number];
  capex: [number, number]; // USD, equipamiento + obra
  enfoque: string;
};

export const formatos: Formato[] = [
  {
    id: "compacta",
    nombre: "Boutique Compacta",
    m2: [150, 180],
    reformers: [10, 14],
    capex: [50000, 65000],
    enfoque: "Formato ágil, ideal para zonas residenciales o ciudades medianas.",
  },
  {
    id: "standard",
    nombre: "Boutique Standard",
    m2: [180, 250],
    reformers: [15, 19],
    capex: [65000, 80000],
    enfoque: "Balance óptimo para un flujo constante de membresías (packs de 4, 8 y 12).",
  },
  {
    id: "flagship",
    nombre: "Flagship / Gran Sala",
    m2: [250, 350],
    reformers: [20, 25],
    capex: [80000, 105000],
    enfoque: "Máxima absorción de picos de demanda y espacio para Fosque Niños.",
  },
];

export const notaCapex = "Valores de CAPEX optimizados mediante el canal de importación directa de fábrica.";

export function formatoPara(reformers: number): Formato {
  return formatos.find((f) => reformers >= f.reformers[0] && reformers <= f.reformers[1]) ?? formatos[0];
}

export function canon(reformers: number): number {
  return reformers * canonPorReformer;
}

/** USD 1.500 → "USD 1.500" con separador de miles argentino. */
export function usd(n: number): string {
  return `USD ${n.toLocaleString("es-AR")}`;
}
