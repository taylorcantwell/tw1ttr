import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from '@prisma/client';
import { AuthService } from './auth.service';

@Injectable()
export class AuthSerializer extends PassportSerializer {
  constructor(private readonly authService: AuthService) {
    super();
  }
  //TODO: add error instead of null
  serializeUser(user: User, done: (err: Error | null, user: { id: string }) => void) {
    done(null, { id: user.id });
  }

  async deserializeUser(
    payload: { id: string; role: string },
    done: (err: Error | null, user: Omit<User, 'password'>) => void,
  ) {
    const user = await this.authService.findById(payload.id);
    done(null, user);
  }
}
