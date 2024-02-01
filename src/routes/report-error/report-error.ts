import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, locals }) => {
  let { error } = await request.json();

  if (error.message) {
    error.message = `CLIENT ERROR: ${error.message}`;
  } else if (typeof error === 'string') {
    error = {
      message: `CLIENT ERROR: ${error}`,
    };
  }

  const err = new Error(error.message);
  err.stack = error.stack ?? '';

  locals.sentry?.captureException(err);

  return new Response(JSON.stringify({ success: true }));
};
