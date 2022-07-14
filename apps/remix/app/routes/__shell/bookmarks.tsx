import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { likeTweetMutation, retweetMutation, saveTweetMutation } from '~/modules/shared/api.server';
import { Bookmarks, bookmarkTweetsQuery } from '~/modules/Bookmarks';
import { getCookie, unpackRequest } from '~/helpers';

export const action: ActionFunction = async ({ request }): Promise<any> => {
  const { cookie, actionType, tweetId } = await unpackRequest(request);

  switch (actionType) {
    case 'like':
      return await likeTweetMutation(tweetId, cookie);

    case 'retweet':
      return await retweetMutation(tweetId, cookie);

    case 'save':
      return await saveTweetMutation(tweetId, cookie);
    default:
      break;
  }
};

export const loader: LoaderFunction = async ({ request }) => {
  const cookie = getCookie(request);
  return await bookmarkTweetsQuery(cookie);
};

export default function BookmarkRoute() {
  return <Bookmarks />;
}
