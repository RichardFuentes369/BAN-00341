import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { In, Like, Repository } from 'typeorm';
import { Producto } from './entities/product.entity';
import { I18nService } from 'nestjs-i18n';
import { FilterProductrDto } from './dto/filter-product.dto';
import * as ExcelJS from 'exceljs';
import { BadRequestException } from '@nestjs/common';
import { ProductExcel } from './interface/excel-product.interface';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private productRepository: Repository<Producto>,
    private i18n: I18nService
  ) {}

  listarPropiedadesTabla(repository: Repository<any>) {
    const metadata = repository.metadata;
    return metadata.columns.map((column) => column.propertyName);
  }

  async findAll(filterDto: FilterProductrDto, lang: string) {
    const { limit, page, field = 'id', order = 'ASC' } = filterDto;

    if (!page || !limit) throw new NotFoundException(
      this.i18n.t('supplier.MSJ_ERROR_PARAMETRO_LISTA_NO_ENVIADO', { lang })
    );

    const propiedades = this.listarPropiedadesTabla(this.productRepository);
    if (!propiedades.includes(field)) {
      throw new NotFoundException(
        this.i18n.t('supplier.MSJ_ERROR_PARAMETRO_NO_EXISTE', { lang, args: { field } })
      );
    }

    const skipReal = (page == 1) ? 0 : (page - 1) * limit;
    const where: any = {};

    if (filterDto['marca']) {
      where.marca = Like(`%${filterDto['marca']}%`);
    }
    if (filterDto['codigo_barra']) {
      where.codigo_barra = Like(`%${filterDto['codigo_barra']}%`);
    }
    if (filterDto['nombre']) {
      where.nombre = Like(`%${filterDto['nombre']}%`);
    }
    if (filterDto['stock_minimo']) {
      where.stock_minimo = Like(`%${filterDto['stock_minimo']}%`);
    }
    if (filterDto['unidad_medida']) {
      where.unidad_medida = Like(`%${filterDto['unidad_medida']}%`);
    }
    if (filterDto['id_marca']) {
      where.id_marca = filterDto['id_marca'];
    }

    const totalRecords = await this.productRepository.count({ where });
    const result = await this.productRepository.find({
      skip: skipReal,
      take: limit,
      where: where,
      relations: {
        marca: true, 
      },
      order: { [field]: order }
    });

    return [{
      'result': result,
      'pagination': {
        'page': page,
        'perPage': limit,
        'previous': (page == 1) ? null : page - 1,
        'next': (skipReal + limit >= totalRecords) ? null : page + 1,
        'totalRecord': totalRecords
      },
      'order': { order, field }
    }];
  }

  async findOne(lang: string, id: number) {
    const prodcut = await this.productRepository.findOne({ where: { id }, relations: { marca: true } });
    if (!prodcut) throw new NotFoundException(
      this.i18n.t('categoria.MSJ_ERROR_PRODUCT_NOT_EXISTS', { lang })
    );
    if (prodcut.estado) {
      prodcut.estado = true;
    }else{
      prodcut.estado = false;
    }
    return prodcut;
  }

  async create(
    lang: string, 
    productData: CreateProductDto, 
    userId: number
  ) {
    try {
      const exists = await this.productRepository.findOne({ where: { codigo_barra: productData.codigo_barra } });
      if (exists) throw new NotFoundException(
        this.i18n.t('categoria.MSJ_ERROR_PRODUCT_EXISTE', { lang })
      );

      if(productData.es_perecedero === false){
        productData.alerta_amarilla = null
        productData.alerta_naranja = null
      }

      await this.productRepository.save(productData);
      return {
        'title': this.i18n.t('supplier.MSJ_TITTLE', { lang }),
        'message': this.i18n.t('supplier.MSJ_CREADO_EXITOSAMENTE', { lang }),
        'status': 200,
      };
    } catch (error) {
      return {
        'title': 'Error',
        'message': error.response?.message || error.message,
        'status': 404,
      };
    }
  }

  async update(
    lang: string, 
    id: number, 
    productData: UpdateProductDto, 
    userId: number
  ) {
    const prodcut = await this.productRepository.findOne({ where: { id }});
    const exists = await this.productRepository.findOne({ where: { codigo_barra: productData.codigo_barra } });

    if (prodcut.codigo_barra != productData.codigo_barra && exists) throw new NotFoundException(
      this.i18n.t('categoria.MSJ_ERROR_CATEGORY_BAR_CODE_EXISTE', { lang })
    );

    if(productData.es_perecedero === false){
      productData.alerta_amarilla = null
      productData.alerta_naranja = null
    }

    return this.productRepository.save({
      ...prodcut,
      ...productData
    });
  }

  async remove(lang: string, ids: number[], userId: number) {
    return this.productRepository.delete({ id: In(ids) });
  }

  async processExcel(buffer: Buffer, id_category: number) {
    if (!buffer || buffer.length === 0) {
      throw new BadRequestException('El archivo está vacío');
    }

    // 1. Usar WorkbookReader (Streaming) para NO cargar todo en RAM
    const { Readable } = require('stream');
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null);

    const reader = new ExcelJS.stream.xlsx.WorkbookReader(stream, {});
    
    const BATCH_SIZE = 5000;
    let batch: any[] = [];
    let totalProcessed = 0;

    // 2. Procesar por eventos de fila
    for await (const worksheet of reader) {
      for await (const row of worksheet) {
        // Saltamos el encabezado (fila 1)
        if (row.number === 1) continue;

        const codigo_barra = row.getCell(1).text?.trim();
        if (!codigo_barra) continue;

        batch.push({
          codigo_barra: codigo_barra,
          nombre: row.getCell(2).text?.trim(),
          stock_minimo: Number(row.getCell(3).value) || 0,
          unidad_medida: row.getCell(4).text?.trim(),
          marca: row.getCell(5).text?.trim(),
          id_categoria: id_category,
        });

        if (batch.length >= BATCH_SIZE) {
          await this.runBatchInsert(batch);
          batch = []; // Liberación inmediata de RAM
        }
        totalProcessed++;
      }
    }

    if (batch.length > 0) {
      await this.runBatchInsert(batch);
    }

    return {
      success: true,
      count: totalProcessed
    };
  }

  private async runBatchInsert(data: any[]): Promise<void> {
    try {
      await this.productRepository
        .createQueryBuilder()
        .insert()
        .into(Producto)
        .values(data)
        // IMPORTANTE: 'codigo_barra' DEBE ser UNIQUE en la base de datos
        .orUpdate(['nombre', 'stock_minimo', 'unidad_medida', 'marca'], ['codigo_barra'])
        .execute();
    } catch (error) {
      console.error('Error en batch insert:', error);
      throw error;
    }
  }
  
  async contadoresProductos(
    lang: string
  ){
    const cont1 =  await this.productRepository.count()
    
    const data = {
      "count_total_products": cont1,
    }

    return data
  }
}
