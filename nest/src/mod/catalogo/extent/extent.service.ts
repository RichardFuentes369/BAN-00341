import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateExtentDto } from './dto/create-extent.dto';
import { UpdateExtentDto } from './dto/update-extent.dto';
import { I18nService } from 'nestjs-i18n';
import { Between, In, LessThanOrEqual, Like, MoreThanOrEqual, Repository } from 'typeorm';
import { Extent } from './entities/extent.entity';
import { FilterExtentDto } from './dto/filter-extent.dto';
import * as ExcelJS from 'exceljs';

@Injectable()
export class ExtentService {
  constructor(
    @Inject('EXTENT_REPOSITORY')
    private extentRepository: Repository<Extent>,
    private i18n: I18nService
  ) { }

  listarPropiedadesTabla(repository: Repository<any>) {
    const metadata = repository.metadata;
    return metadata.columns.map((column) => column.propertyName);
  }

  async findAllList(lang: string) {
    const registro = await this.extentRepository.find();
    return [{
      'result': registro,
    }];
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
      relations: { productos: true }
    });

    const result = registros.map(marcas => {
      return {
        ...marcas,
        total1: marcas.productos ? marcas.productos.length : 0,
        productos: undefined
      };
    });

    // const min = filterDto['cantidad_minimo'] ? parseInt(filterDto['cantidad_minimo']) : null;
    // const max = filterDto['cantidad_maximo'] ? parseInt(filterDto['cantidad_maximo']) : null;

    // const registrosFiltrados = result.filter(item => {
    //   if (min !== null && max !== null) {
    //     return item.total1 >= min && item.total1 <= max;
    //   } else if (min !== null) {
    //     return item.total1 >= min;
    //   } else if (max !== null) {
    //     return item.total1 <= max;
    //   }
    //   return true;
    // });

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

  async contadoresExtent(
    lang: string
  ) {
    const cont1 = await this.extentRepository.count()

    const data = {
      "count_total_extent": cont1
    }

    return data
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

    const nombreVal = getSearchValue(allParams.nombre);
    if (nombreVal) where.nombre = Like(`%${nombreVal}%`);

    const data = await this.extentRepository.find({ where });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Reporte de Medida');

    const masterColumns = [
      { header: 'Id', key: 'id', width: 10 },
      { header: 'Nombre', key: 'nombre', width: 30 },
    ];

    const dynamicColumns = masterColumns.filter(col => {
      const val = allParams[col.key];
      return Array.isArray(val) ? val.includes('true') : val === 'true';
    });

    worksheet.columns = dynamicColumns;
    worksheet.addRows(data);
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

    const nombreVal = getSearchValue(allParams.nombre);
    if (nombreVal) where.nombre = Like(`%${nombreVal}%`);

    const data = await this.extentRepository.find({ where });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Reporte de Medida');

    const masterColumns = [
      { header: 'Id', key: 'id', width: 10 },
      { header: 'Nombre', key: 'nombre', width: 30 },
    ];

    const dynamicColumns = masterColumns.filter(col => {
      const val = allParams[col.key];
      return Array.isArray(val) ? val.includes('true') : val === 'true';
    });

    worksheet.columns = dynamicColumns;
    worksheet.addRows(data);

    return await workbook.csv.writeBuffer({
      formatterOptions: {
        delimiter: ',',
        quote: '"'
      }
    });
  }

}
