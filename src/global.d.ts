interface PostMeta {
  slug: string;
  title: string;
  published: string;
  updated: string;
  readingTime: number;
  tagline?: string;
  hide?: boolean;

  [key: string]: string;
}

declare module '$virtual/post-meta.json' {
  const POST_META: PostMeta[];

  export = POST_META;
}

declare module '$virtual/post-meta-with-html.json' {
  const POST_META: (PostMeta & { html: string })[];

  export = POST_META;
}
