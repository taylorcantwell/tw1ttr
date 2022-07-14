import { PrismaService } from '@modules/prisma';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { User } from '@prisma/client';
import { Tweet } from '@twitter-clone/prisma';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './user.models';
import type { Me, UserProfile } from '@twitter-clone/shared';

const SALT_OR_ROUNDS = 10;

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}
  private readonly logger = new Logger(UsersService.name);

  async findMe(userId: User['id']): Promise<Me | null> {
    if (!userId) return null;
    return this.prismaService.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        profile: {
          select: {
            avatarUrl: true,
          },
        },
      },
    });
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.prismaService.user.findUnique({ where: { username } });
  }

  async findById(id: string): Promise<User | null> {
    return this.prismaService.user.findUnique({ where: { id } });
  }

  async getTweetsByUsername(username: User['username'], userId?: User['id']): Promise<any> {
    const profileTweets = await this.prismaService.$queryRaw<Tweet & { author: User['username'] }>`
    SELECT * FROM (SELECT tweet.id, tweet.created_at as "createdAt", "user".username AS author, profile.avatar_url as "avatarUrl", tweet.content, (SELECT false) as "isRetweet",
    (SELECT COALESCE(
      (SELECT CASE
      WHEN t.unliked = true THEN false
      WHEN t.unliked = false THEN true
      END
      FROM
        (
        SELECT unliked
        FROM tweet_like
        WHERE tweet_like.user_id = ${userId}
        AND tweet_like.tweet_id = tweet.id
        ) as t
      ),
      false
      )
    ) AS "isLiked",
    (SELECT COALESCE(
      (SELECT CASE
      WHEN t.unretweeted = true THEN false
      WHEN t.unretweeted = false THEN true
      END
      FROM
        (
        SELECT unretweeted
        FROM retweet
        WHERE retweet.user_id = ${userId}
        AND retweet.tweet_id = tweet.id
        ) as t
      ),
      false
      )
    ) AS "isRetweeted",
    (SELECT COALESCE(
      (SELECT CASE
      WHEN t.unsaved = true THEN false
      WHEN t.unsaved = false THEN true
      END
      FROM
        (
        SELECT unsaved
        FROM save_tweet
        WHERE save_tweet.user_id = ${userId}
        AND save_tweet.tweet_id = tweet.id
        ) as t
      ),
      false
      )
    ) AS "isSaved",
    (SELECT COUNT(tweet_like.id) FROM tweet_like WHERE tweet_id = tweet.id AND unliked IS NOT true) AS "likeCount",
    (SELECT COUNT(tweet_comment.id) FROM tweet_comment WHERE tweet_id = tweet.id) AS "commentCount",
    (SELECT COUNT(retweet.id) FROM retweet WHERE tweet_id = tweet.id AND unretweeted IS NOT true) AS "retweetCount",
    (SELECT COUNT(save_tweet.id) FROM save_tweet WHERE tweet_id = tweet.id AND unsaved IS NOT true ) AS "saveCount"
    FROM tweet
    JOIN "user" ON tweet.user_id = "user".id
    JOIN profile ON "user".id = profile.user_id
    WHERE "user".username = ${username}
    AND tweet.deleted IS NULL

    UNION

    SELECT tweet.id, retweet.created_at as "createdAt", "user".username AS author, profile.avatar_url as "avatarUrl", tweet.content, (SELECT true) as "isRetweet",
  (SELECT COALESCE(
      (SELECT CASE
      WHEN t.unliked = true THEN false
      WHEN t.unliked = false THEN true
      END
      FROM
        (
        SELECT unliked
        FROM tweet_like
        WHERE tweet_like.user_id = ${userId}
        AND tweet_like.tweet_id = tweet.id
        ) as t
      ),
      false
      )
    ) AS "isLiked",
    (SELECT COALESCE(
      (SELECT CASE
      WHEN t.unretweeted = true THEN false
      WHEN t.unretweeted = false THEN true
      END
      FROM
        (
        SELECT unretweeted
        FROM retweet
        WHERE retweet.user_id = ${userId}
        AND retweet.tweet_id = tweet.id
        ) as t
      ),
      false
      )
    ) AS "isRetweeted",
    (SELECT COALESCE(
      (SELECT CASE
      WHEN t.unsaved = true THEN false
      WHEN t.unsaved = false THEN true
      END
      FROM
        (
        SELECT unsaved
        FROM save_tweet
        WHERE save_tweet.user_id = ${userId}
        AND save_tweet.tweet_id = tweet.id
        ) as t
      ),
      false
      )
    ) AS "isSaved",
    (SELECT COUNT(tweet_like.id) FROM tweet_like WHERE tweet_id = tweet.id AND unliked IS NOT true) AS "likeCount",
    (SELECT COUNT(tweet_comment.id) FROM tweet_comment WHERE tweet_id = tweet.id) AS "commentCount",
    (SELECT COUNT(retweet.id) FROM retweet WHERE tweet_id = tweet.id AND unretweeted IS NOT true) AS "retweetCount",
    (SELECT COUNT(save_tweet.id) FROM save_tweet WHERE tweet_id = tweet.id AND unsaved IS NOT true ) AS "saveCount"
    FROM retweet
    JOIN tweet ON tweet.id = retweet.tweet_id
    JOIN "user" AS retweeter ON retweet.user_id = "retweeter".id
    JOIN "user" ON tweet.user_id = "user".id
    JOIN profile ON profile.user_id = "user".id
    WHERE retweeter.username = ${username}
    AND tweet.deleted IS NULL
    AND retweet.deleted IS NULL
    AND retweet.unretweeted IS NOT true
    ) AS MAIN
    ORDER BY "createdAt" DESC
    LIMIT 10
    `;

    return profileTweets;
  }

  async getProfileByUsername(username: User['username'], userId?: User['id']) {
    const profile = await this.prismaService.$queryRaw<[UserProfile]>`
    SELECT "user".id, "user".username, profile.bio, profile.banner_url AS "bannerUrl", profile.avatar_url AS "avatarUrl",
    (SELECT COUNT(*)
      FROM follow JOIN "user" ON "user".id = follow.followee_id
      WHERE "user".username = ${username}
      AND unfollowed IS NOT true ) AS "followerCount",
    (SELECT COUNT(*)
      FROM follow JOIN "user" ON "user".id = follow.follower_id
      WHERE "user".username = ${username}
      AND unfollowed IS NOT true ) AS "followeeCount",
    (SELECT COALESCE(
      (SELECT CASE
      WHEN t.unfollowed = true THEN false
      WHEN t.unfollowed = false OR t.unfollowed IS NULL THEN true
      END isLiked
      FROM
        (
        SELECT unfollowed
        FROM follow
        WHERE follow.followee_id = "user".id
        AND follower_id = ${userId}) as t
        ),
      false
      )
    ) AS "isFollowing"
    FROM "user"
    FULL OUTER JOIN profile on "user".id = profile.user_id
    WHERE "user".username = ${username}
    `;

    if (!profile && !profile[0]) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return profile[0];
  }

  async getProfileAndTweetsByUsername(username: string, userId: User['id']): Promise<any> {
    const profile = this.getProfileByUsername(username, userId);
    const tweets = this.getTweetsByUsername(username, userId);

    const results = await Promise.all([profile, tweets]);

    return { profile: results[0], tweets: results[1] };
  }

  async create(createUserDto: CreateUserDto) {
    const isUsernameExisting = await this.prismaService.user.findUnique({
      where: { email: createUserDto.username },
    });

    // TODO: return a 200 OK and presenting to the client/user either additional content to recover their account or an error message which is raised by the body content of the response.
    if (isUsernameExisting) {
      this.logger.log('Someone attempted to create an account with an existing username.');
      throw new HttpException('The passed email already exists', HttpStatus.CONFLICT);
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, SALT_OR_ROUNDS);

    const user = await this.prismaService.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
        profile: {
          create: {},
        },
      },
    });

    return user;
  }
}
