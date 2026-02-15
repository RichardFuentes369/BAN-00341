// import { PermisosModulos } from 'src/mod/permisos/modulos/entities/modulo.entity';
import { Lote } from '@module/lote/batch/entities/batch.entity';
import { Tipo } from '@module/merma/tipos/entities/tipo.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

@Entity('mod_merma_mermas')
export class Merma {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: false, default: 0 })
  cantidad: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_reporte: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0.00 })
  valor_perdido: number;

  @Column({ type: 'text', nullable: false })
  observaciones: string;

  // Relation
  @ManyToOne(() => Tipo, (tipo_merma) => tipo_merma.id, {
    onDelete: 'CASCADE', 
    nullable: false
  })
  @JoinColumn({ name: 'id_tipo_merma' })
  id_tipo_merma: Tipo;

  @ManyToOne(() => Lote, (lote) => lote.id, {
    onDelete: 'CASCADE', 
    nullable: false
  })
  @JoinColumn({ name: 'id_lote' })
  id_lote: Lote;
}