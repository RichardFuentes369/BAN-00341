import { Module } from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { WarehouseController } from './warehouse.controller';
import { GlobalModule } from '@global/global.module';
import { warehouseProviders } from './entities/warehouse.provider';

@Module({
  imports: [GlobalModule],
  controllers: [WarehouseController],
  providers: [
    ...warehouseProviders,
    WarehouseService
  ],
  exports: [
    WarehouseService
  ]
})
export class WarehouseModule {}
