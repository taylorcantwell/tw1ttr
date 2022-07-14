import { User } from '@decorators/user.decorator';
import { LoggedInGuard } from '@guards/logged-in.guard';
import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import type { Bookmarks, UserInfoBasic } from '@twitter-clone/shared';
import type { UserSession } from 'types/Request';
import { SavesService } from './saves.service';

@ApiTags('Save')
@Controller('save')
export class SavesController {
  constructor(private savesService: SavesService) {}

  @Get('/')
  getSaves(@User() user: UserSession): Promise<Bookmarks> {
    return this.savesService.getSaves(user.id);
  }

  @Get('/:tweetId/savers')
  getSavers(@Param('tweetId') tweetId: number): Promise<UserInfoBasic[]> {
    return this.savesService.getSaversForTweet(tweetId);
  }

  @UseGuards(LoggedInGuard)
  @Post('/:tweetId')
  async saveTweet(@Param('tweetId') tweetId: string, @User() user: UserSession): Promise<boolean> {
    return this.savesService.saveTweet(tweetId, user.id);
  }
}
