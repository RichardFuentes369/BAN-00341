import { DataSource } from 'typeorm';
import { Bodega } from './warehouse.entity';

export const warehouseProviders = [
  {
    provide: 'WAREHOUSE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Bodega),
    inject: ['DATA_SOURCE'],
  },
];
