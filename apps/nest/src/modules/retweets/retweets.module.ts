import { RetweetsService } from './retweets.service';
import { Module } from '@nestjs/common';
import { RetweetsController } from './retweets.controller';

@Module({
  controllers: [RetweetsController],
  providers: [RetweetsService],
  exports: [RetweetsService],
})
export class RetweetsModule {}
