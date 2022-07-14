import { useLoaderData, useParams } from '@remix-run/react';
import type { LoaderFunction } from '@remix-run/server-runtime';
import invariant from 'tiny-invariant';
import { getLikersForTweet } from '~/modules/Tweet/tweet.server';
import { UserDialog } from '~/modules/shared/UserDialog';
import { getCookie } from '~/helpers';

export const loader: LoaderFunction = async ({ request, params }) => {
  const cookie = getCookie(request);
  const tweetId = params.id;
  invariant(tweetId, `params.slug is required`);

  return await getLikersForTweet(tweetId, cookie);
};

export default function LikesDialog() {
  const likes = useLoaderData();

  return (
    <UserDialog
      variant="likes"
      users={likes}
    />
  );
}
