export const links = {
  profile: (username: string) => `/${username}`,
  tweet: (tweetId: string) => `/tweet/${tweetId}`,
  home: '/feed',
  explore: '/explore',
  bookmarks: '/bookmarks',
  login: '/login',
  register: '/register',
  dialogs: {
    saves: 'saves',
    likes: 'likes',
    retweets: 'retweets',
    following: 'following',
    followers: 'followers',
  },
};
