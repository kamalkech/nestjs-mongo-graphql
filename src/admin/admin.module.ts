import { Module } from '@nestjs/common';

// Modules.
import { DatabaseModule } from '@src/database/database.module';
// Services.
import { CatService, ColorService } from './services';
// Resolvers.
import { CatResolver, ColorResolver } from './resolvers';

@Module({
  imports: [
    DatabaseModule
  ],
  providers: [
    CatService,
    ColorService,
    CatResolver,
    ColorResolver,
  ],
  exports: [
    CatService,
    ColorService,
    CatResolver,
    ColorResolver,
  ]
})
export class AdminModule {}
