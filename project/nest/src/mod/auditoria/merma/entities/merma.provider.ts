import { DataSource } from 'typeorm';
import { AuditoriaMerma } from './merma.entity';

export const auditoriaMermaProvider = [
  {
    provide: 'AUDITORIA_MERMA_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(AuditoriaMerma),
    inject: ['DATA_SOURCE'],
  },
];