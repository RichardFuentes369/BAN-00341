import { Test, TestingModule } from '@nestjs/testing';
import { MermaService } from './merma.service';

describe('MermaService', () => {
  let service: MermaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MermaService],
    }).compile();

    service = module.get<MermaService>(MermaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
