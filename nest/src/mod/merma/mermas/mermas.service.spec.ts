import { Test, TestingModule } from '@nestjs/testing';
import { MermasService } from './mermas.service';

describe('MermasService', () => {
  let service: MermasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MermasService],
    }).compile();

    service = module.get<MermasService>(MermasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
