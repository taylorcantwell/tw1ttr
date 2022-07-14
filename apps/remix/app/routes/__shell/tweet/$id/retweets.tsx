import { useLoaderData, useParams } from '@remix-run/react';
import type { LoaderFunction } from '@remix-run/server-runtime';
import invariant from 'tiny-invariant';
import { getRetweetersForTweet } from '~/modules/Tweet/tweet.server';
import { UserDialog } from '~/modules/shared/UserDialog';
import { getCookie } from '~/helpers';

export const loader: LoaderFunction = async ({ request, params }) => {
  const cookie = getCookie(request);
  const tweetId = params.id;
  invariant(tweetId, `params.slug is required`);

  return await getRetweetersForTweet(tweetId, cookie);
};

export default function RetweetsDialog() {
  const retweets = useLoaderData();

  return (
    <UserDialog
      variant="retweets"
      users={retweets}
    />
  );
}
