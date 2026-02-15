// import { PermisosModulos } from 'src/mod/permisos/modulos/entities/modulo.entity';
import { Producto } from '@module/catalogo/product/entities/product.entity';
import { Proveedor } from '@module/catalogo/supplier/entities/supplier.entity';
import { Merma } from '@module/merma/mermas/entities/merma.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { EstadoProducto } from '../enums/EstadoProducto';

@Entity('mod_lote')
export class Lote {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_entrada: Date;

  @Column({ type: 'timestamp',nullable: false })
  fecha_vencimiento: Date;

  @Column({ type: 'int', nullable: false, default: 0 })
  cantidad_inicial;

  @Column({ type: 'int', nullable: false, default: 0 })
  stock_actual;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0.00 })
  costo_unitario;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0.00 })
  precio_venta_sugerido;

  @Column({ type: 'enum', enum: EstadoProducto, default: EstadoProducto.DISPONIBLE })
  estado: EstadoProducto;

  // Relation
  @ManyToOne(() => Producto, (producto) => producto.id, {
    onDelete: 'CASCADE', 
    nullable: false
  })
  @JoinColumn({ name: 'id_producto' })
  id_producto: Producto;

  @ManyToOne(() => Proveedor, (proveedor) => proveedor.id, {
    onDelete: 'CASCADE', 
    nullable: false
  })
  @JoinColumn({ name: 'id_proveedor' })
  id_proveedor: Proveedor;

  @OneToMany(() => Merma, (merma) => merma.id_lote)
  mermas: Merma[];
}