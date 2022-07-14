import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
export type Cloudinary = typeof cloudinary;

export const CLOUDINARY = 'lib:cloudinary';

export const cloudinaryProvider: Provider = {
  provide: CLOUDINARY,
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    cloudinary.config({
      cloud_name: configService.get<string>('cloudinary.cloudName'),
      api_key: configService.get<string>('cloudinary.apiKey'),
      api_secret: configService.get<string>('cloudinary.apiSecret'),
    });

    return cloudinary;
  },
};
