import { Module } from '@nestjs/common';
import { CloudinaryProvider } from './config/cloudinary.provider';
import { CloudinaryService } from './services/cloudinary/cloudinary.service';

@Module({
  providers: [CloudinaryProvider, CloudinaryService],
  exports: [CloudinaryProvider, CloudinaryService],
})
export class MediaModule {}
