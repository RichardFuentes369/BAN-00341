// import { PermisosModulos } from 'src/mod/permisos/modulos/entities/modulo.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Asignacion } from '../../permission/asignacion/entities/asignacion.entity';

@Entity('mod_usuarios_admin')
export class Admin {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;
  
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Asignacion, (asignacion) => asignacion.user)
  asignaciones: Asignacion[];
}