import { Module } from '@nestjs/common';
import { BatchService } from './batch.service';
import { BatchController } from './batch.controller';
import { GlobalModule } from '@global/global.module';
import { batchProviders } from './entities/batch.provider';

@Module({
  imports: [GlobalModule],
  controllers: [BatchController],
  providers: [
    ...batchProviders,
    BatchService
  ],
  exports: [
    BatchService
  ]
})
export class BatchModule {}
