import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // check the email and the password
    const result = (await super.canActivate(context)) as boolean;

    // initialize the session
    await super.logIn(context.switchToHttp().getRequest());

    // no exceptions return true to allow access to the route
    return result;
  }
}
