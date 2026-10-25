import { Module } from '@nestjs/common';
import { VarService } from './var.service';
import { VarController } from './var.controller';
import { varProviders } from './entities/var.provider';
import { GlobalModule } from '@global/global.module';

@Module({
  imports: [
    GlobalModule,
  ],
  controllers: [VarController],
  providers: [
    ...varProviders,
    VarService
  ],
  exports: [
    VarService,
  ]
})
export class VarModule {}
