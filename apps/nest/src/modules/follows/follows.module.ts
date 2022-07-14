import { Module } from '@nestjs/common';
import { FollowsController } from './follows.controller';
import { FollowsService } from './follows.service';

@Module({
  controllers: [FollowsController],
  providers: [FollowsService],
  exports: [FollowsService],
})
class FollowsModule {}

export { FollowsModule, FollowsService };
