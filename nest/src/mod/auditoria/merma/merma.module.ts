import { Module } from '@nestjs/common';
import { MermaService } from './merma.service';
import { MermaController } from './merma.controller';
import { auditoriaMermaProvider } from './entities/merma.provider';
import { GlobalModule } from '@global/global.module';

@Module({
  imports: [
    GlobalModule
  ],
  controllers: [MermaController],
  providers: [
    ...auditoriaMermaProvider,
    MermaService
  ],
  exports: [MermaService],
})
export class MermaModule { }
