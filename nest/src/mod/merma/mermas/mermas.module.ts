import { forwardRef, Module } from '@nestjs/common';
import { MermasService } from './mermas.service';
import { MermasController } from './mermas.controller';
import { GlobalModule } from '@global/global.module';
import { mermasProviders } from './entities/merma.provider';
import { WarehouseModule } from '@module/bodega/warehouse/warehouse.module';

@Module({
  imports: [
    GlobalModule,
    forwardRef(() => WarehouseModule)
  ],
  controllers: [MermasController],
  providers: [
    ...mermasProviders,
    MermasService
  ],
  exports: [
    ...mermasProviders,
    MermasService
  ]
})
export class MermasModule {}
