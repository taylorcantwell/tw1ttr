import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ description: 'Content of a tweet.' })
  @Length(1, 280)
  @IsString()
  comment: string;
}
