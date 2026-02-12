import { Module } from '@nestjs/common';

import { GlobalModule } from '@global/global.module';
import { categoryProviders } from './entities/category.provider';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';

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

export class AdminCategoryModule {}
