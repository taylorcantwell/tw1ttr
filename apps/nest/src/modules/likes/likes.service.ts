import { PrismaService } from '@modules/prisma';
import { Injectable } from '@nestjs/common';
import { Tweet, User } from '@twitter-clone/prisma';
import { UserInfoBasic } from '@twitter-clone/shared';

@Injectable()
export class LikesService {
  constructor(private prismaService: PrismaService) {}

  async likeTweet(tweetId: Tweet['id'], userId: User['id']): Promise<boolean> {
    const doesTweetLikeExist = await this.prismaService.tweetLike.findUnique({
      where: { tweetId_userId: { tweetId, userId } },
    });

    if (doesTweetLikeExist) {
      await this.prismaService.tweetLike.update({
        where: { id: doesTweetLikeExist.id },
        data: { unliked: doesTweetLikeExist.unliked ? false : true },
      });

      return true;
    }

    await this.prismaService.tweetLike.create({
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

  async getLikersForTweet(tweetId: string): Promise<UserInfoBasic[]> {
    return this.prismaService.$queryRaw`
    SELECT "user".username, profile.bio,
    (SELECT COUNT(*)
      FROM follow WHERE followee_id = "user".id
      AND follow.unfollowed IS NOT true)
    as "followerCount"
    FROM tweet_like
    JOIN "user" on tweet_like.user_id = "user".id
    FULL OUTER JOIN profile on "user".id = profile.user_id
    WHERE tweet_like.tweet_id = ${tweetId}
    `;
  }
}
