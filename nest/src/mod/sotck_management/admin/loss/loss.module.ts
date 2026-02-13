import { Module } from '@nestjs/common';
import { LossService } from './loss.service';
import { LossController } from './loss.controller';

@Module({
  controllers: [LossController],
  providers: [LossService],
})
export class LossModule {}
