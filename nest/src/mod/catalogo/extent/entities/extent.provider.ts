import { DataSource } from 'typeorm';
import { Extent } from './extent.entity';

export const extentProviders = [
  {
    provide: 'EXTENT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Extent),
    inject: ['DATA_SOURCE'],
  },
];