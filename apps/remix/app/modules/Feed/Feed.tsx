import { Outlet } from '@remix-run/react';
import type { Tweet } from '@twitter-clone/shared';
import { useLoaderData } from '@remix-run/react';
import { TweetList } from '~/modules/shared';
import { TrendsForYou } from './components/TrendsForYou';
import { TweetSomething } from './components/TweetSomething';
import { useOptionalUser } from '~/hooks';

export function Home() {
  const tweets = useLoaderData<Tweet[]>();
  const user = useOptionalUser();

  return (
    <div className="grid md:grid-cols-[3fr,1fr] gap-5 container p-5 mt-10 mx-auto md:p-0">
      <div className="self-start">
        <TweetSomething user={user} />
        <TweetList tweets={tweets} />
        <div className="flex justify-center py-10 text-red-500">
          No infinite scroll until this is added:{' '}
          <a href="https://github.com/remix-run/remix/discussions/2775">
            https://github.com/remix-run/remix/discussions/2775
          </a>
        </div>
      </div>
      <TrendsForYou />
      <Outlet />
    </div>
  );
}
