import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { forwardRef } from '@nestjs/common';

@Entity('mod_catalogo_medida')
export class Extent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  nombre: string; 
}
