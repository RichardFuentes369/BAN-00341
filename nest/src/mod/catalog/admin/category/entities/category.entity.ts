// import { PermisosModulos } from 'src/mod/permisos/modulos/entities/modulo.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('mod_catalog_category')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  nombre: string; // [Alimentos y Abarrotes - Bebidas y Liquidos - Frescos y Lacteos - Limpieza e Higiene]

  @Column({ type: 'varchar', length: 255 })
  descripcion: string;
}