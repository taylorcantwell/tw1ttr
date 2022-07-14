import { useLoaderData } from '@remix-run/react';
import type { Tweet } from '@twitter-clone/shared';
import { AsideMenu, PrimaryLayoutContainer, TweetList } from '~/modules/shared';

export function Bookmarks() {
  const tweets = useLoaderData<Tweet[]>();

  return (
    <PrimaryLayoutContainer>
      <AsideMenu
        ariaLabel="filter tweets"
        items={asideMenuItems}
      />
      <main className="self-start h-full -mt-10">
        <TweetList tweets={tweets} />
      </main>
    </PrimaryLayoutContainer>
  );
}

const asideMenuItems = [
  { description: 'Tweet', url: 'test' },
  { description: 'Tweets & replies', url: 'test' },
  { description: 'Media', url: 'test' },
  { description: 'Likes', url: 'test' },
];
