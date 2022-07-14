import { Body, Controller, Post } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { UploadImageDto } from './uploadImage.dto';

@Controller('cloudinary')
export class CloudinaryController {
  constructor(private cloudinaryService: CloudinaryService) {}

  @Post('/upload')
  async uploadImage(@Body() body: UploadImageDto) {
    return this.cloudinaryService.uploadImage(body);
  }
}
