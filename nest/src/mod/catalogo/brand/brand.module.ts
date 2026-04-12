import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { GlobalModule } from '@global/global.module';
import { brandProviders } from './entities/band.provider';

@Module({
  imports: [GlobalModule],
  controllers: [BrandController],
  providers: [
    ...brandProviders,
    BrandService
  ],
  exports: [
    BrandService
  ]
})
export class BrandModule {}
