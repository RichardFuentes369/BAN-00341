// import { PermisosModulos } from 'src/mod/permisos/modulos/entities/modulo.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('mod_stock_management_loss')
export class Loss {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  motivo: number; // robo - mal estado - averia - vencimiento - consumo interno

  @Column()
  lote: number; 

  @Column()
  cantidad: number;

  @Column()
  id_inventory: number;

  @Column()
  id_usuario: number;
  // @OneToMany(() => PermisosModulos, (permiso) => permiso.userId)
  // permiso: PermisosModulos
}