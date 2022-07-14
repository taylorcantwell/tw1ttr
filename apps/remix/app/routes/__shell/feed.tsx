import type { LoaderFunction, ActionFunction } from '@remix-run/node';
import { likeTweetMutation, retweetMutation, saveTweetMutation } from '~/modules/shared/api.server';
import { Home, homeTweetsQuery, createTweetMutation } from '~/modules/Feed';
import { unpackRequest, getCookie } from '~/helpers';

export const action: ActionFunction = async ({ request }): Promise<any> => {
  const { actionType, tweetId, commentId, cookie, ...data } = await unpackRequest(request);

  switch (actionType) {
    case 'like':
      return await likeTweetMutation(tweetId, cookie);

    case 'retweet':
      return await retweetMutation(tweetId, cookie);

    case 'save':
      return await saveTweetMutation(tweetId, cookie);

    case 'create':
      return await createTweetMutation(cookie, data);

    default:
      break;
  }
};

export const loader: LoaderFunction = async ({ request }) => {
  const cookie = getCookie(request);
  return await homeTweetsQuery(cookie);
};

export default function HomeRoute() {
  return <Home />;
}
