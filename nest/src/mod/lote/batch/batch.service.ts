import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBatchDto } from './dto/create-batch.dto';
import { UpdateBatchDto } from './dto/update-batch.dto';
import { Lote } from './entities/batch.entity';
import { I18nService } from 'nestjs-i18n';
import { Like, Repository } from 'typeorm';
import { FilterBatchDto } from './dto/filter-batch.dto';

@Injectable()
export class BatchService {

  constructor(
    @Inject('BATCH_REPOSITORY')
    private batchRepository: Repository<Lote>,
    private i18n: I18nService
  ) {}

  listarPropiedadesTabla(repository: Repository<any>) {
    const metadata = repository.metadata;
    return metadata.columns.map((column) => column.propertyName);
  }

  async findAll(filterDto: FilterBatchDto, lang: string) {
    const { limit, page, field = 'id', order = 'ASC' } = filterDto;

    if (!page || !limit) {
      throw new NotFoundException(
        this.i18n.t('category.MSJ_ERROR_PARAMETRO_LISTA_NO_ENVIADO', { lang })
      );
    }

    const propiedades = this.listarPropiedadesTabla(this.batchRepository);
    if (!propiedades.includes(field)) {
      throw new NotFoundException(
        this.i18n.t('category.MSJ_ERROR_PARAMETRO_NO_EXISTE', { lang, args: { field } })
      );
    }

    const skipReal = (page == 1) ? 0 : (page - 1) * limit;

    const where: any = {};
    
    // precisos y entre
    if (filterDto.fecha_entrada) where.fecha_entrada = Like(`%${filterDto.fecha_entrada}%`);
    if (filterDto.fecha_vencimiento) where.fecha_vencimiento = Like(`%${filterDto.fecha_vencimiento}%`);
    if (filterDto.cantidad_en_bodega) where.cantidad_en_bodega = filterDto.cantidad_en_bodega;
    if (filterDto.cantidad_comprada) where.cantidad_comprada = filterDto.cantidad_comprada;
    if (filterDto.cantidad_vendida) where.cantidad_vendida = filterDto.cantidad_vendida;
    
    // precisos
    if (filterDto.estado) where.estado = Like(`%${filterDto.estado}%`);
    if (filterDto.id_producto) where.id_producto = filterDto.id_producto;
    if (filterDto.id_proveedor) where.id_proveedor = filterDto.id_proveedor;
    if (filterDto.lote) where.lote = filterDto.lote;

    const peticion = async (page) => {
      return await this.batchRepository.find({
        skip: page,
        take: limit,
        where: where,
        order: {
          [field]: order
        },
        relations: {
          id_producto: true,
          id_proveedor: true,
          mermas: true,
        }
      })
    }

    const totalRecords = async () => {
      return await this.batchRepository.count({
        where: where
      })
    }

    return [{
      'result': await peticion(skipReal),
      'pagination': {
        'page': page,
        'perPage': limit,
        'previou': (page == 1) ? null : page-1,
        'next': (await peticion(page*limit)).length == 0 ? null : page+1 ,
        'totalRecord': await totalRecords()
      },
      'order':{
        'order': order,
        'field': field
      }
    }]
  }

  async findOne(
    lang: string, 
    id: number
  ) {
    const category = await this.batchRepository.findOne({ 
      where: { id } 
    });
    if (!category) throw new NotFoundException(
      this.i18n.t('batch.MSJ_BATCH_NO_ENCONTRADA', { lang })
    );
    return category;
  }

  async create(
    lang: string, 
    batchData: CreateBatchDto, 
    userId: number
  ) {
    try {

      // X = Y = Z (CREO) (ACTUALIZO)
      // X != Y = Z (CREO)
      // X = Y != Z (CREO)
      // X != Y != Z (CREO)
      

      // necesitamos un identificador unico asignado por el comercio
      
      await this.batchRepository.save(batchData);
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
}
