import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('mod_catalog_supplier')
export class Supplier {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'bigint' }) // NIT suele ser un número largo
  nit: number;

  @Column({ type: 'varchar', length: 255 })
  razon_social: string;

  @Column({ type: 'varchar', length: 255 })
  direccion: string;

  @Column({ type: 'varchar', length: 50 })
  telefono: string;

  @Column({ type: 'varchar', length: 150 })
  correo: string;
}