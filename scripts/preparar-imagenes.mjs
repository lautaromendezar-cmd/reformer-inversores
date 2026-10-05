// Lleva las fuentes (crudos de IA en assets/gen/out y renders en assets/renders, ambos fuera
// del repo) a JPEG de 2400 px máx. en assets/img/, que es lo que importa next/image.
// next/image después sirve AVIF/WebP al tamaño justo. Uso: npm run imagenes
import sharp from "sharp";
import { mkdirSync, existsSync } from "node:fs";

const lista = [
  ["assets/gen/out/hero-clase.png", "hero-clase"],
  ["assets/gen/out/sala-instructora.png", "sala-instructora"],
  ["assets/gen/out/recepcion.png", "recepcion"],
  ["assets/gen/out/lounge.png", "lounge"],
  ["assets/gen/out/kids.png", "kids"],
  ["assets/gen/out/equipo.png", "equipo"],
  ["assets/gen/out/detalle-manos.png", "detalle-manos"],
  ["assets/gen/out/socia-operadora.png", "socia-operadora"],
  ["assets/renders/fachada-calle-noche.jpg", "fachada-noche"],
  ["assets/renders/salon-reformer-domo-general.png", "salon-domo"],
  ["assets/renders/corredor-arcos-luz.jpg", "corredor-arcos"],
  ["assets/renders/reformer-sala-tres-cuartos.jpg", "reformer-tres-cuartos"],
];

mkdirSync("assets/img", { recursive: true });
for (const [origen, nombre] of lista) {
  if (!existsSync(origen)) { console.log("falta", origen); continue; }
  const info = await sharp(origen)
    .resize({ width: 2400, withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(`assets/img/${nombre}.jpg`);
  console.log(nombre, info.width + "x" + info.height, Math.round(info.size / 1024) + " KB");
}
