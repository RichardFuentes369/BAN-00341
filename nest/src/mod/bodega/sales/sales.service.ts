import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Bodega } from '../warehouse/entities/warehouse.entity';
import { Between, DataSource, LessThanOrEqual, Like, MoreThanOrEqual, Repository } from 'typeorm';
import { Producto } from '@module/catalogo/product/entities/product.entity';
import { Ventas } from './entities/sale.entity';
import { I18nService } from 'nestjs-i18n';
import { FilterSaleDto } from './dto/filter-sale.dto';
import { DetailVentas } from './entities/detail.entity';

@Injectable()
export class SalesService {

  constructor(
    @Inject('SALES_REPOSITORY')
    private salesRepository: Repository<Ventas>,
    @Inject('SALES_DETAIL_REPOSITORY')
    private salesdetailRepository: Repository<DetailVentas>,
    private i18n: I18nService,
    @Inject('DATA_SOURCE')
    private dataSource: any
  ) { }

  listarPropiedadesTabla(repository: Repository<any>) {
    const metadata = repository.metadata;
    return metadata.columns.map((column) => column.propertyName);
  }

  async findAll(
    filterDto: FilterSaleDto,
    lang: string
  ) {

    const { limit, page, field = 'id', order = 'Asc' } = filterDto

    if (!filterDto.page && !filterDto.limit) throw new NotFoundException(
      this.i18n.t('user.MSJ_ERROR_PARAMETRO_LISTA_NO_ENVIADO', { lang, args: { field: field } })
    )

    if (field == '') throw new NotFoundException(
      this.i18n.t('user.MSJ_ERROR_PARAMETRO_CAMPO_FILTRO_NO_ENVIADO', { lang, args: { field: field } })
    )
    if (!filterDto.page) throw new NotFoundException(
      this.i18n.t('user.MSJ_ERROR_PARAMETRO_CAMPO_PAGE_NO_ENVIADO', { lang, args: { field: field } })
    )
    if (!filterDto.limit) throw new NotFoundException(
      this.i18n.t('user.MSJ_ERROR_PARAMETRO_CAMPO_LIMIT_NO_ENVIADO', { lang, args: { field: field } })
    )

    if (field != '') {
      const propiedades = this.listarPropiedadesTabla(this.salesRepository)
      const arratResult = propiedades.filter(obj => obj === field).length

      if (arratResult == 0) throw new NotFoundException(
        this.i18n.t('user.MSJ_ERROR_PARAMETRO_NO_EXISTE', { lang, args: { field: field } })
      )
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

    const skipeReal = (page == 1) ? 0 : (page - 1) * limit

    const where: any = {};

    const fecha_venta_min = parseDateParam(filterDto['fecha_venta_minimo']);
    const fecha_venta_max = parseDateParam(filterDto['fecha_venta_maximo'], true);

    if (fecha_venta_min !== null && fecha_venta_max !== null) {
      where.fecha_venta = Between(fecha_venta_min, fecha_venta_max);
    } else if (fecha_venta_min !== null) {
      where.fecha_venta = MoreThanOrEqual(fecha_venta_min);
    } else if (fecha_venta_max !== null) {
      where.fecha_venta = LessThanOrEqual(fecha_venta_max);
    }

    if (filterDto.nro_factura !== undefined && filterDto.nro_factura !== '') {
      where.nro_factura = filterDto.nro_factura;
    }

    const [registros, total] = await this.salesRepository.findAndCount({
      skip: skipeReal,
      take: limit,
      where: where,
      order: { [field]: order }
    });

    const result = registros.map(admin => {
      return {
        ...admin,
      };
    });

    return [{
      'result': result,
      'pagination': {
        'page': page,
        'perPage': limit,
        'previou': (page === 1) ? null : page - 1,
        'next': (skipeReal + limit < total) ? page + 1 : null,
        'totalRecord': total
      },
      'order': {
        'order': order,
        'field': field
      }
    }];
  }

  findOne(
    lang: string,
    id: number
  ) {
    return this.salesRepository.findOne({
      relations: ['detalle'],
      where: [{ id: id }],
      order: { id: 'DESC' }
    });
  }

  async findDetailSale(
    filterDto: FilterSaleDto,
    lang: string
  ) {
    const { limit, page, field = 'id', order = 'Asc' } = filterDto

    if (!filterDto.page && !filterDto.limit) throw new NotFoundException(
      this.i18n.t('user.MSJ_ERROR_PARAMETRO_LISTA_NO_ENVIADO', { lang, args: { field: field } })
    )

    if (field == '') throw new NotFoundException(
      this.i18n.t('user.MSJ_ERROR_PARAMETRO_CAMPO_FILTRO_NO_ENVIADO', { lang, args: { field: field } })
    )
    if (!filterDto.page) throw new NotFoundException(
      this.i18n.t('user.MSJ_ERROR_PARAMETRO_CAMPO_PAGE_NO_ENVIADO', { lang, args: { field: field } })
    )
    if (!filterDto.limit) throw new NotFoundException(
      this.i18n.t('user.MSJ_ERROR_PARAMETRO_CAMPO_LIMIT_NO_ENVIADO', { lang, args: { field: field } })
    )

    if (field != '') {
      const propiedades = this.listarPropiedadesTabla(this.salesdetailRepository);
      const arratResult = propiedades.filter((obj) => obj === field).length;
      if (arratResult == 0) throw new NotFoundException(
        this.i18n.t('user.MSJ_ERROR_PARAMETRO_NO_EXISTE', { lang, args: { field: field } })
      );
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

    const skipReal = (page == 1) ? 0 : (page - 1) * limit;

    const fecha_venta_min = parseDateParam(filterDto['fecha_venta_minimo']);
    const fecha_venta_max = parseDateParam(filterDto['fecha_venta_maximo'], true);

    // Creamos el QueryBuilder para DetailVentas haciendo JOIN con la venta
    const query = this.salesdetailRepository.createQueryBuilder('detalle')
      .leftJoinAndSelect('detalle.id_venta', 'venta');

    // Filtro por fecha mínima y máxima de la venta
    if (fecha_venta_min !== null && fecha_venta_max !== null) {
      query.andWhere('venta.fecha_venta BETWEEN :min AND :max', { min: fecha_venta_min, max: fecha_venta_max });
    } else if (fecha_venta_min !== null) {
      query.andWhere('venta.fecha_venta >= :min', { min: fecha_venta_min });
    } else if (fecha_venta_max !== null) {
      query.andWhere('venta.fecha_venta <= :max', { max: fecha_venta_max });
    }

    // Filtros adicionales
    if (filterDto.nro_factura !== undefined && filterDto.nro_factura !== '') {
      query.andWhere('venta.nro_factura = :nro_factura', { nro_factura: filterDto.nro_factura });
    }

    if (filterDto.lote !== undefined && filterDto.lote !== '') {
      query.andWhere('detalle.lote = :lote', { lote: filterDto.lote });
    }

    if (filterDto.codigo_barra !== undefined && filterDto.codigo_barra !== '') {
      query.andWhere('detalle.codigo_barra = :codigo_barra', { codigo_barra: filterDto.codigo_barra });
    }

    // Paginación y ordenamiento
    query.skip(skipReal).take(limit);

    // Validar el campo de ordenamiento para evitar inyecciones SQL
    const validFields = ['id', 'lote', 'codigo_barra', 'cantidad', 'valor_unitario', 'valor_total'];
    const sortField = validFields.includes(field) ? `detalle.${field}` : 'detalle.id';
    query.orderBy(sortField, order.toUpperCase() === 'DESC' ? 'DESC' : 'ASC');

    const [registros, total] = await query.getManyAndCount();

    const result = registros.map(admin => {
      return {
        ...admin,
      };
    });

    return [{
      'result': result,
      'pagination': {
        'page': page,
        'perPage': limit,
        'previou': (page === 1) ? null : page - 1,
        'next': (skipReal + limit < total) ? page + 1 : null,
        'totalRecord': total
      },
      'order': {
        'order': order,
        'field': field
      }
    }];
  }

  async create(
    lang: string,
    saleData: CreateSaleDto,
    userId: number
  ) {
    try {
      return await this.dataSource.transaction(async (manager) => {
        const detalles = saleData.detalle_factura;

        // 1. Primero creamos y guardamos la cabecera de la factura (Ventas)
        const nuevaFactura = manager.create(Ventas, {
          nro_factura: saleData.nro_factura,
          fecha_venta: saleData.fecha_venta,
        });

        const facturaGuardada = await manager.save(nuevaFactura);

        // 2. Procesamos el stock y guardamos cada detalle en DetailVentas
        for (const item of detalles) {
          const producto = await manager.findOne(Producto, {
            where: { codigo_barra: item.codigo_barra }
          });

          if (!producto) {
            throw new BadRequestException(
              `El producto con código de barra '${item.codigo_barra}' no existe en nuestro catálogo.`
            );
          }

          const productoBodega = await manager.findOne(Bodega, {
            where: {
              lote: item.lote,
              id_producto: producto,
            },
          });

          if (!productoBodega) {
            throw new BadRequestException(
              `El producto con lote '${item.lote}' no existe en bodega.`
            );
          }

          const cantidadVendida = Number(item.cantidad);
          const cantidadBodega = Number(productoBodega.cantidad_en_bodega);

          if (cantidadVendida > cantidadBodega) {
            throw new BadRequestException(
              `Stock insuficiente para el lote '${item.lote}'. Stock actual: ${cantidadBodega}, solicitado: ${cantidadVendida}.`
            );
          }

          // Descontar y actualizar inventario
          productoBodega.cantidad_en_bodega = cantidadBodega - cantidadVendida;
          productoBodega.cantidad_vendida += cantidadVendida;
          await manager.save(productoBodega);

          // Crear el detalle de venta asociado a la factura y guardar con el manager
          const nuevoDetalle = manager.create(DetailVentas, {
            id_venta: facturaGuardada.id,
            lote: item.lote,
            codigo_barra: item.codigo_barra,
            cantidad: item.cantidad,
            valor_unitario: item.valor_unitario,
            valor_total: item.valor_total,
          });

          await manager.save(nuevoDetalle);
        }

        return {
          'title': this.i18n.t('supplier.MSJ_TITTLE', { lang }),
          'message': this.i18n.t('supplier.MSJ_CREADO_EXITOSAMENTE', { lang }),
          'status': 200,
        };
      });

    } catch (error) {
      return {
        'title': 'Error',
        'message': error.response?.message || error.message,
        'status': error.status || 400,
      };
    }
  }
}
