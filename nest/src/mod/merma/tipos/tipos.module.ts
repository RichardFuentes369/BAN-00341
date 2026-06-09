import { Module } from '@nestjs/common';
import { TiposService } from './tipos.service';
import { TiposController } from './tipos.controller';
import { GlobalModule } from '@global/global.module';
import { tipoProviders } from './entities/tipo.provider';

@Module({
  imports: [GlobalModule],
  controllers: [TiposController],
  providers: [
    ...tipoProviders,
    TiposService
  ],
  exports: [
    TiposService
  ]
})
export class TiposModule {}
