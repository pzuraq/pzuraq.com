import { Link, Outlet, useLocation } from 'react-router';
import POST_META from '$virtual/post-meta.json';

import { formatPublishDate, formatTitle } from '~/lib/format';
import { pageMeta } from '~/lib/page-meta';
import type { Route } from './+types/blog-layout';

const getPostMeta = (pathname: string) => {
  const slug = pathname.replace(/^\/blog\//, '').replace(/\/$/, '');

  return POST_META.find((m) => m.slug === slug);
};

export function meta({ location }: Route.MetaArgs) {
  const post = getPostMeta(location.pathname);

  if (!post) return [];

  return pageMeta({
    title: post.title,
    tagline: post.tagline,
    pathname: location.pathname,
  });
}

export default function BlogLayout() {
  const location = useLocation();
  const post = getPostMeta(location.pathname);

  if (!post) {
    return <Outlet />;
  }

  const title = formatTitle(post.title);
  const published = formatPublishDate(post.published);

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
        <Outlet />
      </div>

      <hr />

      <div className="text-center text-link pt-8 pb-12">
        <Link to="/archive"> read some more </Link>
      </div>
    </>
  );
}
