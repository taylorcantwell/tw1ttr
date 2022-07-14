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

export class LoginUserDto {
  @ApiProperty({ example: 'crazyskull123' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ example: 'cheekyPassword123' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
