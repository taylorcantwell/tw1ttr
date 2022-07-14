import { Module } from '@nestjs/common';
import * as Redis from 'redis';
import { REDIS } from './redis.constants';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [
    {
      provide: REDIS,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const redisConnString = `redis://default:${configService.get(
          'sessionStore.secret',
        )}@${configService.get('sessionStore.host')}:${configService.get('sessionStore.port')}`;

        const redisClient = Redis.createClient({
          url: redisConnString,
        });
        return redisClient;
      },
    },
  ],
  exports: [REDIS],
})
export class RedisModule {}
