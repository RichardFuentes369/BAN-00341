import { Module } from '@nestjs/common';
import { MermasService } from './mermas.service';
import { MermasController } from './mermas.controller';
import { GlobalModule } from '@global/global.module';
import { mermasProviders } from './entities/merma.provider';

@Module({
  imports: [GlobalModule],
  controllers: [MermasController],
  providers: [
    ...mermasProviders,
    MermasService
  ],
  exports: [
    MermasService
  ]
})
export class MermasModule {}
