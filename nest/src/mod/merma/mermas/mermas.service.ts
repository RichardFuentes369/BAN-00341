import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMermaDto } from './dto/create-merma.dto';
import { UpdateMermaDto } from './dto/update-merma.dto';
import { Like, Repository } from 'typeorm';
import { Merma } from './entities/merma.entity';
import { I18nService } from 'nestjs-i18n';
import { FilterRegistroMermaDto } from './dto/filter-merma.dto';

@Injectable()
export class MermasService {

  constructor(
    @Inject('MERMA_REPOSITORY')
    private mermaRepository: Repository<Merma>,
    private i18n: I18nService
  ) { }

  listarPropiedadesTabla(repository: Repository<any>) {
    const metadata = repository.metadata;
    return metadata.columns.map((column) => column.propertyName);
  }

  async findAll(filterDto: FilterRegistroMermaDto, lang: string) {
    const { limit, page, field = 'id', order = 'ASC' } = filterDto;

    if (!page || !limit) {
      throw new NotFoundException(
        this.i18n.t('category.MSJ_ERROR_PARAMETRO_LISTA_NO_ENVIADO', { lang })
      );
    }

    const propiedades = this.listarPropiedadesTabla(this.mermaRepository);
    if (!propiedades.includes(field)) {
      throw new NotFoundException(
        this.i18n.t('category.MSJ_ERROR_PARAMETRO_NO_EXISTE', { lang, args: { field } })
      );
    }

    const skipReal = (page == 1) ? 0 : (page - 1) * limit;

    const where: any = {};

    // precisos y entre
    if (filterDto.cantidad) where.cantidad = filterDto.cantidad;
    if (filterDto.fecha_reporte) where.fecha_reporte = filterDto.fecha_reporte;
    if (filterDto.valor_perdido) where.valor_perdido = filterDto.valor_perdido;
    if (filterDto.observaciones) where.observaciones = filterDto.observaciones;
    if (filterDto.id_tipo_merma) where.id_tipo_merma = filterDto.id_tipo_merma;
    if (filterDto.id_lote) where.id_lote = filterDto.id_lote;

    const peticion = async (page) => {
      return await this.mermaRepository.find({
        skip: page,
        take: limit,
        where: where,
        order: {
          [field]: order
        }
      })
    }

    const totalRecords = async () => {
      return await this.mermaRepository.count({
        where: where
      })
    }

    return [{
      'result': await peticion(skipReal),
      'pagination': {
        'page': page,
        'perPage': limit,
        'previou': (page == 1) ? null : page - 1,
        'next': (await peticion(page * limit)).length == 0 ? null : page + 1,
        'totalRecord': await totalRecords()
      },
      'order': {
        'order': order,
        'field': field
      }
    }]
  }

  async findOne(
    lang: string,
    id: number
  ) {
    const category = await this.mermaRepository.findOne({
      where: { id }
    });
    if (!category) throw new NotFoundException(
      this.i18n.t('batch.MSJ_BATCH_NO_ENCONTRADA', { lang })
    );
    return category;
  }
}
