// import { PermisosModulos } from 'src/mod/permisos/modulos/entities/modulo.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('mod_catalog_product')
export class Product {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  nombre: number; // Gaseosa de naranja

  @Column()
  marca: number; // Postobon

  @Column()
  contenido_por_unidad: number; // 250

  @Column()
  medida_de_unidad: number; // [l-ml, g-kg, unds]

  @Column()
  es_perecedero: boolean; // yes

  @Column()
  id_category: number; // Bebidas y liquidos

  @Column()
  alerta_verde_dias: number; // > 100 dias

  @Column()
  alerta_amarilla_dias: number; // 99 - 16 dias

  @Column()
  alerta_roja_dias: number; // < 15 dias

  @Column()
  alerta_verde_unidades: number; // > 100 unidades
  
  @Column()
  alerta_amarilla_unidades: number; // 99 - 16 unidades

  @Column()
  alerta_roja_unidades: number; // < 15 unidades
}