import { User } from '@decorators/user.decorator';
import { LoggedInGuard } from '@guards/logged-in.guard';
import { Body, Controller, Patch, UseGuards } from '@nestjs/common';
import { UserSession } from 'types/Request';
import { UpdateProfileDto } from './profile.dto';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @UseGuards(LoggedInGuard)
  @Patch('/update')
  updateProfile(
    @Body() updateProfileDto: UpdateProfileDto,
    @User() user: UserSession,
  ): Promise<boolean> {
    return this.profileService.updateProfile(user.id, updateProfileDto);
  }
}
