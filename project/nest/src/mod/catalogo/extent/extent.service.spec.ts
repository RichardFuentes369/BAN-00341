import { Test, TestingModule } from '@nestjs/testing';
import { ExtentService } from './extent.service';

describe('ExtentService', () => {
  let service: ExtentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExtentService],
    }).compile();

    service = module.get<ExtentService>(ExtentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
