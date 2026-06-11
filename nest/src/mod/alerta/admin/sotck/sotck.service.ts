import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSotckDto } from './dto/create-sotck.dto';
import { UpdateSotckDto } from './dto/update-sotck.dto';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class SotckService {
  constructor(
    private i18n: I18nService,
    @Inject('DATA_SOURCE') private readonly dataSource: DataSource,
  ) {}

  async findAll(page: string, limit: string) {
    try {
      const result = await this.dataSource.manager.query(
        'CALL sp_reporte_stock_paginado(?,?)',
        [
          (page === 'null') ? null : page,
          (limit === 'null') ? null : limit,
        ]
      )
      return result;
    } catch (error) {
      console.error('Error detallado:', error);
      throw new NotFoundException('Error en el reporte de stock');
    }
  }

}
