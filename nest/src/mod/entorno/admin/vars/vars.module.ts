import { Module } from '@nestjs/common';
import { VarsService } from './vars.service';
import { VarsController } from './vars.controller';

@Module({
  controllers: [VarsController],
  providers: [VarsService],
})
export class VarsModule {}
