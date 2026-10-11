import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Ventas } from './sale.entity';

@Entity('mod_registro_detalle_ventas')
export class DetailVentas {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  lote: string;

  @Column()
  codigo_barra: string;

  @Column()
  cantidad: number;

  @Column()
  valor_unitario: number;

  @Column()
  valor_total: number;


  @ManyToOne(() => Ventas, (venta) => venta.id, {
    onDelete: 'RESTRICT',
    nullable: false
  })
  @JoinColumn({ name: 'id_venta' })
  id_venta: Ventas;
}