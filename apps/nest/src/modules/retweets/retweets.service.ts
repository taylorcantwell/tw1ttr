import { PrismaService } from '@modules/prisma';
import { Injectable } from '@nestjs/common';
import type { Tweet, User } from '@twitter-clone/prisma';
import { UserInfoBasic } from '@twitter-clone/shared';

@Injectable()
export class RetweetsService {
  constructor(private prismaService: PrismaService) {}

  getRetweetersForTweet(tweetId: string): Promise<UserInfoBasic> {
    return this.prismaService.$queryRaw`
    SELECT "user".username, profile.bio,
    (SELECT COUNT(*)
      FROM follow WHERE followee_id = "user".id
      AND follow.unfollowed IS NOT true)
    as "followerCount"
    FROM retweet
    JOIN "user" on retweet.user_id = "user".id
    FULL OUTER JOIN profile on "user".id = profile.user_id
    WHERE retweet.tweet_id = ${tweetId}
      `;
  }

  async createRetweet(tweetId: Tweet['id'], userId: User['id']): Promise<boolean> {
    const doesRetweetExist = await this.prismaService.retweet.findUnique({
      where: { tweetId_userId: { tweetId, userId } },
    });

    if (doesRetweetExist) {
      await this.prismaService.retweet.update({
        where: { tweetId_userId: { tweetId, userId } },
        data: { unretweeted: doesRetweetExist.unretweeted ? false : true },
      });

      return true;
    }

    await this.prismaService.retweet.create({
      data: {
        user: {
          connect: { id: userId },
        },
        tweet: {
          connect: { id: tweetId },
        },
      },
      include: { user: true, tweet: true },
    });

    return true;
  }
}
