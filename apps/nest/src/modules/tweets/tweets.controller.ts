import { User } from '@decorators/user.decorator';
import { LoggedInGuard } from '@guards/logged-in.guard';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import type { HomeTweets, Tweet, Comment } from '@twitter-clone/shared';
import { UserSession } from 'types/Request';
import { CreateTweetDto } from './tweets.models';
import { TweetsService } from './tweets.service';

@ApiTags('Tweets')
@Controller('tweet')
export class TweetsController {
  constructor(private tweetsService: TweetsService) {}

  @Get('/home')
  async getHomeTweets(@User() user: UserSession): Promise<HomeTweets> {
    return this.tweetsService.getHomeTweets(user?.id);
  }

  @Get('/explore')
  async getExplore(@User() user: UserSession): Promise<Tweet[]> {
    return this.tweetsService.getHomeTweets(user?.id);
  }

  @Get('/:tweetId')
  async getTweet(
    @Param('tweetId') tweetId: string,
    @User() user: UserSession,
  ): Promise<{
    tweet: Tweet;
    comments: Comment;
  }> {
    return this.tweetsService.getTweetById(tweetId, user?.id);
  }

  @UseGuards(LoggedInGuard)
  @Post()
  async createTweet(
    @Body() createTweetDto: CreateTweetDto,
    @User() user: UserSession,
  ): Promise<boolean> {
    return this.tweetsService.createTweet(createTweetDto, user.id);
  }
}
