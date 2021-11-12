import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CloudinaryService } from '@src/media/services';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

@Resolver()
export class CloudinaryResolver {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Mutation(() => Boolean)
  async uploadMedia(
    @Args({ name: 'file', type: () => GraphQLUpload })
    file: FileUpload,
  ): Promise<boolean> {
    const data = await this.cloudinaryService.uploadImage(file);
    return true;
  }
}
