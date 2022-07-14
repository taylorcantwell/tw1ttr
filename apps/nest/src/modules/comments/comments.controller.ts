import { User } from '@decorators/user.decorator';
import { LoggedInGuard } from '@guards/logged-in.guard';
import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import type { UserSession } from 'types/Request';
import { CreateCommentDto } from './comments.models';
import { CommentsService } from './comments.service';

@ApiTags('Comment')
@Controller('comment')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @UseGuards(LoggedInGuard)
  @Post('/:tweetId')
  async createComment(
    @Param('tweetId') tweetId: string,
    @User() user: UserSession,
    @Body() body: CreateCommentDto,
  ): Promise<boolean> {
    return this.commentsService.createComment(tweetId, user.id, body.comment);
  }

  @UseGuards(LoggedInGuard)
  @Post('/:commentId/like')
  async likeComment(
    @Param('commentId') commentId: string,
    @User() user: UserSession,
  ): Promise<boolean> {
    return this.commentsService.likeComment(commentId, user.id);
  }
}
