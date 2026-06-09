import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { forwardRef } from '@nestjs/common';
import { Producto } from '@module/catalogo/product/entities/product.entity';

@Entity('mod_catalogo_medida')
export class Extent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  nombre: string; 

  // Relation
  @OneToMany(() => Producto, (producto) => producto.medida)
  productos: Producto[];
}
