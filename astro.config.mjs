import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://cherub-atelier.netlify.app',

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

  // Phase 6: never inline compiled CSS as <style> elements. Astro's default
  // ('auto') inlines any stylesheet under 4KB directly into the HTML, which
  // a strict CSP (style-src 'self', no 'unsafe-inline'/hash/nonce) blocks
  // outright — that's what broke the site's formatting after the Phase 6
  // netlify.toml went live. Forcing 'never' keeps every stylesheet as a
  // same-origin <link rel="stylesheet">, which 'self' already allows, so
  // the CSP itself doesn't need to weaken.
  build: {
    inlineStylesheets: 'never',
  },

  output: 'static',
});
