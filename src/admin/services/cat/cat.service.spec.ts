import { getModelToken } from "@nestjs/mongoose";
import { TestingModule, Test } from "@nestjs/testing";
import { Cat } from "@src/admin/models/cat.model";
import { CatService } from "..";

describe('CatService', () => {
  let service: CatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CatService,
        {
          provide: getModelToken('Cat'),
          useValue: Cat,
        },
      ],
    }).compile();

    service = module.get<CatService>(CatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
