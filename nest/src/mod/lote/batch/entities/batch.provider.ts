import { DataSource } from 'typeorm';
import { Batch } from './batch.entity';

export const batchProviders = [
  {
    provide: 'BATCH_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Batch),
    inject: ['DATA_SOURCE'],
  },
];