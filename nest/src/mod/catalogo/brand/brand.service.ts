import { HttpException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { In, Like, Repository } from 'typeorm';
import { Marca } from './entities/brand.entity';
import { I18nService } from 'nestjs-i18n';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { FilterBrandDto } from './dto/filter-category.dto';
import { Producto } from '../product/entities/product.entity';

@Injectable()
export class BrandService {
  constructor(
    @Inject('BRAND_REPOSITORY')
    private brandRepository: Repository<Marca>,
    @Inject('PRODUCT_REPOSITORY')
    private productRepository: Repository<Producto>,
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

    const [registros, total] = await this.brandRepository.findAndCount({
      skip: skipReal,
      take: limit,
      where: where,
      order: { [field]: order },
      relations: { productos: true } 
    });

    const result = registros.map(marcas => {
      return {
        ...marcas,
        total1: marcas.productos ? marcas.productos.length : 0,
        productos: undefined 
      };
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
        this.i18n.t('categoria.MSJ_ERROR_BRAND_EXISTE', { lang })
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
    const exists = await this.brandRepository.findOne({ where: { nombre: brandData.nombre } });
    
    if (exists && exists.id != id) throw new NotFoundException(
      this.i18n.t('categoria.MSJ_ERROR_BRAND_EXISTE', { lang })
    );
    
    const brand = await this.findOne(lang, id);
    
    return this.brandRepository.save({
      ...brand,
      ...brandData
    });
  }

  async remove(lang: string, ids: number[], userId: number) {
    try {
      const marcas = await this.brandRepository.find({
        where: { id: In(ids) },
        relations: { productos: true },
      });
      
      const resultado = marcas.map(mar => ({
        ...mar,
        total_productos: mar.productos.length
      }));
  
      const tieneHijos = marcas.some(cat => cat.productos.length > 0);
      
      if (tieneHijos) {
        return {
          title: this.i18n.t('categoria.MSJ_MARCA_TITTLE', { lang }),
          message: this.i18n.t('categoria.MSJ_ERROR_MARCA_TIENE_PRODUCTOS_HIJOS', { lang }),
          status: 404, 
        };
      }
  
      this.brandRepository.delete({ id: In(ids) })
  
      return {
          'title': this.i18n.t('categoria.MSJ_CATEGORY_TITTLE', { lang }),
          'message': this.i18n.t('categoria.MSN_PERMISO_REMOVIDO_OK', { lang }),
          'status': 200,
      };
    } catch (error) {
      return {
        'title': this.i18n.t('categoria.MSJ_MARCA_TITTLE', { lang }),
        'message': this.i18n.t('categoria.MSJ_ERROR_MARCA_TIENE_PRODUCTOS_HIJOS', { lang }),
        'status': 404,
      }
    }

  }

  async listaMarcas(search: string) {
    return await this.brandRepository.find({
      where: { nombre: Like(`%${search}%`) },
      take: 20 
    });
  }

  async contadoresMarcas(
    lang: string
  ){
    const cont1 =  await this.brandRepository.count()

    const data = {
      "count_total_brands": cont1
    }

    return data
  }
}
