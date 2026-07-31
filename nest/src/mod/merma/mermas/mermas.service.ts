import { Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { CreateMermaDto } from './dto/create-merma.dto';
import { UpdateMermaDto } from './dto/update-merma.dto';
import { Between, In, LessThanOrEqual, Like, MoreThanOrEqual, Repository } from 'typeorm';
import { Merma } from './entities/merma.entity';
import { I18nService } from 'nestjs-i18n';
import { FilterRegistroMermaDto } from './dto/filter-merma.dto';
import { WarehouseService } from '@module/bodega/warehouse/warehouse.service';
import * as ExcelJS from 'exceljs';

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

    // precisos y entre
    const cant_afec_min = filterDto['cantidad_afectada_minimo'] ? parseInt(filterDto['cantidad_afectada_minimo']) : null;
    const cant_afec_max = filterDto['cantidad_afectada_maximo'] ? parseInt(filterDto['cantidad_afectada_maximo']) : null;
    if (cant_afec_min !== null && cant_afec_max !== null) {
      where.cantidad = Between(cant_afec_min, cant_afec_max);
    } else if (cant_afec_min !== null) {
      where.cantidad = MoreThanOrEqual(cant_afec_min);
    } else if (cant_afec_max !== null) {
      where.cantidad = LessThanOrEqual(cant_afec_max);
    }


    const parseDateParam = (param: any, esFinDelDia: boolean = false) => {
      if (!param) return null;

      // Si el parámetro es un string con formato de fecha (ej. "2026-12-02")
      if (typeof param === 'string' && param.includes('-')) {
        // Limpiamos por si acaso trae hora previa y nos quedamos solo con la fecha YYYY-MM-DD
        const soloFecha = param.split('T')[0];
        const [year, month, day] = soloFecha.split('-').map(Number);

        if (!year || !month || !day) return null;

        // Creamos el objeto Date asignando hora inicial o final según corresponda
        const dateObj = esFinDelDia
          ? new Date(year, month - 1, day, 23, 59, 59, 999) // 23:59:59.999
          : new Date(year, month - 1, day, 0, 0, 0, 0);     // 00:00:00.000

        if (isNaN(dateObj.getTime())) return null;
        return Math.floor(dateObj.getTime() / 1000); // Retorna en formato Unix (segundos)
      }

      // Si viene como número (timestamp)
      const num = Number(param);
      if (isNaN(num)) return null;

      return num > 10000000000 ? Math.floor(num / 1000) : num;
    };

    let inicioUnix: number;
    let finUnix: number;

    const fecha_reporte_min = parseDateParam(filterDto['fecha_reporte_minimo']);
    const fecha_reporte_max = parseDateParam(filterDto['fecha_reporte_maximo']);

    if (filterDto.year && fecha_reporte_min == undefined && fecha_reporte_max == undefined) {
      if (filterDto.year != 'null') {
        if (filterDto.month != 'null') {
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
      } else {
        const anioActual = new Date().getFullYear();
        const fechaInicio = new Date(anioActual, 0, 1, 0, 0, 0);
        const fechaFin = new Date(anioActual, 11, 31, 23, 59, 59);
        inicioUnix = Math.floor(fechaInicio.getTime() / 1000);
        finUnix = Math.floor(fechaFin.getTime() / 1000);
      }
      where.fecha_reporte = Between(inicioUnix, finUnix);
    }else{
      if (fecha_reporte_min !== null && fecha_reporte_max !== null) {
        where.fecha_reporte = Between(fecha_reporte_min, fecha_reporte_max);
      } else if (fecha_reporte_min !== null) {
        where.fecha_reporte = MoreThanOrEqual(fecha_reporte_min);
      } else if (fecha_reporte_max !== null) {
        where.fecha_reporte = LessThanOrEqual(fecha_reporte_max);
      }
    }


    const valor_perdido_min = filterDto['valor_perdido_minimo'] ? parseInt(filterDto['valor_perdido_minimo']) : null;
    const valor_perdido_max = filterDto['valor_perdido_maximo'] ? parseInt(filterDto['valor_perdido_maximo']) : null;

    if (valor_perdido_min !== null && valor_perdido_max !== null) {
      where.valor_perdido = Between(valor_perdido_min, valor_perdido_max);
    } else if (valor_perdido_min !== null) {
      where.valor_perdido = MoreThanOrEqual(valor_perdido_min);
    } else if (valor_perdido_max !== null) {
      where.valor_perdido = LessThanOrEqual(valor_perdido_max);
    }

    where.id_lote = where.id_lote || {};

    if (filterDto.lote) {
      where.id_lote.lote = filterDto.lote;
    }

    if (filterDto.codigo_barra) {
      where.id_lote.id_producto = {
        ...where.id_lote.id_producto,
        codigo_barra: filterDto.codigo_barra
      };
    }

    if (filterDto.observaciones) where.observaciones = Like(`%${filterDto.observaciones}`);
    if (filterDto.id_tipo_merma) where.id_tipo_merma = Like(`%${filterDto.id_tipo_merma}`);
    if (filterDto.id_lote) where.id_lote = Like(`%${filterDto.id_lote}`);

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

  async contadoresRegistro(year: string, month: string, lang: string) {
    const anio = (year && year !== 'null') ? parseInt(year, 10) : new Date().getFullYear();
    const mes = (month && month !== 'null') ? parseInt(month, 10) : null;

    let fechaInicio: Date;
    let fechaFin: Date;

    if (mes !== null) {
      fechaInicio = new Date(anio, mes - 1, 1, 0, 0, 0);
      fechaFin = new Date(anio, mes, 0, 23, 59, 59);
    } else {
      fechaInicio = new Date(anio, 0, 1, 0, 0, 0);
      fechaFin = new Date(anio, 11, 31, 23, 59, 59);
    }

    const inicioUnix = Math.floor(fechaInicio.getTime() / 1000);
    const finUnix = Math.floor(fechaFin.getTime() / 1000);

    const where: any = { fecha_reporte: Between(inicioUnix, finUnix) };

    const cont1 = await this.mermaRepository.count({ where });

    return {
      "count_total_register_merma": cont1,
    };
  }

  // reporte pendiente permisos
  async generarExcel(allParams: any, lang: string) {

    const where: any = {};

    const getSearchValue = (param: any) => {
      if (Array.isArray(param)) {
        const val = param.find(v => v !== 'true');
        return (val !== undefined && val !== '') ? val : null;
      }
      return (param !== 'true' && param !== '' && param !== undefined) ? param : null;
    };

    const formatDate = (timestamp: number | null | undefined) => {
      if (!timestamp) return '';

      const parsedTimestamp = timestamp < 10000000000 ? timestamp * 1000 : timestamp;

      const date = new Date(parsedTimestamp);
      if (isNaN(date.getTime())) return '';

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');

      return `${year}-${month}-${day}`;
    };

    const parseDateParam = (param: any, esFinDelDia: boolean = false) => {
      if (!param) return null;

      // Si el parámetro es un string con formato de fecha (ej. "2026-12-02")
      if (typeof param === 'string' && param.includes('-')) {
        // Limpiamos por si acaso trae hora previa y nos quedamos solo con la fecha YYYY-MM-DD
        const soloFecha = param.split('T')[0];
        const [year, month, day] = soloFecha.split('-').map(Number);

        if (!year || !month || !day) return null;

        // Creamos el objeto Date asignando hora inicial o final según corresponda
        const dateObj = esFinDelDia
          ? new Date(year, month - 1, day, 23, 59, 59, 999) // 23:59:59.999
          : new Date(year, month - 1, day, 0, 0, 0, 0);     // 00:00:00.000

        if (isNaN(dateObj.getTime())) return null;
        return Math.floor(dateObj.getTime() / 1000); // Retorna en formato Unix (segundos)
      }

      // Si viene como número (timestamp)
      const num = Number(param);
      if (isNaN(num)) return null;

      return num > 10000000000 ? Math.floor(num / 1000) : num;
    };

    const loteVal = getSearchValue(allParams.lote);
    const barcodeVal = getSearchValue(allParams.codigo_barra);

    if (loteVal || barcodeVal) {
      where.id_lote = {};
      if (loteVal) {
        where.id_lote.lote = Like(`%${loteVal}%`);
      }
      if (barcodeVal) {
        where.id_lote.id_producto = {
          codigo_barra: Like(`%${barcodeVal}%`),
        };
      }
    }

    const idTipoMermaVal = getSearchValue(allParams.id_tipo_merma);
    if (idTipoMermaVal) {
      where.id_tipo_merma = { id: Number(idTipoMermaVal) };
    }

    const fecha_reporte_min = parseDateParam(allParams['fecha_reporte_minimo']);
    const fecha_reporte_max = parseDateParam(allParams['fecha_reporte_maximo']);

    if (fecha_reporte_min !== null && fecha_reporte_max !== null) {
      where.fecha_reporte = Between(fecha_reporte_min, fecha_reporte_max);
    } else if (fecha_reporte_min !== null) {
      where.fecha_reporte = MoreThanOrEqual(fecha_reporte_min);
    } else if (fecha_reporte_max !== null) {
      where.fecha_reporte = LessThanOrEqual(fecha_reporte_max);
    }

    const cantidad_afectada_min = allParams['cantidad_afectada_minimo'] ? parseInt(allParams['cantidad_afectada_minimo']) : null;
    const cantidad_afectada_max = allParams['cantidad_afectada_maximo'] ? parseInt(allParams['cantidad_afectada_maximo']) : null;

    if (cantidad_afectada_min !== null && cantidad_afectada_max !== null) {
      where.cantidad = Between(cantidad_afectada_min, cantidad_afectada_max);
    } else if (cantidad_afectada_min !== null) {
      where.cantidad = MoreThanOrEqual(cantidad_afectada_min);
    } else if (cantidad_afectada_max !== null) {
      where.cantidad = LessThanOrEqual(cantidad_afectada_max);
    }

    const valor_perdido__min = allParams['valor_perdido_minimo'] ? parseInt(allParams['valor_perdido_minimo']) : null;
    const valor_perdido__max = allParams['valor_perdido_maximo'] ? parseInt(allParams['valor_perdido_maximo']) : null;

    if (valor_perdido__min !== null && valor_perdido__max !== null) {
      where.valor_perdido = Between(valor_perdido__min, valor_perdido__max);
    } else if (valor_perdido__min !== null) {
      where.valor_perdido = MoreThanOrEqual(valor_perdido__min);
    } else if (valor_perdido__max !== null) {
      where.valor_perdido = LessThanOrEqual(valor_perdido__max);
    }

    let inicioUnix: number;
    let finUnix: number;

    if (allParams['year']) {
      if (allParams['year'] != 'null') {
        if (allParams['month'] != 'null') {
          const fechaInicio = new Date(allParams['year'], allParams['month'] - 1, 1, 0, 0, 0);
          const fechaFin = new Date(allParams['year'], allParams['month'], 0, 23, 59, 59);
          inicioUnix = Math.floor(fechaInicio.getTime() / 1000);
          finUnix = Math.floor(fechaFin.getTime() / 1000);
        } else {
          const fechaInicio = new Date(allParams['year'], 0, 1, 0, 0, 0);
          const fechaFin = new Date(allParams['year'], 11, 31, 23, 59, 59);
          inicioUnix = Math.floor(fechaInicio.getTime() / 1000);
          finUnix = Math.floor(fechaFin.getTime() / 1000);
        }
        // where.fecha_reporte = Between(inicioUnix, finUnix);
      } else {
        const anioActual = new Date().getFullYear();
        const fechaInicio = new Date(anioActual, 0, 1, 0, 0, 0);
        const fechaFin = new Date(anioActual, 11, 31, 23, 59, 59);
        inicioUnix = Math.floor(fechaInicio.getTime() / 1000);
        finUnix = Math.floor(fechaFin.getTime() / 1000);
        // where.fecha_reporte = Between(inicioUnix, finUnix);
      }
      where.fecha_reporte = Between(inicioUnix, finUnix);
    }

    const data = await this.mermaRepository.find({
      where,
      relations: {
        id_tipo_merma: true,
        id_lote: {
          id_producto: {
            marca: true,
            medida: true
          }
        },
      },
    });

    // Mapeamos los datos extrayendo directamente el string del nombre
    const formattedData = data.map(item => {
      return {
        id: item.id ?? '',
        lote_producto: item.id_lote?.lote ?? '',
        codigo_barra_producto: item.id_lote?.id_producto?.codigo_barra ?? '',
        nombre_producto: item.id_lote?.id_producto?.nombre ?? '',
        tipo_merma: item.id_tipo_merma?.nombre ?? '',
        fecha_reporte: formatDate(item.fecha_reporte) ?? '',
        cantidad_afectada: item.cantidad ?? '',
        valor_perdido: item.valor_perdido ?? '',
        observacion: item.observacion ?? '',
      };
    });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Reporte de Productos');

    const masterColumns = [
      { header: 'Id', key: 'id', width: 10 },
      { header: 'Lote', key: 'lote_producto', width: 30 },
      { header: 'Codigo de barra', key: 'codigo_barra_producto', width: 30 },
      { header: 'Nombre del producto', key: 'nombre_producto', width: 30 },
      { header: 'Merma', key: 'tipo_merma', width: 30 },
      { header: 'Fecha reporte', key: 'fecha_reporte', width: 30 },
      { header: 'Cantidad afectada', key: 'cantidad_afectada', width: 30 },
      { header: 'Cantidad vendida', key: 'cantidad_vendida', width: 30 },
      { header: 'Valor afectado', key: 'valor_perdido', width: 30 },
      { header: 'Observacion', key: 'observacion', width: 30 },
    ];

    const dynamicColumns = masterColumns.filter(col => {
      const paramMap: Record<string, string> = {
        lote: 'lote',
        codigo_barra_producto: 'codigo_barra_producto',
        nombre_producto: 'nombre_producto',
        tipo_merma: 'tipo_merma',
        fecha_reporte: 'fecha_reporte',
        cantidad_afectada: 'cantidad_afectada',
        cantidad_vendida: 'cantidad_vendida',
        valor_perdido: 'valor_perdido',
        observacion: 'observacion',
      };

      const paramKey = paramMap[col.key] || col.key;
      const val = allParams[paramKey];

      // Si la columna no se envió o viene en false, se oculta por defecto
      if (val === undefined || val === false || val === 'false') {
        return false;
      }

      return Array.isArray(val) ? val.includes('true') : val === 'true';
    });

    worksheet.columns = dynamicColumns;
    worksheet.addRows(formattedData);
    return await workbook.xlsx.writeBuffer();
  }

  async generarCsv(allParams: any, lang: string) {

    const where: any = {};

    const getSearchValue = (param: any) => {
      if (Array.isArray(param)) {
        const val = param.find(v => v !== 'true');
        return (val !== undefined && val !== '') ? val : null;
      }
      return (param !== 'true' && param !== '' && param !== undefined) ? param : null;
    };

    const formatDate = (timestamp: number | null | undefined) => {
      if (!timestamp) return '';

      const parsedTimestamp = timestamp < 10000000000 ? timestamp * 1000 : timestamp;

      const date = new Date(parsedTimestamp);
      if (isNaN(date.getTime())) return '';

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');

      return `${year}-${month}-${day}`;
    };

    const parseDateParam = (param: any) => {
      if (!param) return null;

      if (typeof param === 'string' && param.includes('-')) {
        const dateObj = new Date(param);
        if (isNaN(dateObj.getTime())) return null;
        return Math.floor(dateObj.getTime() / 1000);
      }

      const num = Number(param);
      if (isNaN(num)) return null;

      return num > 10000000000 ? Math.floor(num / 1000) : num;
    };

    const loteVal = getSearchValue(allParams.lote);
    const barcodeVal = getSearchValue(allParams.codigo_barra);

    if (loteVal || barcodeVal) {
      where.id_lote = {};
      if (loteVal) {
        where.id_lote.lote = Like(`%${loteVal}%`);
      }
      if (barcodeVal) {
        where.id_lote.id_producto = {
          codigo_barra: Like(`%${barcodeVal}%`),
        };
      }
    }

    const idTipoMermaVal = getSearchValue(allParams.id_tipo_merma);
    if (idTipoMermaVal) {
      where.id_tipo_merma = { id: Number(idTipoMermaVal) };
    }

    const fecha_reporte_min = parseDateParam(allParams['fecha_reporte_minimo']);
    const fecha_reporte_max = parseDateParam(allParams['fecha_reporte_maximo']);

    if (fecha_reporte_min !== null && fecha_reporte_max !== null) {
      where.fecha_reporte = Between(fecha_reporte_min, fecha_reporte_max);
    } else if (fecha_reporte_min !== null) {
      where.fecha_reporte = MoreThanOrEqual(fecha_reporte_min);
    } else if (fecha_reporte_max !== null) {
      where.fecha_reporte = LessThanOrEqual(fecha_reporte_max);
    }

    const cantidad_afectada_min = allParams['cantidad_afectada_minimo'] ? parseInt(allParams['cantidad_afectada_minimo']) : null;
    const cantidad_afectada_max = allParams['cantidad_afectada_maximo'] ? parseInt(allParams['cantidad_afectada_maximo']) : null;

    if (cantidad_afectada_min !== null && cantidad_afectada_max !== null) {
      where.cantidad = Between(cantidad_afectada_min, cantidad_afectada_max);
    } else if (cantidad_afectada_min !== null) {
      where.cantidad = MoreThanOrEqual(cantidad_afectada_min);
    } else if (cantidad_afectada_max !== null) {
      where.cantidad = LessThanOrEqual(cantidad_afectada_max);
    }

    const valor_perdido__min = allParams['valor_perdido_minimo'] ? parseInt(allParams['valor_perdido_minimo']) : null;
    const valor_perdido__max = allParams['valor_perdido_maximo'] ? parseInt(allParams['valor_perdido_maximo']) : null;

    if (valor_perdido__min !== null && valor_perdido__max !== null) {
      where.valor_perdido = Between(valor_perdido__min, valor_perdido__max);
    } else if (valor_perdido__min !== null) {
      where.valor_perdido = MoreThanOrEqual(valor_perdido__min);
    } else if (valor_perdido__max !== null) {
      where.valor_perdido = LessThanOrEqual(valor_perdido__max);
    }

    let inicioUnix: number;
    let finUnix: number;

    if (allParams['year']) {
      if (allParams['year'] != 'null') {
        if (allParams['month'] != 'null') {
          const fechaInicio = new Date(allParams['year'], allParams['month'] - 1, 1, 0, 0, 0);
          const fechaFin = new Date(allParams['year'], allParams['month'], 0, 23, 59, 59);
          inicioUnix = Math.floor(fechaInicio.getTime() / 1000);
          finUnix = Math.floor(fechaFin.getTime() / 1000);
        } else {
          const fechaInicio = new Date(allParams['year'], 0, 1, 0, 0, 0);
          const fechaFin = new Date(allParams['year'], 11, 31, 23, 59, 59);
          inicioUnix = Math.floor(fechaInicio.getTime() / 1000);
          finUnix = Math.floor(fechaFin.getTime() / 1000);
        }
      } else {
        const anioActual = new Date().getFullYear();
        const fechaInicio = new Date(anioActual, 0, 1, 0, 0, 0);
        const fechaFin = new Date(anioActual, 11, 31, 23, 59, 59);
        inicioUnix = Math.floor(fechaInicio.getTime() / 1000);
        finUnix = Math.floor(fechaFin.getTime() / 1000);
      }
      where.fecha_reporte = Between(inicioUnix, finUnix);
    }

    const data = await this.mermaRepository.find({
      where,
      relations: {
        id_tipo_merma: true,
        id_lote: {
          id_producto: {
            marca: true,
            medida: true
          }
        },
      },
    });

    const formattedData = data.map(item => {
      return {
        id: item.id ?? '',
        lote_producto: item.id_lote?.lote ?? '',
        codigo_barra_producto: item.id_lote?.id_producto?.codigo_barra ?? '',
        nombre_producto: item.id_lote?.id_producto?.nombre ?? '',
        tipo_merma: item.id_tipo_merma?.nombre ?? '',
        fecha_reporte: formatDate(item.fecha_reporte) ?? '',
        cantidad_afectada: item.cantidad ?? '',
        valor_perdido: item.valor_perdido ?? '',
        observacion: item.observacion ?? '',
      };
    });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Reporte de Productos');

    const masterColumns = [
      { header: 'Id', key: 'id', width: 10 },
      { header: 'Lote', key: 'lote_producto', width: 30 },
      { header: 'Codigo de barra', key: 'codigo_barra_producto', width: 30 },
      { header: 'Nombre del producto', key: 'nombre_producto', width: 30 },
      { header: 'Merma', key: 'tipo_merma', width: 30 },
      { header: 'Fecha reporte', key: 'fecha_reporte', width: 30 },
      { header: 'Cantidad afectada', key: 'cantidad_afectada', width: 30 },
      { header: 'Cantidad vendida', key: 'cantidad_vendida', width: 30 },
      { header: 'Valor afectado', key: 'valor_perdido', width: 30 },
      { header: 'Observacion', key: 'observacion', width: 30 },
    ];

    const dynamicColumns = masterColumns.filter(col => {
      const paramMap: Record<string, string> = {
        lote: 'lote',
        codigo_barra_producto: 'codigo_barra_producto',
        nombre_producto: 'nombre_producto',
        tipo_merma: 'tipo_merma',
        fecha_reporte: 'fecha_reporte',
        cantidad_afectada: 'cantidad_afectada',
        cantidad_vendida: 'cantidad_vendida',
        valor_perdido: 'valor_perdido',
        observacion: 'observacion',
      };

      const paramKey = paramMap[col.key] || col.key;
      const val = allParams[paramKey];

      if (val === undefined || val === false || val === 'false') {
        return false;
      }

      return Array.isArray(val) ? val.includes('true') : val === 'true';
    });

    worksheet.columns = dynamicColumns;
    worksheet.addRows(formattedData);

    // Cambiado de xlsx a csv para retornar el buffer en texto plano separado por comas
    return await workbook.csv.writeBuffer();
  }

}
