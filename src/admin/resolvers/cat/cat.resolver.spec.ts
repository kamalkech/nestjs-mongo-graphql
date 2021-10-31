import { getModelToken } from "@nestjs/mongoose";
import { TestingModule, Test } from "@nestjs/testing";
import { AdminModule } from "@src/admin/admin.module";
import { Cat } from "@src/admin/models/cat.model";
import { rootMongooseTestModule, closeInMongodConnection } from "@test/mongo-database-test.module";
import { CatResolver } from "..";

describe('CatResolver', () => {
  let resolver: CatResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        AdminModule
      ],
      providers: [
        CatResolver,
        {
          provide: getModelToken('Cat'),
          useValue: Cat,
        },
      ],
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
