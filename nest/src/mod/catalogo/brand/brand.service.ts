import { HttpException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { In, Like, Repository } from 'typeorm';
import { Marca } from './entities/brand.entity';
import { I18nService } from 'nestjs-i18n';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { FilterBrandDto } from './dto/filter-category.dto';

@Injectable()
export class BrandService {
  constructor(
    @Inject('BRAND_REPOSITORY')
    private brandRepository: Repository<Marca>,
    private i18n: I18nService
  ) {}

  listarPropiedadesTabla(repository: Repository<any>) {
    const metadata = repository.metadata;
    return metadata.columns.map((column) => column.propertyName);
  }

  async findAll(filterDto: FilterBrandDto, lang: string) {
    const { limit, page, field = 'id', order = 'ASC' } = filterDto;

    if (!page || !limit) throw new NotFoundException(
      this.i18n.t('supplier.MSJ_ERROR_PARAMETRO_LISTA_NO_ENVIADO', { lang })
    );

    const propiedades = this.listarPropiedadesTabla(this.brandRepository);
    if (!propiedades.includes(field)) {
      throw new NotFoundException(
        this.i18n.t('supplier.MSJ_ERROR_PARAMETRO_NO_EXISTE', { lang, args: { field } })
      );
    }

    const skipReal = (page == 1) ? 0 : (page - 1) * limit;
    const where: any = {};

    if (filterDto['nombre']) {
      where.nombre = Like(`%${filterDto['nombre']}%`);
    }

    const totalRecords = await this.brandRepository.count({ where });
    const result = await this.brandRepository.find({
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

  async findOne(
    lang: string, 
    id: number
  ) {
    const category = await this.brandRepository.findOne({ 
      where: { id } 
    });
    if (!category) throw new NotFoundException(
      this.i18n.t('category.MSJ_CATEGORIA_NO_ENCONTRADA', { lang })
    );
    return category;
  }

  async create(
    lang: string, 
    brandData: CreateBrandDto, 
    userId: number
  ) {
    try {
      const exists = await this.brandRepository.findOne({ where: { nombre: brandData.nombre } });
      if (exists) throw new NotFoundException(
        this.i18n.t('category.MSJ_ERROR_EXISTE', { lang })
      );

      await this.brandRepository.save(brandData);
      return {
        'title': this.i18n.t('category.MSJ_TITTLE', { lang }),
        'message': this.i18n.t('category.MSJ_CREADO_EXITOSAMENTE', { lang }),
        'status': 200,
      };
    } catch (error) {
      return {
        'title': error.response?.error || 'Error',
        'message': error.response?.message || error.message,
        'status': 404,
      };
    }
  }

  async update(
    lang: string, 
    id: number, 
    brandData: UpdateBrandDto, 
    userId: number
  ) {
    const brand = await this.findOne(lang, id);
    
    return this.brandRepository.save({
      ...brand,
      ...brandData
    });
  }

  async remove(lang: string, ids: number[], userId: number) {

    // const categorias = await this.categoryRepository.find({
    //   where: { id: In(ids) },
    //   relations: { productos: true },
    // });
    
    // const resultado = categorias.map(cat => ({
    //   ...cat,
    //   total_productos: cat.productos.length
    // }));

    // const tieneHijos = categorias.some(cat => cat.productos.length > 0);
    
    // if (tieneHijos) {
    //   return {
    //     title: this.i18n.t('categoria.MSJ_PERMISO_TITTLE', { lang }),
    //     message: this.i18n.t('categoria.MSJ_ERROR_PERMISO_TIENE_PRODUCTOS_HIJOS', { lang }),
    //     status: 400, 
    //   };
    // }

    // this.categoryRepository.delete({ id: In(ids) })

    // return {
    //     'title': this.i18n.t('categoria.MSJ_CATEGORY_TITTLE', { lang }),
    //     'message': this.i18n.t('categoria.MSN_PERMISO_REMOVIDO_OK', { lang }),
    //     'status': 200,
    // };
  }
}
