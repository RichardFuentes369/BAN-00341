import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { In, Like, Repository } from 'typeorm';
import { Producto } from './entities/product.entity';
import { I18nService } from 'nestjs-i18n';
import { FilterProductrDto } from './dto/filter-product.dto';

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
}
