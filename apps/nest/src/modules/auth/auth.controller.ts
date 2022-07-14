import { User } from '@decorators/user.decorator';
import { LocalGuard } from '@guards/local.guard';
import { LoggedInGuard } from '@guards/logged-in.guard';
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import type { UserSession } from '../../types/Request';
import { CreateUserDto } from './auth.models';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  registerUser(@Body() user: CreateUserDto) {
    return this.authService.registerUser(user);
  }

  @UseGuards(LocalGuard)
  @Post('login')
  loginUser(@User() user: UserSession) {
    return user;
  }

  @UseGuards(LoggedInGuard)
  @Post('logout')
  async logOutUser(@Req() req: Request): Promise<void> {
    console.log('🚀 ~ file: auth.controller.ts ~ line 28 ~ AuthController ~ logOutUser ~ req', req);
    return this.authService.logOutUser(req);
  }
}
