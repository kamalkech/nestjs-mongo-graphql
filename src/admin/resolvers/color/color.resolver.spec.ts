import { getModelToken } from "@nestjs/mongoose";
import { TestingModule, Test } from "@nestjs/testing";
import { AdminModule } from "@src/admin/admin.module";
import { Color } from "@src/admin/models/color.model";
import { rootMongooseTestModule, closeInMongodConnection } from "@test/mongo-database-test.module";
import { ColorResolver } from "..";

describe('ColorResolver', () => {
  let resolver: ColorResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        AdminModule
      ],
      providers: [
        ColorResolver,
        {
          provide: getModelToken('Color'),
          useValue: Color,
        },
      ],
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
