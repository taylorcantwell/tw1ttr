import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '@modules/users';
import { UsersService } from '@modules/users';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { AuthSerializer } from './serialization.provider';

@Module({
  imports: [
    PassportModule.register({
      session: true,
    }),
    UsersModule,
  ],
  providers: [AuthService, LocalStrategy, AuthSerializer, UsersService],
  controllers: [AuthController],
})
export class AuthModule {}
