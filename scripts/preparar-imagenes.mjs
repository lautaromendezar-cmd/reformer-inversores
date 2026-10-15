// Lleva las fuentes (crudos de IA en assets/gen/out y renders en assets/renders, ambos fuera
// del repo) a JPEG de 2400 px máx. en assets/img/, que es lo que importa next/image.
// next/image después sirve AVIF/WebP al tamaño justo. Uso: npm run imagenes
import sharp from "sharp";
import { mkdirSync, existsSync } from "node:fs";

const lista = [
  ["assets/gen/out/hero-negocios-a.png", "hero-negocios"],
  ["assets/gen/out/manifiesto-ruido-calle-2.png", "manifiesto-ruido"],
  ["assets/gen/out/manifiesto-encuentro.png", "manifiesto-encuentro"],
  // Recorte: la fachada corrida a la derecha para que el cartel no choque con "Bienvenidos a Fosque"
  ["assets/gen/out/manifiesto-portal.png", "manifiesto-portal", { left: 0, top: 380, width: 1954, height: 1099 }],
  // Recorte: afuera la máquina expendedora de la derecha (traía marcas)
  ["assets/gen/out/negocio-recepcion.png", "negocio-recepcion", { left: 0, top: 0, width: 2394, height: 1536 }],
  ["assets/gen/out/negocio-socios.png", "negocio-socios"],
  ["assets/gen/out/negocio-portal-2.png", "negocio-portal"],
  ["assets/gen/out/lounge.png", "lounge"],
  ["assets/gen/out/kids.png", "kids"],
  ["assets/gen/out/detalle-manos.png", "detalle-manos"],
  ["assets/gen/out/socia-operadora.png", "socia-operadora"],
  ["assets/renders/fachada-calle-noche.jpg", "fachada-noche"],
  ["assets/renders/salon-reformer-domo-general.png", "salon-domo"],
  ["assets/renders/corredor-arcos-luz.jpg", "corredor-arcos"],
  ["assets/renders/reformer-sala-tres-cuartos.jpg", "reformer-tres-cuartos"],
];

mkdirSync("assets/img", { recursive: true });
for (const [origen, nombre, recorte] of lista) {
  if (!existsSync(origen)) { console.log("falta", origen); continue; }
  let img = sharp(origen);
  if (recorte) img = img.extract(recorte);
  const info = await img
    .resize({ width: 2400, withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(`assets/img/${nombre}.jpg`);
  console.log(nombre, info.width + "x" + info.height, Math.round(info.size / 1024) + " KB");
}
