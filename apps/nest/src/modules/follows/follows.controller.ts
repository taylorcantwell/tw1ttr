import { User } from '@decorators/user.decorator';
import { LoggedInGuard } from '@guards/logged-in.guard';
import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import type { UserInfoBasic } from '@twitter-clone/shared';
import type { UserSession } from 'types/Request';
import { FollowsService } from './follows.service';

@ApiTags('Follow')
@Controller('follow')
export class FollowsController {
  constructor(private followService: FollowsService) {}

  @Get('/followers/:username')
  async getFollowers(@Param('username') username: string): Promise<UserInfoBasic[]> {
    return this.followService.getFollowers(username);
  }

  @Get('/followees/:username')
  async getFollowees(@Param('username') username: string): Promise<UserInfoBasic[]> {
    return this.followService.getFollowees(username);
  }

  @UseGuards(LoggedInGuard)
  @Post('/:followeeId')
  async createFollow(
    @Param('followeeId') followeeId: string,
    @User() follower: UserSession,
  ): Promise<boolean> {
    return this.followService.createFollow(followeeId, follower.id);
  }
}
