import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Cat, CatSchema } from '@src/admin/models/cat.model';
import { Color, ColorSchema } from '@src/admin/models/color.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Cat.name, schema: CatSchema },
      { name: Color.name, schema: ColorSchema },
    ]),
  ],
  exports: [
    MongooseModule.forFeature([
      { name: Cat.name, schema: CatSchema },
      { name: Color.name, schema: ColorSchema },
    ]),
  ],
})
export class DatabaseModule {}
