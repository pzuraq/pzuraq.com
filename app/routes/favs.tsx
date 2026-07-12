import Favs from '~/content/favs.mdx';
import { pageMeta } from '~/lib/page-meta';
import type { Route } from './+types/favs';

export function meta({ location }: Route.MetaArgs) {
  return pageMeta({
    title: 'favs',
    tagline: 'things I like and you might too',
    pathname: location.pathname,
  });
}

export default function FavsPage() {
  return (
    <div className="blog-content">
      <Favs />
    </div>
  );
}
