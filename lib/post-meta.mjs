import fs from 'fs-extra';
import parseMD from 'parse-md';

const calculateReadingTime = (text) => {
  const wpm = 225;
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wpm);
};

export default function postMeta() {
  const virtualModuleId = '$virtual/post-meta.json';

  return {
    name: 'post-metadata', // required, will show up in warnings and errors
    enforce: 'pre',
    resolveId(id) {
      if (id === virtualModuleId) {
        return virtualModuleId;
      }
    },
    async load(id) {
      if (id !== virtualModuleId) return;

      const files = await fs.readdir('./src/routes/blog/_posts');
      const metadata = await Promise.all(
        files.map(async (file) => {
          const markdown = await fs.readFile(`./src/routes/blog/_posts/${file}`, 'utf8');
          const { metadata, content } = parseMD(markdown);
          const published = file.slice(0, 10);
          const slug = file.slice(11, -4);
          const readingTime = calculateReadingTime(content);

          return {
            slug,
            published,
            readingTime,
            ...metadata,
          };
        }),
      );

      return JSON.stringify(metadata.reverse());
    },
  };
}
