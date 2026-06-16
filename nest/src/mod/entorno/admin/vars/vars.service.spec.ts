import { Test, TestingModule } from '@nestjs/testing';
import { VarsService } from './vars.service';

describe('VarsService', () => {
  let service: VarsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VarsService],
    }).compile();

    service = module.get<VarsService>(VarsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
