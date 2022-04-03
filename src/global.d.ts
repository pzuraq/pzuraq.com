declare module '$virtual/post-meta.json' {
  const POST_META: {
    slug: string;
    title: string;
    published: string;
    readingTime: number;
    tagline?: string;

    [key: string]: string;
  }[];

  export = POST_META;
}
