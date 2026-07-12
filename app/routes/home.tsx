import { Link } from 'react-router';
import POST_META from '$virtual/post-meta.json';
import LatestPost from '$virtual/latest-post';

import { formatPublishDate, formatTitle } from '~/lib/format';
import { pageMeta } from '~/lib/page-meta';

const latest = POST_META.find((m) => !m.hide && !m.archived)!;

export function meta() {
  return pageMeta({ title: latest.title, tagline: latest.tagline, pathname: '/' });
}

export default function Home() {
  const title = formatTitle(latest.title);
  const published = formatPublishDate(latest.published);

  return (
    <>
      <span className="text-secondary font-cursive relative -top-8 md:inline hidden">
        {published}
      </span>

      <h1 className="text-center">{title}</h1>

      <span className="text-secondary font-cursive relative block text-center text-sm md:hidden -mb-2 -mt-1">
        {published}
      </span>

      <hr />

      <div className="blog-content">
        <LatestPost />
      </div>

      <hr />

      <div className="text-center text-link pt-8 pb-12">
        <Link to="/archive"> read some more </Link>
      </div>
    </>
  );
}
