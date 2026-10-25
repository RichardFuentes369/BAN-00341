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

  async findAll(
    page: string, 
    limit: string, 
    field: string, 
    order: string,
    p_codigo_barra: string,    
    p_nombre_producto: string,    
    p_stock_min: string,   
    p_stock_max: string,   
    p_bodega_min: string,   
    p_bodega_max: string,   
    p_aviso_stock: string,
  ) {
    try {
      const result = await this.dataSource.manager.query(
        'CALL sp_reporte_stock_paginado(?,?,?,?,?,?,?,?,?,?,?)',
        [
          (page === 'null') ? null : page,
          (limit === 'null') ? null : limit,
          (field === 'null') ? null : field,
          (order === 'null') ? null : order,
          (p_codigo_barra === 'null') ? null : p_codigo_barra,
          (p_nombre_producto === 'null') ? null : p_nombre_producto,
          (p_stock_min === 'null') ? null : p_stock_min,
          (p_stock_max === 'null') ? null : p_stock_max,
          (p_bodega_min === 'null') ? null : p_bodega_min,
          (p_bodega_max === 'null') ? null : p_bodega_max,
          (p_aviso_stock === 'null') ? null : p_aviso_stock,
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
    const p_codigo_barra = allParams.p_codigo_barra;    
    const p_nombre_producto = allParams.p_nombre_producto;    
    const p_stock_min = allParams.p_stock_min;   
    const p_stock_max = allParams.p_stock_max;   
    const p_bodega_min = allParams.p_bodega_min;   
    const p_bodega_max = allParams.p_bodega_max;   
    const p_aviso_stock = allParams.p_aviso_stock;

    const query = 'CALL sp_reporte_stock_paginado(?,?,?,?,?,?,?,?,?,?,?)';
    const parameters = [
      paginaActual,
      registrosPorPagina,
      orderField,
      orderDirection,
      p_codigo_barra,
      p_nombre_producto,
      p_stock_min,
      p_stock_max,
      p_bodega_min,
      p_bodega_max,
      p_aviso_stock
    ];

    const resultadoSp = await this.dataSource.query(query, parameters);

    const data = resultadoSp[1] || [];

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Reporte de Stock');

    const masterColumns = [
      { header: 'Codigo de barra', key: 'codigo_barra', width: 30 },
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
    const p_codigo_barra = allParams.p_codigo_barra;    
    const p_nombre_producto = allParams.p_nombre_producto;    
    const p_stock_min = allParams.p_stock_min;   
    const p_stock_max = allParams.p_stock_max;   
    const p_bodega_min = allParams.p_bodega_min;   
    const p_bodega_max = allParams.p_bodega_max;   
    const p_aviso_stock = allParams.p_aviso_stock;

    const query = 'CALL sp_reporte_stock_paginado(?,?,?,?,?,?,?,?,?,?,?)';
    const parameters = [
      paginaActual,
      registrosPorPagina,
      orderField,
      orderDirection,
      p_codigo_barra,
      p_nombre_producto,
      p_stock_min,
      p_stock_max,
      p_bodega_min,
      p_bodega_max,
      p_aviso_stock
    ];
    
    const resultadoSp = await this.dataSource.query(query, parameters);

    const data = resultadoSp[1] || [];

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Reporte de Stock');

    const masterColumns = [
      { header: 'Codigo de barra', key: 'codigo_barra', width: 30 },
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
