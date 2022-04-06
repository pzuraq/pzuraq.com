import type { Handle } from '@sveltejs/kit';
import POST_META from '$virtual/post-meta.json';

const REDIRECTS = [
  {
    from: '/thinking-with-autotracking-what-makes-a-good-reactive-system',
    to: '/blog/what-makes-a-good-reactive-system/',
    permanent: true,
  },
  {
    from: '/thinking-with-autotracking-what-is-reactivity',
    to: '/blog/what-is-reactivity/',
    permanent: true,
  },
  {
    from: '/coming-soon-in-ember-octane/',
    to: '/blog/coming-soon-in-ember-octane-part-4-modifiers',
    permanent: true,
  },

  ...POST_META.map((meta) => ({
    from: `/${meta.slug}`,
    to: `/blog/${meta.slug}`,
    permanent: true,
  })),
];

export const handle: Handle = async ({ event, resolve }) => {
  const res = await resolve(event);

  if (res.status === 404) {
    const redirect = REDIRECTS.find((r) => r.from === event.url.pathname);

    if (redirect) {
      return Response.redirect(`${event.url.origin}${redirect.to}`, redirect.permanent ? 301 : 302);
    }
  }

  return res;
};
