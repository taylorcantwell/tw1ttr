import { User } from '@decorators/user.decorator';
import { LoggedInGuard } from '@guards/logged-in.guard';
import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserInfoBasic } from '@twitter-clone/shared';
import type { UserSession } from 'types/Request';
import { LikesService } from './likes.service';

@ApiTags('Like')
@Controller('like')
export class LikesController {
  constructor(private likesService: LikesService) {}

  @UseGuards(LoggedInGuard)
  @Post('/:tweetId')
  async likeTweet(@Param('tweetId') tweetId: string, @User() user: UserSession): Promise<boolean> {
    return this.likesService.likeTweet(tweetId, user.id);
  }

  @Get('/:tweetId/likers')
  async getLikersForTweet(@Param('tweetId') tweetId: string): Promise<UserInfoBasic[]> {
    return this.likesService.getLikersForTweet(tweetId);
  }
}
