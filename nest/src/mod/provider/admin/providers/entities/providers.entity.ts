// import { PermisosModulos } from 'src/mod/permisos/modulos/entities/modulo.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('mod_provider')
export class Provider {
  @PrimaryGeneratedColumn('increment')
  id: number;
  nit: string; // 2536393
  razon_social: string; // Bimbo, Postobon, Pan de Dios, Naciónal de chocolates, xxx
  correo_contacto: string; // bimbo@corrreo.com
  telefono_contacto: string; // 3504289563
  // @OneToMany(() => PermisosModulos, (permiso) => permiso.userId)
  // permiso: PermisosModulos
}