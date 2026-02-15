import { Module } from '@nestjs/common';
import { MermasService } from './mermas.service';
import { MermasController } from './mermas.controller';

@Module({
  controllers: [MermasController],
  providers: [MermasService],
})
export class MermasModule {}
