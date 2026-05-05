import { Bodega } from '@module/bodega/warehouse/entities/warehouse.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne } from 'typeorm';

@Entity('mod_catalogo_proveedores')
export class Proveedor {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 10, unique: true })
  nit: string;

  @Column({ type: 'char', length: 1 })
  dv: string;
  
  @Column({ type: 'varchar', length: 255 })
  razon_social: string;

  @Column({ type: 'varchar', length: 255 })
  direccion: string;

  @Column({ type: 'varchar', length: 150 })
  correo: string;

  @Column({ type: 'varchar', length: 50 })
  telefono: string;
  
  // Relation
  @OneToMany(() => Bodega, (lote) => lote.id_proveedor)
  lote: Bodega[];

  get fullNit(): string {
    return `${this.nit}-${this.dv}`;
  }
}