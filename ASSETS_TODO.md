# Assets: qué hay y qué falta

## Lo que ya está (fase 3)

Ocho fotos con gente, hechas sobre los renders del estudio (Artagaveytia-Mantel) sumando
alumnos, profes y staff con IA (Nano Banana Pro, 4-oct-2026, ~16 créditos). Pedido del cliente:
"gente feliz en los ambientes", como en fosque.com. **Nadie de las fotos existe.**

| Archivo (`assets/img/`) | Render de base | Dónde se usa |
|---|---|---|
| `hero-clase.jpg` | salon-sol-reformers-negros | Hero de la home, OG |
| `sala-instructora.jpg` | salon-reformer-sol-frontal | Cierre de la home, portada de /inversion |
| `recepcion.jpg` | recepcion-cafe-molinetes | Por qué Fosque, portada de /portal |
| `equipo.jpg` (3:4) | salon-palmeras-en-uso | Co-propiedad (home y /co-propiedad) |
| `lounge.jpg` | lounge-lockers-sillones | Portada de /faq |
| `kids.jpg` | sala-kids-arbol-reformer | Portada de /candidato; Flagship (Fosque Niños) |
| `detalle-manos.jpg` | reformer-sala-detalle | Portada de /academia |
| `socia-operadora.jpg` (3:4) | recepcion-cafe-vegetacion | Portada de /aplicar |

Renders sin gente: `fachada-noche`, `salon-domo`, `corredor-arcos`, `reformer-tres-cuartos`.
Video: `sol-loop` del B2C (ya existía; no se generó video nuevo). Pesa 1,5 MB (mobile 1 MB).

Para regenerar o sumar: `assets/gen/cola.txt` (una línea por imagen: `nombre|render|proporción|escena`)
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
