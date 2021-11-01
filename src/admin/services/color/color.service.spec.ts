import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from '@src/database/database.module';
import {
  rootMongooseTestModule,
  closeInMongodConnection,
} from '@test/mongo-database-test.module';
import { ColorService } from './color.service';

describe('ColorService', () => {
  let service: ColorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [rootMongooseTestModule(), DatabaseModule],
      providers: [ColorService],
    }).compile();

    service = module.get<ColorService>(ColorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });
});
