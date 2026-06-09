// import { PermisosModulos } from 'src/mod/permisos/modulos/entities/modulo.entity';
import { Bodega } from '@module/bodega/warehouse/entities/warehouse.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn, OneToOne, Batch } from 'typeorm';
import { Marca } from '@module/catalogo/brand/entities/brand.entity';
import { forwardRef } from '@nestjs/common';
import { Extent } from '@module/catalogo/extent/entities/extent.entity';

@Entity('mod_catalogo_productos')
export class Producto {
  @PrimaryGeneratedColumn('increment')
  id: number;

  // EAN-13
  @Column({ type: 'varchar', length: 13, unique: true })
  codigo_barra: string;

  @Column({ type: 'varchar', length: 150 })
  nombre: string;

  @Column()
  id_marca: number;

  @Column()
  id_medida: number;

  @Column()
  stock_minimo: number;

  @Column({ type: 'tinyint', width: 1, default: 1 })
  es_perecedero: boolean;

  @Column({ nullable: true })
  alerta_amarilla: number;

  @Column({ nullable: true })
  alerta_naranja: number;

  @Column({ type: 'tinyint', width: 1, default: 1 })
  estado: boolean;

  @ManyToOne(() => Marca, (marca) => marca.productos)
  @JoinColumn({ name: 'id_marca' })
  marca: Marca;

  @ManyToOne(() => Extent, (medida) => medida.productos)
  @JoinColumn({ name: 'id_medida' })
  medida: Extent;

  @OneToMany(() => Bodega, (lote) => lote.id_producto)
  lote: Bodega[];
}