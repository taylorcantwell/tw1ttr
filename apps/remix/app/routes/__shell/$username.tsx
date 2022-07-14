import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import invariant from 'tiny-invariant';
import { likeTweetMutation, retweetMutation, saveTweetMutation } from '~/modules/shared/api.server';
import { Profile, getProfileTweetsQuery, updateProfile } from '~/modules/Profile';
import { unpackRequest, getCookie } from '~/helpers';
import { followMutation } from '~/modules/shared';

export const action: ActionFunction = async ({ request }): Promise<any> => {
  const { cookie, actionType, tweetId, followeeId, ...data } = await unpackRequest(request);

  switch (actionType) {
    case 'follow':
      return await followMutation(followeeId, cookie);

    case 'like':
      return await likeTweetMutation(tweetId, cookie);

    case 'retweet':
      return await retweetMutation(tweetId, cookie);

    case 'save':
      return await saveTweetMutation(tweetId, cookie);

    case 'updateProfile':
      return await updateProfile(cookie, data);
    default:
      break;
  }
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const cookie = getCookie(request);
  const username = params.username;
  invariant(username, `params.username is required`);

  return await getProfileTweetsQuery(username, cookie);
};

export default function ProfileRoute() {
  return <Profile />;
}
