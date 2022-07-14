import { ApiProperty } from '@nestjs/swagger';
import { Length, IsString, IsIn, IsOptional } from 'class-validator';

export class CreateTweetDto {
  @ApiProperty({ description: 'Content of a tweet.' })
  @Length(1, 280)
  @IsString()
  content: string;

  @ApiProperty({ description: 'Restricts who can reply to the tweet.' })
  @IsIn(['EVERYONE', 'FOLLOWERS'])
  @IsString()
  replyPermissions: 'EVERYONE' | 'FOLLOWERS';

  @ApiProperty({ description: 'URLs of the tweets images.' })
  @IsString({ each: true })
  @IsOptional()
  imageUrls?: string[];
}
