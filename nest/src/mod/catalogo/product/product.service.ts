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

    if (filterDto['id_category']) {
      where.id_categoria = filterDto['id_category'];
    }
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

    const totalRecords = await this.productRepository.count({ where });
    const result = await this.productRepository.find({
      skip: skipReal,
      take: limit,
      where: where,
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
    const prodcut = await this.productRepository.findOne({ where: { id } });
    if (!prodcut) throw new NotFoundException(
      this.i18n.t('supplier.MSJ_PROVEEDOR_NO_ENCONTRADO', { lang })
    );
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
        this.i18n.t('supplier.MSJ_ERROR_NIT_EXISTE', { lang })
      );

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
    const product = await this.findOne(lang, id);

    return this.productRepository.save({
      ...product,
      ...productData
    });
  }

  async remove(lang: string, ids: number[], userId: number) {
    return this.productRepository.delete({ id: In(ids) });
  }

  async processExcel(buffer: Buffer, id_category: number) {
    if (!buffer || buffer.length === 0) {
      throw new BadRequestException(this.i18n.t('errors.EMPTY_FILE'));
    }

    const { Readable } = require('stream');
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null);

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.read(stream);
    const worksheet = workbook.getWorksheet(1);

    const BATCH_SIZE = 5000; 
    let batch: any[] = [];
    let totalProcessed = 0;

    const rowCount = worksheet.actualRowCount;

    for (let i = 2; i <= rowCount; i++) {
      const row = worksheet.getRow(i);
      const codigo_barra = row.getCell(1).text?.trim();

      if (!codigo_barra) continue;

      batch.push({
        codigo_barra: codigo_barra,
        nombre: row.getCell(2).text,
        stock_minimo: Number(row.getCell(3).value) || 0,
        unidad_medida: row.getCell(4).text,
        marca: row.getCell(5).text,
        id_categoria: id_category,
      });

      if (batch.length >= BATCH_SIZE) {
        await this.runBatchInsert(batch);
        batch = []; // Liberación de memoria inmediata
      }
      totalProcessed++;
    }

    if (batch.length > 0) {
      await this.runBatchInsert(batch);
    }

    return {
      success: true,
      message: this.i18n.t('messages.SUCCESS_LOAD'),
      count: totalProcessed
    };
  }

  private async runBatchInsert(data: any[]): Promise<void> {
    await this.productRepository
      .createQueryBuilder()
      .insert()
      .into(Producto)
      .values(data)
      .orUpdate(['nombre', 'stock_minimo', 'unidad_medida', 'marca'], ['codigo_barra'])
      .execute();
  }

}
