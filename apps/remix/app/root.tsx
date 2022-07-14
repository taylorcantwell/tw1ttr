import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
  useTransition,
} from '@remix-run/react';
import { apiEndpoints, composeRequestInit, getCookie } from './helpers';
import { SpinnerLoader } from './modules/shared';
import styles from './styles/styles.css';

export function links() {
  return [
    { rel: 'stylesheet', href: styles },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap',
    },
  ];
}

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Tw1ttr',
  viewport: 'width=device-width,initial-scale=1',
});

export const loader: LoaderFunction = async ({ request }) => {
  const cookie = getCookie(request);
  return await fetch(apiEndpoints.auth.me, composeRequestInit({ cookie }));
};

export default function App() {
  const transition = useTransition();
  const isTransitioning = transition.state === 'loading';

  let shouldScroll = true;
  const location = useLocation() as any;
  if (location?.state && location?.state?.disableScroll === true) {
    shouldScroll = false;
  }

  return (
    <html
      lang="en"
      className="bg-[#f5f5f5] relative min-h-screen"
    >
      <head>
        <Meta />
        <Links />
      </head>
      <body className="relative min-h-screen">
        <Outlet />
        {shouldScroll ? <ScrollRestoration /> : null}
        <Scripts />
        <LiveReload />
        {isTransitioning && (
          <div className="fixed bottom-24 right-4 md:bottom-8 md:right-8">
            <SpinnerLoader />
          </div>
        )}
      </body>
    </html>
  );
}
