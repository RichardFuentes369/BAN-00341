// import { PermisosModulos } from 'src/mod/permisos/modulos/entities/modulo.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('mod_catalog_category')
export class Category {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  nombre: number; // [Alimentos y Abarrotes - Bebidas y Liquidos - Frescos y Lacteos - Limpieza e Higiene]

  @Column()
  descripcion: number;
}