// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://miamispringshistoricalsociety.com',
  output: 'static',
  compressHTML: true,
  integrations: [sitemap()],
});
