// Imagen de Open Graph (1200×630): la clase del hero con el lockup y la bajada encima.
// Sale a app/opengraph-image.jpg, que Next publica solo. Uso: node scripts/generar-og.mjs
import sharp from "sharp";
import { readFileSync } from "node:fs";

const lockup = readFileSync("public/logo-lockup.svg", "utf8")
  .replace('fill="currentColor"', 'fill="#efe7dd"')
  .replace("<svg ", '<svg width="420" height="171" ');
const capa = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="#17110e" stop-opacity=".92"/><stop offset=".62" stop-color="#17110e" stop-opacity=".1"/></linearGradient></defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <text x="72" y="300" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="700" letter-spacing="7" fill="#f4a950">PARTNERS</text>
  <text x="72" y="400" font-family="Segoe UI, Arial, sans-serif" font-size="46" font-weight="700" fill="#efe7dd">El modelo de negocios</text>
  <text x="72" y="456" font-family="Segoe UI, Arial, sans-serif" font-size="46" font-weight="700" fill="#efe7dd">de la Nueva Era.</text>
  <text x="72" y="530" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="#efe7dd" fill-opacity=".8">Franquicia y co-propiedad de Pilates Moderno</text>
</svg>`;
await sharp("assets/img/hero-clase.jpg")
  .resize(1200, 630, { fit: "cover", position: "centre" })
  .composite([{ input: Buffer.from(capa) }, { input: Buffer.from(lockup), left: 66, top: 80 }])
  .jpeg({ quality: 84, mozjpeg: true })
  .toFile("app/opengraph-image.jpg");
console.log("ok app/opengraph-image.jpg");
