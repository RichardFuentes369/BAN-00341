import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { In, Like, Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { FilterCategoryrDto } from '@module/catalogo/category/dto/filter-category.dto';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class CategoryService {
  constructor(
    @Inject('CATEGORY_REPOSITORY') // Asegúrate de que el Provider coincida en tu módulo
    private categoryRepository: Repository<Category>,
    private i18n: I18nService
  ) {}

  listarPropiedadesTabla(repository: Repository<any>) {
    const metadata = repository.metadata;
    return metadata.columns.map((column) => column.propertyName);
  }

  async findAll(
    filterDto: FilterCategoryrDto, 
    lang: string
  ) {
    const { limit, page, field = 'id', order = 'ASC' } = filterDto;

    // Validaciones de parámetros obligatorios
    if (!page || !limit) throw new NotFoundException(
      this.i18n.t('category.MSJ_ERROR_PARAMETRO_LISTA_NO_ENVIADO', { lang })
    );

    // Validar si el campo de ordenamiento existe en la entidad
    const propiedades = this.listarPropiedadesTabla(this.categoryRepository);
    if (!propiedades.includes(field)) {
      throw new NotFoundException(
        this.i18n.t('category.MSJ_ERROR_PARAMETRO_NO_EXISTE', { lang, args: { field } })
      );
    }

    const skipReal = (page == 1) ? 0 : (page - 1) * limit;
    const where: any = {};

    if (filterDto.nombre) {
      where.nombre = Like(`%${filterDto.nombre}%`);
    }

    if (filterDto.descripcion) {
      where.descripcion = Like(`%${filterDto.descripcion}%`);
    }

    const peticion = async (offset: number) => {
      return await this.categoryRepository.find({
        skip: offset,
        take: limit,
        where: where,
        order: { [field]: order }
      });
    };

    const totalRecords = await this.categoryRepository.count({ where });

    return [{
      'result': await peticion(skipReal),
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
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) throw new NotFoundException(
      this.i18n.t('category.MSJ_CATEGORIA_NO_ENCONTRADA', { lang })
    );
    return category;
  }

  async create(lang: string, categoryData: Partial<Category>, userId: number) {
    try {
      // Opcional: Validar si ya existe una categoría con ese nombre
      const exists = await this.categoryRepository.findOne({ where: { nombre: categoryData.nombre } });
      if (exists) throw new NotFoundException(
        this.i18n.t('category.MSJ_ERROR_EXISTE', { lang })
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

  async update(lang: string, id: number, categoryData: Partial<Category>, userId: number) {
    const category = await this.findOne(lang, id);
    
    return this.categoryRepository.save({
      ...category,
      ...categoryData
    });
  }

  async remove(lang: string, ids: number[], userId: number) {
    return this.categoryRepository.delete({ id: In(ids) });
  }
}