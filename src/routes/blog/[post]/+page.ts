import type { PageLoad } from './$types';
import POST_META from '$virtual/post-meta.json';
import { error } from '@sveltejs/kit';

export interface BlogMetadata {
  title: string;
  published: string;
}

export const load: PageLoad = async ({ params }) => {
  const metadata = POST_META.find((m) => m.slug === params.post);

  if (!metadata) {
    throw error(404);
  }

  const { default: component } = await import(
    `../_posts/${metadata.published}-${metadata.slug}.svx`
  );

  return {
    component,
    metadata,
  };
};
