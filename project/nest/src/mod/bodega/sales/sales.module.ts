import { forwardRef, Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { GlobalModule } from '@global/global.module';
import { WarehouseModule } from '../warehouse/warehouse.module';
import { saleProviders } from './entities/sale.provider';
import { ProductModule } from '@module/catalogo/product/product.module';

@Module({
  imports: [
    GlobalModule,
    WarehouseModule,
    ProductModule,
  ],
  controllers: [SalesController],
  providers: [
    ...saleProviders,
    SalesService
  ],
  exports: [
    SalesService
  ]
})
export class SalesModule { }