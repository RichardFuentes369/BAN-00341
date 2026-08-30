import { DataSource } from 'typeorm';
import { Ventas } from './sale.entity';

export const saleProviders = [
  {
    provide: 'SALES_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Ventas),
    inject: ['DATA_SOURCE'],
  },
];
