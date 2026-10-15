# Assets: qué hay y qué falta

## Lo que ya está (fase 3)

Ocho fotos con gente, hechas sobre los renders del estudio (Artagaveytia-Mantel) sumando
alumnos, profes y staff con IA (Nano Banana Pro, 4-oct-2026, ~16 créditos). Pedido del cliente:
"gente feliz en los ambientes", como en fosque.com. **Nadie de las fotos existe.**

| Archivo (`assets/img/`) | Render de base | Dónde se usa |
|---|---|---|
| `hero-negocios.jpg` | salon-reformer-sol-frontal + isotipo | Hero de la home, OG (14-oct: el fundador con dos socios en la sala; la anterior, `hero-clase`, pasó al B2C) |
| `negocio-portal.jpg` (3:4) | corredor-arcos-luz | CTA final de la home (14-oct: el fundador da la mano a una socia bajo los arcos) |
| `negocio-recepcion.jpg` | recepcion-cafe-molinetes (recortada: sin la expendedora) | Por qué Fosque, portada de /portal (14-oct: la socia operadora y un inversor en la barra) |
| `negocio-socios.jpg` (3:4) | salon-palmeras-en-uso + foto real del Reformer | Co-propiedad (home y /co-propiedad). La anterior tenía un Reformer deforme |
| `lounge.jpg` | lounge-lockers-sillones | Portada de /faq |
| `kids.jpg` | sala-kids-arbol-reformer | Portada de /candidato; Flagship (Fosque Niños) |
| `detalle-manos.jpg` | reformer-sala-detalle | Portada de /academia |
| `socia-operadora.jpg` (3:4) | recepcion-cafe-vegetacion | Portada de /aplicar |

Renders sin gente: `fachada-noche`, `salon-domo`, `corredor-arcos`, `reformer-tres-cuartos`.
Manifiesto (14-oct): `manifiesto-ruido` (fachada-calle-noche-apagada del B2C, fuente `manifiesto-ruido-calle-2.png`; la primera, una avenida con lluvia, desentonaba), `manifiesto-encuentro`
(salon-palmeras-en-uso), `manifiesto-portal` (fachada-calle-noche); prompts en `assets/gen/cola-manifiesto.txt`.
Ya no hay video en este sitio.

Para regenerar o sumar: `assets/gen/cola.txt` (y `cola-negocios.txt` / `cola-negocios-2.txt` del 14-oct; recepcion, equipo, sala-instructora y hero-clase pasaron al B2C) (una línea por imagen: `nombre|render|proporción|escena`)
y `bash assets/gen/lanzar.sh` (salta lo que ya bajó). Después, `npm run imagenes`.

⚠️ **Los renders son de un estudio que no está construido.** Mismo pendiente que el B2C: la
autorización de Artagaveytia-Mantel antes de publicar.

## Lo que falta

### 1. Dossier Maestro (PDF) — lo tiene que mandar el cliente
- Destino: `public/dossier/fosque-reformer-dossier-maestro.pdf`
- Hoy el botón "Descargar Dossier" lleva al formulario y el lead llega con "Pidió el dossier: Sí".
  Cuando exista el PDF, el formulario lo entrega después de enviar.

### 2. Cadena de importación directa (/inversion, fase 4) — 2 imágenes
- `assets/img/importacion-fabrica.jpg` · 16:9 · tramo "fábrica" del recorrido animado
  > Editorial photograph of a clean, modern equipment factory floor where black Pilates Reformer machines with leather-upholstered carriages are being assembled in a row; a quality inspector in a dark polo shirt checks a carriage with a tablet. Warm, soft daylight from high windows, shallow depth of field, earthy palette with black and warm wood accents, no visible text, no logos, no signage.
- `assets/img/importacion-puerto.jpg` · 16:9 · tramo "puerto"
  > Editorial photograph at golden hour of a shipping container being loaded at a calm port terminal, seen from a low angle; warm 2700K sunset light, long soft shadows, muted earthy tones, minimalist composition with lots of sky, no visible text, no brand names on the containers, no logos.

### 3. Fotos reales (cuando exista la primera sede)
Reemplazan a las de IA con el mismo nombre de archivo: clase llena, recepción, equipo de la sede.
