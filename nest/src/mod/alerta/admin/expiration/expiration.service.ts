import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateExpirationDto } from './dto/create-expiration.dto';
import { UpdateExpirationDto } from './dto/update-expiration.dto';
import { I18nService } from 'nestjs-i18n';
import { DataSource } from 'typeorm';

@Injectable()
export class ExpirationService {
  constructor(
    private i18n: I18nService,
    @Inject('DATA_SOURCE') private readonly dataSource: DataSource,
  ) {}

  async findAll(page: string, limit: string, field: string, order: string) {
    try {
      const result = await this.dataSource.manager.query(
        'CALL sp_notificaciones_perecederos(?,?,?,?)',
        [
          (page === 'null') ? null : page,
          (limit === 'null') ? null : limit,
          (field === 'null') ? null : field,
          (order === 'null') ? null : order,
        ]
      )
      return result;
    } catch (error) {
      console.error('Error detallado:', error);
      throw new NotFoundException('Error en el reporte de stock');
    }
  }

}
