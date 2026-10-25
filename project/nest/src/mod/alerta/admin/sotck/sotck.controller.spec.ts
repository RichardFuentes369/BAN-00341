import { Test, TestingModule } from '@nestjs/testing';
import { SotckController } from './sotck.controller';
import { SotckService } from './sotck.service';

describe('SotckController', () => {
  let controller: SotckController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SotckController],
      providers: [SotckService],
    }).compile();

    controller = module.get<SotckController>(SotckController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
