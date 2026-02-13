import { Module } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { SupplierController } from './supplier.controller';
import { GlobalModule } from '@global/global.module';
import { supplierProviders } from './entities/supplier.provider';

@Module({
  imports: [GlobalModule],
  controllers: [SupplierController],
  providers: [
    ...supplierProviders,
    SupplierService
  ],
  exports: [
    SupplierService
  ]
})
export class SupplierModule {}
