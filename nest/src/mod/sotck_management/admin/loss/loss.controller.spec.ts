import { Test, TestingModule } from '@nestjs/testing';
import { LossController } from './loss.controller';
import { LossService } from './loss.service';

describe('LossController', () => {
  let controller: LossController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LossController],
      providers: [LossService],
    }).compile();

    controller = module.get<LossController>(LossController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
