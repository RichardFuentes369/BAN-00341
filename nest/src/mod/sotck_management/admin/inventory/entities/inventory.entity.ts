// import { PermisosModulos } from 'src/mod/permisos/modulos/entities/modulo.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('mod_stock_management_inventory')
export class Inventory {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  id_category: number; // lo trae el producto

  @Column()
  id_product: number;

  @Column()
  id_supplier: number;

  @Column()
  lote: number; // llave primaria
  
  @Column()
  fecha_fabricacion: number;
  
  @Column()
  fecha_ingreso: number;

  @Column()
  fecha_vencimiento: number;
  
  @Column()
  cantidad_comprada: number; // productos que se compraron con ese lote

  @Column()
  cantidad_vendida: number; // productos que se vendieron con ese lote

  @Column()
  cantidad_perdida: number; // productos que fueron afectados por el loss o mermita

  @Column()
  cantidad_consumible: number; // productos que hay consumibles cantidad_consumible = cantidad_comprada - (cantidad_vendida + cantidad_perdida)

  /** 
   * 
   * Si son perecederos
   * Si la cantidad_consumible > 1 y la (fecha_actual - fecha_vencimiento) > mod_catalog_product.alerta_verde_dias
   * Si la cantidad_consumible > 1 y la (fecha_actual - fecha_vencimiento) < mod_catalog_product.alerta_amarilla_dias
   * Si la cantidad_consumible > 1 y la (fecha_actual - fecha_vencimiento) < mod_catalog_product.alerta_roja_dias
   * 
   * Si no son perecederos
   * Si la cantidad_consumible > 1 y cantidad_consumible >= alerta_verde_unidades
   * Si la cantidad_consumible > 1 y cantidad_consumible <= alerta_amarilla_unidades
   * Si la cantidad_consumible > 1 y cantidad_consumible <= alerta_roja_unidades
   * 
   * Tener en cuenta que: Debo sumar todos los que sean iguales a id_category, id_product
  */

}