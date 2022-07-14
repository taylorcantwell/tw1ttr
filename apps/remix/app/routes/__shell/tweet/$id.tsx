import { type ActionFunction, type LoaderFunction } from '@remix-run/node';
import {
  followMutation,
  likeTweetMutation,
  retweetMutation,
  saveTweetMutation,
} from '~/modules/shared/api.server';
import { Tweet } from '~/modules/Tweet';
import { commentMutation, getTweetById, likeCommentMutation } from '~/modules/Tweet/tweet.server';
import { getCookie, unpackRequest } from '~/helpers';

export const loader: LoaderFunction = async ({ request, params }) => {
  const cookie = getCookie(request);
  return await getTweetById(params.id, cookie);
};

export const action: ActionFunction = async ({ request }): Promise<any> => {
  const { actionType, tweetId, commentId, followeeId, cookie, ...data } = await unpackRequest(
    request,
  );

  switch (actionType) {
    case 'follow':
      return await followMutation(followeeId, cookie);

    case 'like':
      return await likeTweetMutation(tweetId, cookie);

    case 'retweet':
      return await retweetMutation(tweetId, cookie);

    case 'save':
      return await saveTweetMutation(tweetId, cookie);

    case 'comment':
      return await commentMutation(tweetId, cookie, data);

    case 'likeComment':
      return await likeCommentMutation(commentId, cookie);

    default:
      break;
  }
};

export default function TweetRoute() {
  return <Tweet />;
}
