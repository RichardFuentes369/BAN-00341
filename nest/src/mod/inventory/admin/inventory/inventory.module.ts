import { Module } from '@nestjs/common';

import { GlobalModule } from '@global/global.module';
import { inventoryProviders } from './entities/inventory.provider';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';

@Module({
  imports: [GlobalModule],
  controllers: [InventoryController],
  providers: [
    ...inventoryProviders,
    InventoryService
  ],
  exports: [
    InventoryService
  ]
})
export class AdminInventoryModule {}
