// Mapa de la hoja de ruta como grilla de "Puntos de Luz": rasteriza Latinoamérica (Natural
// Earth 1:50m, dominio público, vía world-atlas) en una grilla y anota de qué país es cada punto.
// Sale a lib/mapa.generado.ts (sólo números: el sitio no carga librerías de mapas).
// Uso: node scripts/generar-mapa.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { feature } from "topojson-client";

const topo = JSON.parse(readFileSync("node_modules/world-atlas/countries-50m.json", "utf8"));
const paises = feature(topo, topo.objects.countries).features;

// ISO numérico → código corto. Los que no están en la hoja de ruta quedan como "LA".
const nombrados = { "032": "AR", "858": "UY", "152": "CL", "600": "PY", "484": "MX", "170": "CO" };

const LON = [-118, -33];
const LAT = [-56, 33];
const PASO = 1.15; // grados entre puntos
const latinoamerica = new Set([
  "032", "858", "152", "600", "484", "170", "076", "068", "604", "218", "862", "328", "740",
  "254", "591", "188", "558", "340", "222", "320", "084", "192", "214", "332", "388", "780",
  "044", "630",
]);

function dentroAnillo(x, y, anillo) {
  let dentro = false;
  for (let i = 0, j = anillo.length - 1; i < anillo.length; j = i++) {
    const [xi, yi] = anillo[i], [xj, yj] = anillo[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) dentro = !dentro;
  }
  return dentro;
}
function dentro(x, y, geom) {
  const polis = geom.type === "Polygon" ? [geom.coordinates] : geom.coordinates;
  return polis.some((p) => dentroAnillo(x, y, p[0]) && !p.slice(1).some((h) => dentroAnillo(x, y, h)));
}

const candidatos = paises.filter((f) => latinoamerica.has(f.id));
const puntos = [];
let fila = 0;
for (let lat = LAT[1]; lat >= LAT[0]; lat -= PASO, fila++) {
  const desfase = fila % 2 ? PASO / 2 : 0; // grilla hexagonal: se ve más orgánica
  for (let lon = LON[0] + desfase; lon <= LON[1]; lon += PASO) {
    const f = candidatos.find((c) => dentro(lon, lat, c.geometry));
    if (!f) continue;
    // Proyección equirectangular simple; y crece hacia abajo
    const x = +(lon - LON[0]).toFixed(2);
    const y = +(LAT[1] - lat).toFixed(2);
    puntos.push([x, y, nombrados[f.id] ?? "LA"]);
  }
}

const ancho = LON[1] - LON[0];
const alto = LAT[1] - LAT[0];
const salida = `// Generado por scripts/generar-mapa.mjs (Natural Earth 1:50m vía world-atlas). No editar a mano.
// [x, y, país] en grados desde la esquina noroeste; país: AR UY CL PY MX CO o LA (resto).
export const mapa = { ancho: ${ancho}, alto: ${alto}, paso: ${PASO} } as const;
export const puntos: [number, number, string][] = ${JSON.stringify(puntos)};
`;
writeFileSync("lib/mapa.generado.ts", salida);
const cuenta = puntos.reduce((a, p) => ((a[p[2]] = (a[p[2]] || 0) + 1), a), {});
console.log(puntos.length, "puntos", cuenta, Math.round(salida.length / 1024) + " KB");
