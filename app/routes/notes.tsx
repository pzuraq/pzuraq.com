import Notes from '~/content/notes.mdx';
import { pageMeta } from '~/lib/page-meta';
import type { Route } from './+types/notes';

export function meta({ location }: Route.MetaArgs) {
  return pageMeta({ title: 'notes', pathname: location.pathname });
}

export default function NotesPage() {
  return (
    <div className="blog-content">
      <Notes />
    </div>
  );
}
