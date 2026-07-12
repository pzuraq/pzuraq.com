// Prerendered to /404/index.html and copied to 404.html by the post-build
// script; Cloudflare serves it for any request that doesn't match an asset
// (assets.not_found_handling = "404-page"). It renders the same UI as the
// root ErrorBoundary, which takes over after hydration when the browser URL
// doesn't match any route.
export function meta() {
  return [{ title: 'pzuraq | not found' }];
}

export default function NotFound() {
  return (
    <div className="flex items-center justify-center p-8">
      <div>
        <img
          src="/favicon-16x16.png"
          alt="The best doggo"
          className="w-32 m-auto my-8 pixel aspect-square"
        />
        <h1 className="text-xl mb-0">sorry, nebs couldn&apos;t find that page :(</h1>
      </div>
    </div>
  );
}
