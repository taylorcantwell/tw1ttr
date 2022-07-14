import { IsString } from 'class-validator';

export class UploadImageDto {
  @IsString()
  data: string;
}
