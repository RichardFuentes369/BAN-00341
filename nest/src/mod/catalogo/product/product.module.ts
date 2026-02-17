import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { GlobalModule } from '@global/global.module';
import { productProviders } from './entities/product.provider';

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
export class ProductModule {}
