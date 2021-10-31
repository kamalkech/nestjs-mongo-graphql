import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Color } from '@src/admin/models/color.model';
import { ColorService } from './color.service';

describe('ColorService', () => {
  let service: ColorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ColorService,
        {
          provide: getModelToken('Color'),
          useValue: Color,
        },
      ],
    }).compile();

    service = module.get<ColorService>(ColorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
