// Post-build step for the static Cloudflare Workers assets deployment:
// - moves the prerendered /404 page to 404.html, which Cloudflare serves for
//   any request that doesn't match an asset (assets.not_found_handling)
// - generates the _redirects metafile (legacy URLs and /{slug} shorthands)
import fs from 'node:fs';

const CLIENT = './build/client';

fs.copyFileSync(`${CLIENT}/404/index.html`, `${CLIENT}/404.html`);
fs.rmSync(`${CLIENT}/404`, { recursive: true });

const slugs = fs
  .readdirSync('./app/posts')
  .filter((file) => file.endsWith('.mdx'))
  .map((file) => file.slice(11, -4));

const redirects = [
  '/blog / 302',
  '/thinking-with-autotracking-what-makes-a-good-reactive-system /blog/what-makes-a-good-reactive-system 301',
  '/thinking-with-autotracking-what-is-reactivity /blog/what-is-reactivity 301',
  '/coming-soon-in-ember-octane /blog/coming-soon-in-ember-octane-part-4-modifiers 301',
  ...slugs.map((slug) => `/${slug} /blog/${slug} 301`),
];

fs.writeFileSync(`${CLIENT}/_redirects`, redirects.join('\n') + '\n');

console.log(`postbuild: wrote 404.html and _redirects (${redirects.length} rules)`);
