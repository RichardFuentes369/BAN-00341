import { DataSource } from 'typeorm';
import { Proveedor } from './supplier.entity';

export const supplierProviders = [
  {
    provide: 'SUPPLIER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Proveedor),
    inject: ['DATA_SOURCE'],
  },
];