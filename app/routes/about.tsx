import About from '~/content/about.mdx';
import { pageMeta } from '~/lib/page-meta';
import type { Route } from './+types/about';

export function meta({ location }: Route.MetaArgs) {
  return pageMeta({
    title: 'about',
    tagline: 'obligatory self-describing blurb',
    pathname: location.pathname,
  });
}

export default function AboutPage() {
  return (
    <div className="blog-content">
      <About />
    </div>
  );
}
