import { Module } from '@nestjs/common';

// Modules.
import { DatabaseModule } from '@src/database/database.module';
// Services.
import { CatService, ColorService } from './services';

@Module({
  imports: [DatabaseModule],
  providers: [CatService, ColorService],
  exports: [CatService, ColorService],
})
export class AdminModule {}
