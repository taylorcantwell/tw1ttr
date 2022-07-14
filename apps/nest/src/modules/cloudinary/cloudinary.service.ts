import { Injectable, Inject } from '@nestjs/common';
import { CLOUDINARY } from './cloudinary.provider';
import { UploadImageDto } from './uploadImage.dto';
import type { Cloudinary } from './cloudinary.provider';

@Injectable()
export class CloudinaryService {
  constructor(@Inject(CLOUDINARY) private cloudinary: Cloudinary) {}

  async uploadImage({ data }: UploadImageDto) {
    const imageUploads = await this.cloudinary.uploader.upload(data);

    return { url: imageUploads.secure_url };
  }
}
