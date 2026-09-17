import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // TODO (Phase 2 gate): replace with your actual Netlify URL once known
  site: 'https://placeholder.netlify.app',

  integrations: [sitemap()],

  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en'],
    routing: {
      prefixDefaultLocale: true,
    },
  },

  // Allow Sanity's CDN domain for the <Image> component
  image: {
    domains: ['cdn.sanity.io'],
  },

  output: 'static',
});
