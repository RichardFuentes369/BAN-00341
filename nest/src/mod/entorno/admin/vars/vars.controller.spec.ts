import { Test, TestingModule } from '@nestjs/testing';
import { VarsController } from './vars.controller';
import { VarsService } from './vars.service';

describe('VarsController', () => {
  let controller: VarsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VarsController],
      providers: [VarsService],
    }).compile();

    controller = module.get<VarsController>(VarsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
