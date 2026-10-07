# seravenegas.com

Web escaparate del escultor **Serafín Venegas** (escultura cinegética en bronce). Sitio
estático en **Astro**, sin venta online: todo el contacto va por WhatsApp.

## Stack

- [Astro](https://astro.build) (output estático).
- Imágenes optimizadas con `astro:assets` (AVIF/WebP, `srcset`, `lazy`).
- Fuentes auto-alojadas con `@fontsource/marcellus` y `@fontsource/raleway` (sin Google Fonts).
- Datos desde `src/data/obras.json`.
- Sin cookies de análisis ni recursos de terceros.

## Desarrollo

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # genera dist/
npm run preview    # sirve dist/ localmente
```

## Estructura

```
src/
├── assets/img/         imágenes (originales + recortes) optimizadas por Astro
├── components/         Header, Hero, Colecciones, Galeria, Escultor, Proceso,
│                       Contacto, Footer, WhatsAppFab, Lightbox, IconWa
├── content/legal.md    aviso legal, privacidad y cookies (borrador)
├── data/obras.json     colecciones y obras (fuente de datos)
├── layouts/Base.astro  <head>, SEO, Open Graph, JSON-LD, fuentes
├── lib/                obras.ts (modelo + imágenes) y site.ts (WhatsApp)
├── pages/              index.astro, legal.astro, 404.astro
└── styles/global.css   tokens de diseño (§3 del handoff)
```

## Pendientes (marcados con [corchetes] en los textos)

- Datos legales: apellidos, NIF, domicilio, correo, fecha de publicación (`content/legal.md`).
- Biografía completa, dirección del taller y redes sociales.
- Medidas y serie de: Macho montés sobre roca (sev-36), Busto de toro (sev-37), Galgo (sev-35).
- Decisión de contraste de `--sage`: cambiar `--on-sage` a `var(--ink)` en `global.css` si
  se prioriza WCAG AA en los botones.
- Logo en SVG/PNG transparente (ahora es un JPG con `mix-blend-mode: multiply`).

## Despliegue

Vercel (framework Astro, build `npm run build`, output `dist`). Dominio `seravenegas.com`.
Las redirecciones 301 de rutas antiguas están en `vercel.json`.
