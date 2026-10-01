import { Admin } from '../../../user/admin/user/entities/admin.entity'; // Ajusta la ruta de importación de Admin
import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn, 
  ManyToOne, 
  JoinColumn, 
  CreateDateColumn 
} from 'typeorm';
import { AccionAuditoria } from '../../enums/enumAuditoria'; 

@Entity('mod_auditoria_bodega')
export class AuditoriaBodega {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: false })
  id_afectado: number;

  @Column({ type: 'enum', enum: AccionAuditoria, nullable: false })
  accion: AccionAuditoria;

  @ManyToOne(() => Admin, {
    onDelete: 'SET NULL',
    nullable: true 
  })
  @JoinColumn({ name: 'id_usuario' })
  usuario: Admin;

  @Column({ type: 'json', nullable: true })
  detalles?: Record<string, any>;

  @CreateDateColumn({ type: 'timestamp', name: 'fecha' })
  fecha: Date;
}