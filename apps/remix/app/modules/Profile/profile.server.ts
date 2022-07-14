import { fetchRequest, apiEndpoints, composeRequestInit } from '~/helpers';

export async function getProfileTweetsQuery(username: string, cookie: string) {
  return await fetchRequest(apiEndpoints.tweets.getProfileTweets(username), { cookie });
}

export async function getFollowers(username: string, cookie: string) {
  return await fetch(apiEndpoints.follows.getFollowers(username), composeRequestInit({ cookie }));
}

export async function getFollowees(username: string, cookie: string) {
  return await fetch(apiEndpoints.follows.getFollowees(username), composeRequestInit({ cookie }));
}

export async function updateProfile(
  cookie: string,
  body: { bio: string; avatarUrl: string; bannerUrl: string },
) {
  return await fetch(
    apiEndpoints.profile.update,
    composeRequestInit({ cookie, method: 'PATCH', body }),
  );
}
