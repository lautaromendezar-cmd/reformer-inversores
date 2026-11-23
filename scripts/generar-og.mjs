// Imagen de Open Graph (1200×630): la foto del hero con el lockup y la bajada encima.
// Sale a app/opengraph-image.jpg, que Next publica solo. Uso: node scripts/generar-og.mjs
import sharp from "sharp";
import { readFileSync } from "node:fs";

const lockup = readFileSync("public/logo-lockup.svg", "utf8")
  .replace('fill="currentColor"', 'fill="#efe7dd"')
  .replace("<svg ", '<svg width="420" height="171" ');
// Textos de la landing del 22-nov-2026 (content/landing.ts): la entrada del titular y su tramo destacado.
const capa = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="#17110e" stop-opacity=".94"/><stop offset=".58" stop-color="#17110e" stop-opacity=".25"/><stop offset="1" stop-color="#17110e" stop-opacity="0"/></linearGradient></defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <text x="72" y="318" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="700" letter-spacing="5" fill="#f4a950">FRANQUICIAS · ARGENTINA &amp; URUGUAY</text>
  <text x="72" y="392" font-family="Segoe UI, Arial, sans-serif" font-size="44" font-weight="700" fill="#efe7dd">Invierte en la evolución</text>
  <text x="72" y="446" font-family="Segoe UI, Arial, sans-serif" font-size="44" font-weight="700" fill="#efe7dd">del Pilates Moderno.</text>
  <text x="72" y="520" font-family="Segoe UI, Arial, sans-serif" font-size="24" fill="#ffc37a">Salas de 15 a 25 Reformers · CAPEX al costo operativo</text>
</svg>`;
await sharp("assets/img/hero-negocios.jpg")
  .resize(1200, 630, { fit: "cover", position: "right" })
  .composite([{ input: Buffer.from(capa) }, { input: Buffer.from(lockup), left: 66, top: 80 }])
  .jpeg({ quality: 84, mozjpeg: true })
  .toFile("app/opengraph-image.jpg");
console.log("ok app/opengraph-image.jpg");
