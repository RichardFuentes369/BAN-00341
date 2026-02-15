import { Test, TestingModule } from '@nestjs/testing';
import { MermasController } from './mermas.controller';
import { MermasService } from './mermas.service';

describe('MermasController', () => {
  let controller: MermasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MermasController],
      providers: [MermasService],
    }).compile();

    controller = module.get<MermasController>(MermasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
