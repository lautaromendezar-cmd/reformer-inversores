# Fosque Reformer Partners — sitio para inversores

Hermano B2B del sitio B2C (`../fosque-reformer`, leer su `CLAUDE.md`). Next 16 App Router + TS +
Tailwind v4 + GSAP (ScrollTrigger, SplitText, Flip) + Lenis + Zod + Resend. README para correr,
variables y estructura; `ASSETS_TODO.md` para imágenes.

**Fuente de verdad del contenido:** `docs/B2B_fosque_reformer_plataforma_inversores.pdf`
(Documento Maestro B2B, viene duplicado: usar la primera copia). **Decisión de Lautaro
(4-oct-2026): los datos del documento van tal cual; las afirmaciones son responsabilidad del
cliente.** Igual quedan juntas en `content/afirmaciones.ts` para poder cambiarlas en un lugar.

**Regla de copy (Lautaro, 5-oct-2026): "usá los textos del PDF, no inventes".** Todo texto que
afirma algo sale del documento (voseo y erratas corregidas). Lo que no es del PDF es sólo
interfaz: botones, etiquetas, instrucciones de formulario. Si el PDF no dice algo (plazos,
definiciones de los perfiles, el paso a paso del proceso), no se completa: se deja el título
solo o se omite, con `// TODO: validar con Gerardo`.

## Dirección de arte: "Portales de luz"

- Suelo noche/corteza (más sobrio que el marrón del B2C). La luz es el acento: ámbar 2700K
  (`--color-ambar`, `--color-luz`). El tricolor de la fachada queda sólo en la línea del preloader.
- Baloo Bhaijaan 2 600 en titulares (igual que el B2C), Figtree en cuerpo y **cifras con
  `tabular-nums`** (los counters no tiemblan).
- El arco de color (`lib/luz.ts` + `Motor.tsx`, mismo mecanismo que el B2C). La temperatura es el
  hilo: el manifiesto va de frío (6500K) a 2700K y termina en el sol (`sol-loop` del B2C).
- **Gente feliz en los ambientes** (pedido del cliente): renders del estudio + personas con IA.

## Cosas que no son obvias

- **Las clases propias de `globals.css` van en `@layer components`.** Fuera de la capa le ganan a
  las utilidades de Tailwind (`.boton` pisaba a `xl:hidden` y el botón Menú aparecía en escritorio).
- **El manifiesto no usa pin de GSAP:** la sección mide 340vh con un escenario `sticky`. Así los
  marcadores del arco (`.manifiesto-marca`) quedan en el flujo y el fondo cambia solo. Sin JS o
  con reduced-motion no se agrega `.manifiesto-vivo` y las estrofas se leen apiladas.
- **El menú mobile está fuera del `<header>`:** el `backdrop-filter` del header hace de contenedor
  de los `fixed` y recortaba el panel a 72 px.
- **`template.tsx`** hace la cortina entre páginas y limpia el `transform` al terminar (un
  transform residual rompe cualquier `fixed`/`sticky` de adentro).
- **Mapa de la hoja de ruta:** `npm run mapa` (scripts/generar-mapa.mjs) rasteriza Natural Earth
  (world-atlas, dev) a `lib/mapa.generado.ts`. `MapaRuta` agrupa los 1.334 puntos en ~30 `<path>`
  por país y banda de distancia a Buenos Aires: con un `<circle>` por punto el TBT de /modelo
  subía a 240 ms.
- **Calculadora:** los `<span data-num>` muestran siempre el valor inicial y GSAP escribe encima
  (si React también los actualiza, se pisan el nodo de texto). El indicador de formato lo crea
  y lo mueve GSAP con Flip, fuera de React.
- **Proceso:** el modo horizontal (`.proceso-horizontal`) lo pone el JS sólo cuando fija la
  sección; con clases `lg:` una tablet táctil quedaba con los pasos en fila y sin pin.
- **El foco global va en `@layer base`** para que `focus:outline-none` pueda pisarlo.
- El formulario sin `RESEND_API_KEY` responde 503 y ofrece WhatsApp con los datos ya escritos.

## Fases (del brief)

1. Relevamiento ✔ · 2. Base ✔ · 3. Home ✔ · 4. Internas ✔ (Modelo con mapa, Co-Propiedad con
simulador, Inversión con calculadora + Flip y cadena de importación, Proceso horizontal, Academia
con volúmenes, FAQ) · 5. Conversión ✔ (test `/candidato` → `/aplicar` precargado, multi-step,
gracias) · 6. Pulido (pendiente: dossier PDF, datos del cliente, Lighthouse en vivo).

## Deploy

`vercel deploy --scope lautaro-mendez-s-projects` (preview) desde esta carpeta. El remoto es
`github.com/lautaromendezar-cmd/reformer-inversores`, rama `main`.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->
