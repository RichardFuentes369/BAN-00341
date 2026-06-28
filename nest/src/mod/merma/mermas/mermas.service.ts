import { Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { CreateMermaDto } from './dto/create-merma.dto';
import { UpdateMermaDto } from './dto/update-merma.dto';
import { Between, In, Like, Repository } from 'typeorm';
import { Merma } from './entities/merma.entity';
import { I18nService } from 'nestjs-i18n';
import { FilterRegistroMermaDto } from './dto/filter-merma.dto';
import { WarehouseService } from '@module/bodega/warehouse/warehouse.service';

@Injectable()
export class MermasService {

  constructor(
    @Inject('MERMA_REPOSITORY')
    private mermaRepository: Repository<Merma>,

    @Inject(forwardRef(() => WarehouseService))
    private readonly warehouseService: WarehouseService,
    private i18n: I18nService
  ) { }

  listarPropiedadesTabla(repository: Repository<any>) {
    const metadata = repository.metadata;
    return metadata.columns.map((column) => column.propertyName);
  }

  async findHistoryMonth(filterDto: FilterRegistroMermaDto, lang: string) {
    const { limit, page } = filterDto;
    
    const MESES = {
      es: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
      en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      fr: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
      de: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"]
    };

    const langKey = MESES[lang] ? lang : 'es';
    const totalMeses = 12;

    // Generar todos los meses
    const todosLosMeses = MESES[langKey].map((nombre, index) => ({
      id: (index + 1).toString().padStart(2, '0'),
      numero: index + 1,
      nombre: nombre
    }));

    // Aplicar paginación sobre la lista estática
    const startIndex = (page - 1) * limit;
    const paginatedMeses = todosLosMeses.slice(startIndex, startIndex + limit);

    return [{
      result: paginatedMeses,
      pagination: {
        page: +page,
        perPage: +limit,
        totalRecord: totalMeses,
        totalPages: Math.ceil(totalMeses / limit),
        previous: (page > 1) ? page - 1 : null,
        next: ((page * limit) < totalMeses) ? page + 1 : null,
      }
    }];
  }

  async findHistory(filterDto: FilterRegistroMermaDto, lang: string) {
    const { limit, page } = filterDto;
    const skipReal = (page == 1) ? 0 : (page - 1) * limit;

    const rawAnios = await this.mermaRepository.query(`
        SELECT DISTINCT YEAR(FROM_UNIXTIME(fecha_reporte)) AS nombre 
        FROM mod_merma_mermas 
        ORDER BY nombre DESC 
        LIMIT ? OFFSET ?
    `, [limit, skipReal]);

    const aniosFormateados = rawAnios.map(r => ({ id: +r.nombre, nombre: r.nombre }));

    const totalAniosResult = await this.mermaRepository.query(`
        SELECT COUNT(DISTINCT YEAR(FROM_UNIXTIME(fecha_reporte))) as total 
        FROM mod_merma_mermas
    `);
    const totalAnios = totalAniosResult[0].total;

    return [{
      result: aniosFormateados,
      pagination: {
        page: +page,
        perPage: +limit,
        totalRecord: totalAnios,
        totalPages: Math.ceil(totalAnios / limit),
        previous: (page > 1) ? page - 1 : null,
        next: ((page * limit) < totalAnios) ? page + 1 : null,
      }
    }];
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

    // precisos y entre ... validar
    if (filterDto.cantidad) where.cantidad = Like(`%${filterDto.cantidad}`);
    if (filterDto.fecha_reporte) where.fecha_reporte = Like(`%${filterDto.fecha_reporte}`);
    if (filterDto.valor_perdido) where.valor_perdido = Like(`%${filterDto.valor_perdido}`);
    if (filterDto.observaciones) where.observaciones = Like(`%${filterDto.observaciones}`);
    if (filterDto.id_tipo_merma) where.id_tipo_merma = Like(`%${filterDto.id_tipo_merma}`);
    if (filterDto.id_lote) where.id_lote = Like(`%${filterDto.id_lote}`);

    if (filterDto.year) {
      let inicioUnix: number;
      let finUnix: number;

      if (filterDto.month) {
        const fechaInicio = new Date(+filterDto.year, +filterDto.month - 1, 1, 0, 0, 0);
        const fechaFin = new Date(+filterDto.year, +filterDto.month, 0, 23, 59, 59);
        inicioUnix = Math.floor(fechaInicio.getTime() / 1000);
        finUnix = Math.floor(fechaFin.getTime() / 1000);
      } else {
        const fechaInicio = new Date(+filterDto.year, 0, 1, 0, 0, 0);
        const fechaFin = new Date(+filterDto.year, 11, 31, 23, 59, 59);

        inicioUnix = Math.floor(fechaInicio.getTime() / 1000);
        finUnix = Math.floor(fechaFin.getTime() / 1000);
      }

      where.fecha_reporte = Between(inicioUnix, finUnix);
    }

    const peticion = async (page) => {
      return await this.mermaRepository.find({
        skip: page,
        take: limit,
        where: where,
        order: {
          [field]: order
        },
        relations: {
          id_tipo_merma: true,
          id_lote: {
            id_producto: {
              marca: true,
              medida: true
            }
          }
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
    const merma = await this.mermaRepository.findOne({
      where: { id },
      relations: {
        id_tipo_merma: true,
        id_lote: {
          id_producto: {
            medida: true,
            marca: true
          }
        },
      },
    });

    if (merma && merma.id_lote) {
      const result = await this.mermaRepository.createQueryBuilder('merma')
        .select('SUM(merma.cantidad)', 'total')
        .where('merma.id_lote = :loteId', { loteId: merma.id_lote.id })
        .getRawOne();

      merma.id_lote.total_mermas = parseInt(result.total) || 0;
    }

    if (!merma) throw new NotFoundException(
      this.i18n.t('batch.MSJ_BATCH_NO_ENCONTRADA', { lang })
    );
    return merma;
  }

  async create(
    lang: string,
    mermaData: CreateMermaDto,
    userId: number
  ) {
    try {
      const productoValido = await this.warehouseService.updateQuantities(mermaData, 1)

      await this.mermaRepository.save(mermaData);
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

  async remove(lang: string, ids: number[], userId: number) {
    const productoValido = await this.warehouseService.deleteQuantities(ids)

    this.mermaRepository.delete({ id: In(ids) })

    return {
      'title': this.i18n.t('categoria.MSJ_CATEGORY_TITTLE', { lang }),
      'message': this.i18n.t('categoria.MSN_PERMISO_REMOVIDO_OK', { lang }),
      'status': 200,
    };
  }

  async contadoresRegistro(
    lang: string
  ) {
    const cont1 = await this.mermaRepository.count()

    const data = {
      "count_total_register_merma": cont1,
    }

    return data
  }

}
