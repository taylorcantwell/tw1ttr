import { LikesService } from './likes.service';
import { Module } from '@nestjs/common';
import { LikesController } from './likes.controller';

@Module({
  controllers: [LikesController],
  providers: [LikesService],
  exports: [LikesService],
})
export class LikesModule {}
