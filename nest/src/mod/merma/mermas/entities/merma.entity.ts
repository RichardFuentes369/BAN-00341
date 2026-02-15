// import { PermisosModulos } from 'src/mod/permisos/modulos/entities/modulo.entity';
import { Batch } from '@module/lote/batch/entities/batch.entity';
import { Tipo } from '@module/merma/tipos/entities/tipo.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

@Entity('mod_merma_mermas')
export class Merma {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Batch, (lote) => lote.id, {
    onDelete: 'CASCADE', 
    nullable: false
  })
  @JoinColumn({ name: 'id_lote' })
  lote: Batch;
  
  @Column({ type: 'int', nullable: false, default: 0 })
  cantidad: number;

  @ManyToOne(() => Tipo, (tipo_merma) => tipo_merma.id, {
    onDelete: 'CASCADE', 
    nullable: false
  })
  @JoinColumn({ name: 'id_tipo_merma' })
  tipo: Tipo;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_reporte: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0.00 })
  valor_perdido: number;

  @Column({ type: 'text', nullable: false })
  observacioens: string;
}