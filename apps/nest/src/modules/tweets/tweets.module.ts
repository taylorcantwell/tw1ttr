import { Module } from '@nestjs/common';
import { CommentsModule } from '@modules/comments';
import { CommentsService } from '@modules/comments';
import { UsersModule } from '@modules/users';
import { UsersService } from '@modules/users';
import { TweetsController } from './tweets.controller';
import { TweetsService } from './tweets.service';

@Module({
  imports: [UsersModule, CommentsModule],
  controllers: [TweetsController],
  providers: [TweetsService, UsersService, CommentsService],
  exports: [TweetsService],
})
export class TweetsModule {}
