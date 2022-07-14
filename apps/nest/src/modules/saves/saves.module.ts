import { SavesService } from './saves.service';
import { Module } from '@nestjs/common';
import { SavesController } from './saves.controller';

@Module({
  controllers: [SavesController],
  providers: [SavesService],
  exports: [SavesService],
})
export class SavesModule {}
