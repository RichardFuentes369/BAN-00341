// import { PermisosModulos } from 'src/mod/permisos/modulos/entities/modulo.entity';
import { Producto } from '@module/catalogo/product/entities/product.entity';
import { Proveedor } from '@module/catalogo/supplier/entities/supplier.entity';
import { Merma } from '@module/merma/mermas/entities/merma.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn, OneToOne } from 'typeorm';

interface ItemPedido {
  lote: string;
  producto: string;
  cantidad: string;
}

@Entity('mod_registro_ventas')
export class Ventas {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nro_factura: string;

  @Column()
  fecha_venta: number; 

  @Column("json")
  detalle_factura: any[];
}