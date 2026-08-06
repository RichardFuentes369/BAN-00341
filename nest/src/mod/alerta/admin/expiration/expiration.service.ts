import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateExpirationDto } from './dto/create-expiration.dto';
import { UpdateExpirationDto } from './dto/update-expiration.dto';
import { I18nService } from 'nestjs-i18n';
import { DataSource } from 'typeorm';
import * as ExcelJS from 'exceljs';

@Injectable()
export class ExpirationService {
  constructor(
    private i18n: I18nService,
    @Inject('DATA_SOURCE') private readonly dataSource: DataSource,
  ) { }

  async findAll(
    page: string, 
    limit: string, 
    field: string, 
    order: string,
    p_lote: string,
    p_codigo_barra: string,
    p_nombre_producto: string,
    p_estado_alerta: string,
    p_cantidad_comprada_min: string,
    p_cantidad_comprada_max: string,
    p_cantidad_vendida_min: string,
    p_cantidad_vendida_max: string,
    p_cantidad_bodega_min: string,
    p_cantidad_bodega_max: string,
    p_dias_restantes_min: string,
    p_dias_restantes_max: string,
    p_fecha_entrada_min: string,
    p_fecha_entrada_max: string,
    p_fecha_vencimiento_min: string,
    p_fecha_vencimiento_max: string,
  ) {
    try {
      const result = await this.dataSource.manager.query(
        'CALL sp_notificaciones_perecederos(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
        [
          (page === 'null') ? null : page,
          (limit === 'null') ? null : limit,
          (field === 'null') ? null : field,
          (order === 'null') ? null : order,
          (p_lote === 'null') ? null : p_lote,
          (p_codigo_barra === 'null') ? null : p_codigo_barra,
          (p_nombre_producto === 'null') ? null : p_nombre_producto,
          (p_estado_alerta === 'null') ? null : p_estado_alerta,
          (p_cantidad_comprada_min === 'null') ? null : p_cantidad_comprada_min,
          (p_cantidad_comprada_max === 'null') ? null : p_cantidad_comprada_max,
          (p_cantidad_vendida_min === 'null') ? null : p_cantidad_vendida_min,
          (p_cantidad_vendida_max === 'null') ? null : p_cantidad_vendida_max,
          (p_cantidad_bodega_min === 'null') ? null : p_cantidad_bodega_min,
          (p_cantidad_bodega_max === 'null') ? null : p_cantidad_bodega_max,
          (p_dias_restantes_min === 'null') ? null : p_dias_restantes_min,
          (p_dias_restantes_max === 'null') ? null : p_dias_restantes_max,
          (p_fecha_entrada_min === 'null') ? null : p_fecha_entrada_min,
          (p_fecha_entrada_max === 'null') ? null : p_fecha_entrada_max,
          (p_fecha_vencimiento_min === 'null') ? null : p_fecha_vencimiento_min,
          (p_fecha_vencimiento_max === 'null') ? null : p_fecha_vencimiento_max,
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

    const query = 'CALL sp_notificaciones_perecederos(?, ?, ?, ?)';
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
      { header: 'Id Producto', key: 'id_producto', width: 30 },
      { header: 'Lote', key: 'lote', width: 15 },
      { header: 'Fecha de ingreso', key: 'fecha_entrada', width: 15 },
      { header: 'Fecha de vencimiento', key: 'fecha_vencimiento', width: 15 },
      { header: 'Dias restantes', key: 'dias_restantes', width: 15 },
      { header: 'Estado de alerta', key: 'estado_alerta', width: 15 },
      { header: 'Cantidad comprada', key: 'cantidad_comprada', width: 15 },
      { header: 'Cantidad vendida', key: 'cantidad_vendida', width: 15 },
      { header: 'Estado', key: 'estado', width: 15 },
      { header: 'Producto', key: 'nombre_producto', width: 15 },
      { header: 'Proveedor', key: 'nombre_proveedor', width: 15 },
      { header: 'Cantidad en bodega', key: 'cantidad_en_bodega', width: 15 },
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

    const query = 'CALL sp_notificaciones_perecederos(?, ?, ?, ?)';
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
      { header: 'Id Producto', key: 'id_producto', width: 30 },
      { header: 'Lote', key: 'lote', width: 15 },
      { header: 'Fecha de ingreso', key: 'fecha_entrada', width: 15 },
      { header: 'Fecha de vencimiento', key: 'fecha_vencimiento', width: 15 },
      { header: 'Dias restantes', key: 'dias_restantes', width: 15 },
      { header: 'Estado de alerta', key: 'estado_alerta', width: 15 },
      { header: 'Cantidad comprada', key: 'cantidad_comprada', width: 15 },
      { header: 'Cantidad vendida', key: 'cantidad_vendida', width: 15 },
      { header: 'Estado', key: 'estado', width: 15 },
      { header: 'Producto', key: 'nombre_producto', width: 15 },
      { header: 'Proveedor', key: 'nombre_proveedor', width: 15 },
      { header: 'Cantidad en bodega', key: 'cantidad_en_bodega', width: 15 },
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
