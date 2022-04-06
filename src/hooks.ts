import { assert } from '$lib/type-helpers';
import type { GetSession, Handle } from '@sveltejs/kit';
import * as cookie from 'cookie';
import POST_META from '$virtual/post-meta.json';

export const handle: Handle = async ({ event, resolve }) => {
  const res = await resolve(event);

  if (
    res.status === 404 &&
    POST_META.find((metadata) => event.url.pathname === `/${metadata.slug}`)
  ) {
    return Response.redirect(`${event.url.origin}/blog${event.url.pathname}`);
  }

  return res;
};

export const getSession: GetSession = (event) => {
  const parsedCookie = cookie.parse(event.request.headers.get('cookie') ?? '');
  const theme = parsedCookie.theme ?? 'system';

  assert(theme === 'light' || theme === 'dark' || theme === 'system', 'unexpected theme');

  return { theme };
};
