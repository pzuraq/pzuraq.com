import POST_META from '$virtual/post-meta.json';

import PostList from '~/components/PostList';
import { pageMeta } from '~/lib/page-meta';
import type { Route } from './+types/archive-older';

export function meta({ location }: Route.MetaArgs) {
  return pageMeta({ title: 'archive', pathname: location.pathname });
}

export default function ArchiveOlder() {
  return (
    <>
      <h1 className="text-secondary text-base">
        posts from past lives — likely no longer accurate, kept for posterity
      </h1>

      <hr />

      <PostList posts={POST_META.filter((m) => m.archived && !m.hide)} />
    </>
  );
}
