import { User, Profile } from '@twitter-clone/prisma';
import { Tweet } from '@twitter-clone/shared';

export type UserProfile = {
  id: User['id'];
  username: User['username'];
  bio: Profile['bio'];
};

export type ProfileTweets = Tweet[];
