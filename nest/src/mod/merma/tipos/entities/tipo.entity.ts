// import { PermisosModulos } from 'src/mod/permisos/modulos/entities/modulo.entity';
import { Merma } from '@module/merma/mermas/entities/merma.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('mod_merma_tipos')
export class Tipo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  nombre: string;

  @OneToMany(() => Merma, (merma) => merma.tipo)
  mermas: Merma[];
}