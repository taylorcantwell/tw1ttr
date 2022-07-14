import { User } from '@decorators/user.decorator';
import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import type { Me, Tweet, UserProfile } from '@twitter-clone/shared';
import { UserSession } from 'types/Request';
import { UsersService } from './users.service';

@ApiTags('User')
@Controller('user')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('/me')
  async findMe(@User() user: UserSession): Promise<Me | null> {
    return await this.userService.findMe(user?.id);
  }

  @Get('/:username')
  async getUserProfileAndTweets(
    @Param('username') username: string,
    @User() user: UserSession,
  ): Promise<{
    userProfile: UserProfile;
    tweets: Tweet[];
  }> {
    return this.userService.getProfileAndTweetsByUsername(username, user?.id);
  }
}
