import { DataSource } from 'typeorm';
import { AuditoriaBodega } from './bodega.entity';

export const auditoriaBodegaProvider = [
  {
    provide: 'AUDITORIA_BODEGA_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(AuditoriaBodega),
    inject: ['DATA_SOURCE'],
  },
];