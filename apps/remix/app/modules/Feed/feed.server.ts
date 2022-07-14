import { composeRequestInit, apiEndpoints } from '~/helpers';

export async function createTweetMutation(
  cookie: string,
  {
    content,
    replyPermissions,
    imageIds,
  }: { content: string; replyPermissions: string; imageIds: string },
) {
  //remix - This is a bit gross that we cant send arrays in formData
  const imageUrls = imageIds ? imageIds.split(',') : null;

  return await fetch(
    apiEndpoints.tweets.createTweet,
    composeRequestInit({
      body: { content, imageUrls, replyPermissions },
      cookie,
      method: 'POST',
    }),
  );
}

export async function homeTweetsQuery(cookie: string) {
  return await fetch(apiEndpoints.tweets.getHomeTweets, composeRequestInit({ cookie }));
}
