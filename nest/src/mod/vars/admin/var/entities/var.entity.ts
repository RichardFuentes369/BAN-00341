// import { PermisosModulos } from 'src/mod/permisos/modulos/entities/modulo.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

@Entity('mod_vars_var')
export class Var {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: true })
  nombre: string;

  @Column({ nullable: true })
  valor: string;
}
