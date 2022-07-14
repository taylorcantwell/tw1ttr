import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsOptional } from 'class-validator';

export class UpdateProfileDto {
  @ApiProperty({ description: 'Bio.' })
  @Length(1, 50)
  @IsString()
  @IsOptional()
  bio?: string;

  @ApiProperty({ description: 'URL for banner picture.' })
  @Length(1, 200)
  @IsString()
  @IsOptional()
  bannerUrl?: string;

  @ApiProperty({ description: 'Url for profile picture.' })
  @Length(1, 200)
  @IsString()
  @IsOptional()
  avatarUrl?: string;
}
