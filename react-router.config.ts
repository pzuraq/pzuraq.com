import fs from 'node:fs';
import type { Config } from '@react-router/dev/config';

const postPaths = fs
  .readdirSync('./app/posts')
  .filter((file) => file.endsWith('.mdx'))
  .map((file) => `/blog/${file.slice(11, -4)}`);

export default {
  // Fully static: every route is prerendered at build time and served as
  // Cloudflare Workers static assets, so no Worker runs at request time.
  ssr: false,
  prerender: [
    '/',
    '/about',
    '/art',
    '/favs',
    '/notes',
    '/styleguide',
    '/404',
    '/rss',
    '/sitemap.xml',
    ...postPaths,
  ],
} satisfies Config;
