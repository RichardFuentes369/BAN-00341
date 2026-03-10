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

  async processExcel(buffer: Buffer | Uint8Array, id_category: number) {
    if (!buffer || buffer.byteLength === 0) {
      throw new BadRequestException('El archivo está vacío');
    }

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(buffer as any);
    const worksheet = workbook.getWorksheet(1);

    // 1. Cargar códigos existentes de la BD
    const existingProducts = await this.productRepository.find({
      select: ['codigo_barra']
    });
    
    // Usamos un Set para búsquedas instantáneas O(1)
    const existingCodes = new Set(existingProducts.map(p => p.codigo_barra));

    const productsToSave: any[] = []; 
    const duplicatesFound: string[] = [];
    
    worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
      if (rowNumber === 1) return; // Saltar encabezado

      // CORRECCIÓN: Extraer el código primero
      const codigo_barra = row.getCell(1).text?.trim();

      // Validar si viene vacío en el Excel
      if (!codigo_barra) return;

      // 2. Validar duplicados (en BD o en el mismo archivo)
      if (existingCodes.has(codigo_barra)) {
        duplicatesFound.push(codigo_barra);
        return; 
      }

      const product = {
        codigo_barra: codigo_barra,
        nombre: row.getCell(2).text,
        stock_minimo: Number(row.getCell(3).value) || 0,
        unidad_medida: row.getCell(4).text,
        marca: row.getCell(5).text,
        id_categoria: id_category
      };

      if (product.id_categoria && product.codigo_barra) {
        productsToSave.push(product);
        // IMPORTANTE: Agregar al Set para que si el código se repite 
        // más abajo en el Excel, también sea detectado como duplicado.
        existingCodes.add(codigo_barra); 
      }
    });

    // Si no hay nada nuevo, retornamos un mensaje informativo en lugar de un error
    if (productsToSave.length === 0) {
      return {
        success: true,
        message: 'No se encontraron productos nuevos (todos existen o el archivo está vacío)',
        duplicatesCount: duplicatesFound.length
      };
    }

    try {
      const result = await this.productRepository.save(productsToSave);
      
      return {
        success: true,
        message: `${result.length} productos cargados correctamente`,
        count: result.length,
        ignored: duplicatesFound.length
      };
    } catch (error) {
      console.error('Error al guardar masivamente:', error);
      throw new BadRequestException('Error al insertar los productos en la base de datos');
    }
  }

}
