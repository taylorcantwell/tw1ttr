import { Injectable } from '@nestjs/common';
import { Tweet, User } from '@twitter-clone/prisma';
import { PrismaService } from '@modules/prisma/prisma.service';
import type { Comment } from '@twitter-clone/shared';

@Injectable()
export class CommentsService {
  constructor(private prismaService: PrismaService) {}

  async createComment(tweetId: string, userId: User['id'], comment: string): Promise<boolean> {
    await this.prismaService.tweetComment.create({
      data: {
        comment,
        author: {
          connect: { id: userId },
        },
        tweet: {
          connect: { id: tweetId },
        },
      },
    });

    return true;
  }

  async likeComment(tweetCommentId: Tweet['id'], userId: User['id']): Promise<boolean> {
    const doesLikeCommentExist = await this.prismaService.commentLike.findUnique({
      where: { userId_tweetCommentId: { userId, tweetCommentId } },
    });

    if (doesLikeCommentExist) {
      await this.prismaService.commentLike.update({
        where: { id: doesLikeCommentExist.id },
        data: { unliked: doesLikeCommentExist.unliked ? false : true },
      });

      return true;
    }

    await this.prismaService.commentLike.create({
      data: {
        tweetCommentId,
        userId,
      },
    });

    return true;
  }

  async getCommentsByTweetId(tweetId: Tweet['id'], userId?: User['id']): Promise<Comment> {
    const tweetCommentsQuery = this.prismaService.$queryRaw<Comment>`
    SELECT tweet_comment.*, profile.avatar_url as "avatarUrl",
    (SELECT COUNT(comment_like.id) FROM comment_like WHERE comment_like.tweet_comment_id = tweet_comment.id AND unliked IS NOT true ) AS "likeCount",
    (SELECT COALESCE(
      (SELECT CASE
      WHEN t.unliked = true THEN false
      WHEN t.unliked = false THEN true
      END
      FROM
        (
        SELECT unliked
        FROM comment_like
        WHERE comment_like.user_id = ${userId}
        AND comment_like.tweet_comment_id = tweet_comment.id
        ) as t
      ),
      false
      )
    ) AS "isLiked",
    (SELECT username FROM "user" WHERE tweet_comment.user_id = "user".id) AS username
    FROM tweet_comment
    JOIN tweet ON tweet_comment.tweet_id = tweet.id
    JOIN profile ON tweet_comment.user_id = profile.user_id
    FULL OUTER JOIN comment_like ON comment_like.tweet_comment_id = tweet_comment.id
    WHERE tweet_comment.tweet_id = ${tweetId}
    AND tweet.deleted IS NULL
    GROUP BY tweet_comment.id, profile.avatar_url
`;

    return tweetCommentsQuery;
  }
}
