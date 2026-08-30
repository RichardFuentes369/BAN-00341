import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Bodega } from '../warehouse/entities/warehouse.entity';
import { Repository } from 'typeorm';
import { Producto } from '@module/catalogo/product/entities/product.entity';
import { Ventas } from './entities/sale.entity';
import { I18nService } from 'nestjs-i18n';

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
