import { DataSource } from 'typeorm';
import { DetailVentas } from './detail.entity';

export const saleProviders = [
  {
    provide: 'SALES_DETAIL_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(DetailVentas),
    inject: ['DATA_SOURCE'],
  },
];
