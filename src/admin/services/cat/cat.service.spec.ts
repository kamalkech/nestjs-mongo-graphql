import { TestingModule, Test } from "@nestjs/testing";
import { DatabaseModule } from "@src/database/database.module";
import { closeInMongodConnection, rootMongooseTestModule } from "@test/mongo-database-test.module";
import { CatService } from "..";

describe('CatService', () => {
  let service: CatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        DatabaseModule
      ],
      providers: [
        CatService,
      ],
    }).compile();

    service = module.get<CatService>(CatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });
});
