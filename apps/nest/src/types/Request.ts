import { User } from '@twitter-clone/prisma';
import { Request as ExpressRequest } from 'express';

export type UserSession = Omit<User, 'password'>;
export type RequestWithOptionalUser = ExpressRequest & { user?: UserSession };
export type RequestWithUser = ExpressRequest & { user: UserSession };
