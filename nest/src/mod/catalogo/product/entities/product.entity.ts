// import { PermisosModulos } from 'src/mod/permisos/modulos/entities/modulo.entity';
import { Lote } from '@module/lote/batch/entities/batch.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn, OneToOne, Batch } from 'typeorm';
import { UnidadMedida } from '../enums/UnidadMedida';
import { Categoria } from '@module/catalogo/category/entities/category.entity';

@Entity('mod_catalogo_productos')
export class Producto {
  @PrimaryGeneratedColumn('increment')
  id: number;

  // EAN-13
  @Column({ type: 'varchar', length: 13, unique: true })
  codigo_barra: string;

  @Column({ type: 'varchar', length: 150 })
  nombre: string;

  @Column({ type:  'varchar', length: 150 })
  marca: string;

  @Column({ type: 'enum', enum: UnidadMedida, default: UnidadMedida.KG })
  unidad_medida: UnidadMedida;

  @Column()
  stock_minimo: number;

  @Column({ default: false })
  es_perecedero: boolean;

  @Column({ nullable: true })
  alerta_amarilla: number;

  @Column({ nullable: true })
  alerta_naranja: number;

  @Column({ default: true })
  estado: boolean;

  @Column()
  id_categoria: number;

  // Relation
  @ManyToOne(() => Categoria, (tipo_categoria) => tipo_categoria.id, {
    onDelete: 'RESTRICT', 
    nullable: false
  })
  @JoinColumn({ name: 'id_categoria' })
  categoria: Categoria;

  @OneToMany(() => Lote, (lote) => lote.id_producto)
  lote: Lote[];
}