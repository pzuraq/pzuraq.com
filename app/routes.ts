import fs from 'node:fs';
import { type RouteConfig, index, route } from '@react-router/dev/routes';

const posts = fs
  .readdirSync('./app/posts')
  .filter((file) => file.endsWith('.mdx'))
  .map((file) => route(file.slice(11, -4), `posts/${file}`));

export default [
  index('routes/home.tsx'),
  route('blog', 'routes/blog-layout.tsx', posts),
  route('archive', 'routes/archive.tsx'),
  route('archive/older', 'routes/archive-older.tsx'),
  route('404', 'routes/not-found.tsx'),
  route('about', 'routes/about.tsx'),
  route('art', 'routes/art.tsx'),
  route('favs', 'routes/favs.tsx'),
  route('notes', 'routes/notes.tsx'),
  route('styleguide', 'routes/styleguide.tsx'),
  route('rss', 'routes/rss.ts'),
  route('sitemap.xml', 'routes/sitemap.ts'),
] satisfies RouteConfig;
