// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://seravenegas.com',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [sitemap()],
  image: {
    // Sin dominios remotos: todas las imágenes salen del propio proyecto.
    remotePatterns: [],
  },
});
