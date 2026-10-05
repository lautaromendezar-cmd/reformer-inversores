# Fosque Reformer Partners — sitio para inversores

Hermano B2B del sitio B2C (`../fosque-reformer`, leer su `CLAUDE.md`). Next 16 App Router + TS +
Tailwind v4 + GSAP (ScrollTrigger, SplitText, Flip) + Lenis + Zod + Resend. README para correr,
variables y estructura; `ASSETS_TODO.md` para imágenes.

**Fuente de verdad del contenido:** `docs/B2B_fosque_reformer_plataforma_inversores.pdf`
(Documento Maestro B2B, viene duplicado: usar la primera copia). **Decisión de Lautaro
(4-oct-2026): los datos del documento van tal cual; las afirmaciones son responsabilidad del
cliente.** Igual quedan juntas en `content/afirmaciones.ts` para poder cambiarlas en un lugar.

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
- **Las páginas internas son provisorias** (portada + `EnPreparacion`) hasta la fase 4/5.
- El formulario sin `RESEND_API_KEY` responde 503 y ofrece WhatsApp con los datos ya escritos.

## Fases (del brief)

1. Relevamiento ✔ · 2. Base ✔ · 3. Home ✔ (esperando feedback) · 4. Internas (Modelo,
Co-Propiedad, Inversión con calculadora + Flip, Proceso con scroll horizontal, Academia, FAQ) ·
5. Conversión (quiz `/candidato`, formulario multi-step `/aplicar`, gracias) · 6. Pulido.

## Deploy

`vercel deploy --scope lautaro-mendez-s-projects` (preview) desde esta carpeta. El remoto es
`github.com/lautaromendezar-cmd/reformer-inversores`, rama `main`.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->
