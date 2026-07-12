import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'react-router';

import type { Route } from './+types/root';
import Nav from '~/components/Nav';
import SocialLinks from '~/components/SocialLinks';
import ThemeToggle from '~/components/ThemeToggle';
import '~/styles/app.css';

export const links: Route.LinksFunction = () => [
  { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
  { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
  { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
  { rel: 'manifest', href: '/site.webmanifest' },
  { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#5bbad5' },
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Calistoga&family=Merriweather:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap',
  },
];

const THEME_INIT_SCRIPT = `
  const theme = localStorage.getItem('theme');

  if (theme) {
    document.body.classList.remove('system');
    document.body.classList.add(theme);
  }
`;

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="msapplication-TileColor" content="#603cba" />
        <meta name="theme-color" content="#ffffff" />
        <Meta />
        <Links />
      </head>
      <body
        className="system md:text-lg text-primary bg-inverse transition motion-reduce:transition-none duration-150"
        suppressHydrationWarning
      >
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />

        <Nav />

        <div className="md:ml-36 lg:ml-64 xl:mr-48 2xl:mx-80 px-8 pb-8 md:py-8 md:px-12 lg:px-20">
          <div className="max-w-2xl 2xl:max-w-3xl m-auto">
            <div className="text-right hidden md:block">
              <ThemeToggle />
            </div>
            {children}
            <SocialLinks className="p-8 md:hidden" />
          </div>
        </div>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const is404 = isRouteErrorResponse(error) && error.status === 404;
  const message = error instanceof Error ? error.message : undefined;
  const title = is404 ? "sorry, nebs couldn't find that page :(" : 'something went wrong';

  return (
    <div className="flex items-center justify-center p-8">
      <div>
        <img
          src="/favicon-16x16.png"
          alt="The best doggo"
          className="w-32 m-auto my-8 pixel aspect-square"
        />
        <h1 className="text-xl mb-0">{title}</h1>

        {message && !is404 && <div className="text-lg text-center error-message">{message}</div>}
      </div>
    </div>
  );
}
