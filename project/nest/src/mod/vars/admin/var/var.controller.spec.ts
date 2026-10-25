import { Test, TestingModule } from '@nestjs/testing';
import { VarController } from './var.controller';
import { VarService } from './var.service';

describe('VarController', () => {
  let controller: VarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VarController],
      providers: [VarService],
    }).compile();

    controller = module.get<VarController>(VarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
