import fs from 'node:fs/promises';
import path from 'node:path';
import parseMD from 'parse-md';
import { marked } from 'marked';
import type { Plugin } from 'vite';

const POSTS_DIR = './app/posts';

const calculateReadingTime = (text: string): number => {
  const wpm = 225;
  const words = text.match(/(\w)+/g)?.length ?? 0;
  return Math.ceil(words / wpm);
};

interface PostFrontmatter {
  hide?: boolean;
  archived?: boolean;
  updated?: string;
}

export default function postMeta(): Plugin {
  const metaId = '$virtual/post-meta.json';
  const contentId = '$virtual/post-meta-with-html.json';
  const latestPostId = '$virtual/latest-post';

  return {
    name: 'post-metadata', // required, will show up in warnings and errors
    enforce: 'pre',
    resolveId(id) {
      if (id === metaId || id === contentId || id === latestPostId) {
        return id;
      }
    },
    async load(id) {
      if (id !== metaId && id !== contentId && id !== latestPostId) return;

      const files = (await fs.readdir(POSTS_DIR)).filter((file) => file.endsWith('.mdx'));

      // Re-export the newest visible post so the home page can render it
      // directly with proper code splitting.
      if (id === latestPostId) {
        for (const file of [...files].reverse()) {
          const markdown = await fs.readFile(`${POSTS_DIR}/${file}`, 'utf8');
          const { metadata } = parseMD(markdown) as { metadata: PostFrontmatter };

          if (!metadata.hide && !metadata.archived) {
            return `export { default } from '${path.resolve(POSTS_DIR, file)}';`;
          }
        }

        throw new Error('No visible posts found for $virtual/latest-post');
      }

      const metadata = await Promise.all(
        files.map(async (file) => {
          const markdown = await fs.readFile(`${POSTS_DIR}/${file}`, 'utf8');
          const parsed = parseMD(markdown);

          const metadata = parsed.metadata as PostFrontmatter;
          const published = file.slice(0, 10);
          const slug = file.slice(11, -4);
          const readingTime = calculateReadingTime(parsed.content);

          const html = id === contentId ? await marked.parse(parsed.content) : '';

          return {
            slug,
            published,
            updated: published,
            readingTime,
            html,
            ...metadata,
          };
        }),
      );

      return JSON.stringify(metadata.reverse());
    },
  };
}
