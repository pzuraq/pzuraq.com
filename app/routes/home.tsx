import { Link } from 'react-router';
import POST_META from '$virtual/post-meta.json';

import ReadingTime from '~/components/ReadingTime';
import { formatPublishDate, formatTitle } from '~/lib/format';

export function meta() {
  return [
    { title: 'pzuraq | blog' },
    { property: 'og:url', content: 'https://www.pzuraq.com' },
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: 'pzuraq' },
    { property: 'og:image', content: 'https://www.pzuraq.com/assets/og-image.png' },
    { property: 'og:description', content: 'A blog about (mostly) computery things' },
    { name: 'twitter:image', content: 'https://www.pzuraq.com/assets/og-image.png' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:site', content: '@pzuraq' },
  ];
}

export default function Home() {
  return (
    <>
      <h1 className="text-secondary text-base">a blog about (mostly) computery things</h1>

      <hr />

      {POST_META.filter((m) => !m.hide).map((blogPost) => (
        <div key={blogPost.slug} className="mb-8 text-center">
          <Link to={`/blog/${blogPost.slug}`}>
            <span className="text-2xl font-bold font-cursive hover:text-ochre-500">
              {formatTitle(blogPost.title)}
            </span>

            <br />

            {blogPost.tagline && (
              <>
                <span className="text-sm my-1">{blogPost.tagline}</span>

                <br />
              </>
            )}

            <span className="text-secondary text-sm font-cursive">
              {formatPublishDate(blogPost.published)} •{' '}
              <span className="mr-1">
                <ReadingTime readingTime={blogPost.readingTime} />
              </span>
            </span>
          </Link>
        </div>
      ))}
    </>
  );
}
