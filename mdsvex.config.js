import remarkGithub from 'remark-github';
import remarkAbbr from 'remark-abbr';
import remarkContainers from 'remark-containers';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

const layout = `./src/lib/components/BlogLayout.svelte`;

export default {
  extensions: ['.svelte.md', '.md', '.svx'],
  layout,
  smartypants: {
    dashes: 'oldschool',
  },
  remarkPlugins: [
    [
      remarkGithub,
      {
        // Use your own repository
        repository: 'https://github.com/pzuraq/pzuraq.com.git',
      },
    ],
    remarkAbbr,
    remarkContainers,
  ],
  rehypePlugins: [
    rehypeSlug,
    [
      rehypeAutolinkHeadings,
      {
        behavior: 'wrap',
      },
    ],
  ],
};
