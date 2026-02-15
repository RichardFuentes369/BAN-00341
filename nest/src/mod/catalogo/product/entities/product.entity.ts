// import { PermisosModulos } from 'src/mod/permisos/modulos/entities/modulo.entity';
import { Batch } from '@module/lote/batch/entities/batch.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { UnidadMedida } from '../enums/UnidadMedida';
import { Category } from '@module/catalogo/category/entities/category.entity';

@Entity('mod_catalogo_productos')
export class Product {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  codigo_barra: string;

  @Column({ type: 'varchar', length: 150 })
  nombre: string;

  @ManyToOne(() => Category, (categoria) => categoria.id, {
    onDelete: 'CASCADE', 
    nullable: false
  })
  @JoinColumn({ name: 'id_categoria' })
  categoria: Category;

  @Column()
  stock_minimo: number;

  @Column({
    type: 'enum',
    enum: UnidadMedida,
    default: UnidadMedida.KG,
  })
  unidad_medida: UnidadMedida;

  @OneToMany(() => Batch, (batch) => batch.product)
  batchs: Batch[];
}