import { Test, TestingModule } from '@nestjs/testing';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';

describe('InventoryController', () => {
  let inventoryController: InventoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InventoryController],
      providers: [InventoryService],
    }).compile();

    inventoryController = module.get<InventoryController>(InventoryController);
  });

  it('should be defined', () => {
    expect(inventoryController).toBeDefined();
  });
});
