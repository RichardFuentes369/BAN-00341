// import { PermisosModulos } from 'src/mod/permisos/modulos/entities/modulo.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('mod_category')
export class Category {
  @PrimaryGeneratedColumn('increment')
  id: number;
  nombre: string; // Bebida, Comestible, Articulo de aseo
  descripcion: string; // Bebida, Comestible, Articulo de aseo
  // @OneToMany(() => PermisosModulos, (permiso) => permiso.userId)
  // permiso: PermisosModulos
}