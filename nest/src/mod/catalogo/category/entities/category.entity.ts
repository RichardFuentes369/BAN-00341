// import { PermisosModulos } from 'src/mod/permisos/modulos/entities/modulo.entity';
import { Product } from '@module/catalogo/product/entities/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('mod_catalogo_categorias')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  nombre: string; 

  @Column({ type: 'varchar', length: 255 })
  descripcion: string;

  @OneToMany(() => Product, (producto) => producto.categoria)
  produto: Product[];
}