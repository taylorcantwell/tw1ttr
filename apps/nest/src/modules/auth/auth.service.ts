/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { type User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UsersService } from '@modules/users';
import { CreateUserDto, LoginUserDto } from './auth.models';
import type { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}
  private readonly logger = new Logger(AuthService.name);

  async validateUser(loginUserDto: LoginUserDto): Promise<Omit<User, 'password'>> {
    const { username, password } = loginUserDto;
    const user = await this.usersService.findByUsername(username);

    if (!user) {
      this.logger.log(`Someone attempted to log in with username ${username}`);
      throw new UnauthorizedException('Invalid credentials');
    }

    const userHash = user.password;
    const isMatch = await bcrypt.compare(password, userHash);

    if (!isMatch) {
      throw new UnauthorizedException('Incorrect username or password');
    } else {
      this.logger.log(`User ${username} successfully logged in`);
      const { password, ...result } = user;
      return result;
    }
  }

  async registerUser(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const existingUser = await this.usersService.findByUsername(createUserDto.username);

    if (existingUser) {
      this.logger.log(
        `Someone attempted to register with taken username ${createUserDto.username}`,
      );
      throw new BadRequestException('User remail must be unique');
    }

    this.logger.log(`User ${createUserDto.username} successfully registered`);

    return await this.usersService.create(createUserDto);
  }

  async findById(id: string): Promise<Omit<User, 'password'>> {
    const user = await this.usersService.findById(id);

    if (!user) {
      throw new BadRequestException(`No user found with id ${id}`);
    }

    const { password, ...result } = user;

    return result;
  }

  async logOutUser(req: Request): Promise<void> {
    console.log('🚀 ~ file: auth.service.ts ~ line 64 ~ AuthService ~ logOutUser ~ req', req);
    req.session.cookie.maxAge = 0;
    req.logOut((err) => {
      this.logger.error(err);
    });
    return;
  }
}
