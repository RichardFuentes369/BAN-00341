import { HttpException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { In, Like, Repository } from 'typeorm';
import { Categoria } from './entities/category.entity';
import { FilterCategoryrDto } from '@module/catalogo/category/dto/filter-category.dto';
import { I18nService } from 'nestjs-i18n';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @Inject('CATEGORY_REPOSITORY')
    private categoryRepository: Repository<Categoria>,
    private i18n: I18nService
  ) {}

  listarPropiedadesTabla(repository: Repository<any>) {
    const metadata = repository.metadata;
    return metadata.columns.map((column) => column.propertyName);
  }

  async findAll(filterDto: FilterCategoryrDto, lang: string) {
    const { limit, page, field = 'id', order = 'ASC' } = filterDto;

    if (!page || !limit) {
      throw new NotFoundException(
        this.i18n.t('category.MSJ_ERROR_PARAMETRO_LISTA_NO_ENVIADO', { lang })
      );
    }

    const propiedades = this.listarPropiedadesTabla(this.categoryRepository);
    if (!propiedades.includes(field)) {
      throw new NotFoundException(
        this.i18n.t('category.MSJ_ERROR_PARAMETRO_NO_EXISTE', { lang, args: { field } })
      );
    }

    const skipReal = (page == 1) ? 0 : (page - 1) * limit;

    const where: any = {};
    if (filterDto.nombre) where.nombre = Like(`%${filterDto.nombre}%`);
    if (filterDto.descripcion) where.descripcion = Like(`%${filterDto.descripcion}%`);

    const [categorias, totalRecords] = await this.categoryRepository.findAndCount({
      where,
      relations: {
        productos: true, 
      },
      order: {
        [field]: order.toUpperCase() as 'ASC' | 'DESC',
      },
      skip: skipReal,
      take: limit,
    });

    const result = categorias.map(categoria => {
      const totalProductos = categoria.productos ? categoria.productos.length : 0;
      
      const { productos, ...resto } = categoria; 
      
      return {
        ...resto,
        totalProductos
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
    const category = await this.categoryRepository.findOne({ 
      where: { id } 
    });
    if (!category) throw new NotFoundException(
      this.i18n.t('category.MSJ_CATEGORIA_NO_ENCONTRADA', { lang })
    );
    return category;
  }

  async create(
    lang: string, 
    categoryData: CreateCategoryDto, 
    userId: number
  ) {
    try {
      const exists = await this.categoryRepository.findOne({ where: { nombre: categoryData.nombre } });
      if (exists) throw new NotFoundException(
        this.i18n.t('categoria.MSJ_ERROR_CATEGORY_EXISTE', { lang })
      );

      await this.categoryRepository.save(categoryData);
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
    categoryData: UpdateCategoryDto, 
    userId: number
  ) {
    const exists = await this.categoryRepository.findOne({ where: { nombre: categoryData.nombre } });
    if (exists) throw new NotFoundException(
      this.i18n.t('categoria.MSJ_ERROR_CATEGORY_EXISTE', { lang })
    );

    const category = await this.findOne(lang, id);
    
    return this.categoryRepository.save({
      ...category,
      ...categoryData
    });
  }

  async remove(lang: string, ids: number[], userId: number) {

    const categorias = await this.categoryRepository.find({
      where: { id: In(ids) },
      relations: { productos: true },
    });
    
    const resultado = categorias.map(cat => ({
      ...cat,
      total_productos: cat.productos.length
    }));

    const tieneHijos = categorias.some(cat => cat.productos.length > 0);
    
    if (tieneHijos) {
      return {
        title: this.i18n.t('categoria.MSJ_PERMISO_TITTLE', { lang }),
        message: this.i18n.t('categoria.MSJ_ERROR_PERMISO_TIENE_PRODUCTOS_HIJOS', { lang }),
        status: 400, 
      };
    }

    this.categoryRepository.delete({ id: In(ids) })

    return {
        'title': this.i18n.t('categoria.MSJ_CATEGORY_TITTLE', { lang }),
        'message': this.i18n.t('categoria.MSN_PERMISO_REMOVIDO_OK', { lang }),
        'status': 200,
    };
  }

  async contadoresCategorias(
    lang: string
  ){
    const cont1 =  await this.categoryRepository.count()
    
    const data = {
      "count_total_categorys": cont1,
    }

    return data
  }
}