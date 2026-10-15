// Lleva las fuentes (crudos de IA en assets/gen/out y renders en assets/renders, ambos fuera
// del repo) a JPEG de 3840 px máx. en assets/img/, que es lo que importa next/image.
// Las que se ven grandes tienen fuente en 4k (pasada de Nano Banana "mantener idéntica" en 4k).
// next/image después sirve AVIF/WebP al tamaño justo. Uso: npm run imagenes
import sharp from "sharp";
import { mkdirSync, existsSync } from "node:fs";

const lista = [
  ["assets/gen/out/hero-negocios-a-logo.png", "hero-negocios"],
  ["assets/gen/out/manifiesto-ruido-calle-2-4k.png", "manifiesto-ruido"],
  ["assets/gen/out/manifiesto-encuentro-logo.png", "manifiesto-encuentro"],
  // Recorte: la fachada corrida a la derecha para que el cartel no choque con "Bienvenidos a Fosque"
  ["assets/gen/out/manifiesto-portal-4k.png", "manifiesto-portal", { left: 0, top: 760, width: 3908, height: 2198 }],
  // Recorte: afuera la máquina expendedora de la derecha (traía marcas)
  ["assets/gen/out/negocio-recepcion-4k.png", "negocio-recepcion", { left: 0, top: 0, width: 4788, height: 3072 }],
  ["assets/gen/out/negocio-socios-logo.png", "negocio-socios"],
  ["assets/gen/out/negocio-portal-2-logo.png", "negocio-portal"],
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
    .resize({ width: 3840, height: 3840, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(`assets/img/${nombre}.jpg`);
  console.log(nombre, info.width + "x" + info.height, Math.round(info.size / 1024) + " KB");
}
