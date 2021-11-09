import { Module } from '@nestjs/common';

// Modules.
import { AdminModule } from '@src/admin/admin.module';
import { DatabaseModule } from '@src/database/database.module';
import { MediaModule } from '@src/media/media.module';
// Resolvers.
import { CatResolver } from './admin/cat/cat.resolver';
import { ColorResolver } from './admin/color/color.resolver';
import { CloudinaryResolver } from './cloudinary/cloudinary.resolver';

@Module({
  imports: [DatabaseModule, AdminModule, MediaModule],
  providers: [CatResolver, ColorResolver, CloudinaryResolver],
})
export class ResolversModule {}
