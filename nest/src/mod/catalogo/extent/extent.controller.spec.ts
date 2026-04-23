import { Test, TestingModule } from '@nestjs/testing';
import { ExtentController } from './extent.controller';
import { ExtentService } from './extent.service';

describe('ExtentController', () => {
  let controller: ExtentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExtentController],
      providers: [ExtentService],
    }).compile();

    controller = module.get<ExtentController>(ExtentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
