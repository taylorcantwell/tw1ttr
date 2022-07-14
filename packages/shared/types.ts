import {
  Tweet as TweetPrisma,
  User as UserPrisma,
  Profile as ProfilePrisma,
  TweetComment,
  CommentLike,
} from '@twitter-clone/prisma';

export type TweetImage = {
  url: string;
  tweetId: TweetPrisma['id'];
};

export type Tweet = {
  id: TweetPrisma['id'];
  createdAt: TweetPrisma['createdAt'];
  content: TweetPrisma['content'];
  author: UserPrisma['username'];
  images?: TweetImage[];
  isLiked: boolean;
  isSaved: boolean;
  isRetweeted: boolean;
  commentCount: number;
  retweetCount: number;
  likeCount: number;
  saveCount: number;
  isRetweet?: boolean;
  avatarUrl?: string;
};

export type UserProfile = {
  id: UserPrisma['id'];
  username: UserPrisma['username'];
  isFollowing: boolean;
  followeeCount: number;
  followerCount: number;
  bio: ProfilePrisma['bio'];
};

export type UserInfoMin = {
  id: UserPrisma['id'];
  username: UserPrisma['username'];
  avatarUrl: ProfilePrisma['avatarUrl'];
};

export type Comment = {
  likeCount: number;
  isLiked: CommentLike['unliked'];
  username: string;
} & TweetComment;

export type UserInfoBasic = {
  id: number;
  username: string;
  bio: string;
  followerCount: number;
};

export type Me = Pick<UserPrisma, 'id' | 'username'>;
export type HomeTweets = Tweet[];
export type Bookmarks = Array<Tweet & { isRetweet: boolean }>;
