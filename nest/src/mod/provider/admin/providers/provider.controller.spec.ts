import { Test, TestingModule } from '@nestjs/testing';
import { ProviderController } from './provider.controller';
import { ProviderService } from './provider.service';

describe('ProviderController', () => {
  let providerController: ProviderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProviderController],
      providers: [ProviderService],
    }).compile();

    providerController = module.get<ProviderController>(ProviderController);
  });

  it('should be defined', () => {
    expect(providerController).toBeDefined();
  });
});
