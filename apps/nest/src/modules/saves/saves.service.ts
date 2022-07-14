import { PrismaService } from '@modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import type { Tweet, User } from '@twitter-clone/prisma';
import type { UserInfoBasic, Bookmarks } from '@twitter-clone/shared';

@Injectable()
export class SavesService {
  constructor(private prismaService: PrismaService) {}

  async getSaversForTweet(tweetId: number): Promise<UserInfoBasic[]> {
    return this.prismaService.$queryRaw`
    SELECT "user".id, "user".username, profile.bio,
    (SELECT COUNT(*)
      FROM follow WHERE followee_id = "user".id
      AND follow.unfollowed IS NOT true)
    as "followerCount"
    FROM save_tweet
    JOIN "user" on save_tweet.user_id = "user".id
    FULL OUTER JOIN profile on "user".id = profile.user_id
    WHERE save_tweet.tweet_id = ${tweetId}
    `;
  }

  async saveTweet(tweetId: Tweet['id'], userId: User['id']): Promise<boolean> {
    const doesTweetSaveExist = await this.prismaService.saveTweet.findUnique({
      where: { tweetId_userId: { tweetId, userId } },
    });

    if (doesTweetSaveExist) {
      await this.prismaService.saveTweet.update({
        where: { tweetId_userId: { tweetId, userId } },
        data: { unsaved: doesTweetSaveExist.unsaved ? false : true },
      });

      return true;
    }

    await this.prismaService.saveTweet.create({
      data: {
        user: {
          connect: { id: userId },
        },
        tweet: {
          connect: { id: tweetId },
        },
      },
    });

    return true;
  }

  async getSaves(userId: User['id']): Promise<Bookmarks> {
    return await this.prismaService.$queryRaw`
    SELECT tweet.id, tweet.created_at as "createdAt", "user".username AS author, profile.avatar_url AS "avatarUrl", tweet.content,
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
    JOIN save_tweet ON tweet.id = save_tweet.tweet_id
    JOIN profile ON "user".id = profile.user_id
    WHERE save_tweet.user_id = ${userId}
    AND save_tweet.unsaved IS NOT true
    ORDER BY "createdAt" DESC
    LIMIT 10
    `;
  }
}
