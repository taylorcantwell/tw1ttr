import { Module } from '@nestjs/common';
import { PrismaModule } from '@modules/prisma';
import { PrismaService } from '@modules/prisma';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { FollowsService } from '@modules/follows';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [UsersService, PrismaService, FollowsService],
  exports: [UsersService],
})
export class UsersModule {}
