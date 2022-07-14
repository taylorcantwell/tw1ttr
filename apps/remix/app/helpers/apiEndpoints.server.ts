import { config } from '~/config';

const BASE_URL = config.backend.url;

export const apiEndpoints = {
  tweets: {
    createTweet: `${BASE_URL}/tweet`,
    getHomeTweets: `${BASE_URL}/tweet/home`,
    getProfile: (username: string) => `${BASE_URL}/tweet/user/${username}`,
    getProfileTweets: (username: string) => `${BASE_URL}/user/${username}`,
    getTweet: (tweetId: string) => `${BASE_URL}/tweet/${tweetId}`,
    getTweetById: (tweetId: string) => `${BASE_URL}/tweet/${tweetId}`,
  },
  comments: {
    comment: (tweetId: string) => `${BASE_URL}/comment/${tweetId}`,
    likeComment: (commentId: string) => `${BASE_URL}/comment/${commentId}/like`,
  },
  likes: {
    likeTweet: (tweetId: string) => `${BASE_URL}/like/${tweetId}`,
    getLikersForTweet: (tweetId: string) => `${BASE_URL}/like/${tweetId}/likers`,
  },
  retweets: {
    retweet: (tweetId: string) => `${BASE_URL}/retweet/${tweetId}`,
    getRetweetersForTweet: (tweetId: string) => `${BASE_URL}/retweet/${tweetId}/retweeters`,
  },
  follows: {
    follow: (followeeId: string) => `${BASE_URL}/follow/${followeeId}`,
    getFollowers: (username: string) => `${BASE_URL}/follow/followers/${username}`,
    getFollowees: (username: string) => `${BASE_URL}/follow/followees/${username}`,
  },
  saves: {
    getBookmarks: `${BASE_URL}/save`,
    saveTweet: (tweetId: string) => `${BASE_URL}/save/${tweetId}`,
    getSaversForTweet: (tweetId: string) => `${BASE_URL}/save/${tweetId}/savers`,
  },
  auth: {
    login: `${BASE_URL}/auth/login`,
    register: `${BASE_URL}/auth/register`,
    logout: `${BASE_URL}/auth/logout`,
    me: `${BASE_URL}/user/me`,
  },
  cloudinary: {
    upload: `${BASE_URL}/cloudinary/upload`,
  },
  profile: {
    update: `${BASE_URL}/profile/update`,
  },
};
