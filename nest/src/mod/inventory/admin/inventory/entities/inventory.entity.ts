// import { PermisosModulos } from 'src/mod/permisos/modulos/entities/modulo.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('mod_inventory')
export class Inventory {
  @PrimaryGeneratedColumn('increment')
  id: number;
  id_category: number;
  id_provider: number;

  lote: number; // llave primaria
  cantidad: number;

  fecha_fabricacion: number;
  fecha_ingreso: number;
  fecha_vencimiento: number;

  cantidad_stock_actual: number; // productos hay actuales
  cantidad_stock_consumible: number; // productos hay consumibles

  cantidad_vencida: number; // supero fecha de vencimiento
  cantidad_perdida: number; // robo o perdida
  // @OneToMany(() => PermisosModulos, (permiso) => permiso.userId)
  // permiso: PermisosModulos
}