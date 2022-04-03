import { assert } from '$lib/type-helpers';
import type { GetSession } from '@sveltejs/kit';
import * as cookie from 'cookie';

export const getSession: GetSession = (event) => {
  const parsedCookie = cookie.parse(event.request.headers.get('cookie') ?? '');
  const theme = parsedCookie.theme ?? 'system';

  console.log(parsedCookie);

  assert(theme === 'light' || theme === 'dark' || theme === 'system', 'unexpected theme');

  return { theme };
};
