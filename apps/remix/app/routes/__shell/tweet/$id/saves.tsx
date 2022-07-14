import { useLoaderData, useParams } from '@remix-run/react';
import type { LoaderFunction } from '@remix-run/server-runtime';
import invariant from 'tiny-invariant';
import { getSaversForTweet } from '~/modules/Tweet/tweet.server';
import { UserDialog } from '~/modules/shared/UserDialog';
import { getCookie } from '~/helpers';

export const loader: LoaderFunction = async ({ request, params }) => {
  const cookie = getCookie(request);
  const tweetId = params.id as string;
  invariant(tweetId, `params.slug is required`);

  return await getSaversForTweet(tweetId, cookie);
};

export default function SavesDialog() {
  const saves = useLoaderData();

  return (
    <UserDialog
      variant="saves"
      users={saves}
    />
  );
}
