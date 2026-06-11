import { Test, TestingModule } from '@nestjs/testing';
import { SotckService } from './sotck.service';

describe('SotckService', () => {
  let service: SotckService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SotckService],
    }).compile();

    service = module.get<SotckService>(SotckService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
