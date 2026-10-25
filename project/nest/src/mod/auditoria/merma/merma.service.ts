import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditoriaMerma } from './entities/merma.entity'; // Asegúrate de ajustar la ruta de la entidad
import { CreateAuditoriaMermaDto } from './dto/create-merma.dto';

@Injectable()
export class MermaService {
  constructor(
    @Inject('AUDITORIA_MERMA_REPOSITORY')
    private readonly auditoriaMermaRepository: Repository<AuditoriaMerma>,
  ) {}

  async create(createMermaDto: CreateAuditoriaMermaDto): Promise<AuditoriaMerma> {
    try {
      const { id_usuario, ...datosAuditoria } = createMermaDto;

      const nuevaAuditoria = this.auditoriaMermaRepository.create({
        ...datosAuditoria,
        usuario: { id: id_usuario } as any,
      });

      return await this.auditoriaMermaRepository.save(nuevaAuditoria);
    } catch (error) {
      throw new InternalServerErrorException('Error al registrar la auditoría de merma');
    }
  }
}