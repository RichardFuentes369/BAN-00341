// import { PermisosModulos } from 'src/mod/permisos/modulos/entities/modulo.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

@Entity('mod_vars_json')
export class Json {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: true })
  nombre: string;
  
  @Column({ type: 'json' })
  valor: any;
}
