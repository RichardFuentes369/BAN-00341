import { DataSource } from 'typeorm';
import { Ventas } from './sale.entity';
import { DetailVentas } from './detail.entity';

export const saleProviders = [
  {
    provide: 'SALES_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Ventas),
    inject: ['DATA_SOURCE'],
  },
  {
      provide: 'SALES_DETAIL_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(DetailVentas),
      inject: ['DATA_SOURCE'],
    },
];
