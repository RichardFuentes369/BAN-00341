import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateExtentDto } from './dto/create-extent.dto';
import { UpdateExtentDto } from './dto/update-extent.dto';
import { I18nService } from 'nestjs-i18n';
import { In, Like, Repository } from 'typeorm';
import { Extent } from './entities/extent.entity';
import { FilterExtentDto } from './dto/filter-extent.dto';

@Injectable()
export class ExtentService {
  constructor(
    @Inject('EXTENT_REPOSITORY')
    private extentRepository: Repository<Extent>,
    private i18n: I18nService
  ) {}

  listarPropiedadesTabla(repository: Repository<any>) {
    const metadata = repository.metadata;
    return metadata.columns.map((column) => column.propertyName);
  }

  async findAll(filterDto: FilterExtentDto, lang: string) {
    const { limit, page, field = 'id', order = 'ASC' } = filterDto;

    if (!page || !limit) throw new NotFoundException(
      this.i18n.t('supplier.MSJ_ERROR_PARAMETRO_LISTA_NO_ENVIADO', { lang })
    );

    const propiedades = this.listarPropiedadesTabla(this.extentRepository);
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

    const totalRecords = await this.extentRepository.count({ where });

    const [registros, total] = await this.extentRepository.findAndCount({
      skip: skipReal,
      take: limit,
      where: where,
      order: { [field]: order },
    });

    return [{
      'result': registros,
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
    const extent = await this.extentRepository.findOne({ 
      where: { id } 
    });
    if (!extent) throw new NotFoundException(
      this.i18n.t('category.MSJ_CATEGORIA_NO_ENCONTRADA', { lang })
    );
    return extent;
  }

  async create(
    lang: string, 
    extentDto: CreateExtentDto, 
    userId: number
  ) {
    try {
      const exists = await this.extentRepository.findOne({ where: { nombre: extentDto.nombre } });
      if (exists) throw new NotFoundException(
        this.i18n.t('categoria.MSJ_ERROR_BRAND_EXISTE', { lang })
      );

      await this.extentRepository.save(extentDto);
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
    extentData: UpdateExtentDto, 
    userId: number
  ) {
    const exists = await this.extentRepository.findOne({ where: { nombre: extentData.nombre } });

    if (exists && exists.id != id) throw new NotFoundException(
      this.i18n.t('categoria.MSJ_ERROR_BRAND_EXISTE', { lang })
    );

    const brand = await this.findOne(lang, id);
    
    return this.extentRepository.save({
      ...brand,
      ...extentData
    });
  }

  async remove(lang: string, ids: number[], userId: number) {
    try {  
      this.extentRepository.delete({ id: In(ids) })
  
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
  
  async contadoresMarcas(
    lang: string
  ){
    const cont1 =  await this.extentRepository.count()

    const data = {
      "count_total_extent": cont1
    }

    return data
  }

}
