import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'cool_username' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ example: 'cheekyPassword123' })
  @IsNotEmpty()
  @IsString()
  password!: string;
}
