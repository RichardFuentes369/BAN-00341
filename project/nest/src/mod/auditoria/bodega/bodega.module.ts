import { Module } from '@nestjs/common';
import { GlobalModule } from '@global/global.module'; // El módulo que provee 'DATA_SOURCE'
import { auditoriaBodegaProvider } from './entities/bodega.provider';
import { BodegaService } from './bodega.service';
import { BodegaController } from './bodega.controller';

@Module({
  imports: [GlobalModule], // O el módulo donde tengas definido DATA_SOURCE
  controllers: [BodegaController],
  providers: [
    ...auditoriaBodegaProvider, // Registra el proveedor personalizado
    BodegaService,
  ],
  exports: [BodegaService],
})
export class BodegaModule {}