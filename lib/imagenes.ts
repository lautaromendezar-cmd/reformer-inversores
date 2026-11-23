// Las fotos del sitio, por nombre. Import estático: next/image obtiene ancho, alto y el blur de
// carga solo. Para reemplazar una: pisar el archivo en assets/img/ (mismo nombre) o volver a
// correr `npm run imagenes` con la fuente nueva. Ver ASSETS_TODO.md.
//
// Las de gente son renders del estudio (Artagaveytia-Mantel) con personas sumadas con IA
// (Nano Banana Pro, oct-2026). Nadie de las fotos existe: no hace falta consentimiento.
//
// La landing usa sólo estas. Salvo las cuatro de Método, todas estaban hechas de antes.
// En assets/img/ quedan las demás (lounge, kids, negocio-socios, negocio-portal…) por si se piden.

import heroNegocios from "@/assets/img/hero-negocios.jpg";
import claseSalonSol from "@/assets/img/clase-salon-sol.jpg";
import muralMontana from "@/assets/img/mural-montana.jpg";
import muralFigura from "@/assets/img/mural-figura.png";
import metodoClase from "@/assets/img/metodo-1-clase.jpg";
import metodoSalaLlena from "@/assets/img/metodo-2-sala-llena.jpg";
import metodoInstructores from "@/assets/img/metodo-3-instructores.jpg";
import metodoComunidad from "@/assets/img/metodo-4-comunidad.jpg";
import fachadaNoche from "@/assets/img/fachada-noche.jpg";
import corredorArcos from "@/assets/img/corredor-arcos.jpg";
import pilarPreventa from "@/assets/img/pilar-preventa.jpg";
import pilarSocietario from "@/assets/img/pilar-societario.jpg";
import pilarTablero from "@/assets/img/pilar-tablero.jpg";
import detalleManos from "@/assets/img/detalle-manos.jpg";
import reformerTresCuartos from "@/assets/img/reformer-tres-cuartos.jpg";

export const fotos = {
  heroNegocios,
  claseSalonSol,
  // El mural del Manifiesto (components/Mural.tsx): el paisaje del manual de marca rehecho en
  // grande y la silueta sobre el Reformer, recortada con transparencia. 23-nov-2026, 4 créditos.
  // Fuentes y prompts en assets/gen/out/mural-23-nov/.
  muralMontana,
  muralFigura,
  reformerTresCuartos,
  // Los 6 pilares del Sistema (scroll horizontal). Fachada, corredor y manos son de octubre;
  // preventa, societario y tablero se hicieron el 23-nov-2026 con el reparto de edades variadas
  // (6 créditos; prompts en assets/gen/out/sistema-23-nov/).
  fachadaNoche,
  corredorArcos,
  pilarPreventa,
  detalleManos,
  pilarSocietario,
  pilarTablero,
  // Método: las cuatro verticales (3:4) hechas el 23-nov-2026 con Nano Banana Pro en Higgsfield,
  // 8 créditos. Prompts y referencias en assets/gen/out/metodo-23-nov/PROMPTS.md.
  metodoClase,
  metodoSalaLlena,
  metodoInstructores,
  metodoComunidad,
};
