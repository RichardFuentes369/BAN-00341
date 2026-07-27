import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSotckDto } from './dto/create-sotck.dto';
import { UpdateSotckDto } from './dto/update-sotck.dto';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { I18nService } from 'nestjs-i18n';
import * as ExcelJS from 'exceljs';

@Injectable()
export class SotckService {
  constructor(
    private i18n: I18nService,
    @Inject('DATA_SOURCE') private readonly dataSource: DataSource,
  ) { }

  async findAll(page: string, limit: string, field: string, order: string) {
    try {
      const result = await this.dataSource.manager.query(
        'CALL sp_reporte_stock_paginado(?,?,?,?)',
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

  // reporte pendiente permisos
  async generarExcel(allParams: any, lang: string) {
    const paginaActual = 1;
    const registrosPorPagina = 999999;
    const orderField = allParams.orderField || 'nombre';
    const orderDirection = allParams.orderDirection || 'ASC';

    const query = 'CALL sp_reporte_stock_paginado(?, ?, ?, ?)';
    const parameters = [
      paginaActual,
      registrosPorPagina,
      orderField,
      orderDirection
    ];

    const resultadoSp = await this.dataSource.query(query, parameters);

    const data = resultadoSp[1] || [];

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Reporte de Stock');

    const masterColumns = [
      { header: 'Nombre del Producto', key: 'nombre', width: 30 },
      { header: 'Stock Mínimo', key: 'stock_minimo', width: 15 },
      { header: 'Disponibles', key: 'total_productos_disponibles', width: 15 },
      { header: 'Aviso de Stock', key: 'aviso_stock', width: 40 }
    ];

    const dynamicColumns = masterColumns.filter(col => {
      const val = allParams[col.key];
      return Array.isArray(val) ? val.includes('true') : val === 'true';
    });

    worksheet.columns = dynamicColumns.length > 0 ? dynamicColumns : masterColumns;

    worksheet.addRows(data);

    return await workbook.xlsx.writeBuffer();
  }

  async generarCsv(allParams: any, lang: string) {
    const paginaActual = 1;
    const registrosPorPagina = 999999;
    const orderField = allParams.orderField || 'nombre';
    const orderDirection = allParams.orderDirection || 'ASC';

    const query = 'CALL sp_reporte_stock_paginado(?, ?, ?, ?)';
    const parameters = [
      paginaActual,
      registrosPorPagina,
      orderField,
      orderDirection
    ];

    const resultadoSp = await this.dataSource.query(query, parameters);

    const data = resultadoSp[1] || [];

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Reporte de Stock');

    const masterColumns = [
      { header: 'Nombre del Producto', key: 'nombre', width: 30 },
      { header: 'Stock Mínimo', key: 'stock_minimo', width: 15 },
      { header: 'Disponibles', key: 'total_productos_disponibles', width: 15 },
      { header: 'Aviso de Stock', key: 'aviso_stock', width: 40 }
    ];

    const dynamicColumns = masterColumns.filter(col => {
      const val = allParams[col.key];
      return Array.isArray(val) ? val.includes('true') : val === 'true';
    });

    worksheet.columns = dynamicColumns.length > 0 ? dynamicColumns : masterColumns;

    worksheet.addRows(data);

    return await workbook.csv.writeBuffer({
      formatterOptions: {
        delimiter: ',',
        quote: '"'
      }
    });
  }

}
