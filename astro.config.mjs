import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.rrfsc.org',
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [sitemap({ filter: (page) => !['/membership', '/test-sessions', '/news', '/show', '/competitions'].some((old) => page.endsWith(old)) })],
});
