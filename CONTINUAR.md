# Continuar · Fosque Reformer, landing B2B de franquicias

Estado al 24-nov-2026. Leer también `CLAUDE.md` (cómo está armado) y `DUDAS-PARA-GERARDO.md`.

## Dónde está

- **Publicada:** https://fosque-reformer-franquicias.vercel.app (pública, noindex).
  Proyecto de Vercel **aparte**: `fosque-reformer-franquicias` (`prj_KBq1znpLEvLCuQQuF9o6eYfASt45`).
- **Código:** rama `landing-22-nov` en `lautaromendezar-cmd/reformer-inversores` (pusheada).
- **El sitio anterior (Partners, 7 páginas) sigue intacto:** rama `main` y
  https://fosque-reformer-partners.vercel.app. No se tocó.

### Cómo publicar un cambio

La carpeta sigue vinculada al proyecto viejo, por eso van las variables:

```
VERCEL_ORG_ID=team_L0j0G63bpw9TEydWSb2mQPL3 VERCEL_PROJECT_ID=prj_KBq1znpLEvLCuQQuF9o6eYfASt45 \
vercel deploy --prod --yes --scope lautaro-mendez-s-projects \
  --build-env NEXT_PUBLIC_SITE_URL=https://fosque-reformer-franquicias.vercel.app
```

Sin las variables, `--prod` pisa el sitio viejo de Partners.

## Pendientes

### Esperando a Gerardo (se le escribió el 24-nov)

- [ ] Que vea la página y devuelva cambios.
- [ ] Que responda el PDF de consultas (`material-22-nov/Fosque Reformer - Consultas pagina B2B.pdf`,
      13 preguntas: cifras que no coinciden, textos a validar, comparativa con nombres, dossier).
- [ ] **WhatsApp comercial** → `content/sitio.ts` (`contacto.whatsapp`; hoy `5491100000000`, inventado).
- [ ] **Mail para las postulaciones** → cargar en el proyecto de Vercel nuevo `RESEND_API_KEY`,
      `LEADS_TO_EMAIL` (y `LEADS_FROM_EMAIL` con dominio verificado). Sin eso el formulario ofrece WhatsApp.
- [ ] **Transferencia de los USD 150 de imágenes con IA.** Se generaron imágenes a cuenta para que
      la demo no fuera un esqueleto (34 créditos de Higgsfield). Cuando pague:
      - rehacer las fotos que quedan de octubre con el criterio de gente "normal" y edades variadas
        (fachada, corredor, manos, recepción, encuentro del manifiesto, salón domo, Reformer sala clara);
      - versión vertical del hero para celular (hoy se recorta al fundador solo);
      - video corto de la sala en movimiento (hero o manifiesto);
      - si pasa fotos suyas y de las profes (Sabri, Flor, Valen), integrarlas en las escenas.
- [ ] Si existe el **Dossier Financiero** en PDF, sumarlo al formulario (hoy promete enviarlo después).

### Cuando apruebe

- [ ] Decidir dirección: pasar la landing a `fosque-reformer-partners.vercel.app` (las rutas viejas ya
      redirigen a su bloque) o dejar cada una en su dirección. Dominio final: lo define él.
- [ ] Mergear `landing-22-nov` a `main` si reemplaza al sitio viejo.
- [ ] Sacar el `noindex` sólo cuando haya dominio y él lo pida (`NEXT_PUBLIC_ALLOW_INDEXING=true`).

### Míos (opcionales)

- [ ] Celular chico (360×640): quedan instantes breves sin texto entre pasos de Método. En 390 de ancho, perfecto.
- [ ] Lighthouse de la versión publicada (no se midió desde la landing nueva).

## Decisiones que no hay que reabrir

- **Textos tal cual del boceto y el Documento Maestro**, tuteo incluido; lo contradictorio va al PDF de dudas, no se corrige.
- **Estética de Partners en claro** (Baloo + Figtree, logo del manual), no la serif del boceto (era de la plantilla de IA).
- **"Más luz":** base clara; en oscuro sólo cifras, niveles, comparativa y manifiesto.
- **Gente "normal" y de edades variadas** en toda foto con personas (bloque "Casting" en `assets/gen/out/metodo-23-nov/PROMPTS.md`).
- **Costuras entre secciones rectas.** Se probaron en arco y no gustaron.
- **Siluetas del manual sólo en el Manifiesto**, no en el hero.
