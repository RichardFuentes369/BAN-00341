import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { In, Like, Repository } from 'typeorm';
import { Supplier } from './entities/supplier.entity';
import { FilterCategoryrDto } from '@module/catalogo/supplier/dto/filter-supplier.dto';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class SupplierService {
  constructor(
    @Inject('SUPPLIER_REPOSITORY')
    private supplierRepository: Repository<Supplier>,
    private i18n: I18nService
  ) {}

  listarPropiedadesTabla(repository: Repository<any>) {
    const metadata = repository.metadata;
    return metadata.columns.map((column) => column.propertyName);
  }

  async findAll(filterDto: FilterCategoryrDto, lang: string) {
    const { limit, page, field = 'id', order = 'ASC' } = filterDto;

    if (!page || !limit) throw new NotFoundException(
      this.i18n.t('supplier.MSJ_ERROR_PARAMETRO_LISTA_NO_ENVIADO', { lang })
    );

    const propiedades = this.listarPropiedadesTabla(this.supplierRepository);
    if (!propiedades.includes(field)) {
      throw new NotFoundException(
        this.i18n.t('supplier.MSJ_ERROR_PARAMETRO_NO_EXISTE', { lang, args: { field } })
      );
    }

    const skipReal = (page == 1) ? 0 : (page - 1) * limit;
    const where: any = {};

    // Filtros por NIT o Razón Social
    if (filterDto['razon_social']) {
      where.razon_social = Like(`%${filterDto['razon_social']}%`);
    }
    if (filterDto['nit']) {
      where.nit = filterDto['nit'];
    }

    const totalRecords = await this.supplierRepository.count({ where });
    const result = await this.supplierRepository.find({
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
    const supplier = await this.supplierRepository.findOne({ where: { id } });
    if (!supplier) throw new NotFoundException(
      this.i18n.t('supplier.MSJ_PROVEEDOR_NO_ENCONTRADO', { lang })
    );
    return supplier;
  }

  async create(lang: string, supplierData: Partial<Supplier>, userId: number) {
    try {
      // Validar si el NIT ya existe
      const exists = await this.supplierRepository.findOne({ where: { nit: supplierData.nit } });
      if (exists) throw new NotFoundException(
        this.i18n.t('supplier.MSJ_ERROR_NIT_EXISTE', { lang })
      );

      await this.supplierRepository.save(supplierData);
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

  async update(lang: string, id: number, supplierData: Partial<Supplier>, userId: number) {
    const supplier = await this.findOne(lang, id);
    return this.supplierRepository.save({
      ...supplier,
      ...supplierData
    });
  }

  async remove(lang: string, ids: number[], userId: number) {
    return this.supplierRepository.delete({ id: In(ids) });
  }
}