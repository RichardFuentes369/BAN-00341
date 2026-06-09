import { Module } from '@nestjs/common';
import { ExtentService } from './extent.service';
import { ExtentController } from './extent.controller';
import { GlobalModule } from '@global/global.module';
import { extentProviders } from './entities/extent.provider';

@Module({
  imports: [GlobalModule],
  controllers: [ExtentController],
  providers: [
    ...extentProviders,
    ExtentService
  ],
  exports: [
    ...extentProviders,
    ExtentService
  ]
})
export class ExtentModule {}
