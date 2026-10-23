// Until www.rrfsc.org points at GitHub Pages, the site is served from
// https://jpas116.github.io/RRFSC/. Astro's `base` setting handles asset URLs,
// but the pages link with plain absolute paths ("/coaches"), so this rewrites
// those in the built HTML when SITE_BASE is set. Remove the SITE_BASE line from
// the deploy workflow once the custom domain is live and this becomes a no-op.
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const base = (process.env.SITE_BASE ?? '').replace(/\/$/, '');
if (!base) process.exit(0);

const walk = (dir) =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') ? [p] : [];
  });

let count = 0;
for (const file of walk('dist')) {
  const html = readFileSync(file, 'utf8');
  const out = html
    .replace(/(href|src|content="0; url)=("?)\/(?!\/|RRFSC\/)/g, (_, attr, q) => `${attr}=${q}${base}/`)
    .replace(/(href|src)=("?)\/(?=["\s>])/g, (_, attr, q) => `${attr}=${q}${base}/`);
  if (out !== html) { writeFileSync(file, out); count++; }
}
console.log(`[prefix-links] prefixed links with ${base} in ${count} files`);
