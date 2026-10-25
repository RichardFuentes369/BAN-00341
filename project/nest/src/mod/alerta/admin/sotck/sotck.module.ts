import { Module } from '@nestjs/common';
import { SotckService } from './sotck.service';
import { SotckController } from './sotck.controller';
import { GlobalModule } from '@global/global.module';

@Module({
  imports: [GlobalModule],
  controllers: [SotckController],
  providers: [SotckService],
})
export class SotckModule {}
