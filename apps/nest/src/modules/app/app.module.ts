import { AuthModule } from '@modules/auth';
import { CloudinaryModule } from '@modules/cloudinary';
import { CommentsModule } from '@modules/comments';
import { configuration, configValidation, ENV_FILE_PATH } from '@modules/config';
import { FollowsModule } from '@modules/follows';
import { LikesModule } from '@modules/likes';
import { ProfileModule } from '@modules/profile';
import { REDIS, RedisModule } from '@modules/redis';
import { RetweetsModule } from '@modules/retweets';
import { SavesModule } from '@modules/saves';
import { TweetsModule } from '@modules/tweets';
import { Inject, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import RedisStore from 'connect-redis';
import session from 'express-session';
import passport from 'passport';
import { RedisClient } from 'redis';

@Module({
  imports: [
    ProfileModule,
    LikesModule,
    SavesModule,
    RetweetsModule,
    FollowsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [configuration],
      validationSchema: configValidation,
    }),
    CommentsModule,
    TweetsModule,
    AuthModule,
    RedisModule,
    TweetsModule,
    CloudinaryModule,
    FollowsModule,
  ],
})
export class AppModule implements NestModule {
  constructor(
    @Inject(REDIS) private readonly redis: RedisClient,
    private configService: ConfigService,
  ) {}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        session({
          store: new (RedisStore(session))({ client: this.redis, logErrors: true }),
          saveUninitialized: false,
          secret: this.configService.get('sessionStore.secret') as string,
          resave: false,
          cookie: {
            sameSite: 'strict',
            httpOnly: false,
            // secure: true,
            maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
          },
        }),
        passport.initialize(),
        passport.session(),
      )
      .forRoutes('*');
  }
}
