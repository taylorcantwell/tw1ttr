import { json } from '@remix-run/node';
import { apiEndpoints, composeRequestInit } from '~/helpers';

export async function commentMutation(tweetId: string, cookie: string, body: RequestInit['body']) {
  return await fetch(
    apiEndpoints.comments.comment(tweetId),
    composeRequestInit({ cookie, body, method: 'POST' }),
  );
}

export async function likeCommentMutation(commentId: string, cookie: string) {
  return await fetch(
    apiEndpoints.comments.likeComment(commentId),
    composeRequestInit({ cookie, method: 'POST' }),
  );
}

export async function getTweetById(tweetId: string, cookie: string) {
  const data = await fetch(
    apiEndpoints.tweets.getTweetById(tweetId),
    composeRequestInit({ cookie }),
  );

  const result = await data.json();

  return json(result, {
    headers: {
      'Cache-Control': 'public, max-age=120',
    },
  });
}

export async function getSaversForTweet(tweetId: string, cookie: string) {
  return await fetch(apiEndpoints.saves.getSaversForTweet(tweetId), composeRequestInit({ cookie }));
}

export async function getLikersForTweet(tweetId: string, cookie: string) {
  return await fetch(apiEndpoints.likes.getLikersForTweet(tweetId), composeRequestInit({ cookie }));
}

export async function getRetweetersForTweet(tweetId: string, cookie: string) {
  return await fetch(
    apiEndpoints.retweets.getRetweetersForTweet(tweetId),
    composeRequestInit({ cookie }),
  );
}
