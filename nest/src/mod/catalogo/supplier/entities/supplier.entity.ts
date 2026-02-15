import { Batch } from '@module/lote/batch/entities/batch.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('mod_catalogo_proveedores')
export class Supplier {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'bigint', unique: true }) // NIT suele ser un número largo
  nit: number;

  @Column({ type: 'varchar', length: 255 })
  razon_social: string;

  @Column({ type: 'varchar', length: 255 })
  direccion: string;

  @Column({ type: 'varchar', length: 150 })
  correo: string;

  @Column({ type: 'varchar', length: 50 })
  telefono: string;

  @OneToMany(() => Batch, (batch) => batch.supplier)
  batchs: Batch[];
}