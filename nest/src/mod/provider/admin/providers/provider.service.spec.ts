import { Test, TestingModule } from '@nestjs/testing';
import { ProviderService } from './provider.service';

describe('ProviderService', () => {
  let providerService: ProviderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProviderService],
    }).compile();

    providerService = module.get<ProviderService>(ProviderService);
  });

  it('should be defined', () => {
    expect(providerService).toBeDefined();
  });
});
