import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@mdx-js/rollup';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkSmartypants from 'remark-smartypants';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrismPlus from 'rehype-prism-plus';
import postMeta from './lib/post-meta';

export default defineConfig({
  plugins: [
    postMeta(),
    tailwindcss(),
    mdx({
      remarkPlugins: [remarkFrontmatter, remarkGfm, [remarkSmartypants, { dashes: 'oldschool' }]],
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: 'wrap' }],
        [rehypePrismPlus, { ignoreMissing: true }],
      ],
    }),
    reactRouter(),
  ],
  resolve: {
    tsconfigPaths: true,
    // tsconfigPaths does not apply to .mdx files, so alias `~` explicitly
    alias: {
      '~': fileURLToPath(new URL('./app', import.meta.url)),
    },
  },
});
