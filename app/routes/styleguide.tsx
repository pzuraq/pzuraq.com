import Styleguide from '~/content/styleguide.mdx';
import { pageMeta } from '~/lib/page-meta';
import type { Route } from './+types/styleguide';

export function meta({ location }: Route.MetaArgs) {
  return pageMeta({ title: 'styleguide', pathname: location.pathname });
}

export default function StyleguidePage() {
  return (
    <div className="blog-content">
      <Styleguide />
    </div>
  );
}
