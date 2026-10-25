import { Module } from '@nestjs/common';
import { AsignacionService } from './asignacion.service';
import { AsignacionController } from './asignacion.controller';
import { moduloProviders } from '@module/modules/entities/modulos.provider';
import { asignacionProviders } from './entities/asignacion.provider';
import { GlobalModule } from '@global/global.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    GlobalModule,
  ],
  controllers: [AsignacionController],
  providers: [
    ...moduloProviders,
    ...asignacionProviders,
    AsignacionService
  ],
  exports: [
    AsignacionService,
  ]
})
export class AsignacionModule {}
