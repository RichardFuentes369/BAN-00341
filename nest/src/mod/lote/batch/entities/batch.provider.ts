import { DataSource } from 'typeorm';
import { Lote } from './batch.entity';

export const batchProviders = [
  {
    provide: 'BATCH_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Lote),
    inject: ['DATA_SOURCE'],
  },
];