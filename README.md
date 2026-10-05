# Fosque Reformer Partners

Sitio para inversores, franquiciados y operadores de Fosque Reformer (Pilates Moderno con modelo
de franquicia y co-propiedad). Hermano del sitio B2C (`../fosque-reformer`): misma marca, registro
de "deal room".

**Objetivo único:** que un inversor calificado aplique o agende una reunión.

**Bajo NDA:** el sitio no se indexa (meta robots + `robots.txt` + cabecera `X-Robots-Tag`) mientras
`NEXT_PUBLIC_ALLOW_INDEXING` no sea `true`.

## Correr en local

```bash
npm install
cp .env.example .env.local   # completar si se quiere probar el envío de leads
npm run dev                  # http://localhost:3000
npm run build && npm run start
npm run lint
```

## Variables de entorno

| Variable | Para qué | Si falta |
|---|---|---|
| `NEXT_PUBLIC_ALLOW_INDEXING` | `true` permite indexar | No indexa (correcto hasta el lanzamiento) |
| `NEXT_PUBLIC_SITE_URL` | URL pública (Open Graph, sitemap) | Usa `https://fosque-reformer-partners.vercel.app` |
| `RESEND_API_KEY` | Envío de leads por email ([resend.com](https://resend.com)) | El formulario ofrece mandar los datos por WhatsApp |
| `LEADS_TO_EMAIL` | Quién recibe los leads (varios separados por coma) | Ídem |
| `LEADS_FROM_EMAIL` | Remitente verificado en Resend | `onboarding@resend.dev` (sólo sirve para pruebas) |

En Vercel: Project → Settings → Environment Variables. Después de cargarlas, redeployar.

## Estructura

```
app/              rutas (una carpeta por página), layout, template (transición), api/lead
components/       Header, Footer, BarraMovil, Motor (Lenis + GSAP), Precarga, Cursor, Planta…
components/home/  las secciones de la home, una por archivo
content/          TODO el copy y los números (ver abajo)
lib/              motion (tiempos y curvas), luz (arco de color), lead (Zod), imagenes
assets/img/       fotos que importa next/image (salida de npm run imagenes)
assets/gen/       cola y script de las imágenes con IA (los crudos no van al repo)
public/video/     el clip del sol (reutilizado del B2C)
scripts/          preparar-imagenes.mjs, generar-og.mjs, generar-mapa.mjs (npm run imagenes / og / mapa)
docs/             el Documento Maestro B2B (PDF, fuera del repo)
```

## Dónde se edita el contenido

- **Regla:** sólo textos del Documento Maestro. Lo que no está en el PDF no se inventa.
- **Copy por página:** `content/home.ts`, `modelo.ts`, `copropiedad.ts`, `inversion.ts`,
  `proceso.ts`, `academia.ts`, `faq.ts`, `conversion.ts` (test y aplicación).
- **Números (canon, royalty, formatos, CAPEX):** `content/economia.ts`. La home y la calculadora
  leen de ahí: no hay números escritos en los componentes.
- **Afirmaciones a validar** (24+ años, 1.000 embajadores, unicornio, break-even, ROI):
  `content/afirmaciones.ts`, todas juntas, marcadas `// TODO: validar con Gerardo`.
- **WhatsApp, calendario, aviso legal, navegación:** `content/sitio.ts`.
  ⚠️ El WhatsApp es un placeholder (`5491100000000`). Mientras `calendario` sea `null`,
  "Agendar reunión" abre WhatsApp.

## Reemplazar imágenes

Ver `ASSETS_TODO.md`. Para cambiar una foto: dejar el archivo nuevo en `assets/img/` con el mismo
nombre (JPEG, hasta 2400 px de ancho), o agregar la fuente a la lista de
`scripts/preparar-imagenes.mjs` y correr `npm run imagenes`. Las imágenes se importan por nombre
desde `lib/imagenes.ts`; next/image sirve AVIF/WebP al tamaño justo.

## Motion

Todo pasa por `lib/motion.ts` (duraciones, curvas) y `components/Motor.tsx`, que lee
convenciones del DOM: `data-revelar`, `data-revelar="lineas"`, `data-parallax`, `data-contar`,
`data-encender`, `data-magnetico` y `.escena[data-luz]` (el arco de color, en `lib/luz.ts`).
Con `prefers-reduced-motion` no hay Lenis, sticky, SplitText ni parallax: todo queda visible.

## Deploy

Vercel, por CLI (el webhook de GitHub de esta cuenta no dispara):

```bash
vercel deploy --scope lautaro-mendez-s-projects          # preview
vercel deploy --prod --scope lautaro-mendez-s-projects   # producción
```
