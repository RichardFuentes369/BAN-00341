import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Bodega } from '../warehouse/entities/warehouse.entity';
import { Between, LessThanOrEqual, Like, MoreThanOrEqual, Repository } from 'typeorm';
import { Producto } from '@module/catalogo/product/entities/product.entity';
import { Ventas } from './entities/sale.entity';
import { I18nService } from 'nestjs-i18n';
import { FilterSaleDto } from './dto/filter-sale.dto';

@Injectable()
export class SalesService {

  constructor(
    @Inject('SALES_REPOSITORY')
    private salesRepository: Repository<Ventas>,
    @Inject('WAREHOUSE_REPOSITORY')
    private bodegaRepository: Repository<Bodega>,
    @Inject('PRODUCT_REPOSITORY')
    private productoRepository: Repository<Producto>,
    private i18n: I18nService
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

    const skipeReal = (page == 1) ? 0 : (page - 1) * limit

    const where: any = {};

    const fecha_venta_min = filterDto['fecha_venta_minimo'] ? parseInt(filterDto['fecha_venta_minimo']) : null;
    const fecha_venta_max = filterDto['fecha_venta_maximo'] ? parseInt(filterDto['fecha_venta_maximo']) : null;

    if (fecha_venta_min !== null && fecha_venta_max !== null) {
      where.fecha_entrada = Between(fecha_venta_min, fecha_venta_max);
    } else if (fecha_venta_min !== null) {
      where.fecha_entrada = MoreThanOrEqual(fecha_venta_min);
    } else if (fecha_venta_max !== null) {
      where.fecha_entrada = LessThanOrEqual(fecha_venta_max);
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
      where: [{ id: id }],
      order: { id: 'DESC' }
    });
  }

  async create(
    lang: string,
    saleData: CreateSaleDto,
    userId: number
  ) {
    try {
      const detalles = saleData.detalle_factura;

      for (const item of detalles) {

        const id_producto = await this.productoRepository.findOne({
          where: { codigo_barra: item.codigo_barra }
        });

        if (!id_producto) {
          throw new BadRequestException(
            `El producto con código de barra '${item.codigo_barra}' no existe en nuestro catálogo.`
          );
        }

        const productoBodega = await this.bodegaRepository.findOne({
          where: {
            lote: item.lote,
            id_producto: id_producto,
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

        productoBodega.cantidad_en_bodega = cantidadBodega - cantidadVendida;
        productoBodega.cantidad_vendida += cantidadVendida;
        await this.bodegaRepository.save(productoBodega);
      }

      // 3. Crear y guardar la factura con el JSON completo en detalle_factura
      const nuevaFactura = this.salesRepository.create({
        nro_factura: saleData.nro_factura,
        fecha_venta: saleData.fecha_venta,
        detalle_factura: detalles
      });

      await this.salesRepository.save(nuevaFactura);

      return {
        'title': this.i18n.t('supplier.MSJ_TITTLE', { lang }),
        'message': this.i18n.t('supplier.MSJ_CREADO_EXITOSAMENTE', { lang }),
        'status': 200,
      };

    } catch (error) {
      return {
        'title': 'Error',
        'message': error.response?.message || error.message,
        'status': error.status || 400, // Si es un BadRequestException, capturará su status correspondiente
      };
    }
  }
}
