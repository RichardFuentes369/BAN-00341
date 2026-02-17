import { Module } from '@nestjs/common';

import { categoryProviders } from './entities/category.provider';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { GlobalModule } from '@global/global.module';

@Module({
  imports: [GlobalModule],
  controllers: [CategoryController],
  providers: [
    ...categoryProviders,
    CategoryService
  ],
  exports: [
    CategoryService
  ]
})
export class CategoryModule {}
