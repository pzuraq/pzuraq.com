import { formatTitle } from '~/lib/format';

interface PageMetaArgs {
  title: string;
  tagline?: string;
  pathname: string;
}

// Mirrors the old mdsvex BlogLayout meta tags: pages with a tagline are
// titled as part of the blog.
export const pageMeta = ({ title, tagline, pathname }: PageMetaArgs) => {
  const blogTitle = typeof tagline === 'string' ? 'blog | ' : '';

  return [
    { title: `pzuraq | ${blogTitle}${formatTitle(title)}` },
    { property: 'og:url', content: `https://www.pzuraq.com${pathname}` },
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: `pzuraq | ${title.replaceAll('(nbsp)', ' ')}` },
    { property: 'og:image', content: 'https://www.pzuraq.com/assets/og-image.png' },
    { property: 'og:description', content: tagline || 'A blog about (mostly) computery things' },
    { name: 'twitter:image', content: 'https://www.pzuraq.com/assets/og-image.png' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:site', content: '@pzuraq' },
    { name: 'twitter:creator', content: '@pzuraq' },
  ];
};
