import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { GlobalModule } from '@global/global.module';
import { brandProviders } from './entities/band.provider';
import { productProviders } from '@module/catalogo/product/entities/product.provider'

@Module({
  imports: [GlobalModule],
  controllers: [BrandController],
  providers: [
    ...brandProviders,
    ...productProviders,
    BrandService
  ],
  exports: [
    ...brandProviders,
    ...productProviders,
    BrandService
  ]
})
export class BrandModule {}
