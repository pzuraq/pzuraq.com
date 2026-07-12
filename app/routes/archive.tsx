import { Link } from 'react-router';
import POST_META from '$virtual/post-meta.json';

import PostList from '~/components/PostList';

export function meta() {
  return [
    { title: 'pzuraq | blog' },
    { property: 'og:url', content: 'https://www.pzuraq.com/archive' },
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: 'pzuraq' },
    { property: 'og:image', content: 'https://www.pzuraq.com/assets/og-image.png' },
    { property: 'og:description', content: 'A blog about (mostly) computery things' },
    { name: 'twitter:image', content: 'https://www.pzuraq.com/assets/og-image.png' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:site', content: '@pzuraq' },
  ];
}

export default function Archive() {
  return (
    <>
      <h1 className="text-secondary text-base">a blog about (mostly) computery things</h1>

      <hr />

      <PostList posts={POST_META.filter((m) => !m.hide && !m.archived)} />

      <hr />

      <div className="text-center text-link pb-12">
        <Link to="/archive/older"> even older posts </Link>
      </div>
    </>
  );
}
