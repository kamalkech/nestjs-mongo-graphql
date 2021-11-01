import { TestingModule, Test } from '@nestjs/testing';
import { AdminModule } from '@src/admin/admin.module';
import { DatabaseModule } from '@src/database/database.module';
import {
  rootMongooseTestModule,
  closeInMongodConnection,
} from '@test/mongo-database-test.module';
import { CatResolver } from './cat.resolver';

describe('CatResolver', () => {
  let resolver: CatResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [rootMongooseTestModule(), DatabaseModule, AdminModule],
      providers: [CatResolver],
    }).compile();

    resolver = module.get<CatResolver>(CatResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });
});
