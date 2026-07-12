interface PostMeta {
  slug: string;
  title: string;
  published: string;
  updated: string;
  readingTime: number;
  tagline?: string;
  hide?: boolean;
}

declare module '$virtual/post-meta.json' {
  const POST_META: PostMeta[];

  export default POST_META;
}

declare module '$virtual/post-meta-with-html.json' {
  const POST_META: (PostMeta & { html: string })[];

  export default POST_META;
}

declare module '*.mdx' {
  import type { FunctionComponent } from 'react';

  const Component: FunctionComponent<Record<string, unknown>>;
  export default Component;
}
