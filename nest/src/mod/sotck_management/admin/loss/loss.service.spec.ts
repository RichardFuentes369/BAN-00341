import { Test, TestingModule } from '@nestjs/testing';
import { LossService } from './loss.service';

describe('LossService', () => {
  let service: LossService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LossService],
    }).compile();

    service = module.get<LossService>(LossService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
