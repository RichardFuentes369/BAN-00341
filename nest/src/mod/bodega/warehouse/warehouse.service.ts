import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { Bodega } from './entities/warehouse.entity';
import { I18nService } from 'nestjs-i18n';
import { Like, Repository } from 'typeorm';
import { FilterWarehouseDto } from './dto/filter-warehouse.dto';
import { FilterWarehouseProductDTO } from './dto/filter-lote-producto.dto';

@Injectable()
export class WarehouseService {

  constructor(
    @Inject('WAREHOUSE_REPOSITORY')
    private batchRepository: Repository<Bodega>,
    private i18n: I18nService
  ) {}

  listarPropiedadesTabla(repository: Repository<any>) {
    const metadata = repository.metadata;
    return metadata.columns.map((column) => column.propertyName);
  }

  async findAll(filterDto: FilterWarehouseDto, lang: string) {
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
      const lotes = await this.batchRepository.find({
        skip: page,
        take: limit,
        where: where,
        order: {
          [field]: order
        },
        relations: {
          id_producto: {
            medida: true,
            marca: true
          },
          id_proveedor: true,
          mermas: true,
        }
      })

      return lotes.map(lote => ({
        ...lote,
        mermas: lote.mermas ? lote.mermas.reduce((total, m) => total + m.cantidad, 0) : 0
      }));
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
    const lote = await this.batchRepository.findOne({ 
      where: { id },
      relations: {
        id_producto: {
          marca: true,
          medida: true,
        },
        id_proveedor: true,
        mermas: true,
      }
    });

    if (!lote) {
      throw new NotFoundException(
        this.i18n.t('batch.MSJ_BATCH_NO_ENCONTRADA', { lang })
      );
    }

    return {
      ...lote,
        mermas: lote.mermas ? lote.mermas.reduce((total, m) => total + m.cantidad, 0) : 0
    };
  }  

  async create(
    lang: string, 
    warehouseData: CreateWarehouseDto, 
    userId: number
  ) {
    try {     

      // necesitamos un identificador unico asignado por el comercio
      
      await this.batchRepository.save(warehouseData);
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
    warehouseData: UpdateWarehouseDto, 
    userId: number
  ) {
    const exists = await this.batchRepository.findOne({ where: { id: id } });
    
    if (exists && exists.id != id) throw new NotFoundException(
      this.i18n.t('categoria.MSJ_ERROR_BRAND_EXISTE', { lang })
    );
    
    const batch = await this.findOne(lang, id);
    
    // return this.batchRepository.save({
    //   ...batch,
    //   ...warehouseData
    // });
  }

  async contadoresLote(
    lang: string
  ){
    const cont1 =  await this.batchRepository.count()
    
    const data = {
      "count_total_products": cont1,
    }

    return data
  }


  
  async findOneLoteProduct(
    lang: string,
    filterWarehouseProductDTO: FilterWarehouseProductDTO
  ) {

    const bodega = await this.batchRepository.findOne({
      where: {
        lote: filterWarehouseProductDTO.lote,             
        id_producto: { id: filterWarehouseProductDTO.id_producto }
      },
      relations: {
        id_producto: {
          medida: true,
          marca: true
        },
        id_proveedor: true,
        mermas: true,
      }
    })

    if (!bodega) {
      throw new NotFoundException(
        this.i18n.t('batch.MSJ_BATCH_NO_ENCONTRADA', { lang })
      );
    }

    return {
      ...bodega,
        mermas: bodega.mermas ? bodega.mermas.reduce((total, m) => total + m.cantidad, 0) : 0
    };

  }
}
