import { User } from '@decorators/user.decorator';
import { LoggedInGuard } from '@guards/logged-in.guard';
import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserInfoBasic } from '@twitter-clone/shared';
import type { UserSession } from 'types/Request';
import { RetweetsService } from './retweets.service';

@ApiTags('Retweet')
@Controller('retweet')
export class RetweetsController {
  constructor(private retweetsService: RetweetsService) {}

  @UseGuards(LoggedInGuard)
  @Post('/:tweetId')
  async createRetweet(
    @Param('tweetId') tweetId: string,
    @User() user: UserSession,
  ): Promise<boolean> {
    return this.retweetsService.createRetweet(tweetId, user.id);
  }

  @Get('/:tweetId/retweeters')
  async getRetweetersForTweet(@Param('tweetId') tweetId: string): Promise<UserInfoBasic> {
    return this.retweetsService.getRetweetersForTweet(tweetId);
  }
}
