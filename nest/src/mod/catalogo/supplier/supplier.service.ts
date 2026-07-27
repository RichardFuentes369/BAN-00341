import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { In, Like, Repository } from 'typeorm';
import { Proveedor } from './entities/supplier.entity';
import { FilterCategoryrDto } from '@module/catalogo/supplier/dto/filter-supplier.dto';
import { I18nService } from 'nestjs-i18n';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import * as ExcelJS from 'exceljs';

@Injectable()
export class SupplierService {
  constructor(
    @Inject('SUPPLIER_REPOSITORY')
    private supplierRepository: Repository<Proveedor>,
    private i18n: I18nService
  ) { }

  listarPropiedadesTabla(repository: Repository<any>) {
    const metadata = repository.metadata;
    return metadata.columns.map((column) => column.propertyName);
  }

  async findAll(filterDto: FilterCategoryrDto, lang: string) {
    const { limit, page, field = 'id', order = 'ASC' } = filterDto;

    if (!page || !limit) throw new NotFoundException(
      this.i18n.t('proveedor.MSJ_ERROR_PARAMETRO_LISTA_NO_ENVIADO', { lang })
    );

    const propiedades = this.listarPropiedadesTabla(this.supplierRepository);
    if (!propiedades.includes(field)) {
      throw new NotFoundException(
        this.i18n.t('proveedor.MSJ_ERROR_PARAMETRO_NO_EXISTE', { lang, args: { field } })
      );
    }

    const skipReal = (page == 1) ? 0 : (page - 1) * limit;
    const where: any = {};

    if (filterDto['razon_social']) {
      where.razon_social = Like(`%${filterDto['razon_social']}%`);
    }
    if (filterDto['nit']) {
      where.nit = Like(`%${filterDto['nit']}%`);
    }
    if (filterDto['correo']) {
      where.correo = Like(`%${filterDto['correo']}%`);
    }

    const totalRecords = await this.supplierRepository.count({ where });
    const result = await this.supplierRepository.find({
      skip: skipReal,
      take: limit,
      where: where,
      order: { [field]: order }
    });

    const data = result.map(s => ({
      ...s,
      nitCompleto: s.fullNit
    }));

    return [{
      'result': data,
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
    const supplier = await this.supplierRepository.findOne({ where: { id } });
    if (!supplier) throw new NotFoundException(
      this.i18n.t('proveedor.MSJ_PROVEEDOR_NO_ENCONTRADO', { lang })
    );
    return supplier;
  }

  async findOneForNit(lang: string, _nit: string) {
    const supplier = await this.supplierRepository.findOne({ where: { nit: _nit } });
    if (!supplier) throw new NotFoundException(
      this.i18n.t('proveedor.MSJ_PROVEEDOR_NO_ENCONTRADO', { lang })
    );
    return supplier;
  }

  async create(
    lang: string,
    supplierData: CreateSupplierDto,
    userId: number
  ) {
    try {
      // Validar si el NIT ya existe
      const exists = await this.supplierRepository.findOne({ where: { nit: supplierData.nit } });
      if (exists) throw new NotFoundException(
        this.i18n.t('proveedor.MSJ_ERROR_NIT_EXISTE', { lang })
      );

      await this.supplierRepository.save(supplierData);
      return {
        'title': this.i18n.t('proveedor.MSJ_TITTLE', { lang }),
        'message': this.i18n.t('proveedor.MSJ_CREADO_EXITOSAMENTE', { lang }),
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
    supplierData: UpdateSupplierDto,
    userId: number
  ) {

    const supplier = await this.findOne(lang, id);
    const exists = await this.supplierRepository.findOne({ where: { nit: supplierData.nit } });

    if (supplier.nit != supplierData.nit && exists) throw new NotFoundException(
      this.i18n.t('proveedor.MSJ_ERROR_NIT_EXISTE', { lang })
    );

    return this.supplierRepository.save({
      ...supplier,
      ...supplierData
    });
  }

  async remove(lang: string, ids: number[], userId: number) {
    return this.supplierRepository.delete({ id: In(ids) });
  }

  async contadoresProveedores(
    lang: string
  ) {
    const cont1 = await this.supplierRepository.count()

    const data = {
      "count_total_suppliers": cont1,
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

    const razonVal = getSearchValue(allParams.razon_social);
    if (razonVal) where.razon_social = Like(`%${razonVal}%`);

    const direccionVal = getSearchValue(allParams.direccion);
    if (direccionVal) where.direccion = Like(`%${direccionVal}%`);

    const correoVal = getSearchValue(allParams.correo);
    if (correoVal) where.correo = Like(`%${correoVal}%`);
    
    const telefonoVal = getSearchValue(allParams.telefono);
    if (telefonoVal) where.telefono = Like(`%${telefonoVal}%`);

    const nitVal = getSearchValue(allParams.nit);
    if (nitVal) where.nit = Like(`%${nitVal}%`);

    const dvVal = getSearchValue(allParams.dv);
    if (dvVal) where.dv = Like(`%${dvVal}%`);

    const data = await this.supplierRepository.find({ where });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Reporte de Proveedores');

    const masterColumns = [
      { header: 'Id', key: 'id', width: 10 },
      { header: 'Razon social', key: 'razon_social', width: 30 },
      { header: 'Direccion', key: 'direccion', width: 20 },
      { header: 'Correo', key: 'correo', width: 20 },
      { header: 'Telefono', key: 'telefono', width: 15 },
      { header: 'Nit', key: 'nit', width: 15 },
      { header: 'Dv', key: 'dv', width: 15 },
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

    const razonVal = getSearchValue(allParams.razon_social);
    if (razonVal) where.razon_social = Like(`%${razonVal}%`);

    const direccionVal = getSearchValue(allParams.direccion);
    if (direccionVal) where.direccion = Like(`%${direccionVal}%`);

    const correoVal = getSearchValue(allParams.correo);
    if (correoVal) where.correo = Like(`%${correoVal}%`);
    
    const telefonoVal = getSearchValue(allParams.telefono);
    if (telefonoVal) where.telefono = Like(`%${telefonoVal}%`);

    const nitVal = getSearchValue(allParams.nit);
    if (nitVal) where.nit = Like(`%${nitVal}%`);

    const dvVal = getSearchValue(allParams.dv);
    if (dvVal) where.dv = Like(`%${dvVal}%`);

    const data = await this.supplierRepository.find({ where });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Reporte de Proveedores');

    const masterColumns = [
      { header: 'Id', key: 'id', width: 10 },
      { header: 'Razon social', key: 'razon_social', width: 30 },
      { header: 'Direccion', key: 'direccion', width: 20 },
      { header: 'Correo', key: 'correo', width: 20 },
      { header: 'Telefono', key: 'telefono', width: 15 },
      { header: 'Nit', key: 'nit', width: 15 },
      { header: 'Dv', key: 'dv', width: 15 },
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