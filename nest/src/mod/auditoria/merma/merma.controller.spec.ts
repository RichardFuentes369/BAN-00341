import { Test, TestingModule } from '@nestjs/testing';
import { MermaController } from './merma.controller';
import { MermaService } from './merma.service';

describe('MermaController', () => {
  let controller: MermaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MermaController],
      providers: [MermaService],
    }).compile();

    controller = module.get<MermaController>(MermaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
