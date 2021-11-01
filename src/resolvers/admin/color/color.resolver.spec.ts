import { TestingModule, Test } from '@nestjs/testing';
import { AdminModule } from '@src/admin/admin.module';
import { DatabaseModule } from '@src/database/database.module';
import {
  rootMongooseTestModule,
  closeInMongodConnection,
} from '@test/mongo-database-test.module';
import { ColorResolver } from './color.resolver';

describe('ColorResolver', () => {
  let resolver: ColorResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [rootMongooseTestModule(), DatabaseModule, AdminModule],
      providers: [ColorResolver],
    }).compile();

    resolver = module.get<ColorResolver>(ColorResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });
});
