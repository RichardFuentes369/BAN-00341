import { DataSource } from 'typeorm';
import { Marca } from './brand.entity';

export const brandProviders = [
  {
    provide: 'BRAND_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Marca),
    inject: ['DATA_SOURCE'],
  },
];