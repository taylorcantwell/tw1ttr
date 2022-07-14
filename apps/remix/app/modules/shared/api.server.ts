import { apiEndpoints, composeRequestInit } from '../../helpers';

export async function likeTweetMutation(tweetId: string, cookie: string) {
  return await fetch(
    apiEndpoints.likes.likeTweet(tweetId),
    composeRequestInit({ cookie, method: 'POST' }),
  );
}

export async function retweetMutation(tweetId: string, cookie: string) {
  return await fetch(
    apiEndpoints.retweets.retweet(tweetId),
    composeRequestInit({ cookie, method: 'POST' }),
  );
}

export async function saveTweetMutation(tweetId: string, cookie: string) {
  return await fetch(
    apiEndpoints.saves.saveTweet(tweetId),
    composeRequestInit({ cookie, method: 'POST' }),
  );
}

export async function followMutation(followeeId: string, cookie: string) {
  return await fetch(
    apiEndpoints.follows.follow(followeeId),
    composeRequestInit({ cookie, method: 'POST' }),
  );
}
