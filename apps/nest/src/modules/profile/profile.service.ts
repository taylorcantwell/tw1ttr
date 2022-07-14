import { PrismaService } from '@modules/prisma';
import { Injectable } from '@nestjs/common';
import { UpdateProfileDto } from './profile.dto';

@Injectable()
export class ProfileService {
  constructor(private prismaService: PrismaService) {}

  async updateProfile(userId: string, data: UpdateProfileDto): Promise<boolean> {
    await this.prismaService.profile.update({
      where: {
        userId,
      },
      data,
    });

    return true;
  }
}
