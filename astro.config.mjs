import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // SITE_BASE is set only while the site lives at jpas116.github.io/RRFSC (see scripts/prefix-links.mjs).
  site: process.env.SITE_BASE ? 'https://jpas116.github.io' : 'https://www.rrfsc.org',
  base: process.env.SITE_BASE ?? '/',
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [sitemap({ filter: (page) => !['/membership', '/test-sessions', '/news', '/show', '/competitions'].some((old) => page.endsWith(old)) })],
});
