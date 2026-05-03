// import { PermisosModulos } from 'src/mod/permisos/modulos/entities/modulo.entity';
import { Producto } from '@module/catalogo/product/entities/product.entity';
import { Proveedor } from '@module/catalogo/supplier/entities/supplier.entity';
import { Merma } from '@module/merma/mermas/entities/merma.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { EstadoLote } from '../enums/EstadoLote';

@Entity('mod_lote')
export class Lote {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, nullable: false })
  lote: string;

  @Column({ type: 'bigint', nullable: false })
  fecha_entrada: number;

  @Column({ type: 'bigint', nullable: true })
  fecha_vencimiento: number;

  @Column({ type: 'int', nullable: false, default: 0 })
  cantidad_comprada;

  @Column({ type: 'int', nullable: false, default: 0 })
  cantidad_vendida;  
  
  @Column({ type: 'int', nullable: false, default: 0 })
  cantidad_en_bodega;

  @Column({ type: 'enum', enum: EstadoLote, default: EstadoLote.DISPONIBLE })
  estado: EstadoLote;

  // Relation
  @ManyToOne(() => Producto, (producto) => producto.id, {
    onDelete: 'RESTRICT', 
    nullable: false
  })
  @JoinColumn({ name: 'id_producto' })
  id_producto: Producto;

  @ManyToOne(() => Proveedor, (proveedor) => proveedor.id, {
    onDelete: 'RESTRICT', 
    nullable: false
  })
  @JoinColumn({ name: 'id_proveedor' })
  id_proveedor: Proveedor;

  @OneToMany(() => Merma, (merma) => merma.id_lote)
  mermas: Merma[];
}