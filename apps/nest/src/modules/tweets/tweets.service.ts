import { CommentsService } from '@modules/comments';
import { PrismaService } from '@modules/prisma';
import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@twitter-clone/prisma';
import { CreateTweetDto } from './tweets.models';
import type { HomeTweets, Tweet, TweetImage, Comment } from '@twitter-clone/shared';

@Injectable()
export class TweetsService {
  constructor(private prismaService: PrismaService, private commentsService: CommentsService) {}

  async createTweet(createTweetDto: CreateTweetDto, id: User['id']): Promise<boolean> {
    const { imageUrls, ...rest } = createTweetDto;

    await this.prismaService.tweet.create({
      data: {
        ...rest,
        author: {
          connect: {
            id,
          },
        },
        ...(imageUrls && {
          tweetMedia: {
            createMany: {
              data: imageUrls.map((url) => ({ url })),
            },
          },
        }),
      },
    });

    return true;
  }

  async getHomeTweets(userId: User['id']): Promise<HomeTweets> {
    const tweetContent = this.prismaService.$queryRaw<Omit<Tweet[], 'images'>>`
    SELECT tweet.id, tweet.created_at as "createdAt", "user".username AS author, avatar_url AS "avatarUrl", tweet.content,
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
    JOIN "user" ON "user".id = tweet.user_id
    JOIN profile ON profile.user_id = "user".id
    ORDER BY "createdAt" DESC
    LIMIT 10
    `;

    const tweetImages = this.prismaService.$queryRaw<TweetImage[]>`
    SELECT tweet_media.url, tweet.id as "tweetId"
    FROM tweet_media
    JOIN tweet ON tweet.id = tweet_media.tweet_id
    JOIN "user" ON "user".id = tweet.user_id
    WHERE "user".id  = ${userId}`;

    const [tweetContentResult, tweetImagesResult] = await Promise.all([tweetContent, tweetImages]);

    const tweets = tweetContentResult.map((tweet) => {
      const images = tweetImagesResult.filter((image) => {
        return image.tweetId === tweet.id;
      });

      return {
        ...tweet,
        images,
      };
    });

    return tweets;
  }

  async getTweetById(id: string, userId?: string): Promise<{ tweet: Tweet; comments: Comment }> {
    const tweetQuery = this.prismaService.$queryRaw<[Tweet]>`
    SELECT tweet.id, tweet.created_at, "user".username AS author, profile.avatar_url AS "avatarUrl", tweet.content,
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
    JOIN profile ON profile.user_id = "user".id
    WHERE tweet.id = ${id}
    AND tweet.deleted IS NULL`;

    const commentsQuery = this.commentsService.getCommentsByTweetId(id, userId);

    const [tweet, comments] = await Promise.all([tweetQuery, commentsQuery]);

    if (!tweet && !tweet[0]) {
      throw new NotFoundException('Tweet not found');
    }

    return { tweet: tweet[0], comments };
  }
}
