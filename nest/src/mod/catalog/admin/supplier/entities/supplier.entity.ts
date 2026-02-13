// import { PermisosModulos } from 'src/mod/permisos/modulos/entities/modulo.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('mod_catalog_supplier')
export class Supplier {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  nit: number;

  @Column()
  razon_social: number;

  @Column()
  direccion: number;

  @Column()
  telefono: number;

  @Column()
  correo: number;
}