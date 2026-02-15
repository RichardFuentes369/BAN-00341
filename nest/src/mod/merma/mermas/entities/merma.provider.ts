import { DataSource } from 'typeorm';
import { Merma } from './merma.entity';

export const tipoProviders = [
  {
    provide: 'MERMA_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Merma),
    inject: ['DATA_SOURCE'],
  },
];