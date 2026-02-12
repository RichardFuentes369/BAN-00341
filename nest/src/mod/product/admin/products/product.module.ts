import { Module } from '@nestjs/common';

import { GlobalModule } from '@global/global.module';
import { productProviders } from './entities/product.provider';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';

@Module({
  imports: [GlobalModule],
  controllers: [ProductController],
  providers: [
    ...productProviders,
    ProductService
  ],
  exports: [
    ProductService
  ]
})
export class AdminProductModule {}
