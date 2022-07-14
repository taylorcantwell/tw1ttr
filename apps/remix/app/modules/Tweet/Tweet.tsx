import { useLoaderData } from '@remix-run/react';
import { BackArrow, TweetCard } from '~/modules/shared';
import { MobileFooter } from '../Shell/MobileFooter';
import { TrendsForYou } from './components/TrendsForYou';
import { TweetContainer } from './components/TweetContainer';
import { Outlet } from '@remix-run/react';

export function Tweet() {
  const { tweet, comments } = useLoaderData();

  return (
    <>
      <BackArrow />
      <TweetContainer>
        <TweetCard
          comments={comments}
          tweet={tweet}
          variant="open"
          idx={0}
        />
        <TrendsForYou />
      </TweetContainer>
      <Outlet />
    </>
  );
}
