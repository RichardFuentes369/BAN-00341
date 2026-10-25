import { Module, forwardRef } from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { WarehouseController } from './warehouse.controller';
import { GlobalModule } from '@global/global.module';
import { warehouseProviders } from './entities/warehouse.provider';
import { MermasModule } from '@module/merma/mermas/mermas.module';

@Module({
  imports: [
    GlobalModule,
    forwardRef(() => MermasModule)
  ],
  controllers: [WarehouseController],
  providers: [
    ...warehouseProviders,
    WarehouseService
  ],
  exports: [
    WarehouseService,
    ...warehouseProviders
  ]
})
export class WarehouseModule {}
