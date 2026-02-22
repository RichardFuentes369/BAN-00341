import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTipoDto } from './dto/create-tipo.dto';
import { UpdateTipoDto } from './dto/update-tipo.dto';
import { In, Like, Repository } from 'typeorm';
import { Tipo } from './entities/tipo.entity';
import { I18nService } from 'nestjs-i18n';
import { FilterTipoMermarDto } from './dto/filter-tipo.dto';

@Injectable()
export class TiposService {
  constructor(
    @Inject('TIPOS_MERMA_REPOSITORY')
    private tipoMermaRepository: Repository<Tipo>,
    private i18n: I18nService
  ) {}

  listarPropiedadesTabla(repository: Repository<any>) {
    const metadata = repository.metadata;
    return metadata.columns.map((column) => column.propertyName);
  }

  async findAll(filterDto: FilterTipoMermarDto, lang: string) {
    const { limit, page, field = 'id', order = 'ASC' } = filterDto;

    if (!page || !limit) {
      throw new NotFoundException(
        this.i18n.t('category.MSJ_ERROR_PARAMETRO_LISTA_NO_ENVIADO', { lang })
      );
    }

    const propiedades = this.listarPropiedadesTabla(this.tipoMermaRepository);
    if (!propiedades.includes(field)) {
      throw new NotFoundException(
        this.i18n.t('category.MSJ_ERROR_PARAMETRO_NO_EXISTE', { lang, args: { field } })
      );
    }

    const skipReal = (page == 1) ? 0 : (page - 1) * limit;

    const where: any = {};
    if (filterDto.nombre) where.nombre = Like(`%${filterDto.nombre}%`);

    const [tipo_merma, totalRecords] = await this.tipoMermaRepository.findAndCount({
      where,
      order: {
        [field]: order.toUpperCase() as 'ASC' | 'DESC',
      },
      skip: skipReal,
      take: limit,
    });

    const result = tipo_merma.map(tipo_merma => {
      const totalReportados = tipo_merma.mermas ? tipo_merma.mermas.length : 0;
      
      const { mermas, ...resto } = tipo_merma; 
      
      return {
        ...resto,
        totalReportados
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
    const tipo_merma = await this.tipoMermaRepository.findOne({ 
      where: { id } 
    });
    if (!tipo_merma) throw new NotFoundException(
      this.i18n.t('category.MSJ_CATEGORIA_NO_ENCONTRADA', { lang })
    );
    return tipo_merma;
  }

  async create(
    lang: string, 
    tipoData: CreateTipoDto, 
    userId: number
  ) {
    try {
      const exists = await this.tipoMermaRepository.findOne({ where: { nombre: tipoData.nombre } });
      if (exists) throw new NotFoundException(
        this.i18n.t('category.MSJ_ERROR_EXISTE', { lang })
      );

      await this.tipoMermaRepository.save(tipoData);
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
    tipoData: UpdateTipoDto, 
    userId: number
  ) {
    const category = await this.findOne(lang, id);
    
    return this.tipoMermaRepository.save({
      ...category,
      ...tipoData
    });
  }

  async remove(lang: string, ids: number[], userId: number) {

    const tipo_merma = await this.tipoMermaRepository.find({
      where: { id: In(ids) },
      relations: { mermas: true },
    });
    
    const resultado = tipo_merma.map(cat => ({
      ...cat,
      total_productos: cat.mermas.length
    }));

    const tieneHijos = tipo_merma.some(cat => cat.mermas.length > 0);
    
    if (tieneHijos) {
      return {
        title: this.i18n.t('categoria.MSJ_PERMISO_TITTLE', { lang }),
        message: this.i18n.t('categoria.MSJ_ERROR_PERMISO_TIENE_PRODUCTOS_HIJOS', { lang }),
        status: 400, 
      };
    }

    this.tipoMermaRepository.delete({ id: In(ids) })

    return {
        'title': this.i18n.t('categoria.MSJ_CATEGORY_TITTLE', { lang }),
        'message': this.i18n.t('categoria.MSN_PERMISO_REMOVIDO_OK', { lang }),
        'status': 200,
    };
  }
}
