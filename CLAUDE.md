# Fosque Reformer · landing B2B de franquicias

Hermano B2B del sitio B2C (`../fosque-reformer`). Next 16 App Router + TS + Tailwind v4 + GSAP
(ScrollTrigger, SplitText, Flip) + Lenis + Zod + Resend.

**Rama `landing-22-nov` (22-nov-2026): el sitio de 7 páginas se reemplazó por UNA landing.**
Gerardo dijo que el sitio anterior "no transmite la esencia" y pidió "más luz, más simple, más
clara, mostrar el producto". Mandó un boceto propio (Google Sites) y un Documento Maestro nuevo.
`main` sigue teniendo el sitio viejo, que es lo que está en producción.

**Fuente de verdad del contenido:** el boceto de Gerardo y el "Documento Maestro B2B, versión
definitiva 18-nov-2026", los dos en `material-22-nov/` (fuera de git). Todo el copy vive en
`content/landing.ts`, **tal cual lo escribió él, tuteo incluido**. Lo que se contradice o lo que
inventó la IA de su boceto NO se corrige: se anota en `DUDAS-PARA-GERARDO.md`.

**Sin créditos de IA:** las seis fotos (`lib/imagenes.ts`) son las que ya estaban hechas.

## Dirección de arte: la de Partners, en claro

- Suelo lino, tinta noche, ámbar como acento. Dos bloques oscuros de contraste: salón y manifiesto.
- Baloo Bhaijaan 2 600 en titulares, Figtree en cuerpo y cifras (`tabular-nums`). **No usar la
  serif del boceto (Cormorant): la puso la plantilla de la IA, no él.**
- Contexto claro/oscuro por variables (`globals.css`): `.oscuro` y `.claro` redefinen `--acento`,
  `--regla`, `--suave`, `--pista`. Antetítulos, reglas, botones de línea, foco y deslizador las
  heredan, así que se pueden anidar (tarjeta oscura en sección clara y al revés).
- Sin tarjetas con borde por todos lados: reglas horizontales y números grandes.

## El fondo vivo (components/Follaje.tsx)

Sombras de palmas desenfocadas, inspiradas en el mural retroiluminado de la sala, en tonos tierra.
Dibujadas por código (SVG, sin imágenes). Se mecen solas, se corren con el mouse según su
profundidad y una luz tibia sigue al cursor. Reutilizable: `<Follaje composicion="hero|esquina|pie"
tono="claro|oscuro" />` como primer hijo de una sección `relative isolate overflow-clip`
(**clip, no hidden**: con hidden se rompe el `sticky` del formulario). Hoy está en el hero y en
territorios. Es fondo: no subir opacidades ni bajar el desenfoque hasta que compita con el texto.

- **Anchos (23-nov):** el hero y el header llegan a los costados (`.contenedor-ancho`); el resto
  de las secciones va contenido en 88rem (`.contenedor`). La tipografía escala con vw.
- **Método es un relato con scroll** (`components/landing/Metodo.tsx`): pista de 420svh con un
  escenario `sticky` (no pin de GSAP); el paso se elige por el progreso y la transición es discreta.
  Los tamaños del texto de la izquierda van en `vh` para que el paso más largo entre en 720 de alto.
  En mobile los pasos van apilados.
- **Bloques duplicados escritorio/mobile:** el Motor saltea lo que no se está dibujando
  (`oculto()`); un ScrollTrigger `once` sobre algo con `display:none` revienta GSAP.
- **Header:** marca sola a la izquierda, cápsula con los ítems numerados y el botón a la derecha.
- **Hero en dos tiempos:** la primera pantalla es sólo el mensaje sobre el follaje (el titular de
  Gerardo entero, en dos jerarquías; las palabras reaccionan al cursor y "15"/"25" cuentan). Al
  scrollear, escenario `sticky` en una pista de 300svh: el mensaje se va y la foto, que arranca
  oculta, se abre hasta pantalla completa; al final entra la Ecuación Financiera. Sin JS queda en
  fila. La foto es vertical en mobile: por eso `sizes` pide 400vw (si no, se ve borrosa).

## Menos lineal (24-nov)

- **Capas:** cada sección lleva `.capa` + `data-capa`: se monta sobre el final de la anterior
  (`--solape`) y su borde de arriba es un arco que el Motor aplana mientras sube. El solape es menor
  que el padding de abajo de la sección anterior. **Arcos, no olas** (Gerardo pidió sacar las ondas
  en el B2C). Si los hijos pintan en las esquinas, la sección necesita `overflow-clip`. Manifiesto
  deja una franja lisa abajo para que el solape no tape la figura.
- **Comparativa** oscura (`bg-corteza`), filas alternadas, hover por columna (`.activa`).
- **Salón** claro: apertura centrada con fotos flotantes (sólo escritorio), ventajas como tarjetas
  escalonadas que pasan sobre el Reformer `sticky` (sin tomar el scroll), simulador oscuro.
- **Mezcla de letras** (`data-mezclar`, ScrambleTextPlugin): menú, pie, estados de territorios y
  antetítulos al aparecer. Sólo textos cortos; el ancho se fija al primer hover.
- **Footer:** `FraseVuelo` arma el titular del hero letra por letra con el scroll.
- Luz: van en oscuro cifras, niveles, comparativa y manifiesto; el resto es claro. No sumar más
  tramos con el scroll tomado (ya hay tres: hero, Método, Sistema).

## Scroll horizontal (components/landing/Sistema.tsx)

Los 6 pilares cruzan la pantalla de derecha a izquierda por encima del título gigante, que se apaga
y desenfoca. Cada tarjeta está en foco sólo cerca del centro (blur + escala según la distancia) y
su foto se corre dentro del marco. Tarjetas a distintas alturas y tamaños (`nth-child` en
globals.css). `sticky` + scrub; la altura de la pista se mide en `refreshInit`. Sólo desde 1024 px:
en mobile es una grilla. El `padding-right` de la fila (36vw) es lo que deja llegar la última
tarjeta al centro.

- **Títulos (`data-revelar="palabras"`) y hero:** cada palabra sube flotando y se enfoca
  (blur 14px → 0, `expo.out`, sin máscara). Las fotos (`data-foto`, Método) también entran enfocando.

## El mural (components/Mural.tsx)

La pieza "Propuesta Luxury" del manual de marca (silueta a contraluz sobre un paisaje), rehecha y
animada por capas en vez de video: paisaje, luz que respira, dos bancos de niebla que derivan y la
figura recortada con su sombra. El mouse corre cada capa según su profundidad. **Sólo en el
Manifiesto**: es remate emocional, no argumento de venta; en el hero cambiaría el mensaje a "clase
de pilates" (criterio acordado con Lautaro el 23-nov). La silueta está sobre un Reformer a
propósito: así el mural también muestra el producto. Recorte: `assets/gen/out/mural-23-nov/`
(blanco → transparente con modelo "oscuro sobre blanco", para que no quede halo claro).

## Animación (components/Motor.tsx)

Convenciones por atributo, leídas del DOM: `data-revelar` (y `="lineas"`, `="palabras"`),
`data-escalonar`, `data-foto`, `data-leer`, `data-contar` + `data-n`, `data-encender`,
`data-parallax`, `data-magnetico`, `data-progreso`. Sin JS todo se ve: los estados ocultos
dependen de `html.motor-listo`.

- **No poner `data-revelar` ni `data-escalonar` en algo que React vuelve a montar** (el formulario
  al resetear): el nodo nuevo nace oculto y nadie lo revela. Envolver desde afuera.
- El hero espera a `precargaLista`; la bajada sólo se desplaza (sin opacidad) por el LCP. Al terminar
  la entrada se revierte el SplitText con máscaras y se vuelve a partir sin ellas (recortarían el
  movimiento de las palabras con el cursor).
- Simulador: los `<span data-num>` muestran siempre el valor inicial y GSAP escribe encima.
- Niveles: sección oscura propia, cuatro paneles (`.nivel` en globals.css). El activo se abre con
  `flex-grow` (CSS) y el contenido mide el ancho final (`--abierto`) para no reacomodarse al abrir.
  Se abre con hover, foco o flechas; en mobile es acordeón. Fondo: `<Follaje tono="oscuro">`.
- Territorios: Flip sobre las filas; el filtrado es imperativo (`display`), React sólo pinta el botón.
- El simulador le pasa el rango de capital al formulario con el evento `fr:configuracion`.

## Cosas que no son obvias

- **Las clases propias de `globals.css` van en `@layer components`.** Fuera de la capa le ganan a
  las utilidades de Tailwind.
- **El menú mobile está fuera del `<header>`:** su `backdrop-filter` recortaba el panel.
- **La coma del titular va dentro del tramo destacado:** afuera, SplitText la manda sola al renglón
  siguiente.
- **Comparativa:** tabla real con scroll horizontal y primera columna `sticky`; el contenedor tiene
  margen negativo para llegar al borde de la pantalla.
- Las rutas del sitio viejo redirigen (307) a su bloque de la landing: `next.config.ts`.
- El formulario sin `RESEND_API_KEY` responde 503 y ofrece WhatsApp con los datos ya escritos.

## Verificar

`npm run build && npx next start -p 4319`, y recorrer con capturas en 1440 y 390 bajando de a
poco (los reveals se disparan con el scroll). Probar: pestañas de niveles, deslizador en 15/18/19/25,
"Postular con esta configuración", filtro de territorios, formulario vacío y completo.

## Deploy

`vercel deploy --scope lautaro-mendez-s-projects` (preview) desde esta carpeta. El remoto es
`github.com/lautaromendezar-cmd/reformer-inversores`.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->
