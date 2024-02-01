import fs from 'fs-extra';
import parseMD from 'parse-md';
import { marked } from 'marked';
import type { Plugin } from 'vite';

const calculateReadingTime = (text: string): number => {
  const wpm = 225;
  const words = text.match(/(\w)+/g)?.length ?? 0;
  return Math.ceil(words / wpm);
};

export default function postMeta(): Plugin {
  const metaId = '$virtual/post-meta.json';
  const contentId = '$virtual/post-meta-with-html.json';

  return {
    name: 'post-metadata', // required, will show up in warnings and errors
    enforce: 'pre',
    resolveId(id) {
      if (id === metaId) {
        return metaId;
      } else if (id === contentId) {
        return contentId;
      }
    },
    async load(id) {
      if (id !== metaId && id !== contentId) return;

      const files = await fs.readdir('./src/routes/blog/_posts');
      const metadata = await Promise.all(
        files.map(async (file) => {
          const markdown = await fs.readFile(`./src/routes/blog/_posts/${file}`, 'utf8');
          const parsed = parseMD(markdown);

          const metadata = parsed.metadata as { updated?: string };
          const published = file.slice(0, 10);
          const slug = file.slice(11, -4);
          const readingTime = calculateReadingTime(parsed.content);

          const html = id === contentId ? marked.parse(parsed.content) : '';

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
