// import { PermisosModulos } from 'src/mod/permisos/modulos/entities/modulo.entity';
import { Producto } from '@module/catalogo/product/entities/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('mod_catalogo_marcas')
export class Marca {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  nombre: string; 

  // Relation
  @OneToMany(() => Producto, (producto) => producto.marca)
  productos: Producto[];
}