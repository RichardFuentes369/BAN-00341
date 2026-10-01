import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditoriaBodega } from './entities/bodega.entity';
import { CreateAuditoriaBodegaDto } from './dto/create-bodega.dto';

@Injectable()
export class BodegaService {
  constructor(
    @Inject('AUDITORIA_BODEGA_REPOSITORY')
    private readonly auditoriaRepository: Repository<AuditoriaBodega>,
  ) {}

  async create(createAuditoriaBodegaDto: CreateAuditoriaBodegaDto): Promise<AuditoriaBodega> {
    try {
      const { id_usuario, ...datosAuditoria } = createAuditoriaBodegaDto;

      const nuevaAuditoria = this.auditoriaRepository.create({
        ...datosAuditoria,
        usuario: { id: id_usuario } as any,
      });

      return await this.auditoriaRepository.save(nuevaAuditoria);
    } catch (error) {
      throw new InternalServerErrorException('Error al guardar el registro de auditoría');
    }
  }
}