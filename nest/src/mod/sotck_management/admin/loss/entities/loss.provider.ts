import { DataSource } from 'typeorm';
import { Loss } from './loss.entity';

export const lossProviders = [
  {
    provide: 'LOSS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Loss),
    inject: ['DATA_SOURCE'],
  },
];