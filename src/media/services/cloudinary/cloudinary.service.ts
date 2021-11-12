import { BadRequestException, Injectable } from '@nestjs/common';
import { UploadApiResponse, UploadApiErrorResponse, v2 } from 'cloudinary';
import { ReadStream } from 'fs';
import { FileUpload } from 'graphql-upload';
import { Readable } from 'stream';

@Injectable()
export class CloudinaryService {
  private async streamToBuffer(stream: Readable): Promise<Buffer> {
    const buffer = [];

    return new Promise((resolve, reject) =>
      stream
        .on('error', (error) => reject(error))
        .on('data', (data) => {
          buffer.push(data);
        })
        .on('end', () => resolve(Buffer.concat(buffer))),
    );
  }

  async uploadImage(
    file: FileUpload,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    const { createReadStream } = await file;
    const stream: ReadStream = createReadStream();

    return new Promise(async (resolve, reject) => {
      const buffer = await this.streamToBuffer(stream);
      const size = Buffer.byteLength(buffer);
      const maxSize = 500000;

      if (size > maxSize) {
        const error = new BadRequestException(
          `File exceded the limit max size ${maxSize}`,
        );
        reject(error);
      } else {
        const upload = v2.uploader.upload_stream(
          { folder: 'insomnia' },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          },
        );
        Readable.from(buffer).pipe(upload);
      }
    });
  }
}
