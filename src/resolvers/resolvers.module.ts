import { Module } from '@nestjs/common';

// Modules.
import { AdminModule } from '@src/admin/admin.module';
import { DatabaseModule } from '@src/database/database.module';
// Resolvers.
import { CatResolver } from './admin/cat/cat.resolver';
import { ColorResolver } from './admin/color/color.resolver';

@Module({
  imports: [DatabaseModule, AdminModule],
  providers: [CatResolver, ColorResolver],
})
export class ResolversModule {}
