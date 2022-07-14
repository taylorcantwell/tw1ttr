import { PrismaService } from '@modules/prisma/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import type { Follow } from '@twitter-clone/prisma';
import type { UserInfoBasic } from '@twitter-clone/shared';

@Injectable()
export class FollowsService {
  constructor(private prismaService: PrismaService) {}

  async getFollowers(username: string): Promise<UserInfoBasic[]> {
    return this.prismaService.$queryRaw`
    SELECT "followerUser".id, "followerUser".username, "followerProfile".bio,
    (SELECT COUNT(*)
      FROM follow WHERE follower_id = "followeeUser".id
        AND follow.unfollowed IS NOT true) as "followerCount"
    FROM follow
    JOIN "user" AS "followeeUser" on "followeeUser".id = follow.followee_id
    FULL OUTER JOIN profile AS "followeeProfile" on "followeeUser".id = "followeeProfile".user_id
    JOIN "user" AS "followerUser" on "followerUser".id = follow.follower_id
    FULL OUTER JOIN profile AS "followerProfile" on "followerUser".id = "followerProfile".user_id
    WHERE "followeeUser".username = ${username}
    `;
  }

  async getFollowees(username: string): Promise<UserInfoBasic[]> {
    return this.prismaService.$queryRaw`
    SELECT "followeeUser".id, "followeeUser".username, "followeeProfile".bio,
    (SELECT COUNT(*)
      FROM follow WHERE followee_id = "followeeUser".id
        AND follow.unfollowed IS NOT true) as "followerCount"
    FROM follow
    JOIN "user" AS "followeeUser" on "followeeUser".id = follow.followee_id
    FULL OUTER JOIN profile AS "followeeProfile" on "followeeUser".id = "followeeProfile".user_id
    JOIN "user" AS "followerUser" on "followerUser".id = follow.follower_id
    FULL OUTER JOIN profile AS "followerProfile" on "followerUser".id = "followerProfile".user_id
    WHERE "followerUser".username = ${username}
    `;
  }

  async createFollow(
    followeeId: Follow['followeeId'],
    followerId: Follow['followerId'],
  ): Promise<boolean> {
    const doesFollowExist = await this.prismaService.follow.findUnique({
      where: { followeeId_followerId: { followeeId, followerId } },
    });

    if (doesFollowExist) {
      await this.prismaService.follow.update({
        where: { id: doesFollowExist.id },
        data: { unfollowed: doesFollowExist.unfollowed ? false : true },
      });

      return true;
    }

    try {
      await this.prismaService.follow.create({
        data: {
          followeeId,
          followerId,
        },
      });

      return true;
    } catch (error) {
      throw new BadRequestException('Violating unique constraint');
    }
  }
}
